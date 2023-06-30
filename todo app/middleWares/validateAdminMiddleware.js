module.exports = (req, res, next) => {
    try {
        if (req.user.roles.includes("admin")) {
            return next();
        } else {
            res.status(403).json({
                status: false,
                message: "Only admins are allowed to do this operation",
            });
        }
    } catch (error) {
        console.log(error);
    }
};
