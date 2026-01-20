import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { getJSON } from '../utils/api';
import '../styles/main.css';
import '../styles/spots.css';

const Spots = () => {
    const [spots, setSpots] = useState([]);
    const [activeTab, setActiveTab] = useState('my');
    const [currentUser, setCurrentUser] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            try {
                const payload = JSON.parse(atob(token.split('.')[1]));
                setCurrentUser(payload.sub);
            } catch (e) {
                console.error("Błąd dekodowania tokena", e);
            }
        }

        // 2. Pobieranie danych
        const fetchSpots = async () => {
            try {
                const data = await getJSON('http://localhost:8080/api/locations');
                if (Array.isArray(data)) {
                    setSpots(data);
                }
            } catch (error) {
                console.error("Nie udało się pobrać lokalizacji", error);
            } finally {
                setLoading(false);
            }
        };

        fetchSpots();
    }, []);

    console.log(spots);

    const filteredSpots = spots.filter(spot => {
        if (activeTab === 'my') {
            return spot.ownerUsername === currentUser;
        } else {
            return spot.private === false;
        }
    });

    const getRandomSpotImg = () => `/images/spots/spot${Math.floor(Math.random() * 9) + 1}.jpg`;

    return (
        <>
            <Header />
            <main className="main">
                <div className="container">
                    <div className="page-header">
                        <h1 className="page-title">Fishing Spots</h1>
                        <Link className="btn btn-primary" to="/spots/new">
                            <i className="fa-solid fa fa-plus"></i>
                            Log New Spot
                        </Link>
                    </div>

                    <div className="tabs">
                        <button
                            className={`tab-button ${activeTab === 'my' ? 'active' : ''}`}
                            onClick={() => setActiveTab('my')}
                        >
                            My Spots
                        </button>
                        <button
                            className={`tab-button ${activeTab === 'community' ? 'active' : ''}`}
                            onClick={() => setActiveTab('community')}
                        >
                            Community
                        </button>
                    </div>

                    <section className="spots-section">
                        <h2 className="section-title">
                            {activeTab === 'my' ? 'Your Fishing Spots' : 'Community Spots'}
                        </h2>

                        {loading ? (
                            <p>Ładowanie map...</p>
                        ) : (
                            <div className="spots-grid">
                                {filteredSpots.length > 0 ? filteredSpots.map(spot => (
                                    <article className="spot-card" key={spot.id}>
                                        <div className="spot-image">
                                            <img
                                                src={spot.imageUrl || getRandomSpotImg()}
                                                alt={spot.name}
                                                onError={(e) => { e.target.src = getRandomSpotImg(); }}
                                            />
                                        </div>
                                        <div className="spot-content">
                                            <h3 className="spot-title">{spot.name}</h3>
                                            <div className="spot-distance">
                                                <i className="fa-solid fa fa-map-pin"></i>
                                                {spot.latitude.toFixed(4)}, {spot.longitude.toFixed(4)}
                                            </div>
                                            <p style={{fontSize: '0.9rem', color: '#666', marginBottom: '10px'}}>
                                                {spot.description || 'Brak opisu'}
                                            </p>
                                            <div className="spot-tags">
                                                {spot.private ? (
                                                    <span className="tag" style={{background: '#fee2e2', color: '#dc2626'}}>Private</span>
                                                ) : (
                                                    <span className="tag tag-fish">Public</span>
                                                )}
                                                <span className="tag tag-water">
                                                    Author: {spot.ownerUsername}
                                                </span>
                                            </div>
                                        </div>
                                    </article>
                                )) : (
                                    <p style={{gridColumn: '1/-1', textAlign: 'center'}}>
                                        Brak lokalizacji w tej kategorii. Dodaj pierwszą!
                                    </p>
                                )}
                            </div>
                        )}
                    </section>
                </div>
            </main>
            <Footer />
        </>
    );
};

export default Spots;