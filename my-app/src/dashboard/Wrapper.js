import React, { useState } from 'react';
import { Link, Outlet } from 'react-router-dom';
import { FaBook, FaMoneyBill } from 'react-icons/fa';

const Wrapper = () => {
  const [isOpen, setIsOpen] = useState(true);
  // This should come from your auth context or state management
  const userData = JSON.parse(localStorage.getItem('userData'));
  const userRole = userData?.user?.role;


  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className={`bg-gray-800 text-white ${isOpen ? 'w-64' : 'w-20'} transition-width duration-300`}>
        <div className="p-4">
          <button onClick={toggleSidebar} className="w-full text-left mb-6">
            <span className="text-xl font-semibold">
              {isOpen ? 'Dashboard' : '≡'}
            </span>
          </button>
          
          <nav className="space-y-2">
            {userRole === 'admin' ? (
              <>
                <Link
                  to="/dashboard/books"
                  className="flex items-center p-3 hover:bg-gray-700 rounded"
                >
                  <FaBook className="mr-3" />
                  {isOpen && <span>Books</span>}
                </Link>
                <Link
                  to="/dashboard/payments"
                  className="flex items-center p-3 hover:bg-gray-700 rounded"
                >
                  <FaMoneyBill className="mr-3" />
                  {isOpen && <span>Payments</span>}
                </Link>
                <Link
                  to="/dashboard/new-book"
                  className="flex items-center p-3 hover:bg-gray-700 rounded"
                >
                  <FaMoneyBill className="mr-3" />
                  {isOpen && <span>Add Book</span>}
                </Link>
              </>
            ) : (
              <>
                <Link
                  to="/dashboard/my-books"
                  className="flex items-center p-3 hover:bg-gray-700 rounded"
                >
                  <FaBook className="mr-3" />
                  {isOpen && <span>My Books</span>}
                </Link>
                <Link
                  to="/dashboard/payments"
                  className="flex items-center p-3 hover:bg-gray-700 rounded"
                >
                  <FaMoneyBill className="mr-3" />
                  {isOpen && <span>Payments</span>}
                </Link>
              </>
            )}
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        <div className="p-6">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Wrapper;
