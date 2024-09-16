import React, { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import './Login.css';  // Import the CSS for styling

const Login = ({ onLoginSuccess, onClose }) => {
    const { login, user } = useContext(AuthContext);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        // Redirect to the homepage if the user is already logged in
        if (user) {
            navigate('/');
        }
    }, [user, navigate]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await login(username, password);
            if (onLoginSuccess) {
                onLoginSuccess();
            }else {
                navigate('/');
            }
        } catch (err) {
            setError('Invalid credentials');
        }
    };

    const handleClose = () => {
        navigate('/');  // Redirect to the homepage
    };

    return (
        <div className="login-modal">
            <div className="login-form">
                <h2>Login</h2>
               
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>Username</label>
                        <input
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                            className="form-control"
                        />
                    </div>
                    <div className="form-group">
                        <label>Password</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            className="form-control"
                        />
                    </div>
                    {error && <p className="error-message">{error}</p>}
                    <button type="submit" className="login-btn">Login</button>
                </form>

                <button className="close-btn" onClick={handleClose}>
                    X
                </button>
            </div>
        </div>
    );
};

export default Login;
