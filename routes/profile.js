import express from "express" ; 

import mongoose from "mongoose" ; 
import User from "../models/Users.js";
import NewsItem from "../models/NewsItem.js"


function getProfile(req){
    return "profile" ; 
}


export default getProfile ; 