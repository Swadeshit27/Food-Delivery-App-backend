import express from 'express';
import authentication from '../middleware/autentication.js';
import { OrderFood } from '../controllers/OrderController.js';
const router = express.Router();

router.route('/').post(authentication, OrderFood)

export default router;