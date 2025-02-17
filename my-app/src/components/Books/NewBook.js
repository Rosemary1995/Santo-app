import React, { useState } from 'react';
import { backendUrl } from '../../backend/backend';

const NewBook = () => {
  const [bookData, setBookData] = useState({
    title: '',
    author: '',
    bookingCost: '',
    description: '',
    coverImage: '',
    teaserUrl: '',
    bookUrl: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBookData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    // TODO: Add logic to submit the book data to your backend
    const response = await fetch(`${backendUrl}/api/books`, {
      method: 'POST',
      body: JSON.stringify(bookData),
      headers: {
        'Content-Type': 'application/json'
      }
    });
    console.log('Book Data:', bookData);
    if (response.ok) {
      alert('Book added successfully');
      window.location.href = '/dashboard';
    } else {
      alert('Failed to add book');
    }

  };


  return (
    <div className="container mx-auto px-4 mt-8">
      <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-md">
        <div className="border-b border-gray-200 p-4">
          <h4 className="text-xl font-semibold">Add New Book</h4>
        </div>
        <div className="p-6">
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="title">
                Title
              </label>
              <input
                type="text"
                id="title"
                name="title"
                value={bookData.title}
                onChange={handleChange}
                required
                placeholder="Enter book title"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="author">
                Author
              </label>
              <input
                type="text"
                id="author"
                name="author"
                value={bookData.author}
                onChange={handleChange}
                required
                placeholder="Enter author name"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="bookingCost">
                Booking Cost
              </label>
              <input
                type="number"
                id="bookingCost"
                name="bookingCost"
                value={bookData.bookingCost}
                onChange={handleChange}
                required
                placeholder="Enter booking cost"
                min="0"
                step="0.01"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="description">
                Description
              </label>
              <textarea
                id="description"
                name="description"
                value={bookData.description}
                onChange={handleChange}
                required
                placeholder="Enter book description"
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="mb-6">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="coverImage">
                Cover Image
              </label>
              <input
                type="url"
                id="coverImage"
                name="coverImage"
                value={bookData.coverImage}
                onChange={handleChange}
                required
                placeholder="Enter cover image URL"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="teaserUrl">
                Teaser URL
              </label>
              <input
                type="url"
                id="teaserUrl"
                name="teaserUrl"
                value={bookData.teaserUrl}
                onChange={handleChange}
                required
                placeholder="Enter teaser URL"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="mb-6">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="bookUrl">
                Book URL
              </label>
              <input
                type="url"
                id="bookUrl"
                name="bookUrl"
                value={bookData.bookUrl}
                onChange={handleChange}
                required
                placeholder="Enter book URL"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-blue-500 text-white font-bold py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition-colors"
            >
              Add Book
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default NewBook;
