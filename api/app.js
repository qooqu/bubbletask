const express = require("express");
const session = require("express-session");
const mongoose = require("mongoose");
const passport = require("passport");
const cors = require("cors");
const MongoDBStore = require("connect-mongodb-session")(session);

if (process.env.NODE_ENV !== "production") {
    require("dotenv").config();
}

const mongoDb = process.env.MONGODB_URI;
mongoose
    .connect(mongoDb, { useUnifiedTopology: true, useNewUrlParser: true })
    .catch((error) => console.log(error));

const app = express();

const store = new MongoDBStore({
    uri: mongoDb,
    collection: "sessions",
});

let allowedOrigins = [
    "http://localhost:3000",
    "https://bubbletask.netlify.app",
];
app.use(
    cors({
        origin: function (origin, callback) {
            // allow requests with no origin
            // (like mobile apps or curl requests)
            if (!origin) return callback(null, true);
            if (allowedOrigins.indexOf(origin) === -1) {
                var msg =
                    "The CORS policy for this site does not " +
                    "allow access from the specified Origin.";
                return callback(new Error(msg), false);
            }
            return callback(null, true);
        },
        credentials: true,
    })
);

const sessionSecret = process.env.SECRET;
app.use(
    session({
        secret: sessionSecret,
        cookie: {
            maxAge: 1000 * 60 * 60 * 24 * 7, // 7d
            // maxAge: 1000 * 30, // 30s
        },
        store: store,
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
    port = 8000;
}

app.listen(port, () => {
    console.log(`listening on port ${port}`);
});
