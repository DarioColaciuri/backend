import mongoose from "mongoose";
import { config } from "../config/config.js"
import { loggerDev } from "./logger.js";
const URI = config.MONGO_URL
const connectToDB = () => {
    try {
        mongoose.connect(URI)
        loggerDev.info('connected to DB ecommerce')
    } catch (error) {
        loggerDev.error(error);
    }
};

export default connectToDB