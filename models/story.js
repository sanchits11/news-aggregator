import mongoose from "mongoose";

const storySchema = new mongoose.Schema({
    title: { type: String, required: true },  // Story title summarizing the event
    keywords: { type: String },  // keywords from the story
    articles: [{
        news_id: { type: mongoose.Schema.Types.ObjectId, ref: 'NewsItem', required: true },  // Related news article
    }]
});
storySchema.index({ keywords: "text" });

const Story = mongoose.model('Story', storySchema);
export default Story;
