const express = require('express');
const router = express.Router();
const { getMyBooks, addBookToUser } = require('../controllers/user');
const auth = require('../middlewares/auth');

router.get('/my-books', getMyBooks);
router.post('/assign-book', addBookToUser);

module.exports = router;
