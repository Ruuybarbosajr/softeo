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

router.put(
  '/update/:id',
  middlewares.authToken,
  middlewares.authId,
  middlewares.authBodyService,
  controllers.service.update
);

router.delete(
  '/delete/:id',
  middlewares.authToken,
  middlewares.authId,
  controllers.service.destroy
);

router.get(
  '/all',
  middlewares.authToken,
  controllers.service.readAll
);

router.get(
  '/:id',
  middlewares.authToken,
  middlewares.authId,
  controllers.service.readOne
);

export default router;