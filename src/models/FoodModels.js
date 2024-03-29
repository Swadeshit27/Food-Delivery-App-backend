import { Schema, model } from 'mongoose';

const foodSchema = new Schema({
    imgSrc: String,
    title: String,
    description: String,
    price: Number,
    rating: Number,
    deliveryTime: String,
    originPrice: Number,
    category: String,
})
const Food =  new model('food', foodSchema);
export default Food;