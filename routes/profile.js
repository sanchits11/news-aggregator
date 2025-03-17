import express from "express" ; 

import mongoose from "mongoose" ; 
import User from "../models/Users.js";
import NewsItem from "../models/NewsItem.js"
import axios from "axios";
import env from "dotenv" ; 
env.config();
const NewsAPIKey = process.env.NEWSAPI_KEY ; 


function getProfile(req){
    return "profile" ; 
}


export default getProfile ; 