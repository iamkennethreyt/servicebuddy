const express = require("express");

const router = express.Router();
//load validation
const ValidateWorkerTypeInput = require("../../validations/ValidateWorkerTypeInput");

//load User model
const WorkerType = require("../../models/WorkerType");

//@route    POST /api/workertypes
//@desc     Register new worker type
//@access   public
router.post(
  "/",
  //   passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { errors, isValid } = ValidateWorkerTypeInput(req.body);

    //check validation
    if (!isValid) {
      return res.status(400).json(errors);
    }

    WorkerType.findOne({ workertype: req.body.workertype }).then(wt => {
      errors.workertype = "Worker type is already exists";
      if (wt) {
        return res.status(400).json(errors);
      } else {
        const newWT = new WorkerType({
          workertype: req.body.workertype
        });

        newWT.save().then(wt => res.json(wt));
      }
    });
  }
);

//@route    GET api/workertypes/
//@desc     Show all worker types
//@access   private
router.get("/", (req, res) => {
  const errors = {};
  errors.noprofile = "There are no Worker type available";
  WorkerType.find()
    .then(wt => {
      if (!wt) {
        return res.status(404).json(errors);
      }

      res.json(wt);
    })
    .catch(err => res.status(404).json(errors));
});

//@route    DELETE api/workertypes/:id
//@desc     Remove single worker types based on the params id
//@access   private
router.delete("/:id", (req, res) => {
  const errors = {};

  WorkerType.findOneAndDelete({ _id: req.params.id })
    .then(rmv => res.json(rmv))
    .catch(err => {
      res.status(400).json(err);
    });
  // res.json({ id: req.params.id });
});

module.exports = router;
