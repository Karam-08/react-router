const mongoose = require("mongoose");
/**
 * Connect to MongoDB using Mongoose
 * Centeralized DB setup so server.js stays clean
 */

async function connectDB(uri){
    try{
        await mongoose.connect(uri)
        console.log("MongoDB Connected")
    }catch(err){
        console.error("MongoDB connection error:", err.message)
    }
}

module.exports = connectDB;