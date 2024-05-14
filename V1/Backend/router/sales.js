const express = require("express");
const app = express();
const sales = require("../controller/sales");

// Add Sales
app.post("/add", sales.addSales);



app.get("/data", sales.getSubmittedData);

app.get("/data/full", sales.getSubmittedDataFullProcess);

app.get("/data/finish", sales.getSubmittedDataFinishProcess);

module.exports = app;



// http://localhost:4000/api/sales/add POST
// http://localhost:4000/api/sales/get GET
