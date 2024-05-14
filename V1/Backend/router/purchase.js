const express = require("express");
const app = express();
const purchase = require("../controller/purchase");

// Add Purchase
app.post("/add", purchase.addPurchase);

// Get All Purchase Data
app.get("/all", purchase.getPurchaseData);

app.get("/getHalfProcessData", purchase.getHalfProcessData);

app.get("/getFullProcessData", purchase.getFullProcessData);

app.get("/getfinishProcessData", purchase.getfinishProcessData);

app.get("/get/:userID/totalpurchaseamount", purchase.getTotalPurchaseAmount);

module.exports = app;

// http://localhost:4000/api/purchase/add POST
// http://localhost:4000/api/purchase/get GET
