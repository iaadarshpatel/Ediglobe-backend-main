import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const connectDb = async () => {
    try {
        const connectDatabase = await mongoose.connect(process.env.MONGODB_URI, {
            dbName: 'payments',  // Specify the database name as 'payments'
        });
        console.log(`MongoDB connected: ${connectDatabase.connection.host}`);
    } catch (err) {
        console.error(`Error: ${err.message}`);
        process.exit(1);
    }
}

export default connectDb;