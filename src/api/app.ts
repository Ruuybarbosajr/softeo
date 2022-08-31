import express from 'express';
import routes from '../api/routes';
import handleError from '../middlewares/handleError';

const app = express();

app.use(express.json());

app.use('/login', routes.login);

app.use(handleError);
export default app;