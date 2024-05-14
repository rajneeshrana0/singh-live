const mongoose = require("mongoose");
const uri = "mongodb://127.0.0.1/test";
function main() {
    mongoose.connect(uri).then(() => {
        console.log("Successful connection to MongoDB");
    }).catch((err) => {
        console.error("Error connecting to MongoDB:", err);
    });
}

module.exports = { main };
