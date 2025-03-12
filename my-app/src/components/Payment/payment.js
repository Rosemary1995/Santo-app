import React, { useState, useEffect } from 'react';
import PaystackPop from '@paystack/inline-js';
import { useLocation } from 'react-router-dom';
import { backendUrl } from '../../backend/backend';
import './Payment.css';

function Payment() {
  const [paymentStatus, setPaymentStatus] = useState('');
  const [paymentId, setPaymentId] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const location = useLocation();
  const book = location.state;
  
  const user = JSON.parse(localStorage.getItem('userData')) || {};
  const userId = user?.user?._id;

  useEffect(() => {
    const buyBook = async () => {
      if (!userId || !book?._id) {
        console.error('User ID or Book ID is missing!');
        return;
      }

      try {
        const response = await fetch(`${backendUrl}/api/payments/buybook`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ userId, bookId: book?._id }),
        });

        if (!response.ok) throw new Error('Failed to buy book');
        const data = await response.json();
        console.log('Book purchase initialized:', data);
        setPaymentId(data?.payment?._id);
      } catch (error) {
        console.error('Error buying book:', error);
      }
    };

    if (!paymentId) buyBook();
  }, [userId, book, paymentId]);

  const handlePayment = async () => {
    if (!paymentId) {
      console.error('Payment ID is missing, cannot proceed.');
      setPaymentStatus('Error: Payment ID missing. Please click again.');
      return;
    }

    setIsProcessing(true);
    try {
      const paystack = new PaystackPop();
      paystack.newTransaction({
        key: 'pk_live_178fa4c61633208ff064de2414b0b1573430b8e2',
        email: user?.user?.email,
        amount: book?.bookingCost * 100, // Convert to kobo/cents
        currency: 'KES',
        ref: `REF-${Date.now()}`, // Unique transaction reference
        metadata: {
          book_id: book?._id,
          payment_id: paymentId,
        },
        onSuccess: async (transaction) => {
          console.log('Payment successful! Reference:', transaction.reference);

          try {
            const response = await fetch(`${backendUrl}/api/payments/addpaymentreference`, {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                paymentId,
                status: 'Completed',
                reference: transaction.reference,
              }),
            });

            if (!response.ok) throw new Error('Failed to update payment status');
            console.log('Payment status updated:', await response.json());

            window.location.href = '/dashboard/my-books';
          } catch (error) {
            console.error('Error updating payment:', error);
          }
        },
        onCancel: () => console.warn('Payment cancelled by user'),
      });
    } catch (error) {
      console.error('Payment failed:', error);
      setPaymentStatus('Payment failed. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  if (!book) {
    return (
      <div className="payment-container">
        <h2>No book selected for purchase</h2>
      </div>
    );
  }

  return (
    <div className="payment-container">
      <div className="payment-card">
        <h2>Complete Your Purchase</h2>
        <div className="order-summary">
          <div className="book-details">
            <img src={book.coverImage || 'default-book-cover.jpg'} alt={book.title} className="book-thumbnail" />
            <div className="book-info">
              <h4>{book.title}</h4>
              <p className="price">ksh{book.bookingCost}</p>
            </div>
          </div>
        </div>

        <div className="payment-form">
          <button className={`payment-button ${isProcessing ? 'processing' : ''}`} onClick={handlePayment} disabled={isProcessing}>
            {isProcessing ? 'Processing...' : `Pay ksh${book.bookingCost}`}
          </button>

          {paymentStatus && (
            <div className={`payment-status ${paymentStatus.includes('failed') ? 'error' : 'success'}`}>
              {paymentStatus}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Payment;
