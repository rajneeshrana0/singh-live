const mongoose = require('mongoose');

const qualitySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: String
}, { timestamps: true });

const Quality = mongoose.model('Quality', qualitySchema);

module.exports = Quality;
