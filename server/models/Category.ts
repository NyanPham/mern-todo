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
    displayOrder: {
        type: Number,
    },
})

categorySchema.index({ userId: 1, title: 1 }, { unique: true })
categorySchema.index({ userId: 1, displayOrder: 1 }, { unique: false })

const Category = mongoose.model('Category', categorySchema)

export default Category
