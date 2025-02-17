const User = require('../models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Input validation
    if (!email || !password) {
      return res.status(400).json({ 
        success: false, 
        message: 'Email and password are required' 
      });
    }

    // Find user by email
    const user = await User.findOne({ email });
    
    // Check if user exists
    if (!user) {
      return res.status(401).json({ 
        success: false, 
        message: 'Invalid email or password' 
      });
    }

    // Compare password with hashed password in database
    const isPasswordValid = await bcrypt.compare(password, user.password);
    
    if (!isPasswordValid) {
      return res.status(401).json({ 
        success: false, 
        message: 'Invalid email or password' 
      });
    }

    // Generate JWT token
    const token = jwt.sign(
      { userId: user._id, email: user.email, name: user.name, books: user.books },
      "1234567890",
      { expiresIn: '24h' }
    );

    // Return user data and token (excluding password)
    const userWithoutPassword = {
      _id: user._id,
      email: user.email,
      name: user.name,
      books: user.books,
      role: user.role,
      // Add other user fields as needed
    };

    res.status(200).json({
      success: true,
      user: userWithoutPassword,
      token
    });

  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'An error occurred during login' 
    });
  }
};

module.exports = login;
