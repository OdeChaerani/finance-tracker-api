const express = require('express');
const { transactions } = require('./data');
const app = express();
const port = 3000;

app.use(express.json()); 

// Helper function untuk format response standar
const formatResponse = (status, message, data = null, errors = null) => {
    return { status, message, data, errors };
};

// 1. GET ALL TRANSACTIONS (Added: Filter by Type & Sort)
app.get('/transactions', (req, res) => {
    let result = [...transactions];
    const { type, sort } = req.query;

    // Filter berdasarkan type (income/expense)
    if (type) {
        result = result.filter(t => t.type === type.toLowerCase());
    }

    // Sort berdasarkan tanggal (desc = terbaru)
    if (sort === 'desc') {
        result.sort((a, b) => new Date(b.date) - new Date(a.date));
    }

    res.status(200).json(formatResponse("OK", "Success retrieve transactions", result));
});

// 2. GET FINANCIAL SUMMARY (New Endpoint!)
app.get('/summary', (req, res) => {
    const totalIncome = transactions
        .filter(t => t.type === 'income')
        .reduce((sum, t) => sum + t.amount, 0);

    const totalExpense = transactions
        .filter(t => t.type === 'expense')
        .reduce((sum, t) => sum + t.amount, 0);

    const summary = {
        total_income: totalIncome,
        total_expense: totalExpense,
        balance: totalIncome - totalExpense
    };

    res.status(200).json(formatResponse("OK", "Financial Summary retrieved", summary));
});

// 3. GET TRANSACTION BY ID
app.get('/transactions/:id', (req, res) => {
    const transaction = transactions.find(t => t.id === parseInt(req.params.id));
    
    if (!transaction) {
        return res.status(404).json(formatResponse("ERROR", "Transaction not found", null, ["Invalid ID"]));
    }
    
    res.status(200).json(formatResponse("OK", "Success retrieve transaction", transaction));
});

// 4. POST NEW TRANSACTION
app.post('/transactions', (req, res) => {
    const { type, amount, description, date } = req.body;
    
    // Simple validation
    if (!type || !amount) {
        return res.status(400).json(formatResponse("ERROR", "Type and Amount are required", null, ["Missing fields"]));
    }

    const newTransaction = {
        id: transactions.length > 0 ? transactions[transactions.length - 1].id + 1 : 1,
        type: type.toLowerCase(),
        amount: parseFloat(amount),
        description: description || "No description",
        date: date || new Date().toISOString().split('T')[0]
    };
    
    transactions.push(newTransaction);
    res.status(201).json(formatResponse("OK", "Transaction created successfully", newTransaction));
});

// 5. PUT UPDATE TRANSACTION
app.put('/transactions/:id', (req, res) => {
    const index = transactions.findIndex(t => t.id === parseInt(req.params.id));
    
    if (index === -1) {
        return res.status(404).json(formatResponse("ERROR", "Transaction not found", null, ["Invalid ID"]));
    }
    
    const { type, amount, description, date } = req.body;
    transactions[index] = {
        ...transactions[index],
        type: type ? type.toLowerCase() : transactions[index].type,
        amount: amount ? parseFloat(amount) : transactions[index].amount,
        description: description || transactions[index].description,
        date: date || transactions[index].date
    };
    
    res.status(200).json(formatResponse("OK", "Transaction updated successfully", transactions[index]));
});

// 6. DELETE TRANSACTION
app.delete('/transactions/:id', (req, res) => {
    const index = transactions.findIndex(t => t.id === parseInt(req.params.id));
    
    if (index === -1) {
        return res.status(404).json(formatResponse("ERROR", "Transaction not found", null, ["Invalid ID"]));
    }
    
    transactions.splice(index, 1);
    res.status(200).json(formatResponse("OK", "Transaction deleted successfully"));
});

if (require.main === module) {
    app.listen(port, () => {
        console.log(`Server running in http://localhost:${port}/transactions`);
    });
}

module.exports = app;