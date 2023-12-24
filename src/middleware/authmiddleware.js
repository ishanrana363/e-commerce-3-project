const { DecodeToken } = require("../utility/tokenHelper");

module.exports=(req,res,next)=>{
    let token = req.headers["token"];
    if(!token){
        token = req.cookies["token"]
    }
    let decode = DecodeToken(token)
    if(decode==null){
        res.status(401).josn({
            status : "fail",
            message : "unauthorized"
        })
    }else{
        let email = decode["email"];
        let user_id = decode["user_id"];
        req.headers.email = email;
        req.headers.user_id = user_id;
        next()
    }
}