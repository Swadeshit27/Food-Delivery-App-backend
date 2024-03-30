import User from "../models/UserModel.js";


export const OrderFood = async (req, res) => {
    try {
        const { orderItems, orderAddress, paymentDetails, finalPrice } = req.body;
        const userId = req.userId;
        const user = await User.findById(userId);
        user.orders.push({ orderItems, orderAddress, paymentDetails, finalPrice });
        await User.findByIdAndUpdate(
            userId,
            { orders: user.orders },
            { new: true }
        )
        res.status(201).json({ message: "Order Details saved successfully" });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal server error" });
    }
}
export const getOrderHistory = async (req, res) => {
    try {
        const userId = req.userId;
        const user = await User.findById(userId);
        res.status(201).json({ order: user.orders, message: "Order Details saved successfully" });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal server error" });
    }
}