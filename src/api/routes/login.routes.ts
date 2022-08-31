import { Router } from 'express';
import controller from '../controllers';
import 'express-async-errors';

const router = Router();

router.post('/', controller.login.execute);

export default router;