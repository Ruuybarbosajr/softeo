import joi from 'joi';

const schema = joi.object({
  username: joi.string().required(),
  password: joi.string().required().min(6)
});

export default schema;