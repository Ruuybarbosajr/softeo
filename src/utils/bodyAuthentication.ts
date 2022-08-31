import { Schema } from 'joi';

export default <T>(schema: Schema, body: T) => schema.validate(body).error;