const Joi = require('@hapi/joi');

//#region //*USER REGISTRATION VALIDATION
const userRegisterValidation = (data) => {
  const schema = Joi.object({
    username: Joi.string().min(6).required(),
    email: Joi.string().min(6).required().email(),
    userPassword: Joi.string().min(6).required(),
    userPassword2: Joi.string().min(6).required(),
  });
  return schema.validate(data);
};
//#endregion

//#region //*USER LOGIN VALIDATION
const userLoginValidation = (data) => {
  const schema = Joi.object({
    username: Joi.string().min(6).required(),
    userPassword: Joi.string().min(6).required(),
  });
  return schema.validate(data);
};
//#endregion

//#region //*ADMIN LOGIN VALIDATION
const adminLoginValidation = (data) => {
  const schema = Joi.object({
    username: Joi.string().min(4).required(),
    userPassword: Joi.string().min(4).required(),
  });
  return schema.validate(data);
};
//#endregion

module.exports.userRegisterValidation = userRegisterValidation;
module.exports.userLoginValidation = userLoginValidation;
module.exports.adminLoginValidation = adminLoginValidation;
