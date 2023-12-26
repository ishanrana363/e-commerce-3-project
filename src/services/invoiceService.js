const mongoose = require("mongoose");
const cartsModel = require("../models/cartsModel")
const profilesModel = require("../models/profilesModel")
const invoicesModel = require("../models/invoicesModel");
const invoiceproductsModel =require("../models/invoiceproductsModel")
const createInvoiceService = async (req) => {


    // ========================= step-1 Calculate total payable & vat====================

   let user_id = new mongoose.Types.ObjectId(req.headers.user_id)
    let cus_email =  req.headers.email;
    let matchStage = { $match : { userID : user_id } }
    let joinWithProductID = {
        $lookup : {
            from : "products" , localField : "productID" , foreignField : "_id" , as : "product"
        }
    }

    let unwindProduct = { $unwind :"$product" }

    let cartProducts = await cartsModel.aggregate([
        matchStage, joinWithProductID,unwindProduct
    ])

    let totalAmount = 0;
    cartProducts.forEach(element => {
        let price;
        if (element['product']['discount']) {
            price = parseFloat(element['product']['discountPrice']);
        } else {
            price = parseFloat(element['product']['price']);
        }
        totalAmount += parseFloat(element['qty']) * price;
    });


    let vat = totalAmount * 0.05; // 5% VAT
    let payable = totalAmount + vat; // Total amount including VAT


    // step prepare customer details

    let profile = await profilesModel.aggregate([{$match : { userID : user_id }}])
    let cus_details= `Name : ${ profile[0].cus_name }, Email : ${cus_email} , Address : ${profile[0].cus_add}, 
    City : ${profile[0].cus_city},Country : ${profile[0].cus_country}, Number : ${profile[0].cus_fax}`;

    let ship_details= `Name : ${profile[0].ship_name }, Country : ${profile[0].cus_state } , Address : ${profile[0].ship_add}, 
    City : ${profile[0].ship_city},Country : ${profile[0].ship_country}, Number : ${profile[0].ship_phone}`;

    // Step 03: Transaction & Other's ID

    let tran_id = Math.floor(10000000+Math.random()*99999999);
    let val_id = 0;
    let delivery_status = "pending";
    let payment_status ="pending";


    // Step 04: Invoice crate

    let createInvoice = await invoicesModel.create({
        userID: user_id ,
        payable: payable ,
        cus_details: cus_details ,
        ship_details: ship_details ,
        tran_id: tran_id ,
        val_id: val_id ,
        delivery_status: delivery_status ,
        payment_status: payment_status ,
        total: totalAmount ,
        vat:vat,
    })


    // step 5     Invoice product create


    let invoice_id = createInvoice["_id"]


    cartProducts.forEach(async (element)=>{
        await invoiceproductsModel.create({
            userID : user_id,
            invoiceID : invoice_id,
            productID : element["productID"],
            qty : element["qty"],
            price : element["product"]["discount"] ? element["product"]["discountPrice"] :
                element["product"]["price"],
            color : element["color"],
            size : element["size"]
        })
    })





    return{
        status:"success",data: createInvoice
    }

}

const PaymentFailService = () => {
  
}


const PaymentCancelService = () => {
  
}


const PaymentIPNService = () => {
  
}

const PaymentSuccessService = () => {
  
}

const InvoiceListService = () => {
  
}



const InvoiceProductListService = () => {
  
}

module.exports = {
    createInvoiceService,
    PaymentFailService,
    PaymentCancelService,
    PaymentIPNService,
    PaymentSuccessService,
    InvoiceListService,
    InvoiceProductListService
}









































































