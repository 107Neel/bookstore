const BookType = require('../models/bookTypeModel');
const ErrorResponse = require('../utils/errorResponse');


exports.createBookType = async (req, res, next) => {
    try {
        const bookT = await BookType.create({
            bookTypeName: req.body.bookTypeName,
            user: req.user.id
        });
        res.status(201).json({
            success: true,
            bookT
        })
    } catch (error) {
        next(error);
    }
}



exports.allBooksType = async (req, res, next) => {
    try {
        const bookT = await BookType.find().sort({ createdAt: -1 });
        res.status(200).json({
            success: true,
            bookT
        })
    } catch (error) {
        next(error);
    }
}


exports.updateBookType = async (req, res, next) => {
    try {
        const bookT = await BookType.findByIdAndUpdate(req.params.type_id, req.body, { new: true });
        res.status(200).json({
            success: true,
            bookT
        })
    } catch (error) {
        next(error);
    }
}



exports.deleteBookType = async (req, res, next) => {
    try {
        const bookT = await BookType.findByIdAndRemove(req.params.type_id);
        res.status(200).json({
            success: true,
            message: "Book type deleted"
        })
    } catch (error) {
        next(new ErrorResponse("server error", 500));
    }
}