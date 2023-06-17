const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema;


const bookSchema = new mongoose.Schema({

    title: {
        type: String,
        trim: true,
        required: [true, 'Title is required'],
        maxlength: 70,
    },

    description: {
        type: String,
        trim: true,
        required: [true, 'Description is required'],
    },
    price: {
        type: String,
        trim: true,
        required: [true, 'Price is required'],
    },
    location: {
        type: String,
    },
    available: {
        type: Boolean,
        default: true
    },
    bookType: {
        type: ObjectId,
        ref: "BookType",
        required: true
    },
    user: {
        type: ObjectId,
        ref: "User",
        required: true
    },



}, { timestamps: true })

module.exports = mongoose.model("Book", bookSchema);