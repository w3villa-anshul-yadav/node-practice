const checkUserAuthentication = (req, res, next) => {
    if (req.isAuthenticated()) {
        return next();
    } else {
        return res.redirect("/api/user/login");
    }
};

module.exports = checkUserAuthentication;
