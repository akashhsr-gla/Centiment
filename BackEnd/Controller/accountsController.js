const Income = require("../Models/Income");
const Expense = require("../Models/Expense");

const calculateAccounts = async (req, res) => {
    try {
        const userId = req.user._id;

        // Fetch all income and expense records for the user
        const incomes = await Income.find({ userId: userId });
        const expenses = await Expense.find({ userId: userId });

        // 1. Calculate Total Income & Expenses
        const totalIncome = incomes.reduce((sum, income) => sum + (income.amount || 0), 0);
        const totalExpenses = expenses.reduce((sum, expense) => sum + (expense.amount || 0), 0);

        // 2. Calculate Net Profit/Loss
        const netProfit = totalIncome - totalExpenses;

        // 3. Calculate Taxable Profit (assuming no deductions for now)
        const taxableProfit = netProfit;

        // 4. Calculate Estimated Tax Payable (25% flat rate)
        const taxPayable = taxableProfit > 0 ? taxableProfit * 0.25 : 0;

        // 5. Calculate Daily Averages (assuming 200 working days)
        const avgDailyIncome = totalIncome / 200;
        const avgDailyExpense = totalExpenses / 200;

        // 6. Calculate Profitability Ratio
        const profitabilityRatio = totalIncome > 0 ? (netProfit / totalIncome) * 100 : 0;

        // 7. Calculate Operating Profit (assuming all income/expenses are operating)
        const operatingProfit = netProfit;

        // Prepare response
        const accountsSummary = {
            totalIncome,
            totalExpenses,
            netProfit,
            taxableProfit,
            taxPayable,
            avgDailyIncome,
            avgDailyExpense,
            profitabilityRatio,
            operatingProfit,
            metrics: {
                isProfitable: netProfit > 0,
                profitMargin: profitabilityRatio,
                dailyNetProfit: (netProfit / 200).toFixed(2),
                taxRate: "25%",
                workingDays: 200
            }
        };

        res.status(200).json({
            success: true,
            message: "Accounts summary calculated successfully",
            data: accountsSummary
        });

    } catch (error) {
        console.error("Error calculating accounts:", error);
        res.status(500).json({
            success: false,
            message: "Error calculating accounts summary",
            error: error.message
        });
    }
};

module.exports = {
    calculateAccounts
}; 