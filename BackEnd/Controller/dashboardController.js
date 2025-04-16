const Income = require('../Models/Income');
const Expense = require('../Models/Expense');

// Dashboard Controller
exports.getDashboardData = async (req, res) => {
    const userId = req.user.id; // Getting user ID from authentication middleware

    try {
        // Fetch all income and expenses
        const incomes = await Income.find({ userId }).sort({ date: -1 });
        const expenses = await Expense.find({ userId }).sort({ date: -1 });

        // Calculate total income and total expenses
        const totalIncome = incomes.reduce((sum, income) => sum + income.amount, 0);
        const totalExpenses = expenses.reduce((sum, expense) => sum + expense.amount, 0);

        // Calculate last 60 days' income
        const sixtyDaysAgo = new Date();
        sixtyDaysAgo.setDate(sixtyDaysAgo.getDate() - 60);

        const incomeLast60Days = incomes.filter(income => new Date(income.date) >= sixtyDaysAgo);
        const sumIncomeLast60Days = incomeLast60Days.reduce((sum, income) => sum + income.amount, 0);

        // Calculate last 30 days' expenses
        const thirtyDaysAgo = new Date();
        thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

        const expenseLast30Days = expenses.filter(expense => new Date(expense.date) >= thirtyDaysAgo);
        const sumExpenseLast30Days = expenseLast30Days.reduce((sum, expense) => sum + expense.amount, 0);

        // Fetch last 5 transactions (combined income and expenses)
        const lastFiveTransactions = [...incomes, ...expenses]
            .sort((a, b) => new Date(b.date) - new Date(a.date)) // Sort by date descending
            .slice(0, 5); // Get the latest 5 transactions

        // Get the most recent transaction from the last 5 transactions
        const mostRecentTransaction = lastFiveTransactions[0] || null;  // In case there's no transaction, handle it gracefully

        // Calculate total balance
        const totalBalance = totalIncome - totalExpenses;

        // Response JSON
        res.status(200).json({
            totalIncome,
            totalExpenses,
            totalBalance,
            incomeLast60Days,
            sumIncomeLast60Days,
            expenseLast30Days,
            sumExpenseLast30Days,
            lastFiveTransactions,  // Ensure the latest transaction is at the start
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server Error" });
    }
};

// Delete all income and expenses for a user
exports.deleteAllTransactions = async (req, res) => {
    const userId = req.user.id;

    try {
        // Use Promise.all to run both deletions concurrently
        const [deletedIncome, deletedExpense] = await Promise.all([
            Income.deleteMany({ userId }),
            Expense.deleteMany({ userId })
        ]);

        res.status(200).json({
            message: "All transactions deleted successfully",
            deletedCount: {
                income: deletedIncome.deletedCount,
                expense: deletedExpense.deletedCount
            }
        });
    } catch (error) {
        console.error("Error deleting transactions:", error);
        res.status(500).json({ message: "Error deleting transactions" });
    }
};
