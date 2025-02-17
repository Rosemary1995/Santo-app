import { useContext, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import AuthContext from '../context/AuthContext';

export const Login = () => {
    const [credentials, setCredentials] = useState({ email: '', password: '' });
    const [error, setError] = useState(null);
    const { login } = useContext(AuthContext);
    const navigate = useNavigate();
    const location = useLocation();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        
        try {
            // Replace with your actual API call
            const response = await fetch('/api/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(credentials)
            });

            if (!response.ok) {
                throw new Error('Login failed');
            }

            const userData = await response.json();
            await login(userData);

            // Redirect to the previous page or home
            const from = location.state?.from?.pathname || '/';
            navigate(from, { replace: true });
        } catch (err) {
            setError('Invalid credentials');
            console.error('Login error:', err);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            {error && <div className="error">{error}</div>}
            {/* Your login form fields */}
        </form>
    );
}; 