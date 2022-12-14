import { Router } from 'express';
import controllers from '../controllers';
import middlewares from '../middlewares';
import 'express-async-errors';

const router = Router();

router.post(
  '/create',
  middlewares.authToken,
  middlewares.authBodyClient,
  controllers.client.create
);

router.put(
  '/update/:id',
  middlewares.authToken,
  middlewares.authId,
  middlewares.authBodyClient,
  controllers.client.update
);

router.delete(
  '/delete/:id',
  middlewares.authToken,
  middlewares.authId,
  controllers.client.destroy
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