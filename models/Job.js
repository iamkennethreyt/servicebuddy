const mongoose = require("mongoose");

const Schema = mongoose.Schema;

//create schema
const JobSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "users",
    required: true
  },
  location: {
    type: String
  },
  details: {
    type: String
  },
  reqStatus: {
    type: Boolean,
    default: false
  },
  dateFrom: {
    type: Date
  },
  dateTo: {
    type: Date
  },
  date: {
    type: Date,
    default: Date.now
  },
  jobType: {
    type: String
  },
  workerAccept: {
    type: Schema.Types.ObjectId,
    ref: "users"
  }
});

module.exports = Job = mongoose.model("jobs", JobSchema);
