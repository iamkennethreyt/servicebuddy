const mongoose = require("mongoose");

const Schema = mongoose.Schema;

//create schema
const WorkerTypeSchema = new Schema({
  workertype: {
    type: String,
    required: true
  }
});

module.exports = WorkerType = mongoose.model("workertypes", WorkerTypeSchema);
