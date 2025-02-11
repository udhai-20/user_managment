import mongoose from "mongoose";

const db_Url = process.env.MONGO_URL!;

export const connectDb = async () => {
    try {
        if (mongoose.connection.readyState >= 1) return;
        await mongoose.connect(db_Url);
        console.log("Database Connected");
    } catch (error) {
        console.log("Database not connected", error);
    }
}