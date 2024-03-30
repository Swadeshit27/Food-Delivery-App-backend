import express from 'express';
import authentication from '../middleware/autentication.js';
import { getOrderHistory, OrderFood } from '../controllers/OrderController.js';
const router = express.Router();

router.route('/').post(authentication, OrderFood)
router.route('/get').post(authentication, getOrderHistory)

export default router;