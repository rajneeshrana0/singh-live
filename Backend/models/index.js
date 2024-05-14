const mongoose = require("mongoose");
require('dotenv').config();
const uri = process.env.MONGODB_URI;

function main() {
    mongoose.connect(uri).then(() => {
        console.log("Successful connection to MongoDB");
    }).catch((err) => {
        console.error("Error connecting to MongoDB:", err);
    });
}

module.exports = { main };
