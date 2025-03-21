import mongoose from "mongoose";
import NewsItem from "./models/NewsItem.js";
import connectDB, { fetchDB } from "./db.js";

import axios from "axios";
import env from "dotenv" ; 
env.config();
const NewsAPIKey = process.env.NEWSAPI_KEY ; 
connectDB() ; 

async function getScore(data){

//function to get bias score for article 
    return 1.242 ; 
}


async function saveArticle(article,tags){
    const score = await getScore(article.content) ; 
    const newArticle = new NewsItem({
        title: article.title || `Untitled-${Date.now()}`,
        source : article.source?.name || "Unknown Source",
        url : article.url , 
        imgUrl : article.urlToImage , 
        author:article.author || "Anonymous",
        description : article.description , 
        content : article.content ,
        date : article.publishedAt , 
        score : score  , 
        tags : [tags] , 
    }) ;

    const res = await newArticle.save(); 
    return newArticle ; 

}

async function getNews(tags){
    const result = await fetchDB(tags) ; 
    console.log("\n\n\n DB : " ,result) ; 
    console.log(result.length) ; 
    if (result.length != 0){
        console.log("\n\nDB HAS RETURNED DATA \n\n") ; 
        return result ;
    }
    else {
        const APIResult = await getFromAPI(tags) ; 
        var response = []
        APIResult.articles.forEach(news => {
            var curr = saveArticle(news,tags) ;  
            response.push(curr) ; 
        });       
        console.log(APIResult) ; 
        console.log("\n\nAPI  HAS RETURNED DATA \n\n") ;
        return response ;


    }
    // const apiRes = getFromAPI(tags) ; 
    // console.log("\n\n\n API" , apiRes) ; 
    // format tags if necessary and query the database 
    // call fetchDB that gets all the articles that have all the tags given as parameter to it 
    
    // if not dbResult , getFromAPI , then saveArticle and send response 
}


async function getFromAPI(tags){
    const params = {
        "apiKey" : NewsAPIKey , 
        "language":'en', 
    }
    if (tags != "headline"){params["category"] = tags ; }
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


var res = getNews("global") ; 
console.log(res) ; 


// export default getFeed ; 
