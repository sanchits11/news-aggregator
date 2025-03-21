import express from "express" ; 

import mongoose from "mongoose" ; 
import User from "../models/Users.js";
import NewsItem from "../models/NewsItem.js"
import fetchDB from "../db.js"

import axios from "axios";
import env from "dotenv" ; 
env.config();
const NewsAPIKey = process.env.NEWSAPI_KEY ; 

async function getExplore(req){
 

    // request must have a param named category . frontend work
    var category = req.params.category ; 
    if(!category) {category = "sports"}
    const params = {
        "apiKey" : NewsAPIKey , 
        "category":category,
        "language":'en', 
    }
    const tags = [category] ; 

    const dbResult = fetchDB(tags) ; 
    if (dbResult){
        return dbResult ;
    }
    else {
        try {
        const response = await axios.get(`https://newsapi.org/v2/top-headlines/`,{ params:params ,headers :{
            "x-api-key" : NewsAPIKey
        }}) ; 
        console.log(response.data.articles.slice(1,10)) ;
        return response.data.articles.slice(0,10) ;
        } catch(error){
            console.error("error:",error) ; 
            throw error ; 
        }
    }
}
export default getExplore ; 

