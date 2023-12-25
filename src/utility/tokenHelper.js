const jwt = require("jsonwebtoken");

exports.EncodeToken = (email, user_id) => {
    let key = "dfdlkslkdsfdsdfa";
    const payload = {
        email: email,
        user_id: user_id
    };
    const expiresIn = {
        expiresIn: 24 * 60 * 60 // 24 hours in seconds
    };
    return jwt.sign(payload, key, expiresIn);
};

exports.DecodeToken = (token) => {
    try {
        let key = "dfdlkslkdsfdsdfa";
        return jwt.verify(token, key);
    } catch (e) {
        return null;
    }
};
