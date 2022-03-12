import mongoose from "mongoose";

const categorySchema = new mongoose.Schema({
    categories:String,
    email:String
},
    { timestamps: true }
)

module.exports = mongoose.models.Category || mongoose.model('Category', categorySchema) 