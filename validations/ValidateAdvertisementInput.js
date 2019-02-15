const validator = require("validator");
const isEmpty = require("./isEmpty");

module.exports = function ValidateAdvertisementInput(data) {
  let errors = {};

  data.advertisement = !isEmpty(data.advertisement) ? data.advertisement : "";

  if (validator.isEmpty(data.advertisement)) {
    errors.advertisement = "Workertype field is required";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
