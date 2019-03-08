const express = require("express");
const router = express.Router();
const passport = require("passport");
//load validation

//load User model
const Job = require("../../models/Job");

//@route    POST /api/advertisements
//@desc     Add advertisment
//@access   public
router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const newJobRequest = new Job({
      user: req.user.id,
      location: req.body.location,
      details: req.body.details,
      reqStatus: req.body.reqStatus,
      dateFrom: req.body.dateFrom,
      dateTo: req.body.dateTo,
      jobType: req.body.jobType,
      workerAccept: req.user.id
    });

    newJobRequest.save().then(ad => res.json(ad));
  }
);

//@route    GET api/advertisements/
//@desc     Show all advertisements
//@access   private
router.get("/", (req, res) => {
  const errors = {};
  Job.find()
    .populate("user")
    .populate("workerAccept")
    .then(ad => {
      if (!ad) {
        return res.status(404).json(errors);
      }
      res.json(ad);
    })
    .catch(err => res.status(404).json(errors));
});

router.put(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const errors = {};
    Job.findOneAndUpdate(
      { _id: req.params.id },
      { $set: { reqStatus: true, workerAccept: req.user.id } },
      { new: true }
    ).then(user => res.json(user));
  }
);

router.put(
  "/balik/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const errors = {};
    Job.findOneAndUpdate(
      { _id: req.params.id },
      { $set: { reqStatus: false, workerAccept: req.body.id } },
      { new: true }
    ).then(user => res.json(user));
  }
);

router.delete("/:id", (req, res) => {
  const errors = {};
  Job.findOneAndDelete({ _id: req.params.id })
    .then(rmv => res.json(rmv))
    .catch(err => {
      res.status(400).json(err);
    });
});

//   router.put(
//     "/settings/account",
// passport.authenticate("jwt", { session: false }),
//     (req, res) => {
//       const userFields = {};
//       const errors = {};

//       User.findOne({ email: req.body.email }).then(user => {
//         errors.email = "Email already exists";
//         if (user) {
//           return res.status(400).json(errors);
//         } else {
//           if (req.body.name) userFields.name = req.body.name;
//           if (req.body.email) userFields.email = req.body.email;
//           if (req.body.contactinfo) userFields.contactinfo = req.body.contactinfo;
//           if (req.body.cityprovince)
//             userFields.cityprovince = req.body.cityprovince;
//           if (req.body.completeaddress)
//             userFields.completeaddress = req.body.completeaddress;
//           if (req.body.agency) userFields.agency = req.body.agency;
//           if (req.body.details) userFields.details = req.body.details;
//           if (req.body.workertype) userFields.workertype = req.body.workertype;

//           User.findOneAndUpdate(
//             { _id: req.user.id },
//             { $set: userFields },
//             { new: true }
//           ).then(user => res.json(user));
//         }
//       });
//     }
//   );

module.exports = router;
