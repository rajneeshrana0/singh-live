const express = require("express");
const app = express();
const Account = require("../controller/soldStock");


app.post("/add", Account.soldStock);

app.get("/all", Account.getAllStores);

module.exports = app;
