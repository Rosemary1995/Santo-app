const express = require('express');
const router = express.Router();
const { buyBook, addPaymentReference, getPayments } = require('../controllers/buybook');

router.get('/', getPayments);
router.post('/buybook', buyBook);
router.post('/addpaymentreference', addPaymentReference);


module.exports = router;
