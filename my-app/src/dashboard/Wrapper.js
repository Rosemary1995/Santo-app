import React, { useState, useEffect } from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import { FaBook, FaMoneyBill, FaPlus, FaBars, FaTimes } from 'react-icons/fa';

const Wrapper = () => {
  const [isOpen, setIsOpen] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const location = useLocation();
  
  // This should come from your auth context or state management
  const userData = JSON.parse(localStorage.getItem('userData'));
  const userRole = userData?.user?.role;

  // Handle responsive behavior
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
      setIsOpen(window.innerWidth >= 768);
    };

    handleResize(); // Initial check
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  // Helper function to check if link is active
  const isActiveLink = (path) => location.pathname === path;

  const NavLink = ({ to, icon: Icon, children }) => (
    <Link
      to={to}
      className={`flex items-center p-3 rounded-lg transition-all duration-200 
        ${isActiveLink(to) 
          ? 'bg-indigo-600 text-white' 
          : 'hover:bg-gray-700'}`}
    >
      <Icon className={`${isOpen ? 'mr-3' : 'mx-auto'} text-xl`} />
      {isOpen && <span className="font-medium">{children}</span>}
    </Link>
  );

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Mobile Overlay */}
      {isMobile && isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-20"
          onClick={toggleSidebar}
        />
      )}

      {/* Sidebar */}
      <div 
        className={`fixed md:static bg-gray-800 text-white h-full z-30
          ${isOpen ? 'w-64' : 'w-20'} 
          ${isMobile && !isOpen ? '-translate-x-full' : 'translate-x-0'}
          transition-all duration-300 ease-in-out`}
      >
        <div className="p-4">
          <div className="flex items-center justify-between mb-6">
            <h1 className={`font-bold ${isOpen ? 'text-xl' : 'text-center w-full'}`}>
              {isOpen ? 'Dashboard' : '≡'}
            </h1>
            <button 
              onClick={toggleSidebar}
              className={`p-2 rounded-lg hover:bg-gray-700 ${!isOpen && 'hidden'}`}
            >
              {isOpen ? <FaTimes /> : <FaBars />}
            </button>
          </div>
          
          <nav className="space-y-2">
            {userRole === 'admin' ? (
              <>
                <NavLink to="/dashboard/books" icon={FaBook}>Books</NavLink>
                <NavLink to="/dashboard/payments" icon={FaMoneyBill}>Payments</NavLink>
                <NavLink to="/dashboard/new-book" icon={FaPlus}>Add Book</NavLink>
              </>
            ) : (
              <>
                
                <a href="/" className="hero-button bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition duration-200">
   Home page
  </a>
                <NavLink to="/dashboard/my-books" icon={FaBook}> Click to view My paid Books</NavLink>
                <NavLink to="/dashboard/payments" icon={FaMoneyBill}>Payments</NavLink>
              </>
            )}
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        <div className="sticky top-0 bg-white shadow-sm z-10 p-4 md:hidden">
          <button 
            onClick={toggleSidebar}
            className="p-2 rounded-lg hover:bg-gray-100"
          >
            <FaBars className="text-xl" />
          </button>
        </div>
        <div className="p-6">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Wrapper;
