import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { getJSON } from '../utils/api';
import '../styles/main.css';

const Home = () => {
    const [recentCatches, setRecentCatches] = useState([]);
    const [popularSpots, setPopularSpots] = useState([]);

    useEffect(() => {
        const fetchCatches = async () => {
            const data = await getJSON('http://localhost:8080/api/catches/public');
            console.log(data);
            if (Array.isArray(data)) {
                setRecentCatches(data.slice(0, 3));
            }
        };

        const fetchSpots = async () => {
            const data = await getJSON('http://localhost:8080/api/locations');
            console.log(data);
            if (Array.isArray(data)) {
                setPopularSpots(data.slice(0, 3));
            }
        };

        fetchCatches();
        fetchSpots();
    }, []);

    const getRandomFishImg = () => `/images/fishes/fish${Math.floor(Math.random() * 8) + 1}.jpg`;
    const getRandomSpotImg = () => `/images/spots/spot${Math.floor(Math.random() * 9) + 1}.jpg`;

    return (
        <>
            <Header />

            <section className="hero">
                <div className="hero-image">
                    <img src="/images/mainbg.jpg" alt="Sunset fishing scene" />
                </div>
            </section>

            <section className="features">
                <div className="container">
                    <div className="features-grid">
                        <div className="feature-card">
                            <div className="feature-icon">
                                <i className="fa-solid fa fa-map"></i>
                            </div>
                            <h3>Spot Mapping</h3>
                            <p>Mark and discover prime fishing locations with detailed information about species and conditions.</p>
                        </div>
                        <div className="feature-card">
                            <div className="feature-icon">
                                <i className="fa-solid fa fa-trophy"></i>
                            </div>
                            <h3>Catch Logging</h3>
                            <p>Record your catches with photos, weights, and species information to track your progress.</p>
                        </div>
                        <div className="feature-card">
                            <div className="feature-icon">
                                <i className="fa-solid fa fa-users"></i>
                            </div>
                            <h3>Community</h3>
                            <p>Connect with fellow anglers, share catches, and your favourite spots.</p>
                        </div>
                    </div>
                </div>
            </section>

            <section className="recent-catches">
                <div className="container">
                    <h2>Recent Catches</h2>
                    <div className="catches-grid">
                        {recentCatches.length > 0 ? recentCatches.map(catchItem => (
                            <div className="catch-card" key={catchItem.id}>
                                <div className="catch-header">
                                    <div className="angler-info">
                                        <img src="/images/user.png" alt="User" />
                                        <div>
                                            <h4>{catchItem.username || 'Nieznany'}</h4>
                                            <span className="angler-level">Angler</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="catch-image">
                                    <img
                                        src={catchItem.imageUrl || getRandomFishImg()}
                                        alt={catchItem.fishSpeciesName}
                                        onError={(e) => {e.target.src = getRandomFishImg()}} // Fallback jak link wygaśnie
                                    />
                                    <span className="catch-weight">{catchItem.weightKg} kg</span>
                                </div>
                                <div className="catch-details">
                                    <h3>{catchItem.fishSpeciesName}</h3>
                                    <p className="catch-location">{catchItem.locationName}</p>
                                    <p className="catch-date">{new Date(catchItem.catchDate).toLocaleDateString()}</p>
                                </div>
                            </div>
                        )) : (
                            <p style={{textAlign: 'center', gridColumn: '1/-1'}}>Brak ostatnich połowów do wyświetlenia.</p>
                        )}
                    </div>
                </div>
            </section>

            <section className="popular-spots">
                <div className="container">
                    <h2>Fishing Spots</h2>
                    <div className="spots-grid">
                        {popularSpots.length > 0 ? popularSpots.map(spot => (
                            <div className="spot-card" key={spot.id}>
                                <div className="spot-image">
                                    <img
                                        src={spot.imageUrl || getRandomSpotImg()}
                                        alt={spot.name}
                                        onError={(e) => { e.target.src = getRandomSpotImg(); }}
                                    />
                                </div>
                                <div className="spot-content">
                                    <h3>{spot.name}</h3>
                                    <p>{spot.description ? spot.description.substring(0, 80) + '...' : 'Brak opisu'}</p>
                                    <div className="spot-tags">
                                        <span className="tag">Publiczna</span>
                                    </div>
                                </div>
                            </div>
                        )) : (
                            <p style={{textAlign: 'center', gridColumn: '1/-1'}}>Brak dostępnych lokalizacji.</p>
                        )}
                    </div>
                </div>
            </section>

            <section className="cta">
                <div className="container">
                    <h2>Ready to track your catches?</h2>
                    <p>Join thousands of anglers who are sharing their catches, and connecting with fellow fishing enthusiasts.</p>
                    <Link className="cta-button" to="/catches">Share Catch</Link>
                </div>
            </section>

            <Footer />
        </>
    );
};

export default Home;