import React, { useState, useEffect } from 'react';
import { FaSearch } from 'react-icons/fa';
import { backendUrl } from '../backend/backend';

const Books = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [books, setBooks] = useState([]); // Replace with your actual data or API call

  const userData = JSON.parse(localStorage.getItem('userData'));
  const userRole = userData?.user?.role;
  console.log(userData);



  useEffect(() => {
    const fetchBooks = async () => {
      const response = await fetch(`${backendUrl}/api/users/my-books`, {
        headers: {
          'Authorization': `Bearer ${userData?.token}`
        }
      });
      const data = await response.json();
      console.log(data);
      setBooks(data?.data);
    };


    fetchBooks();
  }, []);

  const filteredBooks = books.filter(book => 
    book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    book.author.toLowerCase().includes(searchTerm.toLowerCase())
  );
  const extractFileId = (url) => {
    const match = url.match(/\/d\/(.*?)\//);
    return match ? match[1] : null;
  };

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">Books Management</h1>
      
      {/* Search Bar */}
      <div className="relative">
        <input
          type="text"
          placeholder="Search books..."
          className="w-full p-2 pl-10 border rounded"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <FaSearch className="absolute left-3 top-3 text-gray-400" />
      </div>

      {/* Books Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border rounded">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Title</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Author</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Price</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {filteredBooks.map((book) => (
              <tr key={book.id}>
                <td className="px-6 py-4">{book.title}</td>
                <td className="px-6 py-4">{book.author}</td>
                <td className="px-6 py-4">KES.{book.bookingCost}</td>
                <td className="px-6 py-4">
                  {userRole === 'admin' ? (
                    <>
                       <button 
                      className="text-blue-600 hover:text-blue-800 mr-2"
                      onClick={() => {
                        const fileId = extractFileId("https://drive.google.com/file/d/1vCA34whMOWJXinSdW-zgS4zRUe2MTTU7/view?usp=drive_link");
                        if (fileId) {
                          window.open(`https://drive.google.com/file/d/${fileId}/preview`, '_blank');
                        } else {
                          alert('Invalid book URL');
                        }
                      }}
                    >
                      Read
                    </button>
                      <button className="text-blue-600 hover:text-blue-800 mr-2">Edit</button>
                      <button className="text-red-600 hover:text-red-800">Delete</button>
                    </>
                  ) : (
                   
                
                    
                    <button 
                      className="text-blue-600 hover:text-blue-800 mr-2"
                      onClick={() => {
                        const fileId = extractFileId("https://drive.google.com/file/d/1vCA34whMOWJXinSdW-zgS4zRUe2MTTU7/view?usp=drive_link");
                        if (fileId) {
                          window.open(`https://drive.google.com/file/d/${fileId}/preview`, '_blank');
                        } else {
                          alert('Invalid book URL');
                        }
                      }}
                    >
                      Read
                    </button>
                    
                  )}
                </td>


              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Books;
