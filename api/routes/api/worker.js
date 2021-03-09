var express = require("express");
var router = express.Router();

const Worker = require("../../models/worker");

// workers / create
router.post("/", (req, res, next) => {
    const worker = new Worker({
        name: req.body.name,
        owner: req.user._id,
        order: req.body.order,
    }).save((err) => {
        if (err) {
            return next(err);
        }
        res.redirect("/api/workers");
    });
});

// workers / read
router.get("/", (req, res, next) => {
    Worker.find().exec(function (err, workers) {
        if (err) {
            return next(err);
        }
        res.json(workers);
    });
});

// workers / update
router.put("/:id", (req, res, next) => {
    const updatedWorker = new Worker({
        _id: req.params.id,
        name: req.body.name,
        owner: req.user._id,
        order: req.body.order,
    });
    Worker.findByIdAndUpdate(req.params.id, updatedWorker, {}, (err) => {
        if (err) {
            return next(err);
        }
        res.redirect("/api/workers");
    });
});

// workers / delete
router.delete("/:id", (req, res, next) => {
    Worker.findByIdAndRemove(req.params.id, (err) => {
        if (err) {
            return next(err);
        }
        res.redirect("/api/workers");
    });
});

module.exports = router;
