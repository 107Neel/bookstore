const express = require('express');
const router = express.Router();
const { createBook, singleBook, updateBook, showBooks } = require('../controllers/booksController');
const { isAuthenticated, isAdmin } = require('../middleware/auth');

router.post('/book/create', isAuthenticated, isAdmin, createBook);

router.get('/book/:id', singleBook);

router.put('/book/update/:book_id', isAuthenticated, isAdmin, updateBook);

router.get('/books/show', showBooks);

module.exports = router;