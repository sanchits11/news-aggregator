import mongoose from "mongoose";

// MongoDB connection URI
const uri = 'mongodb://localhost:27017/newsAgg';

async function connectDB() {
  try {
    await mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Connected to MongoDB with Mongoose');
  } catch (err) {
    console.error('MongoDB connection error:', err);
  }
}

// module.exports = connectDB ;
export default connectDB ; 
