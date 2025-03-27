import mongoose, { mongo } from "mongoose";
import NewsItem from "./models/NewsItem.js";
import SentimentAnalysis from "./models/sentimentAnalysis.js";
import connectDB from "./db.js";
import getSentiment from "./sentimentAnalyzer.js";
import axios from "axios";
import env from "dotenv" ; 

env.config();
const NewsAPIKey = process.env.NEWSAPI_KEY ; 
connectDB() ; 


async function saveArticle(article,category){
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
        category : category , 

    }) ;
    const res = await newArticle.save(); 
    const newSentiment = new SentimentAnalysis({
        news_id : res._id ,
        sentiment_label : sentiment.label ,
        sentiment_score : sentiment.score 
    }) ; 
    const sentimentId = await newSentiment.save() ; 
    var resu = await NewsItem.updateOne({_id :res.id }, {$set : {sentiment : new mongoose.Types.ObjectId(sentimentId)}}) ; 


    return newArticle ; 

}

async function getNews(category){
    const result = (category == "headline") ? await fetchDB("headline")  :await fetchDB(category) ; 
    // console.log("\n\n\n DB : " ,result) ; 
    console.log(result.length) ; 
    if (result.length != 0){
        console.log("\n\nDB HAS RETURNED DATA \n\n") ; 
        return result ;
    }
    else {
        const APIResult = (category == "headline") ?  await getFromAPI("headline")  :  await getFromAPI(category); 
        var response = []
        response = await Promise.all(APIResult.articles.map(news => saveArticle(news, category)));  
         // map() returns an array of promises.
        // Promise.all() ensures all saveArticle calls complete before returning response.    
        //console.log(APIResult) ; 
        console.log("\n\nAPI  HAS RETURNED DATA \n\n") ;
        console.log(response) ; 
        return response ;


    }

}


async function getFromAPI(category){
    const params = {
        "apiKey" : NewsAPIKey , 
        "language":'en', 
    }
    if (category != "headline"){params["category"] = category ; }
    console.log(params) ; 
                try {
        const response = await axios.get(`https://newsapi.org/v2/top-headlines/`,{ params:params ,headers :{
            "x-api-key" : NewsAPIKey
        }}) ; 
        return response.data ; 
    
        } catch(error){
            console.error("error:",error) ; 
            throw error ; 
        }
    
}



async function fetchDB(category){
    const result = (category != "headline") ? await NewsItem.find().where('category').equals(category) :  await NewsItem.find({
        date: { 
            $gte: new Date().getDate()-4, // getting news articles from the past 4 days 
        }
    }) ; 
    return result; 
    
  }
  

const res = await getNews("business") ; 
console.log(res) ; 

  export default getNews ; 
