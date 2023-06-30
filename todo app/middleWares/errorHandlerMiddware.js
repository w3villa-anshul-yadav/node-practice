const statusCode = require("../constants");

const errorHandler = (err, req, res, next) => {
    const receivedStatusCode = res.statusCode || 500;

    switch (receivedStatusCode) {
        case statusCode.FORBIDDEN:
            res.json({
                title: "Forbidden",
                message: err.message,
                stackTarce: err.stack,
            });
            break;

        case statusCode.NOT_FOUND:
            res.json({
                title: "NOT FOUND",
                message: err.message,
                stackTarce: err.stack,
            });
            break;

        case statusCode.SERVER_ERROR:
            res.json({
                title: "SERVER ERROR",
                message: err.message,
                stackTarce: err.stack,
            });
            break;

        case statusCode.UNAUTHORIZED:
            res.json({
                title: "UNAUTHORIZED",
                message: err.message,
                stackTarce: err.stack,
            });
            break;

        case statusCode.VALIDATION_ERROR:
            res.json({
                title: "VALIDATION ERROR",
                message: err.message,
                stackTarce: err.stack,
            });
            break;

        default:
            console.log("No Errors");
            break;
    }
    next();
};
module.exports = errorHandler;
