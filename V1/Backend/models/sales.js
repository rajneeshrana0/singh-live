  const mongoose = require("mongoose");

  const SaleSchema = new mongoose.Schema(
    {
      userID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
        required: true,
      },
      lotNumber: {
        type: String,
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
      completionDate: {
        type: Date,
        default: Date.now,
      },
      status: {
        type: String,
      },
    },
    { timestamps: true }
  );

  const Sales = mongoose.model("sales", SaleSchema);
  module.exports = Sales;
