import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();
function connectDB() {
    mongoose.connect(process.env.MONGO_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }).then(() => {
        console.log('Connected to MongoDB');
      }).catch((err) => {
        console.error(err);
      });
      
}
export default connectDB