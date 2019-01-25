const mongoose = require("mongoose");

const Schema = mongoose.Schema;

//create schema
const UserSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  contactinfo: {
    type: String,
    required: true
  },
  cityprovince: {
    type: String,
    required: true
  },
  completeaddress: {
    type: String
  },
  details: {
    type: String
  },
  agency: {
    type: String
  },
  password: {
    type: String,
    required: true
  },
  workertype: {
    type: Schema.Types.ObjectId,
    ref: "workertypes"
  },
  usertype: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  },
  feedbacks: [
    {
      user: {
        type: Schema.Types.ObjectId,
        ref: "users",
        required: true
      },
      message: {
        type: String
      },
      date: {
        type: Date,
        default: Date.now
      }
    }
  ],
  ratings: [
    {
      user: {
        type: Schema.Types.ObjectId,
        ref: "users",
        required: true
      },
      rating: {
        type: Number
      },
      date: {
        type: Date,
        default: Date.now
      }
    }
  ]
});

module.exports = User = mongoose.model("users", UserSchema);
