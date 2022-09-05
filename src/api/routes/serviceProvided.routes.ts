import { Router } from 'express';
import controllers from '../controllers';
import middlewares from '../middlewares';

const router = Router();

router.patch(
  '/update/:id',
  middlewares.authToken,
  middlewares.authId,
  middlewares.authBodyUpdateServiceProvided,
  controllers.serviceProvided.update
);

router.post(
  '/create',
  middlewares.authToken,
  middlewares.authBodyServiceProvided,
  controllers.serviceProvided.create
);

router.get(
  '/all',
  middlewares.authToken,
  controllers.serviceProvided.readAll
);

router.get(
  '/:id',
  middlewares.authToken,
  middlewares.authId,
  controllers.serviceProvided.readOne
);

export default router;