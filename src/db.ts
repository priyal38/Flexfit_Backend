
import mongoose from "mongoose";
import logger from "./helper/logger";

const connection = async (): Promise<void> => {
    try {
        await mongoose.connect('mongodb+srv://priyal:thu%40pri38@cluster0.51hoxvk.mongodb.net/flexfit');
        logger.info('Connected to MongoDB');
        console.log(`Connected to MongoDB database: ${mongoose.connection.name}`);
    } catch (error) {
        console.error(error);
    }
}

export default connection;