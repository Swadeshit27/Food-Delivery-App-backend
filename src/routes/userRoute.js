import express from 'express';
import { Login, Register, updateProfile } from '../controllers/UserController.js';
import authentication from '../middleware/autentication.js';
const router = express.Router();

router.route('/login').post(Login);
router.route('/register').post(Register);
router.route('/profile').post(authentication, updateProfile);

export default router;