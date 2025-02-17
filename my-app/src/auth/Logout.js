import React from'react';
import { signOut } from 'firebase/auth';
import { auth } from "../firebase/firebase";


const Logout = () => {
const handleLogout = async () => {
  try {
    await signOut(auth);
    console.log('User logged out');
    window.location.href = '/';
  } catch (error) {
    console.error('Error logging out:', error.message);
  }
}
  return (
    <div className="logout-container">
      <h1 className="logout-title">Goodbye!</h1>
      <p className="logout-message">Thank you for visiting. Come back soon!</p>
      <button onClick={handleLogout} className="logout-button">Logout</button>
    </div>
  );

};
export default Logout;