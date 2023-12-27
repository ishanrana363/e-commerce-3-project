const categoriesModel = require("../models/categoriesModel")
const brandsModel = require("../models/brandsModel")
const productslidersModel = require("../models/productslidersModel");
const productsModel = require("../models/productsModel")
const reviewModel = require("../models/reviewModel")

const  mongoose  = require("mongoose");
const {mongo} = require("mongoose");

// productCategoryListService start

const productCategoryListService = async (req) =>{
    try{
        let data = await categoriesModel.find();
        return {
            status : "success",
            data : data
        }
    }catch(e){
        return {
            status : "fail",
            data : e.toString()
        }
    }
}

// productCategoryListService end

// productBrandListService start

const productBrandListService = async (req) =>{
    try{
        let data = await brandsModel.find();
        return{
            status : " Success",
            data : data
        }
    }catch(e){
        return {
            status : "fail",
            data : e.toString()
        }
    }
}

// productBrandListService end

// productSliderService start

const  productSliderService = async (req) =>{
    try{
        let data = await productslidersModel.find();
        return{
            status : "success",
            data : data
        }
    }catch(e){
        return{
            status : "fail",
            data : e.toString()
        }
    }
}

// productSliderService end

// productByCategoryListService start

const productByCategoryListService = async (req) =>{
    try{
        let CategoryID = new mongoose.Types.ObjectId(req.params.categoryID)
        let matchStage = {$match : {categoryID:CategoryID}};
        let joinWithCategoryId = {
            $lookup : {
                from : "categories", localField : "categoryID", foreignField : "_id" ,
                as : "category"
            }
        }
        let joinWithBrandID = {
            $lookup : {
                from : "brands" , localField : "brandID" , foreignField : "_id" ,
                as : "brand"
            }
        }
        let unwindBrand = {
            $unwind : "$brand"
        }
        let unwindCategory = {
            $unwind : "$category"
        }
        let projection = {
            $project : {
                "categoryID" : 0,
                "brandID" : 0,
                "brand._id" : 0,
                "category._id" : 0
            }
        }
        let data = await productsModel.aggregate([
            matchStage,
            joinWithBrandID,joinWithCategoryId,
            unwindBrand,unwindCategory,
            projection
        ])
        return{
            status : "success",
            data : data
        }
    }catch(e){
        return{
            status : "fail",
            data : e.toString()
        }
    }
}
// productByCategoryListService end

// productBrandListService start

const productByBrandListService = async (req) =>{
    try{
        let BrandID = new mongoose.Types.ObjectId(req.params.brandID);
        let matchStage = {
            $match : {
                brandID : BrandID
            }
        };

         // join brand Id

        let joinWithBrandID = {
            $lookup : {
                from : "categories", localField:"categoryID",foreignField:"_id",
                as:"brand"
            }
        }

        // join category id

        let joinWithCategoryId = {
            $lookup : {
                from : "categories" , localField : "categoryID" ,foreignField : "_id" , 
                as : "category"
            }
        }

        // unwind category
        let unwindCategory = {
            $unwind : "$category"
        }

        // unwind brand
        let unwindBrand = {
            $unwind : "$brand"
        }

        // using project operator for unnessary data remaove
        let projection = {
            $project : {
                "categoryID" : 0,
                "brandID" : 0,
                "brand._id" : 0,
                "category._id" : 0,

            }
        }


        // find Brand Data 
        let data = await productsModel.aggregate([
            matchStage,
            joinWithBrandID,joinWithCategoryId,
            unwindBrand,unwindCategory,
            projection
        ]);
        return{
            status : "success",
            data : data
        }
    }catch{
        return{
            status : "fail",
            data : e.toString()
        }
    }
}

// productBrandListService end

// product remark service start

const productRemarkListService = async (req) =>{
    try{

        // get remark from req.params

        let remark = req.params.remark;

        // match remark & req.remark
        let matchStage = {
            $match : {
                remark : remark
            }
        };

        // join brandID 

        let joinWithBrandID = {
            $lookup : {
                from : "brands", localField:"brandID",foreignField:"_id",as:"brand"
            }
        }

        // join categoryID

        let joinWithCategoryId = {
            $lookup : {
                from:"categories",localField:"categoryID",foreignField:"_id",as:"category"
            }
        }

        // unwind brand data
        let unwindBrand = {
            $unwind : "$brand"
        }

        // unwind category data
        let unwindCategory = {
            $unwind : "$category"
        }

        // using project operator for unnessary data remaove
        let projection = {
            $project : {
                "categoryID" : 0,
                "brandID" : 0,
                "brand._id" : 0,
                "category._id" : 0

            }
        }

        // find remark data from productModel mongodb aggregate
        let data = await productsModel.aggregate([
            matchStage,
            joinWithBrandID, joinWithCategoryId,
            unwindBrand,unwindCategory,
            projection
        ])

        return{
            status : "success",
            data : data
        }

    }catch(e){
        return{
            status : "fail",
            data : e.toString()
        }
    }
}

// product remark service start

// productBySimilerListService start

const productBySimilerListService = async (req) => {
    try {
        // get category id from req.params
        let categoryId = new mongoose.Types.ObjectId(req.params.categoryID);

        // match categoryID & categoryId
        let matchStage = {
            $match: {
                categoryID: categoryId
            }
        };

        // limit operator used for showing a limited number of data
        let limitStage = {
            $limit: 20
        };

        // join with brand id
        let joinWithBrandID = {
            $lookup: {
                from: "brands",
                localField: "brandID",
                foreignField: "_id",
                as: "brand"
            }
        };

        // join with category id
        let joinWithCategoryId = {
            $lookup: {
                from: "categories",
                localField: "categoryID",
                foreignField: "_id",
                as: "category"
            }
        };

        // unwind category data 
        let unwindCategory = {
            $unwind : "$brand"
        }

        // unwind brand data 
        let unwindBrand = {
            $unwind : "$category"
        }

        // using project operato for removing unnessary data
        let projection = {
            $project : {
                "categoryID" : 0,
                "brandID" : 0,
                "brand._id" : 0,
                "category._id" : 0
            }
        }

        // find similar data from productsModel using MongoDB aggregate
        let data = await productsModel.aggregate([
            matchStage,
            limitStage,
            joinWithBrandID,
            joinWithCategoryId,
            projection,
            unwindBrand,
            unwindCategory
        ]);

        return {
            status: "success",
            data: data
        };
    } catch (e) {
        return {
            status: "fail",
            data: e.toString()
        };
    }
};

// productBySimilerListService end


const productByKeyWordService = async () =>{
    

}

// productDetailsService start

const productDetailsService = async (req) =>{
    try{
        // get productID from req.params
        let productId = new mongoose.Types.ObjectId(req.params.productID);

        // match productId && productID using matchStage operator
        let matchStage = {
            $match : {
                _id : productId
            }
        }

        // join brand id
        let joinWithBrandID = {
            $lookup : {
                from:"brands",
                localField:"brandID",
                foreignField:"_id",
                as:"brand"
            }
        }

        // join category id

        let joinWithCategoryId = {
            $lookup : {
                from:"categories",
                localField:"categoryID",
                foreignField:"_id",
                as:"category"
            }
        }

        // join product id
        let joinWithProductID = {
            $lookup : {
                from:"productdetails",
                localField:"_id",
                foreignField:"productID",
                as:"product"
            }
        }

        // find productdetails form productsModel using mongodb 
        let data = await productsModel.aggregate([
            matchStage,
            joinWithBrandID,joinWithCategoryId,joinWithProductID
        ])
        console.log(data)

        return {
            status: "success",
            data: data
        };

    }catch(e){
        return {
            status: "fail",
            data: e.toString()
        };
    }
}

// product by keyword

const ListByKeywordService = async (req) => {
    try{
        let SearchRegex={"$regex":req.params.keyword, "$options":"i"}
        let SearchParams=[{title:SearchRegex},{shortDes:SearchRegex}]
        let SearchQuery={$or:SearchParams}

        let MatchStage={$match:SearchQuery}

        let JoinWithBrandStage= {$lookup:{from:"brands",localField:"brandID",foreignField:"_id",as:"brand"}};
        let JoinWithCategoryStage={$lookup:{from:"categories",localField:"categoryID",foreignField:"_id",as:"category"}};
        let UnwindBrandStage={$unwind:"$brand"}
        let UnwindCategoryStage={$unwind:"$category"}
        let ProjectionStage={$project:{'brand._id':0,'category._id':0,'categoryID':0,'brandID':0}}

        let data= await  productsModel.aggregate([
            MatchStage, JoinWithBrandStage,JoinWithCategoryStage,
            UnwindBrandStage,UnwindCategoryStage,ProjectionStage
        ])
        return {status:"success",data:data}
    }catch (e) {
        return {status:"fail",data:e}.toString()
    }

}



const productReviewListService = async (req) =>{
    try {
        let productId = new mongoose.Types.ObjectId(req.params.productID);
        let matchStage = { $match : { productID : productId } }
        let joinWithUserId = {
            $lookup : {
                from:"profiles",localField:"userID",foreignField:"userID",as:"user"
            }
        }
        let data = await reviewModel.aggregate([
            matchStage,joinWithUserId
        ])
        console.log(data)
        return {
            status : "success",
            data : data
        }
    }catch (e) {

    }
}

module.exports = {
    productCategoryListService,
    productBrandListService,
    productSliderService,
    productByCategoryListService,
    productByBrandListService,
    productBySimilerListService,
    productByKeyWordService,
    productDetailsService,
    productRemarkListService,
    productReviewListService,
    ListByKeywordService
}