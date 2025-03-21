import mongoose from "mongoose";

const bookmarkSchema = new mongoose.Schema({
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    news_id: { type: mongoose.Schema.Types.ObjectId, ref: 'NewsItem', required: true },
    saved_date: { type: Date, default: Date.now }
});

const Bookmark = mongoose.model('Bookmark', bookmarkSchema);
export default Bookmark;
