import logo from './logo.svg';
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { ProtectedRoute } from './components/ProtectedRoute';
import Login from './auth/Login';
import Logout from "./auth/Logout";
import Signup from "./auth/Signup";
import BookList from './components/Books/BookList';
import BookItem from "./components/Books/BookItem";
import Payment from './components/Payment/payment';
import Navbar from './components/Navbar/Navbar';
import HomePage from "./components/Pages/HomePage";
import AboutPage from "./components/Pages/AboutPage";
import ContactUs from "./components/Contact/ContactUs";
import Wrapper from './dashboard/Wrapper';
import Books from './dashboard/Books';
import Payments from './dashboard/Payments';
import NewBook from './components/Books/NewBook';
function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/logout" element={<Logout />} />
          <Route
            path="/books"
            element={
              <ProtectedRoute>
                <BookList />
              </ProtectedRoute>
            }
          />
          <Route
            path="/bookitem"
            element={
              <ProtectedRoute>
                <BookItem />
              </ProtectedRoute>
            }
          />
          <Route
            path="/payment"
            element={
              <ProtectedRoute>
                <Payment />
              </ProtectedRoute>
            }
          />
          <Route path="/navbar" element={<Navbar/>} />
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<ContactUs />} />
          <Route path="/dashboard" element={<Wrapper />}>
            <Route path="books" element={<Books />} />
            <Route path="my-books" element={<Books />} />
            <Route path="payments" element={<Payments />} />
            <Route path="new-book" element={<NewBook />} />
          </Route>
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
