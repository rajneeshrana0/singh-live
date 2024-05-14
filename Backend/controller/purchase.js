const Purchase = require("../models/purchase");
const purchaseStock = require("./purchaseStock");

// Add Purchase Details
const addPurchase = async (req, res) => {
  try {
    const {
      selectedOption,
      challanNumber,
      quantity,
      shade,
      kg,
      meter,
      roll,
      processTypes,
    } = req.body;

    if (typeof challanNumber === "undefined") {
      return res
        .status(400)
        .send("Challan number is missing in the request body");
    }

    const userId = req.user.userId;
    console.log(challanNumber);

    // Generate lot number
    const currentDate = new Date();
    const monthAbbreviation = currentDate
      .toLocaleString("default", { month: "short" })
      .toUpperCase();
    const existingPurchases = await Purchase.find({
      createdAt: {
        $gte: new Date(currentDate.getFullYear(), currentDate.getMonth(), 1),
      },
    }).countDocuments();
    const serialNumber = existingPurchases + 1;
    const lotNumber = `${monthAbbreviation}${serialNumber}`;

    const newPurchase = new Purchase({
      userID: userId,
      selectedOption: selectedOption,
      challanNumber: challanNumber,
      quantity: quantity,
      shade: shade,
      kg: kg,
      meter: meter,
      roll: roll,
      processTypes: processTypes,
      lotNumber: lotNumber,
      status: "pending",
    });

    const result = await newPurchase.save();
    console.log("Grey saved:", result);
    res.status(200).send(result);
  } catch (err) {
    console.error("Error saving Grey:", err);
    res.status(500).send("Error saving Grey");
  }
};




// Get All Purchase Data
const getPurchaseData = async (req, res) => {
 try {
   const findAllPurchaseData = await Purchase.find();
   res.json(findAllPurchaseData);
 } catch (error) {
   console.error(error);
   res.status(500).json({ message: "Server Error" });
 }
};

const getHalfProcessData = async (req, res) => {
  try {
    const halfProcessData = await Purchase.find({ processTypes: "half" });
    res.json(halfProcessData);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};

const getFullProcessData = async (req, res) => {
  try {
    const fullProcessData = await Purchase.find({ processTypes: "full" });
    res.json(fullProcessData);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};

const getfinishProcessData = async (req, res) => {
  try {
    const finishProcessData = await Purchase.find({ processTypes: "finish" });
    res.json(finishProcessData);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};


// Get total purchase amount
const getTotalPurchaseAmount = async (req, res) => {
  let totalPurchaseAmount = 0;
  const purchaseData = await Purchase.find({"userID": req.params.userID});
  purchaseData.forEach((purchase) => {
    totalPurchaseAmount += purchase.TotalPurchaseAmount;
  });
  res.json({ totalPurchaseAmount });
};

module.exports = {
  addPurchase,
  getPurchaseData,
  getTotalPurchaseAmount,
  getHalfProcessData,
  getFullProcessData,
  getfinishProcessData,
};
