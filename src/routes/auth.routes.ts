import express from 'express';
import AuthHandlers from '../handlers/auth.handlers';
import { deserializeUser } from '../middleware/deserializeUser';
import { validate } from '../middleware/validators/validate';
import { createUserSchema, loginUserSchema } from '../database/schemas/User.schema';
import { requireUser } from '../middleware/requireUser';

const router = express.Router();

router.post('/register', validate(createUserSchema), AuthHandlers.registerUser);

router.post('/login', AuthHandlers.loginUser);

router.get('/logout', deserializeUser, requireUser, AuthHandlers.logoutUser);

router.get('/refresh', AuthHandlers.refreshToken);

router.get('/me', AuthHandlers.getMe);

export default router;
