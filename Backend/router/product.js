const express = require("express");
const app = express();
const product = require("../controller/product");

// Add Product
app.post("/add", product.addProduct);

// Get All Products
app.get("/all", product.getAllProducts);

// Delete Selected Product Item
app.delete("/delete/:id", product.deleteSelectedProduct);

// Update Selected Product
app.put("/update/:id", product.updateProduct);

// Search Product
app.get("/search", product.searchProduct);

// http://localhost:4000/api/product/search?searchTerm=fa

module.exports = app;
