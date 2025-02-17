const mongoose = require('mongoose');

const paymentSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    book: { type: mongoose.Schema.Types.ObjectId, ref: 'Book', required: true },
    amount: { type: Number, required: false },
    paymentReference: { type: String, required: false },
    paymentLink: { type: String, required: false },
    paymentDate: { type: Date, default: Date.now },

    paymentStatus: { type: String, enum: ['Pending', 'Completed', 'Failed'], default: 'Pending' },
});

const Payment = mongoose.model('Payment', paymentSchema);

module.exports = Payment;
