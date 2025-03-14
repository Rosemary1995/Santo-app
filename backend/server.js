const express = require('express');
const Stripe = require('stripe');
const cors = require('cors');
const morgan = require('morgan');
const { connect_database } = require('./db');

const stripe = Stripe('your-stripe-secret-key');
const app = express();

// ✅ Connect to Database
connect_database();

// ✅ CORS Configuration
const allowedOrigins = ['https://santo-app.vercel.app', 'http://localhost:3000'];

app.use(cors({
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
}));

// ✅ Handle preflight requests
app.options('*', cors());

// ✅ Middleware
app.use(express.json());
app.use(morgan('dev'));

// ✅ Import Routes
const authRoutes = require('./routes/auth');
const authMiddleware = require('./middlewares/auth');
const booksRoutes = require('./routes/books');
const userRoutes = require('./routes/users');
const paymentRoutes = require('./routes/payments');

// ✅ Routes
app.get('/', (req, res) => {
  res.status(200).json({ message: 'Hello World' });
});

app.use('/api/auth', authRoutes);
app.use('/api/books', booksRoutes);
app.use('/api/users', authMiddleware, userRoutes);
app.use('/api/payments', paymentRoutes);

// ✅ Protected Route Example
app.get('/protected', authMiddleware, (req, res) => {
  res.json({ message: 'Access granted', user: req.user });
});

// ✅ Payment Route (Stripe)
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

// ✅ Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

