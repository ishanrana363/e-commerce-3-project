const SendEmailUtility = require("../utility/emailHelper")
const usersModel = require("../models/usersModel")
const {EncodeToken} = require("../utility/tokenHelper");
const profileModel = require("../models/profilesModel")
const userOtpService = async (req) => {
    try {
        let email = req.params.email;
        let code = Math.floor(100000 + Math.random() * 900000);
        let emailText = `Your verification code is: ${code}`;
        let emailSub = "Your verification";
        await SendEmailUtility(email, emailText, emailSub);
        await usersModel.updateOne( {email:email}, { $set : { otp:code}}, { upsert:true } )
        return {
            status: "success",
            message: "6-digit OTP has been sent",
        };
    } catch (e) {
        return {
            status: "fail",
            message: e.toString(),
        };
    }
};


const userOtpVerifyService = async (req) =>{
    try{
        let email = req.params.email;
        let otp = req.params.otp
        let total = await usersModel.find({email:email,otp:otp}).count("total");
        if(total==1){
            const user_id = await usersModel.find({email:email,otp:otp}).select("_id");
            let token = EncodeToken(email,user_id[0]["_id"].toString());
            await usersModel.updateOne({email:email},{$set:{otp:0}});
            return{
                status: "success",
                token : token
            }
        }else{
            return{
                status: "success",
                message : "Invalid token"
            }
        }
    }catch(e){
        return {
            status: "fail",
            message: e.toString(),
        };
    }
}


const createProfileService = async (req) =>{
    try {
        let user_id = req.headers.user_id;
        let reqBody = req.body;
        reqBody.userID = user_id;
        let data = await profileModel.updateOne({userID:user_id},{$set:reqBody},{upsert:true})
        return {
            status : "success",
            data : data
        }
    }catch (e) {
        return {status:"fail", data : e.toString()}
    }
}

const updateProfileService = async (req) =>{
    try {
        let user_id = req.headers.user_id;
        let reqBody = req.body;
        reqBody.userID = user_id;
        let data = await profileModel.updateOne({userID:user_id},{$set:reqBody},{upsert:true})
        return {
            status : "success",
            data : data
        }
    }catch (e) {
        return {status:"fail", data : e.toString()}
    }
}
const ProfileReadService = async () =>{
    
}


module.exports = {
    userOtpService,
    userOtpVerifyService,
    createProfileService,
    updateProfileService,
    ProfileReadService
}