import express from "express" ; 

import mongoose from "mongoose" ; 
import User from "../models/Users.js";
import NewsItem from "../models/NewsItem.js"

import axios from "axios";
import env from "dotenv" ; 
env.config();
const NewsAPIKey = process.env.NEWSAPI_KEY ; 

async function getHome(req){
    console.log(NewsAPIKey); 
    try {
    const response = await axios.get(`https://newsapi.org/v2/everything?q=India&apiKey=${NewsAPIKey}`) ; 
    return response.data ;
    } catch(error){
        console.error("error:",error) ; 
        throw error ; 
    }

}


export default getHome ; 