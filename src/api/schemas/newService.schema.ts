import joi from 'joi';

const schema = joi.object({
  name: joi.string().required(),
  price: joi.number().required().min(0),
  maxInstallments: joi.number().required().min(0)
});

export default schema;