const mongoose  = require("mongoose");

const dataSchema = new mongoose.Schema({
    img1 : {
        type : String,
        required : true
    },
    img2 : {
        type : String,
        required : true
    },
    img3 : {
        type : String,
        required : true
    },
    img4 : {
        type : String,
        required : true
    },
    img5 : {
        type : String,
        required : true
    },
    img6 : {
        type : String,
        required : true
    },
    img7 : {
        type : String,
    },
    img8 : {
        type : String,
    },
    des : {
        type : String,
        requird : true
    },
    color : {
        type : String,
        requird : true
    },
    size : {
        type : String,
        required : true
    }
},{timestamps:true,versionKey:false});

const productdetailsModel = mongoose.model("productdetails",dataSchema);

module.exports = productdetailsModel;