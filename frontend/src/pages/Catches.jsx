import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { getJSON } from '../utils/api';
import '../styles/main.css';
import '../styles/spots.css';

const Catches = () => {
    const [catches, setCatches] = useState([]);
    const [activeTab, setActiveTab] = useState('my');
    const [currentUser, setCurrentUser] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            try {
                const payload = JSON.parse(atob(token.split('.')[1]));
                setCurrentUser(payload.sub);
            } catch (e) {}
        }

        const fetchCatches = async () => {
            try {
                const data = await getJSON('http://localhost:8080/api/catches/public');
                if (Array.isArray(data)) setCatches(data);
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        };
        fetchCatches();
    }, []);

    const filteredCatches = catches.filter(item => {
        const isPrivateSafe = item.isPrivate !== undefined ? item.isPrivate : (item.private || false);

        if (activeTab === 'my') {
            return item.username === currentUser;
        } else {
            return isPrivateSafe === false;
        }
    });

    const getRandomFishImg = () => `/images/fishes/fish${Math.floor(Math.random() * 8) + 1}.jpg`;

    return (
        <>
            <Header />
            <main className="main">
                <div className="container">
                    <div className="page-header">
                        <h1 className="page-title">Catch Log</h1>
                        <Link className="btn btn-primary" to="/catches/new">
                            <i className="fa-solid fa fa-plus"></i>
                            Log Catch
                        </Link>
                    </div>

                    <div className="tabs">
                        <button className={`tab-button ${activeTab === 'my' ? 'active' : ''}`} onClick={() => setActiveTab('my')}>My Catches</button>
                        <button className={`tab-button ${activeTab === 'community' ? 'active' : ''}`} onClick={() => setActiveTab('community')}>Community</button>
                    </div>

                    <section className="spots-section">
                        <div className="spots-grid">
                            {filteredCatches.map(item => (
                                <article className="spot-card" key={item.id}>
                                    <div className="spot-image">
                                        <img
                                            src={item.imageUrl || getRandomFishImg()}
                                            alt={item.fishSpeciesName}
                                            onError={(e) => {e.target.src = getRandomFishImg()}}
                                        />
                                        {currentUser && item.username === currentUser && (
                                            <Link to={`/catches/edit/${item.id}`} className="edit-btn-overlay">
                                                Edit
                                            </Link>
                                        )}
                                    </div>
                                    <div className="spot-content">
                                        <h3 className="spot-title">{item.fishSpeciesName}</h3>
                                        <div className="spot-distance">
                                            <i className="fa-solid fa fa-scale-unbalanced"></i> {item.weightKg} kg
                                            <span style={{margin: '0 5px'}}>|</span>
                                            <i className="fa-solid fa fa-ruler"></i> {item.lengthCm} cm
                                        </div>
                                        <p style={{fontSize: '0.9rem', color: '#666'}}>
                                            <i className="fa-solid fa fa-location-dot"></i> {item.locationName}
                                        </p>
                                        <div className="spot-tags" style={{marginTop: '10px'}}>
                                            {(item.isPrivate !== undefined ? item.isPrivate : item.private) && (
                                                <span className="tag" style={{background: '#fee2e2', color: '#dc2626'}}>
                                                    <i className="fa-solid fa fa-lock"></i> Private
                                                </span>
                                            )}

                                            {item.wasReleased && (
                                                <span className="tag" style={{background: '#dcfce7', color: '#15803d'}}>
                                                    <i className="fa-solid fa fa-arrows-rotate"></i> Released
                                                </span>
                                            )}

                                            <span className="tag tag-fish">
                                                <i className="fa-solid fa fa-user"></i> {item.username}
                                            </span>
                                        </div>
                                    </div>
                                </article>
                            ))}
                        </div>
                    </section>
                </div>
            </main>
            <Footer />
            <style>{`
                .edit-btn-overlay {
                    position: absolute; top: 10px; right: 10px;
                    background: white; color: #3b82f6;
                    padding: 5px 10px; border-radius: 5px;
                    text-decoration: none; font-weight: bold;
                    box-shadow: 0 2px 4px rgba(0,0,0,0.2);
                }
            `}</style>
        </>
    );
};

export default Catches;