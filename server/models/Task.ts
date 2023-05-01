import mongoose from "mongoose"

const taskSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    title: {
        type: String,
        required: true,
    }, 
    subtitle: String,
    isComplete: {
        type: Boolean,
        default: false
    },      
    imageSrc: {
        type: String,
        default: "default.png"
    },
    createdAt: {
        type: Date,
        default: Date.now()
    },
    modifiedAt: {
        type: Date,
        default: Date.now()
    }
})

const Task = mongoose.model("Task", taskSchema)

export default Task