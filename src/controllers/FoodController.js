import Food from "../models/FoodModels.js";


export const GetFoodList = async (req, res) => {
    try { 
        const foodList = await Food.find({});
        res.status(200).json({ foodList, message: "Foods fetched successfully" });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal server error" });
    }
}