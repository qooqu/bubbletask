var express = require("express");
var router = express.Router();

const Task = require("../../models/task");

// tasks / create
router.post("/", (req, res, next) => {
    const worker = new Task({
        name: req.body.name,
        owner: req.user._id,
        order: req.body.order,
        assignedTo: req.body.assignedTo,
        percentComplete: req.body.percentComplete,
    }).save((err) => {
        if (err) {
            return next(err);
        }
        res.redirect("/api/tasks");
    });
});

// tasks / read
router.get("/", (req, res, next) => {
    Task.find().exec(function (err, tasks) {
        if (err) {
            return next(err);
        }
        res.json(tasks);
    });
});

// tasks / update
router.put("/:id", (req, res, next) => {
    const updatedTask = new Task({
        _id: req.params.id,
        name: req.body.name,
        owner: req.user._id,
        order: req.body.order,
        assignedTo: req.body.assignedTo,
        percentComplete: req.body.percentComplete,
    });
    Task.findByIdAndUpdate(req.params.id, updatedTask, {}, (err) => {
        if (err) {
            return next(err);
        }
        res.redirect("/api/tasks");
    });
});

// tasks / delete
router.delete("/:id", (req, res, next) => {
    Task.findByIdAndRemove(req.params.id, (err) => {
        if (err) {
            return next(err);
        }
        res.redirect("/api/tasks");
    });
});

module.exports = router;
