import express from "express" ; 
import bodyParser from "body-parser" ; 
import connectDB from "./db.js";
import Router from './AppRouter.js'
import AuthRouter from "./AuthRouter.js";
import session from "express-session" ;
import passport from "passport";

import { Strategy } from "passport-local";

// allows us to configure the environment / use the environment variables in this process 
import env from "dotenv" ; 
env.config();

const app = express();
app.use(bodyParser.urlencoded({extended:true})) ; 


app.set("view engine", "ejs");
app.set("views", "./views");
app.use(express.static("public")) ; 

console.log(process.env.SESSION_SECRET) ; 
app.use(session({
    secret : process.env.SESSION_SECRET,
    resave:false , // resave = True allows persistent storage of session in our database
    saveUninitialized:true, 
    cookie:{
        maxAge : 1000 * 60 * 60 // 1 hour valid cookie 
    }
}))



connectDB();


// these lines for passport must follow above init for session and not before the above code 
app.use(passport.initialize());
app.use(passport.session()) ; 


// passport init or some other code that I don't want to change now 
// allows us to store a user to local storage 
passport.serializeUser((user,cb) =>{
    cb(null,user) ;
})

// deserializes user info for the session it in a way that can be accessed
passport.deserializeUser((user,cb) =>{
    cb(null,user) ;
})




// Use routes
app.use('/auth',AuthRouter);
app.use('/', Router);


const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});


