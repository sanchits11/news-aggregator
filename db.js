import mongoose from "mongoose";
import NewsItem from "./models/NewsItem.js";
import getSentiment from "./sentimentAnalyzer.js";
import SentimentAnalysis from "./models/sentimentAnalysis.js";

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

async function saveArticle(article,category){
    
  const existingArticle = await NewsItem.findOne({ title: article.title });
  if (existingArticle) {
      console.log("Article with the same title already exists. Skipping save.");
      return null; // Prevent duplicate titles
  }

  const sentiment = await getSentiment(article.title.concat(article.description) ||"neutral") ; 
  console.log("sentiment object returned :", sentiment) ; 
  const newArticle = new NewsItem({
      title: article.title || `Untitled-${Date.now()}`,
      source : article.source?.name || "Unknown Source",
      url : article.url , 
      imgUrl : article.urlToImage , 
      author:article.author || "Anonymous",
      description : article.description , 
      content : article.content ,
      date : article.publishedAt || Date.now(), 
  }) ;
  if (category) {
    newArticle.category = category; // Add category only if provided
  }
  const res = await newArticle.save(); 
  const newSentiment = new SentimentAnalysis({
      news_id : res._id ,
      sentiment_label : sentiment.label ,
      sentiment_score : sentiment.score 
  }) ; 
  const sentimentSaved = await newSentiment.save() ; 
  var resu = await NewsItem.updateOne({_id :res._id }, {$set : {sentiment : sentimentSaved._id}}) ; 


  return newArticle ; 

}

async function fetchDB(category){
  const result = (category != "headline") ? await NewsItem.find().where('category').equals(category) :  await NewsItem.find({
      date: { 
          $gte: new Date().getDate()-4, // getting news articles from the past 4 days 
      }
  }) ; 
  return result; 
  
}

export default connectDB  ;
export {saveArticle, fetchDB} ; 
