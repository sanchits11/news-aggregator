import express from "express" ; 
import mongoose from "mongoose" ; 
import User from "./models/Users.js";


const Router = express.Router();


// custom middleware to redirect unauthenticated requests to auth routes 
Router.use((req,res,next)=>{
  if ( !req.isAuthenticated() ){
    res.redirect('/auth') ; 
  } 
  else {next()} ; 
  //next();  calling next here leads to error If you call next() after sending a response, Express tries to continue the request-response cycle, leading to the error
})


// Create a new user
Router.get('/users', async (req, res) => {
  res.render('users.ejs')
});

// Get all users
Router.get('/home', async (req, res,next) => {
  res.render('home.ejs') ; 
});

//module.exports = router;
export default Router ; 