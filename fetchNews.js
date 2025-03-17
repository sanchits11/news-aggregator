import mongoose from "mongoose";
import NewsItem from "./models/NewsItem.js";
import connectDB from "./db.js";

import axios from "axios";
import env from "dotenv" ; 
env.config();
const NewsAPIKey = process.env.NEWSAPI_KEY ; 
connectDB() ; 

async function getScore(data){

//function to get bias score for article 
    return 0 ; 
}


async function saveArticle(article,tags){
    const newArticle = new NewsItem({
        title: article.title || `Untitled-${Date.now()}`,
        source : article.source?.name || "Unknown Source",
        url : article.url , 
        imgUrl : article.urlToImage , 
        author:article.author || "Anonymous",
        description : article.description , 
        content : article.content ,
        date : article.publishedAt , 
        score : 1 , 
        tags : [tags] , 
    }) ;

    const res = await newArticle.save(); 

}



async function getFeed(tag){
    const params = {
        "apiKey" : NewsAPIKey , 
        "language":'en', 
    }
    if (tag != "headline"){params["category"] = tag ; }
                try {
        const response = await axios.get(`https://newsapi.org/v2/top-headlines/`,{ params:params ,headers :{
            "x-api-key" : NewsAPIKey
        }}) ; 
        response.data.articles.forEach(news => {
            saveArticle(news,tag) ;  
        }); 

    
        } catch(error){
            console.error("error:",error) ; 
            throw error ; 
        }
    
}


getFeed("sports") ; 


// export default getFeed ; 
