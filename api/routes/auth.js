var express = require("express");
var router = express.Router();

const passport = require("passport");
const bcrypt = require("bcryptjs");

const User = require("../models/user");

// missing validation and sanitisation of form input
router.post("/sign-up", (req, res, next) => {
    bcrypt.hash(req.body.password, 10, (err, hashedPassword) => {
        if (err) {
            return next(err);
        }
        const user = new User({
            username: req.body.username,
            password: hashedPassword,
        }).save((err) => {
            if (err) {
                return next(err);
            }
            res.json({ message: "you signed up. good job" });
        });
    });
});

router.post("/log-in", passport.authenticate("local"), (req, res, next) => {
    res.json({ message: "you logged in. way to go" });
});

router.get("/log-out", (req, res) => {
    req.logout();
    res.json({ message: "you logged out. congrats" });
});

module.exports = router;
