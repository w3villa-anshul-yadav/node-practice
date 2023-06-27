const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");

const validateTocken = asyncHandler(async (request, response, next) => {
    let tocken;
    let authorizationHeader =
        request.headers.authorization || request.headers.Authorization;

    if (authorizationHeader && authorizationHeader.startsWith("Bearer")) {
        tocken = authorizationHeader.split(" ")[1];

        jwt.verify(tocken, process.env.SECTRET_ACCESS_KEY, (error, decode) => {
            if (error) {
                response.status(401);
                throw new Error("User is not Atuthorized");
            }
            console.log("user authorized");
            request.user = decode.user;
        });
    } else {
        response.status(401);
        throw new Error("User is not Atuthorized or Token  is missing");
    }
    next();
});

module.exports = validateTocken;
