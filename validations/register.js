const validator = require("validator");
const isEmpty = require("./isEmpty");

module.exports = function validateRegisterInput(data) {
  let errors = {};

  data.name = !isEmpty(data.name) ? data.name : "";
  data.email = !isEmpty(data.email) ? data.email : "";
  data.contactinfo = !isEmpty(data.contactinfo) ? data.contactinfo : "";
  data.usertype = !isEmpty(data.usertype) ? data.usertype : "";
  data.cityprovince = !isEmpty(data.cityprovince) ? data.cityprovince : "";
  data.completeaddress = !isEmpty(data.completeaddress)
    ? data.completeaddress
    : "";
  data.password = !isEmpty(data.password) ? data.password : "";
  data.password2 = !isEmpty(data.password2) ? data.password2 : "";

  if (!validator.equals(data.password2, data.password)) {
    errors.password2 = "password must match";
  }

  if (!validator.isLength(data.password2, { min: 4, max: 40 })) {
    errors.password2 = "Confirm Password must be 4 to 40 characters";
  }

  if (validator.isEmpty(data.password2)) {
    errors.password2 = "Confirm Password field is required";
  }

  if (!validator.isLength(data.password, { min: 4, max: 40 })) {
    errors.password = "Password must be 4 to 40 characters";
  }

  if (validator.isEmpty(data.password)) {
    errors.password = "Password field is required";
  }

  if (!validator.isLength(data.cityprovince, { min: 4, max: 40 })) {
    errors.cityprovince = "City province must be 4 to 40 characters";
  }

  if (validator.isEmpty(data.cityprovince)) {
    errors.cityprovince = "City province field is required";
  }

  if (!validator.isLength(data.contactinfo, { min: 4, max: 40 })) {
    errors.contactinfo = "Contact info must be 4 to 40 characters";
  }

  if (validator.isEmpty(data.contactinfo)) {
    errors.contactinfo = "Contact info field is required";
  }

  if (!validator.isLength(data.contactinfo, { min: 4, max: 11 })) {
    errors.contactinfo = "Contact Info must be 11 characters";
  }

  if (!validator.isLength(data.completeaddress, { min: 4, max: 40 })) {
    errors.completeaddress = "Complete Address must be 4 to 40 characters";
  }

  if (validator.isEmpty(data.completeaddress)) {
    errors.completeaddress = "Complete Address field is required";
  }

  if (!validator.isEmail(data.email)) {
    errors.email = "Email is invalid";
  }

  if (!validator.isLength(data.email, { min: 4, max: 40 })) {
    errors.email = "Email must be 4 to 40 characters";
  }

  if (validator.isEmpty(data.email)) {
    errors.email = "Email field is required";
  }

  if (!validator.isLength(data.name, { min: 4, max: 40 })) {
    errors.name = "Name must be 4 to 40 characters";
  }

  if (validator.isEmpty(data.name)) {
    errors.name = "Name field is required";
  }

  if (validator.isEmpty(data.usertype)) {
    errors.usertype = "User type field is required";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
