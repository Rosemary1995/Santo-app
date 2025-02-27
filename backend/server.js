const express = require('express');
const cors = require('cors');
const Stripe = require('stripe');
const morgan = require('morgan');
const { connect_database } = require('./db');

const stripe = Stripe('your-stripe-secret-key');
const app = express();

connect_database();

// ✅ Improved CORS Configuration
const allowedOrigins = [
  'http://localhost:3000', // Local Frontend
  'https://santo-app.vercel.app' // Deployed Frontend
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('CORS policy does not allow this origin'));
    }
  },
  credentials: true, // Allow cookies/sessions if needed
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE', // Allowed methods
  allowedHeaders: 'Content-Type,Authorization', // Allowed headers
}));

app.use(express.json());
app.use(morgan('dev'));

// Import Routes
const authRoutes = require('./routes/auth');
const authMiddleware = require('./middlewares/auth');
const booksRoutes = require('./routes/books');
const userRoutes = require('./routes/users');
const paymentRoutes = require('./routes/payments');

// ✅ Test Route
app.get('/', (req, res) => {
  res.status(200).json({ message: 'Hello World' });
});

// ✅ API Routes
app.use('/api/auth', authRoutes);
app.use('/api/books', booksRoutes);
app.use('/api/users', authMiddleware, userRoutes);
app.use('/api/payments', paymentRoutes);

// ✅ Protected Route (Requires Authentication)
app.get('/protected', authMiddleware, (req, res) => {
  res.status(200).json({ message: 'Access granted', user: req.user });
});

// ✅ Create a Payment Intent (Stripe)
app.post('/create-payment-intent', async (req, res) => {
  try {
    const { amount } = req.body;
    if (!amount) return res.status(400).json({ error: 'Amount is required' });

    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency: 'usd',
    });

    res.status(200).json({ clientSecret: paymentIntent.client_secret });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ✅ Global Error Handler (CORS & Other Errors)
app.use((err, req, res, next) => {
  console.error('Error:', err.message);
  if (err.message.includes('CORS')) {
    return res.status(403).json({ error: 'CORS policy error. Origin not allowed.' });
  }
  res.status(500).json({ error: err.message || 'Internal Server Error' });
});

// ✅ Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
