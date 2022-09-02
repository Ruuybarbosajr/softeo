import { Router } from 'express';
import controllers from '../controllers';
import middlewares from '../middlewares';

const router = Router();

router.post(
  '/create',
  middlewares.authToken,
  middlewares.authBodyService,
  controllers.service.create,
);

router.get(
  '/:id',
  middlewares.authToken,
  middlewares.authId,
  controllers.service.readOne
);

export default router;