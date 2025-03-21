import mongoose from "mongoose";

const sentimentSchema = new mongoose.Schema({
    news_id: { type: mongoose.Schema.Types.ObjectId, ref: 'NewsItem', required: true },
    sentiment_label: { type: String, enum: ['Supportive', 'Critical', 'Neutral'], required: true },
    sentiment_score : Number 
});

const SentimentAnalysis = mongoose.model('SentimentAnalysis', sentimentSchema);
export default SentimentAnalysis;
