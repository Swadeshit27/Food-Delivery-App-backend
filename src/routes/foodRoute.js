import express from 'express'; 
import { GetFoodList } from '../controllers/FoodController.js';
const router = express.Router();

router.route('/').get( GetFoodList)

export default router;