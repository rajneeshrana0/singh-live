const mongoose = require("mongoose");

const PurchaseSchema = new mongoose.Schema(
  {
    userID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
      required: true,
    },
    selectedOption: {
      type: String,
      required: true,
    },
    challanNumber: {
      type: String,
      required: true,
    },
    quantity: {
      type: String,
      required: true,
    },
    kg: {
      type: Number,
      required: true,
    },
    meter: {
      type: Number,
      required: true,
    },
    roll: {
      type: Number,
      required: true,
    },
    processTypes: {
      type: [String],
      required: true,
    },
    lotNumber: {
      type: String,
      required: true,
    },
    status : {
      type : String,
      default : "pending"
    }
  },
  { timestamps: true }
);


const Purchase = mongoose.model("Purchase", PurchaseSchema);
module.exports = Purchase;
