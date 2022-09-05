import express from 'express';
import routes from '../api/routes';
import middlewares from './middlewares';

const app = express();

app.use(express.json());

app.use('/login', routes.login);
app.use('/client', routes.client);
app.use('/service', routes.service);
app.use('/service-provided', routes.serviceProvided);

app.use(middlewares.handleError);

export default app;