import mongoose from "mongoose";
import NewsItem from "./models/NewsItem.js";

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

// check whether data for current request is available in the mongo database

async function fetchDB(tags){
  const result = await NewsItem.find().where("tags").all(tags) ; 
  console.log(result) ; 
  return result; 
  
}


// module.exports = connectDB ;

export default connectDB  ;
export {fetchDB}; 
