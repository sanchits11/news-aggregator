import mongoose from "mongoose";
async function clearDatabase() {
    await mongoose.connect('mongodb://localhost:27017/newsAgg', { useNewUrlParser: true, useUnifiedTopology: true });

    const collections = await mongoose.connection.db.collections();
    
    for (let collection of collections) {
        await collection.deleteMany({}); // Deletes all documents
    }

    console.log("Database cleared.");
    await mongoose.connection.close();
}

// clearDatabase().catch(console.error);
