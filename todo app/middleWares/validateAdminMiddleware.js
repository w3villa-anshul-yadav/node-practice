const logger = require('../logger');

module.exports = (req, res, next) => {
    try {
        if (req.user.roles.includes("admin")) {
            return next();
        } else {
            logger.error("user => ",req.user,"Only admins are allowed to do this operation");
            res.status(403).json({
                status: false,
                message: "Only admins are allowed to do this operation",
            });
        }
    } catch (error) {
        logger.error(error.toString());
    }
};
