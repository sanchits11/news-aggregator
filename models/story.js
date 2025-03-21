import mongoose from "mongoose";

const storySchema = new mongoose.Schema({
    title: { type: String, required: true },  // Story title summarizing the event
    summary: { type: String },  // Short description of the story
    articles: [{
        news_id: { type: mongoose.Schema.Types.ObjectId, ref: 'NewsItem', required: true },  // Related news article
        sentiment_label: { type: String, enum: ['Supportive', 'Critical', 'Neutral'], required: true },  // Sentiment category
        sentiment_score: { type: Number, required: true }  
    }]
});

const Story = mongoose.model('Story', storySchema);
export default Story;
