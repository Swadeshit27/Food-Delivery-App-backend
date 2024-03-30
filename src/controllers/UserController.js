import User from "../models/UserModel.js";
import bcrypt from "bcrypt"
import jwt from 'jsonwebtoken';

export const Login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: "email not found" });
        }
        const isCorrect = await bcrypt.compare(password, user.password);
        if (!isCorrect) {
            return res.status(404).json({ message: "Incorrect password" });
        }
        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET);
        return res.status(201).json({ user, token, message: "login successful" });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error, message: "Internal server error" })
    }
}
export const Register = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const userExists = await User.findOne({ email });
        if (userExists) {
            return res.status(409).json({ message: "User already exist" });
        }
        // hash password
        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(password, salt);
        // save to database
        const newUser = await User.create({ name, email, password: hashPassword });
        console.log(newUser);
        const token = jwt.sign({ userId: newUser._id }, process.env.JWT_SECRET);
        return res.status(201).json({ user: newUser, token, message: "Registration successful" });
    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: "Internal server error" });
    }
}

export const updateProfile = async (req, res) => {
    try {
        console.log("enter");
        const id = req.userId;
        const { name, mobile, gender, bio } = req.body;
        console.log(name, mobile, gender, bio, id);
        const user = await User.findById(id);
        if (!user) return res.status(404).json({ message: "User not found" });
        await User.findByIdAndUpdate(id, { name, mobile, gender, bio });
        const updatedUser = await User.findById(id);
        res.status(201).json({ user: updatedUser, message: "Profile updated" })
    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: "Internal server error" });
    }
}