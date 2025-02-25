import React, { useState, useEffect } from 'react';
import { FaSearch, FaEdit, FaTrash, FaBook } from 'react-icons/fa';
import { backendUrl } from '../backend/backend';

const Books = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [books, setBooks] = useState([]); // Replace with your actual data or API call

  const userData = JSON.parse(localStorage.getItem('userData'));
  const userRole = userData?.user?.role;
  

  useEffect(() => {
    const fetchBooks = async () => {
      const response = await fetch(`${backendUrl}/api/users/my-books`, {
        headers: {
          'Authorization': `Bearer ${userData?.token}`
        }
      });
      const data = await response.json();
      console.log(data?.data);
      setBooks(data?.data);
    };

    fetchBooks();
  }, []);

  const filteredBooks = books.filter(book => 
    book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    book.author.toLowerCase().includes(searchTerm.toLowerCase())
  );

  //const openBookPreview = (url) => {
    // Convert view/edit URL to preview URL
  ///  const previewUrl = url.replace(/\/view\?usp=.*$/, '/preview');
   // window.open(previewUrl, '_blank');
  //};
const openBookPreview = (url) => {
  window.open(url, "_blank"); // Opens in a new tab
};

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-4 md:mb-0">
          Books Management
        </h1>
        
        {/* Search Bar */}
        <div className="relative w-full md:w-96">
          <input
            type="text"
            placeholder="Search books..."
            className="w-full p-3 pl-12 border border-gray-200 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
        </div>
      </div>

      {/* Books Grid for Mobile */}
      <div className="grid grid-cols-1 gap-4 md:hidden">
        {filteredBooks.map((book) => (
          <div key={book.id} className="bg-white rounded-lg shadow-md p-4">
            <h3 className="font-semibold text-lg text-gray-800">{book.title}</h3>
            <p className="text-gray-600 mb-2">{book.author}</p>
            <p className="text-blue-600 font-medium mb-3">KES {book.bookingCost}</p>
            <div className="flex gap-2">
              <button 
                onClick={() => openBookPreview(book.bookUrl)}
                className="flex items-center gap-2 px-4 py-2 bg-blue-50 text-blue-600 rounded-md hover:bg-blue-100 transition duration-200"
              >
                <FaBook /> Read
              </button>
              {userRole === 'admin' && (
                <>
                  <button className="flex items-center gap-2 px-4 py-2 bg-gray-50 text-gray-600 rounded-md hover:bg-gray-100">
                    <FaEdit /> Edit
                  </button>
                  <button className="flex items-center gap-2 px-4 py-2 bg-red-50 text-red-600 rounded-md hover:bg-red-100">
                    <FaTrash /> Delete
                  </button>
                </>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Books Table for Desktop */}
      <div className="hidden md:block overflow-hidden rounded-lg border border-gray-200 shadow-sm">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">Title</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">Author</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">Price</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 bg-white">
            {filteredBooks.map((book) => (
              <tr key={book.id} className="hover:bg-gray-50 transition duration-200">
                <td className="px-6 py-4 text-sm text-gray-800">{book.title}</td>
                <td className="px-6 py-4 text-sm text-gray-600">{book.author}</td>
                <td className="px-6 py-4 text-sm text-blue-600 font-medium">
                  KES {book.bookingCost}
                </td>
                <td className="px-6 py-4">
                  <div className="flex gap-2">
                    <button 
                      onClick={() => openBookPreview(book.bookUrl)}
                      className="flex items-center gap-2 px-4 py-2 bg-blue-50 text-blue-600 rounded-md hover:bg-blue-100 transition duration-200"
                    >
                      <FaBook /> Read
                    </button>
                    {userRole === 'admin' && (
                      <>
                        <button className="flex items-center gap-2 px-4 py-2 bg-gray-50 text-gray-600 rounded-md hover:bg-gray-100">
                          <FaEdit /> Edit
                        </button>
                        <button className="flex items-center gap-2 px-4 py-2 bg-red-50 text-red-600 rounded-md hover:bg-red-100">
                          <FaTrash /> Delete
                        </button>
                      </>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Empty State */}
      {filteredBooks.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">No books found matching your search.</p>
        </div>
      )}
    </div>
  );
};

export default Books;
