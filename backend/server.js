const express = require('express');
const cors = require('cors');
const Stripe = require('stripe');
const morgan = require('morgan');
const { connect_database } = require('./db');

const stripe = Stripe('your-stripe-secret-key');
const app = express();

connect_database();

app.use(cors({ origin: 'http://localhost:3000' }));


app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

const authRoutes = require('./routes/auth');
const authMiddleware = require('./middlewares/auth');
const booksRoutes = require('./routes/books');
const userRoutes = require('./routes/users');
const paymentRoutes = require('./routes/payments');



// Routes
//app.use('/api/auth', authRoutes);



app.get('/', (req, res) => {
  res.json({ message: 'Hello World' }).status(200);
});


// Auth Routes
app.use('/api/auth', authRoutes);

// Books Routes
app.use('/api/books', booksRoutes);

// User Routes
app.use('/api/users', authMiddleware, userRoutes);

// Create a payment session
app.use('/api/payments', paymentRoutes);


// Protected Routes


app.get('/protected', authMiddleware, (req, res) => {
  res.json({ message: 'Access granted', user: req.user });
});




app.post('/create-payment-intent', async (req, res) => {
  try {
    const { amount } = req.body;
    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency: 'usd',
    });
    res.status(200).json({ clientSecret: paymentIntent.client_secret });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
