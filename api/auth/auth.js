const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcryptjs");
const User = require("../models/user");

passport.use(
    "sign-up-strategy",
    new LocalStrategy((username, password, done) => {
        User.findOne({ username: username }, (err, user) => {
            if (err) {
                return done(err);
            }
            if (user !== null) {
                return done("username already taken. sorry", false);
            }
            bcrypt.hash(password, 10, (err, hashedPassword) => {
                if (err) {
                    return done(err);
                } else {
                    const newUser = new User({
                        username: username,
                        password: hashedPassword,
                    }).save((err, user) => {
                        if (err) {
                            return done(err);
                        } else {
                            return done(null, user);
                        }
                    });
                }
            });
        });
    })
);

passport.use(
    "log-in-strategy",
    new LocalStrategy((username, password, done) => {
        User.findOne({ username: username }, (err, user) => {
            if (err) {
                return done(err);
            }
            if (!user) {
                return done("invalid credentials. try again", false);
            }
            bcrypt.compare(password, user.password, (err, res) => {
                if (res) {
                    return done(null, user);
                } else {
                    return done("invalid credentials. try again", false);
                }
            });
        });
    })
);

passport.serializeUser(function (user, done) {
    done(null, user.id);
});

passport.deserializeUser(function (id, done) {
    User.findById(id, function (err, user) {
        done(err, user);
    });
});
