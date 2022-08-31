import joi from 'joi';

const schema = joi.object({
  name: joi.string().required(),
  email: joi.string().required().email(),
  tel: joi.string().required()
});

export default schema;