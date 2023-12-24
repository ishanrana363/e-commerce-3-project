const jwt = require("jsonwebtoken")
exports.EncodeToken = (email,user_id) =>{
    let key ="dfdlkslkdsfdsdfa"
    const payload = {
        email : email,
        user_id : user_id
    }
    const experin = {
        exp: Math.floor(Date.now() / 1000) + (24*60 * 60)
    }
    return jwt.sign(payload,key,experin)
}

exports.DecodeToken = (token) =>{
    try{
        let key ="dfdlkslkdsfdsdfa"
        return jwt.verify(token,key)
    }catch(e){
        return null
    }
}