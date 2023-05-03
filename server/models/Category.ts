import mongoose from 'mongoose'

const categorySchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
    },
    imageSrc: {
        type: String,
        default: 'default.png',
    },
    createdAt: {
        type: Date,
        default: Date.now(),
    },
    modifiedAt: {
        type: Date,
        default: Date.now(),
    },
})

categorySchema.index({ userId: 1, title: 1 }, { unique: true })

const Category = mongoose.model('Category', categorySchema)

export default Category
