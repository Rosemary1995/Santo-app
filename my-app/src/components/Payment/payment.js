import React, { useState, useEffect } from 'react';
import PaystackPop from '@paystack/inline-js';
import { useLocation } from 'react-router-dom';
import { loadStripe } from '@stripe/stripe-js';
import './Payment.css';

const stripePromise = loadStripe('your-stripe-publishable-key');

function Payment() {
  const [paymentStatus, setPaymentStatus] = useState('');
  const [paymentId, setPaymentId] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const location = useLocation();
  const book = location.state;
  

  const user = JSON.parse(localStorage.getItem('userData'));
  const userId = user?.user?._id;

  useEffect(() => {
    const buyBook = async () => {
      const response = await fetch(`https://santo-app.onrender.com/api/payments/buybook`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userId, bookId: book?._id }),
      });
      if (response.ok) {
        const data = await response.json();
        setPaymentId(data?.payment?._id);
      }
    };
    if(!paymentId){
      buyBook();
    }
  }, [userId, book]);


  console.log({ paymentId })


  const handlePayment = async () => {
    setIsProcessing(true);
    try {
      const paystack = new PaystackPop();
    paystack.newTransaction({
      key: 'pk_live_178fa4c61633208ff064de2414b0b1573430b8e2', // Replace with your Paystack public key
      email: user?.user?.email,
      amount: book?.bookingCost * 100, // Convert to kobo/cents
      currency: 'KES', // Kenyan Shillings
     
      

      ref: `${Math.floor(Math.random() * 1000000000 + 1)}`, // Generate reference
      firstname: user?.user?.name,
      phone: "0706453789",

      metadata: {
        book_id: book?._id,
        payment_id: paymentId
      },

      onSuccess: async (transaction) => {
        console.log(`Payment complete! Reference: ${transaction.reference}`);
        // Handle successful payment here

        try {
          const response = await fetch(`https://santo-app.onrender.com/api/payments/addpaymentreference`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ 
              paymentId: paymentId,
              status: 'Completed',
              reference: transaction.reference
             }),
          });

          if (response.ok) {
            const data = await response.json();
            console.log(data);
            window.location.href = '/dashboard';
          }
        } catch (error) {
          console.log(error);
        }

        console.log({ transaction, paymentId, book });
      },
      onCancel: () => {
        console.log('Transaction cancelled');
      }

    });
    } catch (error) {
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
            <img 
              src={book.coverImage || 'default-book-cover.jpg'} 
              alt={book.title}
              className="book-thumbnail"
            />
            <div className="book-info">
              <h4>{book.title}</h4>
              <p className="price">ksh{book.bookingCost}</p>
            </div>
          </div>
        </div>

        <div className="payment-form">
          <button 
            className={`payment-button ${isProcessing ? 'processing' : ''}`}
            onClick={handlePayment}
            disabled={isProcessing}
          >
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
