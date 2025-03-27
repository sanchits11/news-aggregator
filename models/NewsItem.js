import mongoose from "mongoose";

const newsSchema = new mongoose.Schema({
    title: { type: String, required: true }, 
    source: String,
    url: String,
    imgUrl: String,
    author: String,
    description: String,
    content: String,
    date: Date,
    sentiment :{ type: mongoose.Schema.Types.ObjectId, ref: 'Sentiment'}  , 
    category: String  
});
newsSchema.index({ content: "text" });

const NewsItem = mongoose.model('NewsItem', newsSchema);
export default NewsItem;
