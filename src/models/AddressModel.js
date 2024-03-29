import { Schema, model } from 'mongoose';

const addressSchema = new Schema({
    userId: String,
    name: String,
    mobile: String,
    pin: String,
    state: String,
    city: String,
    location: String,
})
const address = new model('food', addressSchema);
export default address;