const mongoose = require("mongoose");
// const jwt = require("jsonwebtoken");
// const Joi = require("joi");
// const passwordComplexity = require("joi-password-complexity");

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  type: { type: String, default: "user" },
  rollNumber: { type: String },
  phone: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  // verified: { type: Boolean, default: false },
  pending: { type: Object, default: {} },
  approved: { type: Object, default: {} },
});

const User = mongoose.model('user', UserSchema);
module.exports = User;

// userSchema.methods.generateAuthToken = function () {
//   const token = jwt.sign({ _id: this._id }, process.env.JWTPRIVATEKEY, {
//     expiresIn: "7d",
//   });
//   return token;
// };

// const User = mongoose.model("user", userSchema);

// const validate = (data) => {
//   const schema = Joi.object({
//     firstName: Joi.string().required().label("First Name"),
//     rollNumber: Joi.string().required().label("RollNumber"),
//     phone: Joi.string().required().label("Phone"),
//     email: Joi.string().email().required().label("Email"),
//     password: passwordComplexity().required().label("Password"),
//   });
//   return schema.validate(data);
// };

// module.exports = { User, validate };
