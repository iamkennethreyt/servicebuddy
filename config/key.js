const nodemailer = require("nodemailer");

module.exports = {
  mongoURI: "mongodb://localhost:27017/servicebuddy",
  secretOrkey: "swulutions",
  transporter: nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    auth: {
      user: "servicebuddy2019@gmail.com",
      pass: "reyMarcDave2@19"
    },
    tls: {
      rejectUnauthorized: false
    }
  })
};
