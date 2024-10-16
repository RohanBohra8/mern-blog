import mongoose from "mongoose";

// Connect to MongoDB using mongoose 
const connectDB = async () => {
    try {
        const connected = await mongoose.connect(process.env.MONGO); 
        console.log(`Connected to Mongo DataBase : ${connected.connection.host}`);
    } catch (error) {
        console.error(`Error: ${error.message}`);
    }
}

export default connectDB;