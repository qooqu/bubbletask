const mongoose = require("mongoose");
const Schema = mongoose.Schema;

var TaskSchema = new Schema({
    name: { type: String, required: true },
    owner: { type: Schema.Types.ObjectId, ref: "User", required: true },
    order: { type: Number, required: true },
    assignedTo: { type: Schema.Types.ObjectId, ref: "Worker" },
    percentComplete: { type: Number, required: true },
});

module.exports = mongoose.model("Task", TaskSchema);
