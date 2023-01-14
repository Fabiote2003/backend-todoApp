const jwt = require('jsonwebtoken');

const checkAuth = (req, res, next) => {
    const token = req.cookies.access_token;
    if(!token) {
        return res.status(401).json({
            msg: "There isn't token."
        })
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if(err) {
            return res.json({
                msg: "Invalid token."
            })
        } else {
            req.user = decoded;
            
            return next();
        }
    })
}

module.exports = checkAuth;
