

import User from "./models/Users.js";
import express from "express" ; 
import bodyParser from "body-parser" ; 

import connectDB from "./db.js";

import session from "express-session" ;
import passport from "passport";

import bcrypt from "bcrypt";
import { Strategy } from "passport-local";
const saltRounds = 5 ; 

const AuthRouter = express.Router();


AuthRouter.get("/",(req,res) => {
    res.render("auth.ejs") ; 
})

AuthRouter.get("/signup",(req,res) => {
    res.render("signup.ejs") ; 
});

AuthRouter.post("/signup",async (req,res) => {


    console.log(req.body) ; // the body of the request is empty even when i specify Body in Postman 
    const dbresult = await User.findOne().where("email").equals(req.body.username) ; 
    console.log(dbresult) ; 
    if( (dbresult)  ){ // 
        console.log("user exists");
        res.send("there is an account aleardy associated with this mail id. please try logging in "  );
    }
    else {
        //storing the new user to the database 
        // hashing
        bcrypt.hash(req.body.password , saltRounds ,async (err,hash)=>{
            if (err){
                console.log("ERROR WHILE HASHING") ; 
            }
            else {
                console.log("1"); 
                const newUser = new User({name:req.body.name,password :hash, email:req.body.username}) ;
                console.log("2"); 
 
                const result = await newUser.save();
                console.log("3"); 

                console.log(newUser) ; 
                console.log("4"); 

                req.logIn(newUser,(err)=>{  // redirecting the user directly to home page after signing in 
                    if(err){console.log(err);}; 
                    res.redirect("/home") ;
                })
            }
        })
    }

});


AuthRouter.get("/login", (req, res,next) => {
    const errorMessage = req.session.errorMessage || "";
    req.session.errorMessage = "";  // Clear the error after displaying
    res.render("login", { errorMessage });
});

AuthRouter.post("/login", (req, res, next) => {
    passport.authenticate("local", (err, user, info) => {
        if (err) return next(err);
        if (!user) {
            req.session.errorMessage = "Invalid username or password";
            return res.redirect("/auth/login");
        }

        req.logIn(user, (err) => {
            if (err) return next(err);
            return res.redirect("/home");
        });
    })(req, res, next);
});

AuthRouter.get('/logout', function(req, res, next) {
    req.logout(function(err) {
      if (err) { return next(err); }
      res.redirect('/auth/login');
    });
  });

{// new strategy being implemente here username and password are automatically gotten hold of 
// by passport , as long as the forms from the post request have fields named the same 
passport.use(
    new Strategy( async function verify( username, password,cb){

    try {

        const result =  await User.findOne().where("email").equals(username) ; 
         ;  
        if (result){
            const user = result;
            const storedPassword = user.password ; 
            console.log(user,storedPassword,password)
            bcrypt.compare(password,storedPassword,(err,result) =>{
                if (err) {
                    return cb(err) ; 
                }
                else {
                    if (result){ // null -> errors , none, if result is true 
                        return cb(null,user); 
                    }
                    else {
                        return cb(null, false) ; 
                    }
                }
            });
        }
        else {
            return cb(null) ; 
        } ;
    }catch(err){
        return cb(err) ; 
    }
    })) ; 
          
}


//module.exports = router;
export default AuthRouter ; 