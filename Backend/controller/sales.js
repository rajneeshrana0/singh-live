const Sales = require("../models/sales");
const soldStock = require("../controller/soldStock");
const Purchase = require("../models/purchase");

// Add Sales
const addSales = async (req, res) => {
  try {
    const { lotNumber, status } = req.body;
    const userId = req.user.userId;

    const purchaseData = await Purchase.findOne({ lotNumber });
    console.log(purchaseData);

    if (!purchaseData) {
      return res
        .status(404)
        .json({ message: "Purchase data not found for the given lot number" });
    }

    const currentDate = new Date();

    const newSales = new Sales({
      userID: userId,
      lotNumber: lotNumber,
      selectedOption: purchaseData.selectedOption,
      challanNumber: purchaseData.challanNumber,
      quantity: purchaseData.quantity,
      kg: purchaseData.kg,
      meter: purchaseData.meter,
      roll: purchaseData.roll,
      processTypes: purchaseData.processTypes,
      completionDate: currentDate,
      status : status
    });

    const savedSales = await newSales.save();

  
   const updateResult = await Purchase.findOneAndUpdate(
     { lotNumber: lotNumber },
     { $set: { status: "completed" } }
   );

   console.log("Update Result:", updateResult);

    res.status(201).json(savedSales);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};




const getSubmittedData = async (req, res) => {
  try {
    const allSubmittedData = await Sales.find();


    const halfProcessedData = allSubmittedData.filter((data) =>
      data.processTypes.includes("half")
    );

    res.status(200).json(halfProcessedData);
  } catch (error) {
    console.error("Error fetching submitted data:", error);
    res.status(500).json({ message: "Server Error" });
  }
};

const getSubmittedDataAAll = async (req, res) => {
  try {
    const allSubmittedData = await Sales.find();

    const rejectedData = allSubmittedData.filter((data) => 
      data.status === "rejected"
  )

    res.status(200).json(rejectedData);
  } catch (error) {
    console.error("Error fetching submitted data:", error);
    res.status(500).json({ message: "Server Error" });
  }
};


const getSubmittedDataFullProcess = async (req, res) => {
  try {
    const allSubmittedData = await Sales.find();

 
    const halfProcessedData = allSubmittedData.filter((data) =>
      data.processTypes.includes("full") &&  data.status === "completed"
    );

    res.status(200).json(halfProcessedData);
  } catch (error) {
    console.error("Error fetching submitted data:", error);
    res.status(500).json({ message: "Server Error" });
  }
};

const getRejectSubmittedDataFullProcess = async (req, res) => {
  try {
    const allSubmittedData = await Sales.find();

 
    const halfProcessedData = allSubmittedData.filter((data) =>
      data.processTypes.includes("full") &&  data.status === "rejected"
    );

    res.status(200).json(halfProcessedData);
  } catch (error) {
    console.error("Error fetching submitted data:", error);
    res.status(500).json({ message: "Server Error" });
  }
};

const getSubmittedDataFinishProcess = async (req, res) => {
  try {
    const allSubmittedData = await Sales.find();

 
    const halfProcessedData = allSubmittedData.filter((data) =>
      data.processTypes.includes("finish") &&  data.status === "completed"
    );

    res.status(200).json(halfProcessedData);
  } catch (error) {
    console.error("Error fetching submitted data:", error);
    res.status(500).json({ message: "Server Error" });
  }
};

const getRejectSubmittedDataFinishProcess = async (req, res) => {
  try {
    const allSubmittedData = await Sales.find();

 
    const halfProcessedData = allSubmittedData.filter((data) =>
      data.processTypes.includes("finish") &&  data.status === "rejected"
    );

    res.status(200).json(halfProcessedData);
  } catch (error) {
    console.error("Error fetching submitted data:", error);
    res.status(500).json({ message: "Server Error" });
  }
};




module.exports = {
  addSales,
  getSubmittedData,
  getSubmittedDataFullProcess,
  getSubmittedDataFinishProcess,
  getRejectSubmittedDataFullProcess,
  getRejectSubmittedDataFinishProcess,
  getSubmittedDataAAll
};
