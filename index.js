const express = require('express');
const app = express();
const port = 3000;

app.use(express.json()); 

app.get('/', (req, res) => {
  res.json({ status: "OK", message: "Expense Tracker API is running!" });
});

app.listen(port, () => {
  console.log(`Server running in http://localhost:${port}`);
});