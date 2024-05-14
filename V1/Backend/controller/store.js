const Store = require("../models/store");

// Add Store
const addStore = async (req, res) => {
   try {
     const {
       selectedOption,
       challanNumber,
       quantity,
       kg,
       meter,
       roll,
       karigar,
       lotNumber,
     } = req.body;

     if (typeof challanNumber === "undefined") {
       return res
         .status(400)
         .send("Challan number is missing in the request body");
     }

     const userId = req.user.userId;
     console.log(challanNumber);

     const newStore = new Store({
       userID: userId,
       selectedOption: selectedOption,
       challanNumber: challanNumber,
       quantity: quantity,
       kg: kg,
       meter: meter,
       roll: roll,
       karigar: karigar,
       lotNumber: lotNumber,
     });

     const result = await newStore.save();
     console.log("Grey saved:", result);
     res.status(200).send(result);
   } catch (err) {
     console.error("Error saving Grey:", err);
     res.status(500).send("Error saving Grey");
   }
};

// Get All Stores
const getAllStores = async (req, res) => {
  try {
    const findAllStores = await Store.find();
    res.json(findAllStores);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};

module.exports = { addStore, getAllStores };
