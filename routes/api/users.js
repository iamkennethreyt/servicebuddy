const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const passport = require("passport");
const router = express.Router();

const key = require("../../config/key").secretOrkey;

//load validation
const ValidateRegisterInput = require("../../validations/register");
const ValidateLoginInput = require("../../validations/login");
const ValidatePasswordSettings = require("../../validations/accountsettings/password");

//load User model
const User = require("../../models/User");

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
          email: user.email
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
router.get("/workers", (req, res) => {
  User.aggregate([
    {
      $unwind: "$ratings"
    },
    {
      $group: {
        _id: "$_id",
        avgrating: { $avg: "$ratings.rating" }
      }
    }
  ]).then(data => res.json(data));
  // User.find({ usertype: "worker" }).then(users => res.json(users));
  //   .catch(err => res.status(404).json({ nousersfound: "No users found" }));
});

// @route   GET api/users/:id
// @desc    Show single user based on the params id
// @access  Public
router.get("/worker/:id", (req, res) => {
  User.findById(req.params.id)
    .then(adv => {
      if (adv) {
      } else {
        res.status(404).json({ noadvfound: "No User found with that ID" });
      }
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

// @route   PUT api/advertisements/:id
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
          { $set: { "ratings.$.rating": req.body.rating } }
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

module.exports = router;
