const checkUserNotAuthentication = (req, res, next) => {
    try {
        if (req.isAuthenticated()) {
            console.log("first");
            return res.redirect("/api/user");
        } else {
            return next();
        }
    } catch (error) {
        console.error(error);
    }
};

module.exports = checkUserNotAuthentication;
