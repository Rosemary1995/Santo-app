const express = require('express');
const router = express.Router();
const { createBook, getBooks, getBookById, updateBookPrice} = require('../controllers/books');


router.post('/', createBook);
router.get('/', getBooks);
router.post('/update-price', updateBookPrice)
router.get('/:id', getBookById);



module.exports = router;
