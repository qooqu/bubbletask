// bubble task / web / app.js

const express = require("express");
const session = require("express-session");
const mongoose = require("mongoose");
const passport = require("passport");

if (process.env.NODE_ENV !== "production") {
    require("dotenv").config();
}

const mongoDb = process.env.MONGODB_URI;
mongoose
    .connect(mongoDb, { useUnifiedTopology: true, useNewUrlParser: true })
    .catch((error) => console.log(error));
// const db = mongoose.connection;
// db.on("error", console.error.bind(console, "mongo connection error"));

const app = express();

const sessionSecret = process.env.SECRET;
app.use(
    session({
        secret: sessionSecret,
        resave: false,
        saveUninitialized: true,
    })
);
const auth = require("./auth/auth");
app.use(passport.initialize());
app.use(passport.session());
app.use(express.urlencoded({ extended: false }));

const authRoutes = require("./routes/auth");
const apiWorkerRoutes = require("./routes/api/worker");
const apiTaskRoutes = require("./routes/api/task");

app.use("/auth", authRoutes);

const checkLoggedIn = function (req, res, next) {
    if (req.user) {
        next();
    } else {
        res.json({ message: "woah woah woah woah" });
    }
};

app.use("/api/workers", checkLoggedIn, apiWorkerRoutes);
app.use("/api/tasks", checkLoggedIn, apiTaskRoutes);

let port = process.env.PORT;
if (port == null || port == "") {
    port = 8080;
}
app.listen(port);
