const {
    userOtpService,
    userOtpVerifyService,
    createProfileService,
    updateProfileService,
    ProfileReadService
} = require("../services/userService")

exports.userOtp = async(req,res)=>{
    let result = await userOtpService(req);
    res.status(200).json(result)
}

exports.userLoginVerify = async (req, res) => {
    let result = await userOtpVerifyService(req);
    if (result["status"] == "success") {
        // cookie option
        let cookie = {
            expires: new Date(Date.now() + 24 * 60 * 60 * 1000),
            httpOnly: false,
        };
        // set cookie with http response
        res.cookie("token", result["token"], cookie);
        res.status(200).json(result);
    } else {
        res.status(200).json(result);
    }
};


exports.userLogout = async (req,res) =>{
    // cookie options
    let cookie = {
        expires : new Date(Date.now() - 24*60*60*1000),
        httpOnly : false
    }
    // remove cookie
    res.cookie("token","",cookie);
    res.status(200).json({
        status : "success",
        message : "User logout successfully "
    })
}

exports.createProfile = async(req,res)=>{
    let result = await createProfileService(req)
    res.status(200).json(result)
}
exports.updateProfile = async (req,res) =>{
    let result = await updateProfileService(req)
    res.status(200).json(result)
}
exports.readProfile = async (req,res)=>{

}