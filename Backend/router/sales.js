const express = require("express");
const app = express();
const sales = require("../controller/sales");

// Add Sales
app.post("/add", sales.addSales);



app.get("/data", sales.getSubmittedData);

app.get("/data/all/reject", sales.getSubmittedDataAAll);

app.get("/data/full", sales.getSubmittedDataFullProcess);

app.get("/data/full/reject", sales.getRejectSubmittedDataFullProcess);

app.get("/data/finish", sales.getSubmittedDataFinishProcess);

app.get("/data/finish/reject", sales.getRejectSubmittedDataFinishProcess);

module.exports = app;



// http://localhost:4000/api/sales/add POST
// http://localhost:4000/api/sales/get GET
