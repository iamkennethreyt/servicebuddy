const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const passport = require("passport");
const router = express.Router();
const _ = require("lodash");
const key = require("../../config/key").secretOrkey;
const transporter = require("../../config/key").transporter;

const crypto = require("crypto");
const mongoose = require("mongoose");
const multer = require("multer");
const GridFsStorage = require("multer-gridfs-storage");
const Grid = require("gridfs-stream");
const path = require("path");

//load validation
const ValidateRegisterInput = require("../../validations/register");
const ValidateLoginInput = require("../../validations/login");
const ValidatePasswordSettings = require("../../validations/accountsettings/password");

// Mongo URI
const mongoURI = "mongodb://localhost:27017/servicebuddy";

// Create mongo connection
const conn = mongoose.createConnection(mongoURI);

// Init gfs
let gfs;

conn.once("open", () => {
  // Init stream
  gfs = Grid(conn.db, mongoose.mongo);
  gfs.collection("uploads");
});

//load User model
const User = require("../../models/User");

// Create storage engine
const storage = new GridFsStorage({
  url: mongoURI,
  file: (req, file) => {
    return new Promise((resolve, reject) => {
      crypto.randomBytes(16, (err, buf) => {
        if (err) {
          return reject(err);
        }
        const filename = buf.toString("hex") + path.extname(file.originalname);
        const fileInfo = {
          filename: filename,
          bucketName: "uploads"
        };
        resolve(fileInfo);
      });
    });
  }
});
const upload = multer({ storage });

//@route    GET api/users/profile
//@desc     return current user
//@access   private
router.get("/test", (req, res) => {
  res.json({ hi: "hello world" });
});

//@route    POST api/users/register
//@desc     register new user
//@access   public
router.post("/register", (req, res) => {
  const { errors, isValid } = ValidateRegisterInput(req.body);

  //check validation
  if (!isValid) {
    return res.status(400).json(errors);
  }

  User.findOne({ email: req.body.email }).then(user => {
    errors.email = "Email already exists";
    if (user) {
      return res.status(400).json(errors);
    } else {
      const newUSer = new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        contactinfo: req.body.contactinfo,
        cityprovince: req.body.cityprovince,
        workertype: req.body.workertype,
        agency: req.body.agency,
        completeaddress: req.body.completeaddress,
        usertype: req.body.usertype
      });

      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUSer.password, salt, (err, hash) => {
          if (err) throw err;
          newUSer.password = hash;
          newUSer
            .save()
            .then(user => res.json(user))
            .catch(err => console.log(err));
        });
      });
    }
  });
});

//@route    POST api/users/login
//@desc     login user and returning  JWT web token
//@access   public
router.post("/login", (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  const { errors, isValid } = ValidateLoginInput(req.body);

  //check validation
  if (!isValid) {
    return res.status(400).json(errors);
  }

  //Find User by Email
  User.findOne({ email }).then(user => {
    //chech user
    if (!user) {
      errors.email = "Email not found";
      return res.status(404).json(errors);
    }

    //check password
    bcrypt.compare(password, user.password).then(isMatch => {
      if (isMatch) {
        //user  matched

        //create JWT payload
        const payload = {
          id: user.id,
          name: user.name,
          email: user.email,
          contactinfo: user.contactinfo,
          cityprovince: user.cityprovince,
          completeaddress: user.completeaddress,
          usertype: user.usertype,
          status: user.status
        };

        //sign token
        jwt.sign(payload, key, (err, token) => {
          res.json({
            token: "Bearer " + token
          });
        });
      } else {
        errors.password = "Password incorrect";
        return res.status(400).json(errors);
      }
    });
  });
});

//@route    GET api/users/profile
//@desc     return current user
//@access   private
router.get(
  "/profile",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    res.json(req.user);
  }
);

//@route    PUT api/profile/accountsettings
//@desc     account settings of the current logged in user
//@access   private
router.put(
  "/settings/account",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const userFields = {};
    const errors = {};

    User.findOne({ email: req.body.email }).then(user => {
      errors.email = "Email already exists";
      if (user) {
        return res.status(400).json(errors);
      } else {
        if (req.body.name) userFields.name = req.body.name;
        if (req.body.email) userFields.email = req.body.email;
        if (req.body.contactinfo) userFields.contactinfo = req.body.contactinfo;
        if (req.body.cityprovince)
          userFields.cityprovince = req.body.cityprovince;
        if (req.body.completeaddress)
          userFields.completeaddress = req.body.completeaddress;
        if (req.body.agency) userFields.agency = req.body.agency;
        if (req.body.details) userFields.details = req.body.details;
        if (req.body.workertype) userFields.workertype = req.body.workertype;

        User.findOneAndUpdate(
          { _id: req.user.id },
          { $set: userFields },
          { new: true }
        ).then(user => res.json(user));
      }
    });
  }
);

//@route    PUT api/users/profile/passwordsettings
//@desc     account settings change password
//@access   private
router.put(
  "/profile/passwordsettings",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { errors, isValid } = ValidatePasswordSettings(req.body);

    //check validation
    if (!isValid) {
      return res.status(400).json(errors);
    }

    //check password
    bcrypt.compare(req.body.password, req.user.password).then(isMatch => {
      if (isMatch) {
        User.findById(req.user.id, (err, user) => {
          if (err) throw err;

          bcrypt.genSalt(10, (err, salt) => {
            if (err) throw err;

            bcrypt.hash(req.body.password3, salt, (err, hash) => {
              if (err) throw err;

              user.password = hash;
              user
                .save()
                .then(user => res.json(user))
                .catch(err => console.log(err));
            });
          });
        });
      } else {
        errors.password = "Password is incorrect";
        return res.status(400).json(errors);
      }
    });
  }
);

// @route   GET api/users/workers
// @desc    Show all users
// @access  Public
router.get(
  "/workers",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    User.find({ usertype: "worker" }).then(users =>
      res.json(
        users.map(u => {
          const {
            email,
            cityprovince,
            name,
            ratings,
            _id,
            workertype,
            details,
            completeaddress,
            contactinfo,
            agency,
            status,
            image
          } = u;
          return {
            _id,
            name,
            email,
            cityprovince,
            workertype,
            details,
            agency,
            completeaddress,
            contactinfo,
            status,
            image,
            rating: _.round(_.meanBy(ratings, o => o.rating))
          };
        })
      )
    );
  }
);

// @route   GET api/users/:id
// @desc    Show single user based on the params id
// @access  Public
router.get("/worker/:id", (req, res) => {
  User.findById(req.params.id)
    .populate("feedbacks.user")
    .then(user => {
      if (!user) {
        return res
          .status(404)
          .json({ noadvfound: "No User found with that ID" });
      }
      const {
        email,
        cityprovince,
        name,
        ratings,
        _id,
        workertype,
        details,
        completeaddress,
        contactinfo,
        agency,
        feedbacks,
        image
      } = user;

      res.json({
        email,
        cityprovince,
        name,
        ratings,
        _id,
        workertype,
        details,
        completeaddress,
        contactinfo,
        agency,
        rating: _.round(_.meanBy(ratings, o => o.rating)),
        feedbacks,
        image
      });
    })
    .catch(err =>
      res.status(404).json({ noadvfound: "No User found with that ID" })
    );
});

// @route   GET api/users/:id
// @desc    Show single user based on the params id
// @access  Public
router.post("/stars/:id", (req, res) => {
  User.findById(req.params.id)
    .then(adv => {
      if (adv) {
        res.json(adv);
      } else {
        res.status(404).json({ noadvfound: "No User found with that ID" });
      }
    })
    .catch(err =>
      res.status(404).json({ noadvfound: "No User found with that ID" })
    );
});

// @route   PUT api/users/rating/:id
// @desc    Add ratings
// @access  Private
router.put(
  "/rating/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    User.findById(req.params.id).then(user => {
      // res.json(user);
      if (!user) {
        return res.status(400).json({ user: "user not found" });
      }

      const newRating = {
        user: req.user.id,
        rating: req.body.rating
      };

      const found = user.ratings.find(o => {
        return o.user == req.user.id;
      });

      if (!found) {
        user.ratings.unshift(newRating);
        user.save().then(user => res.json(user));
      } else {
        User.updateOne(
          { _id: req.params.id, "ratings.user": req.user.id },
          { $set: { "ratings.$.rating": req.body.rating } },
          { new: true }
        ).then(() => {
          User.findById(req.params.id).then(d => res.json(d));
        });
      }
    });
  }
);

// @route   PUT api/advertisements/:id
// @desc    Add ratings
// @access  Private
router.put(
  "/feedback/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    User.findById(req.params.id).then(user => {
      // res.json(user);
      if (!user) {
        return res.status(400).json({ user: "user not found" });
      }
      if (!req.body.feedback) {
        return res.status(400).json({ feedback: "feedback field is required" });
      }
      const newFeedback = {
        user: req.user.id,
        feedback: req.body.feedback
      };

      user.feedbacks.unshift(newFeedback);
      user.save().then(user => res.json(user));
    });
  }
);

//@route    PUT api/profile/accountsettings
//@desc     account settings of the current logged in user
//@access   private
router.put(
  "/changestatus/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    User.findOneAndUpdate(
      { _id: req.params.id },
      { $set: { status: req.body.status } },
      { new: true }
    ).then(user => res.json(user));
  }
);

// @route POST /upload
// @desc  send email to admin
router.post(
  "/sendemailtoadmin",
  // passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { email, message } = req.body;
    const mailOptions = {
      from: email,
      to: "davepilapil49@gmail.com",
      subject: "Message from your Service Buddy App",
      text: message
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        return res.status(400).json(error);
      } else {
        res.json({ success: info.response });
      }
    });
  }
);

// @route POST /upload
// @desc  Uploads file to DB
router.post(
  "/upload",
  upload.single("file"),
  passport.authenticate("jwt", { session: false }),

  (req, res) => {
    const user = {};

    user.image = req.file.filename;

    User.findOneAndUpdate(
      { _id: req.user.id },
      { $set: user },
      { new: true }
    ).then(user => res.json(user));
  }
);

// @route GET /image/:filename
// @desc Display Image
router.get("/image/:filename", (req, res) => {
  gfs.files.findOne({ filename: req.params.filename }, (err, file) => {
    // Check if file
    if (!file || file.length === 0) {
      return res.status(404).json({
        err: "No file exists"
      });
    }
    // Check if image
    if (file.contentType === "image/jpeg" || file.contentType === "image/png") {
      // Read output to browser
      const readstream = gfs.createReadStream(file.filename);
      readstream.pipe(res);
    } else {
      res.status(404).json({
        err: "Not an image"
      });
    }
  });
});

module.exports = router;
