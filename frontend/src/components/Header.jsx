import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import '../styles/main.css';

const Header = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const isLoggedIn = !!localStorage.getItem('token');

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/login');
    };

    const isActive = (path) => location.pathname === path ? 'active' : '';

    return (
        <header className="header">
            <nav className="navbar">
                <div className="nav-brand-menu">
                    <Link to="/" className="nav-brand">
                        <i className="fa-solid fa fa-fish"></i>
                        <span className="brand-text">FishingBuddy</span>
                    </Link>
                    <ul className="nav-menu">
                        <li><Link to="/home" className={`nav-link ${isActive('/home')}`}>Home</Link></li>
                        <li><Link to="/spots" className={`nav-link ${isActive('/spots')}`}>Spots</Link></li>
                        <li><Link to="/catches" className={`nav-link ${isActive('/catches')}`}>Catches</Link></li>
                        {isLoggedIn && (
                            <li><Link to="/profile" className={`nav-link ${isActive('/profile')}`}>Profile</Link></li>
                        )}
                    </ul>
                </div>

                <div className="nav-actions">
                    <div id="authBar">
                        {isLoggedIn ? (
                            <div className="auth-bar" style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                                <span className="hello">Witaj!</span>
                                <button onClick={handleLogout} className="sign-out-btn">Wyloguj</button>
                            </div>
                        ) : (
                            <div className="auth-bar">
                                <Link to="/login" className="sign-out-btn">Zaloguj</Link>
                            </div>
                        )}
                    </div>
                </div>
            </nav>
        </header>
    );
};

export default Header;