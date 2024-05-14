const mongoose = require("mongoose");

const StoreSchema = new mongoose.Schema(
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
    karigar: {
      type: String,
      required: true,
    },
    lotNumber: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Store = mongoose.model("store", StoreSchema);
module.exports = Store;
