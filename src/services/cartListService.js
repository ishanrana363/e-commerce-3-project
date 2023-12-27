const mongoose = require("mongoose");

const cartsModel  = require("../models/cartsModel")
const cartListService = async (req) => {
    try {

        let user_id=new mongoose.Types.ObjectId(req.headers.user_id);
        let matchStage={$match:{userID:user_id}}

        let JoinStageProduct={$lookup:{from:"products",localField:"productID",foreignField:"_id",as:"product"}}
        let unwindProductStage={$unwind:"$product"};


        let JoinStageBrand={$lookup:{from:"brands",localField:"product.brandID",foreignField:"_id",as:"brand"}}
        let unwindBrandStage={$unwind:"$brand"};


        let JoinStageCategory={$lookup:{from:"categories",localField:"product.categoryID",foreignField:"_id",as:"category"}}
        let unwindCategoryStage={$unwind:"$category"};


        let projectionStage={$project:{
                '_id':0,'userID':0,'createAt':0,'updatedAt':0, 'product._id':0,
                'product.categoryID':0,'product.brandID':0,
                'brand._id':0,'category._id':0,
            }
        }

        let data=await cartsModel.aggregate([
            matchStage,
            JoinStageProduct,
            unwindProductStage,
            JoinStageBrand,
            unwindBrandStage,
            JoinStageCategory,
            unwindCategoryStage,
            projectionStage

        ])

        return {status:"success",data:data}

    }catch (e) {
        return {status:"fail",message:"Something Went Wrong !"}
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
const updateCartListService = async (req) => {
    try {
        let user_id = req.headers.user_id;
        let cartID = req.params.cartID;
        let reqBody = req.body;
        let data = await cartsModel.updateOne(
            {_id:cartID , userID: user_id },{$set:reqBody});
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

module.exports = {
    cartListService,
    creatCartListService,
    removeCartListService,
    updateCartListService
}

































