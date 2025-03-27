import mongoose, { mongo } from "mongoose";
import NewsItem from "./models/NewsItem.js";
import connectDB from "./db.js";
import getSentiment from "./sentimentAnalyzer.js";
import axios from "axios";
import env from "dotenv" ; 
import { saveArticle , fetchDB } from "./db.js";


env.config();
const NewsAPIKey = process.env.NEWSAPI_KEY ; 
connectDB() ; 




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

const res = await getNews("business") ; 
console.log(res) ; 

  export default getNews ; 
