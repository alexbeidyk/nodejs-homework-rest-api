const Joi = require('joi');

const contactSchema = Joi.object({
  name: Joi.string().min(2).required(),
  email: Joi.string().min(3).required().email(),
  phone: Joi.number().min(6).required(),
});
const contactUpdateSchema = Joi.object({
  name: Joi.string().min(2).optional(),
  email: Joi.string().min(3).optional().email(),
  phone: Joi.number().min(6).optional(),
});

const contactUpdateStatusSchema = Joi.object({
  favorite: Joi.boolean().required(),
});

const validate = (schema, body, next) => {
  const { error } = schema.validate(body);
  if (error) {
    return next({
      status: 'error',
      code: 400,
      message: error.message,
    });
  }
  next();
};

module.exports.validContactUpdateStatus = (req, _, next) => {
  return validate(contactUpdateStatusSchema, req.body, next);
};
module.exports.validContact = (req, _, next) => {
  return validate(contactSchema, req.body, next);
};
module.exports.validContactUpdate = (req, _, next) => {
  return validate(contactUpdateSchema, req.body, next);
};
