import mongoose from "mongoose";

const taskSchema = new mongoose.Schema({
    task_name: {
        type: String,
        required: true
    },
    subtasks: [String],
    tags:[String],
    email:String
},
    { timestamps: true }
)

module.exports = mongoose.models.Task || mongoose.model('Task', taskSchema)