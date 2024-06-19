import mongoose from "mongoose";

export const connectMongoDB = async () => {
    try {
        mongoose.connect("mongodb+srv://admin:123@coder69930.uiaieqj.mongodb.net/proyecto3");
        console.log("MongoDB connected");
    } catch (error) {
        console.log(`Error : ${error}`);
    }
}