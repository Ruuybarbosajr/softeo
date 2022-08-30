import { Router } from 'express';
import controller from '../controllers';

const router = Router();

router.post('/', controller.login.execute);

export default router;