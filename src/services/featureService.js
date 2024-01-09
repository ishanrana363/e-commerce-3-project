const featuresModel = require("../models/featuresModel")

const featureListService = async () =>{
    try {
        let data = await featuresModel.find();
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
    featureListService
}























