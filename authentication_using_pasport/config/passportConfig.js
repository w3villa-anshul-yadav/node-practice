const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcrypt");

const initialize = (passport) => {
    const {
        getUserByEmail,
        getUserById,
    } = require("../controller/userController");
    
    const authenticateUser = async (email, password, done) => {
        const user = await getUserByEmail(email);
        if (user == null) {
            console.log("user not found");
            done(null, false, { message: "Email is not Registred" });
        }

        try {
            if (user && (await bcrypt.compare(password, user.password))) {
                done(null, user);
                console.log("user found");
            } else {
                console.log("incorrect password");
                done(null, false, { message: "password is not correct" });
            }
        } catch (error) {
            done(error);
            console.log(error);
        }
    };

    passport.use(
        new LocalStrategy({ usernameField: "email" }, authenticateUser)
    );
    passport.serializeUser((user, done) => done(null, user.id));
    passport.deserializeUser(async (userId, done) =>
        done(null, await getUserById(userId))
    );
};

module.exports = initialize;
