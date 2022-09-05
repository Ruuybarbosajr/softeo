import joi from 'joi';

const schema = joi.object({
  clientId: joi.string().required().min(36),
  serviceId: joi.string().required().min(36),
  installmentsContracted: joi.number().required().min(1),
  installmentsPaid: joi.number().required().min(0),
});

export default schema;