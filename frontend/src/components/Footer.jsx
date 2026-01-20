import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/main.css';

const Footer = () => {
    return (
        <footer className="footer">
            <div className="container">
                <div className="footer-content">
                    <div className="footer-section">
                        <div className="footer-brand">
                            <i className="fa-solid fa fa-fish"></i>
                            <span className="brand-text">FishingBuddy</span>
                        </div>
                        <p>Your ultimate fishing companion for discovering spots and sharing experiences.</p>
                    </div>
                    <div className="footer-section">
                        <h4>Features</h4>
                        <ul>
                            <li><Link to="/spots">Spot Mapping</Link></li>
                            <li><Link to="/catches">Catch Logging</Link></li>
                        </ul>
                    </div>
                    <div className="footer-section">
                        <h4>Company</h4>
                        <ul>
                            <li><Link to="#">Terms of Service</Link></li>
                        </ul>
                    </div>
                </div>
                <div className="footer-bottom">
                    <p>&copy; 2025 FishingBuddy. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;