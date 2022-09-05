import joi from 'joi';

const schema = joi.object({
  installmentsPaid: joi.number().required().min(1),
});

export default schema;