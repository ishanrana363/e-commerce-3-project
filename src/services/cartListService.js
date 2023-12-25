const mongoose = require("mongoose");

const cartsModel  = require("../models/cartsModel")
const cartListService = async (req) => {
    try{
        let user_id = new mongoose.Types.ObjectId(req.headers.user_id);
        let matchStage = { $match : { userID : user_id } };

        //join with productID
        let joinWithProductID = {
            $lookup : {
                from : 'products', localField:"productID",foreignField:"_id",as:"product"
            }
        }
        // unwind product
        const unwindProduct = {
            $unwind : "$product"
        }
        // join with categoryID
        let joinWithCategory = {
            $lookup : {
                from : 'categories', localField:"product.categoryID",foreignField:"_id",as:"category"
            }
        }
        // unwind category
        let unwindCategory = {
            $unwind: "$category"
        }

        // join with brandID
        let joinWithBrandID = {
            $lookup : {
                from : 'brands', localField:"product.brandID",foreignField:"_id",as:"brand"
            }
        }
        // unwind brand
        const unwindBrand = { $unwind : "$brand" }
        //using project operator for removing unnecessary data wishesModel
        let projection = {
            $project : {
                "_id" : 0,
                "userID" : 0,
                "createdAt" : 0,
                "updatedAt" : 0,
                "product._id" : 0,
                "product.createdAt" : 0,
                "product.updatedAt" : 0,
                "brand._id" : 0,
                "brand.createdAt" : 0,
                "brand.updatedAt" : 0,
                "category._id" : 0,
                "category.createdAt" : 0,
                "category.updatedAt" : 0

            }
        }
        const data = await cartsModel.aggregate([
            matchStage,
            joinWithProductID,joinWithCategory,joinWithBrandID,
            unwindProduct,unwindCategory,unwindBrand,
            projection
        ])
        return {
            status : "success",
            data : data
        }
    }catch (e) {
        return {
            status : "fail",
            data : e.toString()
        }
    }

}

const creatCartListService = async (req) => {
    try {
        let user_id = req.headers.user_id;
        let reqBody = req.body;
        reqBody.userID = user_id;
        await cartsModel.create(reqBody);
        return{
            status : "success",
            data : " cart create successfully "
        }
    }catch (e) {
        return {
            status : "fail",
            data : e.toString()
        }
    }
}

const removeCartListService = async (req) => {
    try {
        let user_id = req.headers.user_id;
        let reqBody = req.body;
        reqBody.userID = user_id;
        let data = await cartsModel.deleteOne(reqBody);
        console.log(data)
        return{
            status:"success",
            data : data
        }
    }catch (e) {
        return {
            status : "fail",
            data : e.toString()
        }
    }
}


module.exports = {
    cartListService,
    creatCartListService,
    removeCartListService
}

































