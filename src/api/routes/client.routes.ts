import { Router } from 'express';
import controllers from '../controllers';
import middlewares from '../middlewares';
import 'express-async-errors';

const router = Router();

router.post(
  '/create',
  middlewares.authToken,
  middlewares.authBodyNewClient,
  controllers.client.create
);

router.get(
  '/all',
  middlewares.authToken,
  controllers.client.readAll
);

router.get(
  '/:id',
  middlewares.authToken,
  middlewares.authId,
  controllers.client.readOne
);

export default router;