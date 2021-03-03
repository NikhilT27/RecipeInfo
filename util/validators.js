module.exports.validateRegisterInput = (email, password, confirmPassword) => {
  const errors = {};

  if (email.trim() === "") {
    errors.email = "Email must not be empty";
  } else {
    const regEx = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    if (!email.match(regEx)) {
      errors.email = "Email must be valid email address";
    }
  }

  if (password === "") {
    errors.password = "Password must not be empty";
  } else if (password !== confirmPassword) {
    errors.password = "Password must be same";
  }

  return {
    errors,
    valid: Object.keys(errors).length < 1,
  };
};

module.exports.validateLoginInput = (email, password) => {
  const errors = {};
  if (email.trim() === "") {
    errors.email = "Email must not be empty";
  }

  if (password === "") {
    errors.password = "Password must not be empty";
  }

  return {
    errors,
    valid: Object.keys(errors).length < 1,
  };
};
