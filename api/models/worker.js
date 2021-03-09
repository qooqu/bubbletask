const mongoose = require("mongoose");
const Schema = mongoose.Schema;

var WorkerSchema = new Schema({
    name: { type: String, required: true },
    owner: { type: Schema.Types.ObjectId, ref: "User", required: true },
    order: { type: Number, required: true },
});

module.exports = mongoose.model("Worker", WorkerSchema);
