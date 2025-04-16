const Income = require('../Models/Income');
const Expense = require('../Models/Expense');
const tf = require('@tensorflow/tfjs');
const moment = require('moment');

// Helper function to prepare data for time series prediction
const prepareTimeSeriesData = (transactions, lookback = 7) => {
    try {
        if (!transactions || transactions.length === 0) {
            throw new Error('No transactions data provided');
        }

        // Sort transactions by date
        transactions.sort((a, b) => new Date(a.date) - new Date(b.date));

        // Group transactions by date
        const dailyData = transactions.reduce((acc, transaction) => {
            const date = moment(transaction.date).format('YYYY-MM-DD');
            if (!acc[date]) {
                acc[date] = 0;
            }
            acc[date] += transaction.amount;
            return acc;
        }, {});

        // Convert to array and fill missing dates
        const startDate = moment(transactions[0].date);
        const endDate = moment(transactions[transactions.length - 1].date);
        const allDates = [];
        let currentDate = startDate.clone();

        while (currentDate <= endDate) {
            const dateStr = currentDate.format('YYYY-MM-DD');
            allDates.push({
                date: dateStr,
                amount: dailyData[dateStr] || 0
            });
            currentDate.add(1, 'days');
        }

        // Create features and labels
        const features = [];
        const labels = [];

        for (let i = lookback; i < allDates.length; i++) {
            const feature = allDates.slice(i - lookback, i).map(d => d.amount);
            features.push([
                ...feature,
                moment(allDates[i].date).day(), // Add day of week as a feature (0-6)
                moment(allDates[i].date).date(), // Add day of month as a feature (1-31)
                moment(allDates[i].date).month() // Add month as a feature (0-11)
            ]);
            labels.push(allDates[i].amount);
        }

        return {
            features: features,
            labels: labels,
            dates: allDates.slice(lookback).map(d => d.date)
        };
    } catch (error) {
        console.error('Error in prepareTimeSeriesData:', error);
        throw error;
    }
};

// Create and train model
const createAndTrainModel = async (features, labels) => {
    try {
        const model = tf.sequential();
        
        model.add(tf.layers.dense({
            inputShape: [features[0].length],
            units: 32,
            activation: 'relu'
        }));
        
        model.add(tf.layers.dropout({ rate: 0.2 }));
        
        model.add(tf.layers.dense({
            units: 16,
            activation: 'relu'
        }));
        
        model.add(tf.layers.dense({
            units: 1,
            activation: 'linear'
        }));

        model.compile({
            optimizer: tf.train.adam(0.001),
            loss: 'meanSquaredError'
        });

        const xs = tf.tensor2d(features);
        const ys = tf.tensor2d(labels.map(l => [l]));

        await model.fit(xs, ys, {
            epochs: 100,
            batchSize: 32,
            shuffle: true,
            validationSplit: 0.2
        });

        return model;
    } catch (error) {
        console.error('Error in createAndTrainModel:', error);
        throw error;
    }
};

exports.getPredictions = async (req, res) => {
    try {
        console.log('Starting prediction process...');
        const userId = req.user.id;
        const { days = 7 } = req.query;

        console.log('Fetching historical data...');
        // Fetch historical data
        const [incomes, expenses] = await Promise.all([
            Income.find({ userId }).sort({ date: 1 }),
            Expense.find({ userId }).sort({ date: 1 })
        ]);

        console.log(`Found ${incomes.length} income records and ${expenses.length} expense records`);

        if (incomes.length < 14 || expenses.length < 14) {
            return res.status(400).json({
                success: false,
                message: "Not enough historical data for predictions. Need at least 14 days of data."
            });
        }

        console.log('Preparing time series data...');
        // Prepare data for both income and expense predictions
        const incomeData = prepareTimeSeriesData(incomes);
        const expenseData = prepareTimeSeriesData(expenses);

        console.log('Training models...');
        // Train models
        const [incomeModel, expenseModel] = await Promise.all([
            createAndTrainModel(incomeData.features, incomeData.labels),
            createAndTrainModel(expenseData.features, expenseData.labels)
        ]);

        console.log('Generating predictions...');
        // Generate predictions for the next specified days
        const predictions = [];
        let currentDate = moment();
        let lastIncomeFeatures = incomeData.features[incomeData.features.length - 1];
        let lastExpenseFeatures = expenseData.features[expenseData.features.length - 1];

        for (let i = 0; i < days; i++) {
            currentDate = currentDate.add(1, 'days');

            // Update features for next prediction
            const dateFeatures = [
                currentDate.day(),
                currentDate.date(),
                currentDate.month()
            ];

            // Prepare income features
            const incomeFeatures = [
                ...lastIncomeFeatures.slice(1, -3),
                lastIncomeFeatures[lastIncomeFeatures.length - 4],
                ...dateFeatures
            ];

            // Prepare expense features
            const expenseFeatures = [
                ...lastExpenseFeatures.slice(1, -3),
                lastExpenseFeatures[lastExpenseFeatures.length - 4],
                ...dateFeatures
            ];

            // Make predictions
            const predictedIncome = incomeModel.predict(tf.tensor2d([incomeFeatures])).dataSync()[0];
            const predictedExpense = expenseModel.predict(tf.tensor2d([expenseFeatures])).dataSync()[0];

            // Store predictions
            predictions.push({
                date: currentDate.format('YYYY-MM-DD'),
                predictedIncome: Math.max(0, Math.round(predictedIncome * 100) / 100),
                predictedExpense: Math.max(0, Math.round(predictedExpense * 100) / 100)
            });

            // Update last features for next iteration
            lastIncomeFeatures = [...incomeFeatures];
            lastExpenseFeatures = [...expenseFeatures];
        }

        // Calculate some statistics for context
        const incomeMean = incomes.reduce((sum, inc) => sum + inc.amount, 0) / incomes.length;
        const expenseMean = expenses.reduce((sum, exp) => sum + exp.amount, 0) / expenses.length;

        console.log('Sending response...');
        res.json({
            success: true,
            message: "Predictions generated successfully",
            predictions,
            modelMetrics: {
                incomeMean: Math.round(incomeMean * 100) / 100,
                expenseMean: Math.round(expenseMean * 100) / 100,
                dataPoints: {
                    income: incomes.length,
                    expense: expenses.length
                }
            }
        });

    } catch (error) {
        console.error('Prediction error:', error);
        res.status(500).json({
            success: false,
            message: "Error generating predictions",
            error: error.message,
            stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
        });
    }
}; 