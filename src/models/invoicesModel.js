const  mongoose  = require("mongoose");

const dataSchema = new mongoose.Schema({
    userID : {
        type : mongoose.Schema.Types,
        requird : true
    },
    payable : {
        type : String,
        requird : true
    },
    cus_details : {
        type : String,
        requird : true
    },
    ship_details : {
        type : String,
        requird : true
    },
    tran_id : {
        type : String,
        requird : true
    },
    val_id : {
        type : String,
        requird : true
    },
    delivery_status : {
        type : String,
        requird : true
    },
    payment_status : {
        type : String,
        requird : true
    },
    total : {
        type : String,
        requird : true
    },
    vat : {
        type : String,
        requird : true
    }
},{timestamps:true,versionKey:false});

const invoicesModel  = mongoose.model("invoices",dataSchema);

module.exports = invoicesModel;