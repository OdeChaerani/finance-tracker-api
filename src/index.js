const express = require('express');
const { transactions } = require('./data');
const app = express();
const port = 3000;

app.use(express.json()); 

// Helper function untuk format response standar
const formatResponse = (status, message, data = null, errors = null) => {
    return { status, message, data, errors };
};

app.get('/transactions', (req, res) => {
    res.status(200).json(formatResponse("OK", "Success retrieve all transactions", transactions));
});

app.get('/transactions/:id', (req, res) => {
    const transaction = transactions.find(t => t.id === parseInt(req.params.id));
    
    if (!transaction) {
        return res.status(404).json(formatResponse("ERROR", "Transaction not found", null, ["Invalid ID"]));
    }
    
    res.status(200).json(formatResponse("OK", "Success retrieve transaction", transaction));
});

app.post('/transactions', (req, res) => {
    const { type, amount, description, date } = req.body;
    
    const newTransaction = {
        id: transactions.length > 0 ? transactions[transactions.length - 1].id + 1 : 1,
        type,
        amount,
        description,
        date: date || new Date().toISOString().split('T')[0]
    };
    
    transactions.push(newTransaction);
    res.status(201).json(formatResponse("OK", "Transaction created successfully", newTransaction));
});

app.put('/transactions/:id', (req, res) => {
    const index = transactions.findIndex(t => t.id === parseInt(req.params.id));
    
    if (index === -1) {
        return res.status(404).json(formatResponse("ERROR", "Transaction not found", null, ["Invalid ID"]));
    }
    
    const { type, amount, description, date } = req.body;
    transactions[index] = {
        id: parseInt(req.params.id),
        type: type || transactions[index].type,
        amount: amount || transactions[index].amount,
        description: description || transactions[index].description,
        date: date || transactions[index].date
    };
    
    res.status(200).json(formatResponse("OK", "Transaction updated successfully", transactions[index]));
});

app.delete('/transactions/:id', (req, res) => {
    const index = transactions.findIndex(t => t.id === parseInt(req.params.id));
    
    if (index === -1) {
        return res.status(404).json(formatResponse("ERROR", "Transaction not found", null, ["Invalid ID"]));
    }
    
    transactions.splice(index, 1);
    res.status(200).json(formatResponse("OK", "Transaction deleted successfully"));
});

app.listen(port, () => {
  console.log(`Server running in http://localhost:${port}/transactions`);
});