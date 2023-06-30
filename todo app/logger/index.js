const winston = require("winston");

const logger = winston.createLogger({
    level: "debug",
    format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.json()
    ),
    transports: [
        new winston.transports.Console(),
        new winston.transports.File({
            filename: "logs/combineLog.log",
        }),
        new winston.transports.File({
            level: "error",
            filename: "logs/error.log",
        }),
    ],
});

module.exports = logger;
