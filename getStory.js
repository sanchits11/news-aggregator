import natural from "natural"
import compromise from "compromise" 
import axios from "axios";
import env from "dotenv" ; 

env.config();
const NewsAPIKey = process.env.NEWSAPI_KEY ; 
// connectDB() ; 

console.log("in getStory") ; 

const text = 'Trump rescinds security clearances of political rivals Harris, Clinton and others - CNN' ; 
// write a function getContext that takes the article and uses it's description to output a list of phrases/ keywords 
async function getContext(text){
    console.log("in getStory :: getContext") ; 

    const doc = compromise(text);
    const keywords = doc.nouns().out("array"); 
    console.log(keywords) ; 
    return keywords ; 
}

// a function fetchfromAPI to get all relevant article from the API and store them in the database
// https://newsapi.org/docs
async function fetchFromAPI(context){
    console.log("in getStory :: fetchFromAPI") ; 

    const params = {
        "apiKey" : NewsAPIKey , 
        "language":'en', 
         "q":context , 
    }
    
    console.log(params) ; 
                try {
        const response = await axios.get(`https://newsapi.org/v2/everything/`,{ params:params ,headers :{
            "x-api-key" : NewsAPIKey
        }}) ; 
        console.log(response.data) ; 
        return response.data ; 
    
        } catch(error){
            console.error("error:",error) ; 
            throw error ; 
        }
    
}

const context = await getContext(text) ; 
console.log(context) ;
fetchFromAPI(context) ; 
console.log("in getStory, end ofscript") ; 


// a function buildStory that will create and return a JSON object that will be sent to the frontend 
// it will also save the story in the database 

export {getContext} ; 

// https://worldnewsapi.com/docs/top-news/ << gives stories readymade ig !!!!!!!!!!!!!