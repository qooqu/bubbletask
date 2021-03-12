var express = require("express");
var router = express.Router();

const passport = require("passport");
const bcrypt = require("bcryptjs");

const User = require("../models/user");

// failWithError
// https://github.com/jaredhanson/passport/issues/458

router.post(
    "/sign-up",
    passport.authenticate("sign-up-strategy", { failWithError: true }),
    function (req, res, next) {
        // Handle success
        return res.send({
            success: true,
            message: "welcome aboard",
            username: req.user.username,
            id: req.user.id,
        });
    },
    function (err, req, res, next) {
        // Handle error
        return res.status(401).send({
            success: false,
            message: err,
            username: null,
            id: null,
        });
    }
);

router.post(
    "/log-in",
    passport.authenticate("log-in-strategy", { failWithError: true }),
    function (req, res, next) {
        // Handle success
        return res.send({
            success: true,
            message: "you're in",
            username: req.user.username,
            id: req.user.id,
        });
    },
    function (err, req, res, next) {
        // Handle error
        return res.status(401).send({
            success: false,
            message: err,
            username: null,
            id: null,
        });
    }
);

router.get("/log-out", (req, res) => {
    req.logout();
    // res.json({ message: "you logged out. congrats" });
    // res.json({ username: null, id: null });
    return res.send({
        success: true,
        message: "you're out",
        username: null,
        id: null,
    });
});

module.exports = router;
