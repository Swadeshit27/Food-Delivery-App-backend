import { Schema, model } from 'mongoose';

const userSchema = new Schema({
    name: String,
    email: String,
    password: String,
    mobile: String,
    gender: String,
    bio: String
})
const User = new model('user', userSchema);
export default User;