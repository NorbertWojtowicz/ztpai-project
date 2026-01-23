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
    const [isAdmin, setIsAdmin] = useState(false); // Nowy stan dla Admina
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            try {
                const payload = JSON.parse(atob(token.split('.')[1]));
                setCurrentUser(payload.sub);
                checkUserRole();
            } catch (e) {
                console.error("Błąd dekodowania tokena", e);
            }
        }

        const checkUserRole = async () => {
            try {
                const profile = await getJSON('http://localhost:8080/api/user/profile');
                if (profile.role === 'Admin' || profile.role === 'ADMIN') {
                    setIsAdmin(true);
                }
            } catch (e) {}
        };

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

    const handleDelete = async (id) => {
        if (!window.confirm("Are you sure you want to delete this catch?")) return;

        try {
            const token = localStorage.getItem('token');
            const res = await fetch(`http://localhost:8080/api/catches/${id}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            if (res.ok) {
                setCatches(prev => prev.filter(item => item.id !== id));
            } else {
                alert("Nie udało się usunąć (Brak uprawnień?)");
            }
        } catch (err) {
            alert("Błąd połączenia z serwerem");
        }
    };

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

                                        <div style={{position: 'absolute', top: '10px', right: '10px', display: 'flex', gap: '8px'}}>

                                            {currentUser && item.username === currentUser && (
                                                <Link to={`/catches/edit/${item.id}`} className="action-btn edit">
                                                    <i className="fa-solid fa fa-pen"></i>
                                                </Link>
                                            )}

                                            {currentUser && (item.username === currentUser || isAdmin) && (
                                                <button
                                                    onClick={() => handleDelete(item.id)}
                                                    className="action-btn delete"
                                                    title="Delete Catch"
                                                >
                                                    <i className="fa-solid fa fa-trash"></i>
                                                </button>
                                            )}
                                        </div>

                                        {item.wasReleased && (
                                            <span className="tag-released">
                                                <i className="fa-solid fa fa-arrows-rotate"></i> Released
                                            </span>
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
                .action-btn {
                    background: white;
                    border: none;
                    padding: 8px;
                    border-radius: 6px;
                    cursor: pointer;
                    box-shadow: 0 2px 4px rgba(0,0,0,0.2);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    text-decoration: none;
                    width: 35px;
                    height: 35px;
                    transition: transform 0.1s, background 0.2s;
                }
                .action-btn:hover { transform: scale(1.05); }
                
                .action-btn.edit { color: #3b82f6; } /* Niebieski */
                .action-btn.edit:hover { background: #eff6ff; }

                .action-btn.delete { color: #ef4444; } /* Czerwony */
                .action-btn.delete:hover { background: #fef2f2; }

                .tag-released {
                    position: absolute; top: 10px; left: 10px;
                    background: #dcfce7; color: #15803d;
                    padding: 4px 8px; border-radius: 4px;
                    font-size: 12px; font-weight: bold;
                    box-shadow: 0 2px 4px rgba(0,0,0,0.1);
                }
            `}</style>
        </>
    );
};

export default Catches;