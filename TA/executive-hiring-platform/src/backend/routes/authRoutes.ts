import { Router } from 'express';
import AuthController from '../controllers/authController';

const router = Router();
const authController = new AuthController();

// Authentication routes
router.post('/login', authController.login);
router.post('/register', authController.register);

export default router;