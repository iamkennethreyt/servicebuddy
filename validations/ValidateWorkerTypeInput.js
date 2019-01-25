const validator = require("validator");
const isEmpty = require("./isEmpty");

module.exports = function ValidateWorkerTypeInput(data) {
  let errors = {};

  data.workertype = !isEmpty(data.workertype) ? data.workertype : "";

  if (!validator.isLength(data.workertype, { min: 4, max: 40 })) {
    errors.workertype = "Worker type must be 4 to 40 characters";
  }

  if (validator.isEmpty(data.workertype)) {
    errors.workertype = "Workertype field is required";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
