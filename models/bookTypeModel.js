const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema;


const bookTypeSchema = new mongoose.Schema({

    bookTypeName: {
        type: String,
        trim: true,
        required: [true, 'book category is required'],
        maxlength: 70,
    },

    user: {
        type: ObjectId,
        ref: "User",
        required: true
    },



}, { timestamps: true })

module.exports = mongoose.model("BookType", bookTypeSchema);