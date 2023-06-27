const jwt = require("jsonwebtoken");
module.exports = (req, res, next) => {
    let authorizationHeader =
        req.headers.authorization || req.headers.Authorization;
    let token;

    if (authorizationHeader && authorizationHeader.startsWith("Bearer")) {
        token = req.headers.authorization.split(" ")[1];
        jwt.verify(token, process.env.SECTRET_ACCESS_KEY, (err, decode) => {
            if (err) {
                res.status(400);
                throw new Error("User is Not Authorized");
            }
            req.user = decode.user;
        });
    } else {
        res.status(400);
        throw new Error("User is not Atuthorized or Token  is missing");
    }
    next();
};
