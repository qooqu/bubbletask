var express = require("express");
var router = express.Router();

const Task = require("../../models/task");

// tasks / create
router.post("/", (req, res, next) => {
    const task = new Task({
        name: req.body.name,
        owner: req.user._id,
        order: req.body.order,
        percentComplete: req.body.percentComplete,
    }).save((err, task) => {
        if (err) {
            return next(err);
        }
        res.json(task);
    });
});

// tasks / read
router.get("/", (req, res, next) => {
    Task.find({ owner: req.user._id }).exec(function (err, tasks) {
        if (err) {
            return next(err);
        }
        res.json(tasks);
    });
});

// tasks / update
router.put("/:id", (req, res, next) => {
    let update = {
        $set: {
            name: req.body.name,
            order: req.body.order,
            percentComplete: req.body.percentComplete,
        },
    };
    if (req.body.assignedTo === "" || req.body.assignedTo === undefined) {
        update.$unset = { assignedTo: 1 };
    } else {
        update.$set.assignedTo = req.body.assignedTo;
    }
    Task.findOneAndUpdate(
        { _id: req.params.id },
        update,
        // { returnNewDocument: true }, // cb task is old task. this doesn't fix it
        (err, task) => {
            if (err) {
                return next(err);
            }
            res.json(task);
        }
    );
});

// tasks / delete
router.delete("/:id", (req, res, next) => {
    Task.findByIdAndRemove(req.params.id, (err) => {
        if (err) {
            return next(err);
        }
        // res.redirect("/api/tasks");
    });
});

module.exports = router;
