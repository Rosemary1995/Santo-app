
const mongoose = require('mongoose');

const MONGO_URI = "mongodb+srv://12345:m0PEMUNdR3qG6rqB@cluster0.i9npa.mongodb.net/12345?retryWrites=true&w=majority&appName=Cluster0";

const connect_database = async () => {
    try {
        await mongoose.connect(MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('MongoDB connected successfully');
    } catch (error) {
        console.error('MongoDB connection error:', error);
        process.exit(1);
    }
};

module.exports = { connect_database };
