const mongoose = require("mongoose");
const cartsModel = require("../models/cartsModel")
const profilesModel = require("../models/profilesModel")
const invoicesModel = require("../models/invoicesModel");
const invoiceproductsModel =require("../models/invoiceproductsModel");
const paymentsettingModel = require("../models/paymentsettingModel")

const fromData = require("form-data");
const axios = require("axios");
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
    let delivery_charge = 120
    let payable = totalAmount + vat +delivery_charge ; // Total amount including VAT


    // step prepare customer details

    let profile = await profilesModel.aggregate([{$match : { userID : user_id }}])

    let cus_details = `Name: ${profile[0].cus_name},
        Email: ${cus_email},
        Address: ${profile[0].cus_add},
        City: ${profile[0].cus_city},
        Country: ${profile[0].cus_country},
        Number: ${profile[0].cus_fax}`;


    let ship_details= `Name : ${profile[0].ship_name }, Country : ${profile[0].cus_state } ,
     Address : ${profile[0].ship_add}, 
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
        delivery_charge:delivery_charge,
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


        //=========================== Step-6 remove carts====================================================

    await cartsModel.deleteMany({userID: user_id})

    //===================   step-7 prepared ssl payment

    let  PaymentSetting= await paymentsettingModel.find();

    const form = new fromData();

    form.append('store_id', PaymentSetting[0]['store_id']);
    form.append('store_passwd', PaymentSetting[0]['store_passwd']);
    form.append('total_amount', payable.toString());
    form.append('currency', PaymentSetting[0]['currency']);
    form.append('tran_id', tran_id);
    form.append('success_url', `${PaymentSetting[0]['success_url']}/${tran_id}`);
    form.append('fail_url', `${PaymentSetting[0]['fail_url']}/${tran_id}`);
    form.append('cancel_url', `${PaymentSetting[0]['cancel_url']}/${tran_id}`);
    form.append('ipn_url', `${PaymentSetting[0]['ipn_url']}/${tran_id}`);

    form.append('cus_name', profile[0].cus_name);
    form.append('cus_email', cus_email);
    form.append('cus_add1', profile[0].cus_add);
    form.append('cus_add2', profile[0].cus_add);
    form.append('cus_city', profile[0].cus_city);
    form.append('cus_state', profile[0].cus_state);
    form.append('cus_postcode', profile[0].cus_postcode);
    form.append('cus_country', profile[0].cus_country);
    form.append('cus_phone', profile[0].cus_phone);
    form.append('cus_fax', profile[0].cus_phone);

    form.append('shipping_method', 'YES');
    form.append('ship_name', profile[0].ship_name);
    form.append('ship_add1', profile[0].ship_add);
    form.append('ship_add2', profile[0].ship_add);
    form.append('ship_city', profile[0].ship_city);
    form.append('ship_state', profile[0].ship_state);
    form.append('ship_country', profile[0].ship_country);
    form.append('ship_postcode', profile[0].ship_postcode);
    form.append('product_name', 'product_name');
    form.append('product_category', 'category');
    form.append('product_profile', 'profile');
    form.append('product_amount', '3');
    let SSLRes = await axios.post(PaymentSetting[0]['init_url'], form);

    return {status:"success",data: SSLRes.data}
}



const PaymentFailService = async (req)=>{
    try{
        let trxID= req.params.trxID;
        await invoicesModel.updateOne({tran_id:trxID},{payment_status:"fail"})
        return {status:"payment fail"}
    }catch (e) {
        return {status:"fail", message:"Something Went Wrong"}
    }
}


const PaymentCancelService = async (req)=>{
    try{
        let trxID= req.params.trxID;
        await invoicesModel.updateOne({tran_id:trxID},{payment_status:"cancel"})
        return {status:"payment fail"}
    }catch (e) {
        return {status:"fail", message:"Something Went Wrong"}
    }
}

const PaymentIPNService = async (req)=>{
    try{
        let trxID= req.params.trxID;
        let status=req.body['status']
        await invoicesModel.updateOne({tran_id:trxID},{payment_status:status})
        return {status:"payment fail"}
    }catch (e) {
        return {status:"fail", message:"Something Went Wrong"}
    }
}
const PaymentSuccessService = async (req)=>{
    try{
        let trxID= req.params.trxID;
        await invoicesModel.updateOne({tran_id:trxID},{payment_status:"success"})
        return {status:"payment success"}
    }catch (e) {
        return {status:"fail", message:"Something Went Wrong"}
    }
}

const invoiceListService = async (req) => {
   try {
       let user_id = req.headers.user_id;
       let data = await invoicesModel.find({userID : user_id })
       return{
           status:"success", data : data
       }
   } catch (e) {
       return {status:"fail", message:"Something Went Wrong"}
   }
}

const invoiceProductListService = async (req) => {
    try{

        let user_id=new mongoose.Types.ObjectId(req.headers.user_id);
        let invoice_id=new mongoose.Types.ObjectId(req.params.invoiceID);

        let matchStage={$match:{userID:user_id,invoiceID:invoice_id}}
        let JoinStageProduct={$lookup:{from:"products",localField:"productID",foreignField:"_id",as:"product"}}
        // let unwindStage={$unwind:"$product"}

        let products=await invoiceproductsModel.aggregate([
            matchStage,
            JoinStageProduct,
            // unwindStage
        ])


        return {status:"success",data: products}
    }catch (e) {
        return {status:"fail", message:"Something Went Wrong"}
    }
};




module.exports = {
    createInvoiceService,
    PaymentFailService,
    PaymentCancelService,
    PaymentIPNService,
    PaymentSuccessService,
    invoiceListService,
    invoiceProductListService

}

