import mongoose from "mongoose";


const newsSchema = new mongoose.Schema({
    name: { type: String, unique: true },
    source : Object ,
    url : String , 
    author:String , 
    description : String , 
    content : String ,
    date : Date , 
    score : Number , 
});


const NewsItem = mongoose.model('NewsItem', newsSchema);


export default NewsItem ; 