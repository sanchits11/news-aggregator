import express from "express" ; 

import mongoose from "mongoose" ; 
import User from "./models/Users.js";
import NewsItem from "./models/NewsItem.js"

import getProfile from "./routes/profile.js";
import getExplore from "./routes/explore.js";
import getFeed from "./routes/feed.js";
import getStory from "./routes/story.js";
import getHome from "./routes/home.js"


const AppRouter = express.Router();


// custom middleware to redirect unauthenticated requests to auth routes 
AppRouter.use((req,res,next)=>{
  if ( !req.isAuthenticated() ){
    res.redirect('/auth') ; 
  } 
  else {next()} ; 
  //next();  calling next here leads to error If you call next() after sending a response, Express tries to continue the request-response cycle, leading to the error
})

// n
AppRouter.get('/home', async (req, res,next) => {
  const result = await getHome(req) ; 
  console.log(result) ; 
  res.send(result) ; 
});

// getting feed with top stories 
AppRouter.get('/feed', async (req, res,next) => {
  res.send(getFeed(req)) ; 
}); 

// getting news of a particular category
AppRouter.get('/explore', async (req, res,next) => {
  res.send(getExplore(req)) ; 
});

// getting multiple reports from different sources for one news story. 
AppRouter.get('/story', async (req, res,next) => {
  res.send(getStory(req)) ; 
});

// user data, bookmarks, history maybe , etc. 
AppRouter.get('/profile', async (req, res) => {
  res.send(getProfile(req)) ; 
});


export default AppRouter ; 