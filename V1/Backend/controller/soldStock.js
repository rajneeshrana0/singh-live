const Account = require("../models/AccountOut");


const soldStock = async (req,res) => {
 try {
   const {
     selectedOption,
     challanNumber,
     quantity,
     kg,
     meter,
     roll,
     lotNumber,
   } = req.body;

   if (typeof challanNumber === "undefined") {
     return res
       .status(400)
       .send("Challan number is missing in the request body");
   }

   const userId = req.user.userId;
   console.log(challanNumber);

   const newAccountOut = new Account({
     userID: userId,
     selectedOption: selectedOption,
     challanNumber: challanNumber,
     quantity: quantity,
     kg: kg,
     meter: meter,
     roll: roll,
     lotNumber: lotNumber,
   });

   const result = await newAccountOut.save();
   console.log("Grey saved:", result);
   res.status(200).send(result);
 } catch (err) {
   console.error("Error saving Grey:", err);
   res.status(500).send("Error saving Grey");
 }
};

const getAllStores = async (req, res) => {
  try {
    const findAllAccount = await Account.find();
    res.json(findAllAccount);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};

module.exports = { soldStock, getAllStores };
