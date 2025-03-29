import natural from "natural"
import compromise from "compromise" 
import axios from "axios";
import env from "dotenv" ; 
import connectDB from "./db.js";
import NewsItem from "./models/NewsItem.js";
import Story from "./models/story.js";
import { saveArticle , fetchDB } from "./db.js";
import SentimentAnalysis from "./models/sentimentAnalysis.js";
env.config();
const NewsAPIKey = process.env.NEWSAPI_KEY ; 
connectDB() ; 

const THRESH = 0.65
// write a function getContext that takes the article and uses it's description to output a list of phrases/ keywords 

async function getSimilarity(string1, string2){
    const tokenizer = new natural.WordTokenizer(string1, string2);
    const text1 = tokenizer.tokenize(string1);
    const text2 = tokenizer.tokenize(string2);

    // Convert words into term frequency vectors
    const tfidf = new natural.TfIdf(); // READ UP ON TfIdf 
    tfidf.addDocument(text1);
    tfidf.addDocument(text2);

    // Get cosine similarity between two documents
    const cosineSimilarity = await  natural.JaroWinklerDistance(text1.join(" "), text2.join(" ")); //READ UP ON this funciton
   // console.log("Cosine Similarity:", cosineSimilarity);
    return cosineSimilarity ; 
}
async function getContext(text){
    const doc = compromise(text);
    const keywords = doc.nouns().out("array"); 
  //  console.log(keywords) ; 
    return keywords ; 
}
// a function fetchfromAPI to get all relevant article from the API and store them in the database

async function fetchFromAPI(context){
    const params = {
        "apiKey" : NewsAPIKey , 
        "language":'en', 
         "q":context , 
    }
    
        try {
        const response = await axios.get(`https://newsapi.org/v2/everything/`,{ params:params ,headers :{
            "x-api-key" : NewsAPIKey
        }}) ; 
        return response.data.articles ; 
    } catch(error){
            console.error("error:",error) ; 
            throw error ; 
        }
    
}
// a function buildStory that will create and return a JSON object that will be sent to the frontend 
async function getStory(article){
    const current = article.description ; 
    var context = await getContext(article.description ? article.title.concat(article.description) : article.title )  ;
    console.log("context in buildStory : ",context) ; 
    var textContext = context.join(" ");
    //checking if story exists in database 
    const storyFromDB = await Story.find({ $text: { $search: textContext } });
    console.log("save story similarity test result" , storyFromDB) ; 
    if(storyFromDB.length > 0 ){
        console.log("story present in database , returning the story");
        return await buildStoryJSON(storyFromDB[0]);
    }

    // get from db 
    console.log("combined context :", textContext) ; 
    const dbresult = await NewsItem.find({ $text: { $search: textContext } });
    var storyArticles = [];
    console.log(dbresult) ; 
    for (const art of dbresult) {
        var sim = await getSimilarity(art.title, article.title);
        if (sim > THRESH){storyArticles.push({ news_id: art._id });}    // using a filter here might be better coding practice 
    }

    // get from API 
     const APIresponse = await fetchFromAPI(context) ;  
    console.log(APIresponse) ;     
    for (const art of APIresponse) {
        var res = await saveArticle(art); 
        console.log(res) ; 
        // assuming that if the article is already saved, i.e res = null then the database will return the article above
        // and we do not need to push it to the return array here 
         // 
        var sim = await getSimilarity(art.title, article.title);
        console.log(sim)
        if (sim > THRESH && res != null ){storyArticles.push({ news_id: res._id });}    // using a filter here might be better coding practice 
    }
    console.log(storyArticles.length) ; 
    var res = await saveStory(article , textContext , storyArticles) ; 
    console.log("result of saveStory" ,res) ; 
    // writing bad code below to get all articles and referenced items, should ideally use some mongo method


    // const end = Date.now();
    
    // const diff = end - start;
    // console.log({diff});
    // console.log("\n\n Final Response Object : \n\n ", JSON.stringify(response)) ; 


    return await buildStoryJSON(res) ; 
    // return articles list and sentiment summary 
}

async function saveStory(main_article, context , articles) {
    console.log("articles in saveStory" , articles); 

    var newStory = new Story({
        title : main_article.title , keywords : context , articles :articles.map(art => ({ news_id: art.news_id || art._id })), 
    })
    
    var res = await newStory.save() ; 
    return res ; 
}

// a function saveStory that will save the story to the database 

async function buildStoryJSON(res){ // res is the DB story object 
    console.log("in build story JSON")
    var response = {}
    response.title = res.title ;
    const start = Date.now();
    response.articles = await Promise.all(res.articles.map((article) => NewsItem.findById(article.news_id))); 
    const sentiments = await Promise.all(response.articles.map(async (x)=>{
        return (SentimentAnalysis.findById(x.sentiment));
    }))
    sentiments.forEach((x, i)=>{
        response.articles[i].sentiment = x;
    });
    return response ; 
}


const article =     {
    title: ' European sales of Tesla electric vehicles tumbled 49% in the first two months of the year compared with a year earlier even as overall sales of EVs grew, according to the Europe ',
    source: 'ABC News',
    url: 'https://abcnews.go.com/Business/wireStory/tesla-sales-fall-49-europe-electric-vehicle-market-120130703',
    imgUrl: 'https://i.abcnewsfe.com/a/3b5be48b-aa39-4c25-85fe-95582683a81e/wirestory_b6f5da15be491d16e3020598e3ddf861_16x9.jpg?w=1600',
    author: 'The Associated Press',
    description: 'European sales of Tesla electric vehicles tumbled 49% in the first two months of the year compared with a year earlier even as overall sales of EVs grew, according to the Europe',
    content: 'FRANKFURT, Germany -- European sales of Tesla electric vehicles tumbled 49% in the first two months of the year compared with a year earlier even as overall sales of EVs grew, according to the Europe… [+1730 chars]',
    date: '2025-03-25T22:19:49.000Z',
    category: 'business',
  }
var returnValue = await getStory(article) ;
console.log("\n\n\n ",returnValue, "\n\n\n") ; 
export {getContext,getStory } ; 

