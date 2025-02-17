const Payment = require('../models/payments');
const Book = require('../models/book');
const User = require('../models/user');


const getPayments = async (req, res) => {
    const payments = await Payment.find()
        .populate('book', 'title author bookingCost')
        .populate('user', 'name email');
    res.status(200).json({ payments });
}




const buyBook = async (req, res) => {
    const { bookId, userId } = req.body;


    const book = await Book.findById(bookId);
    const user = await User.findById(userId);

    if (!book || !user) {
        return res.status(404).json({ message: 'Book or user not found' });
    }

    const payment = new Payment({
        book: bookId,
        user: userId,
    });

    await payment.save();

    res.status(201).json({ message: 'Book purchased successfully', payment });
}


const addPaymentReference = async (req, res) => {
    const { paymentId, paymentReference, status } = req.body;

    const payment = await Payment.findByIdAndUpdate(paymentId, { paymentReference });
    payment.paymentStatus = status;
    await payment.save();

    const user = await User.findById(payment.user);
    console.log(user);
    user.books.push(payment.book);
    await user.save();


    if (payment.paymentStatus == 'Completed') {
        await Payment.deleteMany({ paymentStatus: 'Pending' });
    }


    res.status(200).json({ message: 'Payment reference added successfully', payment });

}

module.exports = { buyBook, addPaymentReference, getPayments };
