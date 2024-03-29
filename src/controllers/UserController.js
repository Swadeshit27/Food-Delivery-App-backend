import User from "../models/UserModel.js";
import bcrypt from "bcrypt"
import jwt from 'jsonwebtoken';

export const Login = async (req, res) => {
    try {
        const { email, password } = req.body;
        console.log(email, password);
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: "email not found" });
        }
        const isCorrect = await bcrypt.compare(password, user.password);
        if (!isCorrect) {
            return res.status(404).json({ message: "Incorrect password" });
        }
        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET);
        return res.status(201).json({ token, message: "login successful" });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error, message: "Internal server error" })
    }
}
export const Register = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        console.log(name, email, password);
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
        return res.status(201).json({ token, message: "Registration successful" });
    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: "Internal server error" });
    }
}

export const ViewProfile = async () => {
    try {
        const { _id } = req.body;
        const user = await User.findById(_id);
        console.log(user)
        if (!user) return res.status(404).json({ message: "User not found" });
        res.status(200).json({ user, message: "user found successfully" })
    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: "Internal server error" });
    }
}