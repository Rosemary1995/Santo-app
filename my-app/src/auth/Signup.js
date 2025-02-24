import React, { useState } from 'react'; 
import { NavLink, useNavigate } from 'react-router-dom';
import { backendUrl } from '../backend/backend';
import './Authform.css';

const Signup = () => {
    const navigate = useNavigate();
    
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState(null); // State for success/error message

    const onSubmit = async (e) => {
        e.preventDefault();
console.log("name")
        try {
            // Clear any existing user session
            localStorage.removeItem('userData');

            const response = await fetch(`${backendUrl}/api/auth/register`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    name,
                    email,
                    password
                })
            });

            if (response.ok) {
                setMessage({ type: 'success', text: 'User registered successfully! Please log in.' });

                setTimeout(() => {
                    navigate('/'); // Redirect to login page after 2 seconds
                }, 2000);
            } else {
                setMessage({ type: 'error', text: 'Failed to register user. Try again!' });
            }
        } catch (error) {
            console.error(error);
            setMessage({ type: 'error', text: 'Something went wrong. Please try again!' });
        }
    };

    return (
        <main className="auth-container">        
            <section className="auth-form-container">
                <h1 className="auth-title">Books App</h1>                                                                            
                <form onSubmit={onSubmit}>     
                    {message && (
                        <div className={`alert ${message.type === 'success' ? 'alert-success' : 'alert-error'}`}>
                            {message.text}
                        </div>
                    )}
                    <div className="form-group">
                        <label htmlFor="name" className="form-label">Name</label>
                        <input
                            id="name"
                            type="text"
                            className="form-input"
                            value={name}
                            onChange={(e) => setName(e.target.value)}  
                            required                                  
                            placeholder="Your name"                                
                        />
                    </div>                                                                                       

                    <div className="form-group">
                        <label htmlFor="email-address" className="form-label">Email address</label>
                        <input
                            id="email-address"
                            type="email"
                            className="form-input"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}  
                            required                                  
                            placeholder="Email address"                                
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="password" className="form-label">Password</label>
                        <input
                            id="password"
                            type="password"
                            className="form-input"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)} 
                            required                                 
                            placeholder="Password"              
                        />
                    </div>                                             

                    <button
                        type="submit" 
                        className="submit-button"                        
                    >  
                        Sign up                                
                    </button>

                    <div className="divider">
                        <span>or</span>
                    </div>

                    <p className="auth-link">
                        Already have an account?{' '}
                        <NavLink to="/">
                            Sign in
                        </NavLink>
                    </p>                   
                </form>
            </section>
        </main>
    );
};

export default Signup;
