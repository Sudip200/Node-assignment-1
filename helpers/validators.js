const validateName = (name) => /^[A-Za-z]+$/.test(name);

const validateUserInput = (firstname, lastname) => {
  if (firstname === "" || lastname === "") {
    return { isValid: false, message: "Please enter all fields" };
  }
  if (!validateName(firstname) || !validateName(lastname)) {
    return { isValid: false, message: "Invalid Name" };
  }
  return { isValid: true };
};

module.exports = {
  validateUserInput,
};
