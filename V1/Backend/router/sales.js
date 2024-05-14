const express = require("express");
const app = express();
const sales = require("../controller/sales");

// Add Sales
app.post("/add", sales.addSales);



app.get("/data", sales.getSubmittedData);

app.get("/data/full", sales.getSubmittedDataFullProcess);

app.get("/data/finish", sales.getSubmittedDataFinishProcess);

module.exports = app;



// https://servers-beit.onrender.com/api/sales/add POST
// https://servers-beit.onrender.com/api/sales/get GET
