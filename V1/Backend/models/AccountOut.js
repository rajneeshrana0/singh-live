const mongoose = require("mongoose");

const AccountOutSchema = new mongoose.Schema(
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
    lotNumber: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Account = mongoose.model("account", AccountOutSchema);
module.exports = Account;
