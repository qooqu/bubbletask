var express = require("express");
var router = express.Router();

const Task = require("../../models/task");

// tasks / create
router.post("/", (req, res, next) => {
    const task = new Task({
        name: req.body.name,
        owner: req.user._id,
        order: req.body.order,
        percentComplete: 0,
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
router.put(
    "/:id",
    (req, res, next) => {
        Task.findByIdAndRemove(req.params.id, (err) => {
            if (err) {
                return next(err);
            }
        });
        next();
    },
    (req, res, next) => {
        let obj = {
            _id: req.params.id,
            name: req.body.name,
            owner: req.user._id,
            order: req.body.order,
            percentComplete: req.body.percentComplete,
        };
        if (req.body.assignedTo !== "") {
            obj.assignedTo = req.body.assignedTo;
        }
        const task = new Task(obj).save((err, task) => {
            if (err) {
                return next(err);
            }
        });
    }
);

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
