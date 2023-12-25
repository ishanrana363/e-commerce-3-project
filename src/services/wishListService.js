
const wishesModel = require("../models/wishesModel")
const mongoose = require("mongoose");
const wishListService = async (req) =>{
    try {
        let user_id = new mongoose.Types.ObjectId(req.headers.user_id);
        let matchStage = { $match : { userID : user_id } };

        // join productID
        let joinWithProductID = {
            $lookup : {
                from:"products", localField:"productID",foreignField:"_id",as:"product"
            }
        }

        // unwind product
        let unwindProduct = { $unwind : "$product" }

        // join BrandID
        let joinWithBrandID = {
            $lookup: {
                from: "brands", localField: "product.brandID", foreignField: "_id" , as: "brand"
            }
        }

        // unwind brand
        let unwindBrand = { $unwind: "$brand" }

        // join CategoryID
        let joinWithCategoryID = {
            $lookup: {
                from: "categories", localField: "product.categoryID", foreignField: "_id" , as: "category"
            }
        }

        // unwind category
        let unwindCategory = { $unwind : "$category" }

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

        let data = await wishesModel.aggregate([
            matchStage,
            joinWithProductID, joinWithBrandID, joinWithCategoryID,
            unwindProduct,unwindBrand,unwindCategory,projection
        ])
        return{
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
const wishListSaveService = async (req) =>{
    try {
        let user_id = req.headers.user_id;
        let reqBody = req.body;
        reqBody.userID = user_id;
        let data = await wishesModel.updateOne(reqBody ,
            {$set:reqBody},{upsert:true})
        return{
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

const removeWishListService = async (req) => {
    try {
        let user_id = req.headers.user_id;
        let reqBody = req.body;
        reqBody.userID = user_id;
        let data = await wishesModel.deleteOne(reqBody);
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

module.exports = {
    wishListService,
    wishListSaveService,
    removeWishListService
}