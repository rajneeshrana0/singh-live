const Product = require("../models/Product");
const Purchase = require("../models/purchase");
const Sales = require("../models/sales");

const addProduct = (req, res) => {
  const { selectedOption, challanNumber, quantity, kg,meter, roll } = req.body;
  const userId = req.user.userId;
  console.log(userId);

  // Create a new product document
  const newProduct = new Product({
    userID: userId,
    selectedOption: selectedOption,
    challanNumber: challanNumber,
    quantity: quantity,
    kg: kg,
    meter: meter,
    roll: roll,
  });

  // Save the product document to the database
  newProduct
    .save()
    .then((result) => {
      console.log("Product saved:", result);
      res.status(200).send(result);
    })
    .catch((err) => {
      console.error("Error saving product:", err);
      res.status(500).send("Error saving product");
    });
};



// Get All Products

const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
}
};


// Delete Selected Product
const deleteSelectedProduct = async (req, res) => {
  const deleteProduct = await Product.deleteOne(
    { _id: req.params.id }
  );
  const deletePurchaseProduct = await Purchase.deleteOne(
    { ProductID: req.params.id }
  );

  const deleteSaleProduct = await Sales.deleteOne(
    { ProductID: req.params.id }
  );
  res.json({ deleteProduct, deletePurchaseProduct, deleteSaleProduct });
};

// Update Controller
const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const selectedOption = req.body; // Assuming selectedOption contains all fields to update
    const updatedProduct = await Product.findByIdAndUpdate(id, selectedOption, { new: true });

    if (!updatedProduct) {
      return res.status(404).json({ success: false, error: 'Product not found' });
    }

    res.json({ success: true, product: updatedProduct });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};



// Search Products
const searchProduct = async (req, res) => {
  const searchTerm = req.query.searchTerm;
  const products = await Product.find({
    name: { $regex: searchTerm, $options: "i" },
  });
  res.json(products);
};

module.exports = {
  addProduct,
  getAllProducts,
  deleteSelectedProduct,
  updateProduct,
  searchProduct,
};