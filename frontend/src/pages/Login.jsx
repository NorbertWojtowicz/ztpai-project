import React, {useEffect, useState} from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { postJSON } from '../utils/api';
import '../styles/signup.css';

const Login = () => {
    const [formData, setFormData] = useState({
        username: '',
        password: ''
    });
    const [error, setError] = useState('');

    const navigate = useNavigate();

    useEffect(() => {
        if (localStorage.getItem('token')) {
            navigate('/home', { replace: true });
        }
    }, [navigate]);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        const res = await postJSON('http://localhost:8080/api/auth/login', formData);

        if (res && (res.token || res.success)) {
            if(res.token) localStorage.setItem('token', res.token);

            alert('Zalogowano!');
            navigate('/home');
        } else {
            setError('Błędne dane logowania lub błąd serwera.');
        }
    };

    return (
        <div className="auth-container">
            <div className="left-panel">
                <div className="hero-content">
                    <Link to="/">
                        <h1><i className="fa-solid fa fa-fish"></i> FishingBuddy</h1>
                    </Link>
                    <p>Your ultimate fishing companion for discovering spots and sharing experiences.</p>
                </div>
            </div>

            <div className="right-panel">
                <div className="login-container">
                    <div className="logo-section">
                        <div className="brand-info">
                            <h2>FishingBuddy</h2>
                            <p>Your Angling Community</p>
                        </div>
                    </div>

                    <div className="auth-tabs">
                        <button className="tab-button active">Sign In</button>
                        <Link to="/register">
                            <button className="tab-button">Sign Up</button>
                        </Link>
                    </div>

                    <form className="login-form" onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label htmlFor="login-username">Username</label>
                            <div className="input-wrapper">
                                <input
                                    type="text"
                                    id="login-username"
                                    name="username"
                                    placeholder="Username"
                                    value={formData.username}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                        </div>

                        <div className="form-group">
                            <label htmlFor="login-password">Password</label>
                            <div className="input-wrapper">
                                <input
                                    type="password"
                                    id="login-password"
                                    name="password"
                                    placeholder="••••••••"
                                    value={formData.password}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                        </div>

                        {error && <p style={{color: 'red', fontSize: '0.9rem'}}>{error}</p>}

                        <button type="submit" className="sign-in-btn">Sign In</button>

                        <div className="security-info">
                            <span>Secure login with 256-bit encryption</span>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Login;