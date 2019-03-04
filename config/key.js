const nodemailer = require("nodemailer");

module.exports = {
  mongoURI: "mongodb://localhost:27017/servicebuddy",
  secretOrkey: "swulutions",
  transporter: nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    auth: {
      user: "iamkennethreyt@gmail.com",
      pass: "iamkennethreyt10"
    },
    tls: {
      rejectUnauthorized: false
    }
  })
};
