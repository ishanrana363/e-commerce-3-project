const {
    userOtpService,
    userOtpVerifyService,
    userLogoutService,
    createProfileService,
    updateProfileService,
    ProfileReadService
} = require("../services/userService")

exports.userOtp = async(req,res)=>{
    let result = await userOtpService(req);
    res.status(200).json(result)
}

exports.userLoginVerify = async(req,res)=>{
    
}

exports.userLoginVerify = async(req,res)=>{
    
}

exports.userLogout = async (req,res) =>{

}

exports.createProfile = async(req,res)=>{

}
exports.updateProfile = async (req,res) =>{

}
exports.readProfile = async (req,res)=>{

}