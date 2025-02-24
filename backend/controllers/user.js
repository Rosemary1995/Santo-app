const User = require('../models/user');
const Book = require('../models/book');

const getMyBooks = async (req, res) => {
    try {
        const user = await User.findById(req.user.userId);

        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'User not found'
            });
        }

        // If user is admin, return all books
        if (user.role === 'admin') {
            const allBooks = await Book.find({})
                .select('title author price description bookUrl coverImage bookingCost');
            
            return res.status(200).json({
                success: true,
                count: allBooks.length,
                data: allBooks
            });
        }

        // For regular users, return only their books
        const userWithBooks = await User.findById(req.user.userId)
            .populate({
                path: 'books',
                select: 'title author price description bookUrl coverImage bookingCost'
            });

        res.status(200).json({
            success: true,
            count: userWithBooks.books.length,
            data: userWithBooks.books
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error fetching books',
            error: error.message
        });
    }
};

const addBookToUser = async (req, res) => {
    try {
        
        const { bookId, userId } = req.body;

        console.log(req.body);

        // Find the user and update their books array
        const user = await User.findById(userId);


        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'User not found'
            });
        }

        // Check if book already exists in user's collection
        if (user.books.includes(bookId)) {
            return res.status(400).json({
                success: false,
                message: 'Book already in your collection'
            });
        }

        // Add the book to user's collection
        user.books.push(bookId);
        await user.save();

        res.status(200).json({
            success: true,
            message: 'Book added to your collection successfully',
            data: user.books
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error adding book to collection',
            error: error.message
        });
    }
};

module.exports = { 
    getMyBooks,
    addBookToUser 
};
