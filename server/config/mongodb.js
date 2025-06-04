import mongoose from "mongoose";

const connectDB = async () => {

    try {
        mongoose.connection.on('DB Connected',() => {
            console.log("DB Connected");
        })
    
        await mongoose.connect(`${process.env.MONGODB_URI}/smart-campus-app`,{
            serverSelectionTimeoutMS: 30000, // 30 seconds
        })
    
    } catch(error) {
        console.log('Connection error:', error);
    }

}

export default connectDB;