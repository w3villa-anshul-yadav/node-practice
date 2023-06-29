require("dotenv").config();
const port = process.env.PORT;

const methodOverride = require("method-override");
const passport = require("passport");
const flash = require("express-flash");
const session = require("express-session");
const noRoutesMiddleWare = require("./middleware/noRoutesMiddleWare");

//Routes

//User Route
const userRoutes = require("./routes/userRoutes");

// passport js initialize

const initialize = require("./config/passportConfig");

initialize(passport);

// express app
const express = require("express");
const app = express();

//database connection
const DB = require("./config/DBConnection");
DB();

app.set("view-engine", "ejs");

app.use(express.json());

app.use(express.urlencoded({ extended: false }));

app.use(flash());

app.use(
    session({
        secret: process.env.SESSION_SECRET,
        resave: false,
        saveUninitialized: false,
        cookie: { expires: 60000 }, // session expires in 1 minutes
    })
);

app.use(passport.initialize());
app.use(passport.session());

app.use(methodOverride("_method"));

//routes
app.use("/api/user", userRoutes);

app.use(noRoutesMiddleWare);

//server port
app.listen(port, () => {
    console.log(`Server Started at http://localhost:${port}`);
});
