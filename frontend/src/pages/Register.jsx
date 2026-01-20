import React, {useEffect, useState} from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { postJSON } from '../utils/api';
import '../styles/signup.css';

const Register = () => {
    const [formData, setFormData] = useState({
        username: '',
        email: '',
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

        if (formData.password.length < 6) {
            setError('Hasło musi mieć co najmniej 6 znaków.');
            return;
        }

        try {
            const res = await postJSON('http://localhost:8080/api/auth/register', formData);

            if (res && !res.error) {
                alert('Rejestracja udana! Możesz się zalogować.');
                navigate('/login');
            } else {
                setError(res.message || res.error || 'Błąd rejestracji. Spróbuj ponownie.');
            }
        } catch (err) {
            setError('Wystąpił błąd połączenia z serwerem.');
        }
    };

    return (
        <div className="auth-container">
            <div className="left-panel">
                <div className="hero-content">
                    <Link to="/">
                        <h1><i className="fa-solid fa fa-fish"></i> FishingBuddy</h1>
                    </Link>
                    <p>Dołącz do społeczności i zacznij dzielić się swoimi zdobyczami.</p>
                </div>
            </div>

            <div className="right-panel">
                <div className="login-container">
                    <div className="logo-section">
                        <div className="brand-info">
                            <h2>FishingBuddy</h2>
                            <p>Create Account</p>
                        </div>
                    </div>

                    <div className="auth-tabs">
                        <Link to="/login">
                            <button className="tab-button">Sign In</button>
                        </Link>
                        <button className="tab-button active">Sign Up</button>
                    </div>

                    <form className="login-form" onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label htmlFor="reg-username">Username</label>
                            <div className="input-wrapper">
                                <input
                                    type="text"
                                    id="reg-username"
                                    name="username"
                                    placeholder="Username"
                                    value={formData.username}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                        </div>

                        <div className="form-group">
                            <label htmlFor="reg-email">Email</label>
                            <div className="input-wrapper">
                                <input
                                    type="email"
                                    id="reg-email"
                                    name="email"
                                    placeholder="jan@example.com"
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                        </div>

                        <div className="form-group">
                            <label htmlFor="reg-password">Password</label>
                            <div className="input-wrapper">
                                <input
                                    type="password"
                                    id="reg-password"
                                    name="password"
                                    placeholder="••••••••"
                                    value={formData.password}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                        </div>

                        {error && <p style={{color: 'red', fontSize: '0.9rem', textAlign: 'center'}}>{error}</p>}

                        <button type="submit" className="sign-in-btn">Sign Up</button>

                        <div className="security-info">
                            <span>Join over 10,000 anglers today!</span>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Register;