const SendEmailUtility = require("../utility/emailHelper")
const usersModel = require("../models/usersModel")
const {EncodeToken} = require("../utility/tokenHelper");
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
            let token = EncodeToken(email,user_id[0],["_id"].toString());
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

const userLogoutService = async () =>{
    
}

const createProfileService = async () =>{
    
}

const updateProfileService = async () =>{
    
}
const ProfileReadService = async () =>{
    
}


module.exports = {
    userOtpService,
    userOtpVerifyService,
    userLogoutService,
    createProfileService,
    updateProfileService,
    ProfileReadService
}