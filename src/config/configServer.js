import mongoose from "mongoose";
import { config } from "../config/config.js"
const URI = config.MONGO_URL
const connectToDB = () => {
    try {
        mongoose.connect(URI)
        console.log('connected to DB ecommerce')
    } catch (error) {
        console.log(error);
    }
};

export default connectToDB