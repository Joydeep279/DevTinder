const { isEmail, isStrongPassword } = require("validator");
const { hashSync } = require("bcrypt");
function signupValidator(credentials) {
  const { firstName, lastName, email, password } = credentials;
  if (firstName.length < 4) {
    throw new Error("First Name is too Short");
  }
  if (firstName.length > 50) {
    throw new Error("First Name is too long");
  }
  if (lastName.length < 4) {
    throw new Error("Last Name is too Short");
  }
  if (lastName.length > 50) {
    throw new Error("Last Name is too long");
  }
  if (!isEmail(email)) {
    throw new Error("Email not Valid");
  }
  if (!isStrongPassword(password)) {
    throw new Error("Password Not Valid");
  }
  const hash = hashSync(password, 10);
  return { firstName, lastName, email, password: hash };
}
module.exports = { signupValidator };
