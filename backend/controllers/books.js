const Book = require('../models/book');

const createBook = async (req, res) => {
  const { title, author, teaserUrl, bookUrl, description, bookingCost, coverImage } = req.body;

  if (!title || !author || !teaserUrl || !bookUrl || !description || !bookingCost || !coverImage) {
    return res.status(400).json({ message: 'Provide a value for: title, author, teaserUrl, bookUrl, description, bookingCost' });
  }

  const book = new Book({ title, author, teaserUrl, bookUrl, description, bookingCost, coverImage });
  await book.save();
  res.status(201).json(book);

};

const updateBookPrice=async (req, res) =>  {
  const{bookid,bookingCost } =req.body
  const book= await Book.findById({"_id":bookid})
if(!book){ return res.send("book not found")}
book.bookingCost=bookingCost
await book.save()
return res.send("successful")
}

const getBooks = async (req, res) => {
  const user = req.user;
  const books = await Book.find();
  res.json(books);

};


const getBookById = async (req, res) => {
  const { id } = req.params;
  const book = await Book.findById(id);
  res.json(book);
};


module.exports = { createBook, getBooks, getBookById, updateBookPrice};
