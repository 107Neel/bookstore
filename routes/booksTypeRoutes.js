const express = require('express');
const router = express.Router();
const { createBookType, allBooksType, updateBookType, deleteBookType } = require('../controllers/booksTypeController');
const { isAuthenticated, isAdmin } = require('../middleware/auth');

router.post('/type/create', isAuthenticated, isAdmin, createBookType)

router.get('/type/books', allBooksType)

router.put('/type/update/:type_id', isAuthenticated, isAdmin, updateBookType)

router.delete('/type/delete/:type_id', isAuthenticated, isAdmin, deleteBookType)

module.exports = router;