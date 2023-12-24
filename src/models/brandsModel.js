const mongoose = require("mongoose");

const dataSchema = new mongoose.Schema({
    brandName: {
        type: String,
        required: true,
        unique: true
    },
    brandImg: {
        type: String,
        required: true,
        unique: true
    }
}, { timestamps: true, versionKey: false });

const brandsModel = mongoose.model("brands", dataSchema);

module.exports = brandsModel;

