const SendEmailUtility = require("../utility/emailHelper")
const usersModel = require("../models/usersModel")
const userOtpService = async (req) => {
    try {
        let email = req.params.email;
        let code = Math.floor(100000 + Math.random() * 900000);
        let emailText = `Your verification code is: ${code}`;
        let emailSub = "Your verification";

        // Wait for the email to be sent before proceeding
        await SendEmailUtility(email, emailText, emailSub);

        // Wait for the database update to complete before returning the response
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


const userOtpVerifyService = async () =>{
    
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