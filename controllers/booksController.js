const Book = require('../models/bookModel');
const BookType = require('../models/bookTypeModel');
const ErrorResponse = require('../utils/errorResponse');


exports.createBook = async (req, res, next) => {
    try {
        const book = await Book.create({
            title: req.body.title,
            description: req.body.description,
            price: req.body.price,
            location: req.body.location,
            bookType: req.body.bookType,
            user: req.user.id
        });
        res.status(201).json({
            success: true,
            book
        })
    } catch (error) {
        next(error);
    }
}



exports.singleBook = async (req, res, next) => {
    try {
        const book = await Book.findById(req.params.id);
        res.status(200).json({
            success: true,
            book
        })
    } catch (error) {
        next(error);
    }
}



exports.updateBook = async (req, res, next) => {
    try {
        const book = await Book.findByIdAndUpdate(req.params.book_id, req.body, { new: true }).populate('bookType', 'bookTypeName').populate('user', 'firstName lastName');
        res.status(200).json({
            success: true,
            book
        })
    } catch (error) {
        next(error);
    }
}



exports.showBooks = async (req, res, next) => {

    
    const keyword = req.query.keyword ? {
        title: {
            $regex: req.query.keyword,
            $options: 'i'
        }
    } : {}


    
    let ids = [];
    const bookTypeCategory = await BookType.find({}, { _id: 1 });
    bookTypeCategory.forEach(cat => {
        ids.push(cat._id);
    })

    let cat = req.query.cat;
    let categ = cat !== '' ? cat : ids;


    
    let locations = [];
    const bookByLocation = await Book.find({}, { location: 1 });
    bookByLocation.forEach(val => {
        locations.push(val.location);
    });
    let setUniqueLocation = [...new Set(locations)];
    let location = req.query.location;
    let locationFilter = location !== '' ? location : setUniqueLocation;


   
    const pageSize = 5;
    const page = Number(req.query.pageNumber) || 1;
   
    const count = await Book.find({ ...keyword, bookType: categ, location: locationFilter }).countDocuments();

    try {
        const books = await Book.find({ ...keyword, bookType: categ, location: locationFilter }).sort({ createdAt: -1 }).populate('bookType', 'bookTypeName').populate('user', 'firstName').skip(pageSize * (page - 1)).limit(pageSize)
        res.status(200).json({
            success: true,
            books,
            page,
            pages: Math.ceil(count / pageSize),
            count,
            setUniqueLocation

        })
    } catch (error) {
        next(error);
    }
}