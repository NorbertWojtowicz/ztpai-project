import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { getJSON } from '../utils/api';
import '../styles/main.css';
import '../styles/profile.css';

const Profile = () => {
    const navigate = useNavigate();

    const [stats, setStats] = useState(null);
    const [catches, setCatches] = useState([]);
    const [tools, setTools] = useState([]);
    const [baits, setBaits] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProfileData = async () => {
            try {
                const token = localStorage.getItem('token');
                if (!token) {
                    navigate('/login');
                    return;
                }

                const [profileStats, userCatches, toolsList, baitsList] = await Promise.all([
                    getJSON('http://localhost:8080/api/users/profile'),
                    getJSON('http://localhost:8080/api/catches/my'), // Opcjonalny parametr my=true (zależnie od implementacji backendu)
                    getJSON('http://localhost:8080/api/tools'),
                    getJSON('http://localhost:8080/api/baits')
                ]);

                setStats(profileStats);

                setCatches(Array.isArray(userCatches) ? userCatches.slice(0, 6) : []);

                setTools(Array.isArray(toolsList) ? toolsList : []);
                setBaits(Array.isArray(baitsList) ? baitsList : []);

            } catch (error) {
                console.error("Błąd ładowania profilu", error);
            } finally {
                setLoading(false);
            }
        };

        fetchProfileData();
    }, [navigate]);

    const getToolIcon = (type) => {
        switch (type) {
            case 'ROD': return 'fa-wand-magic-sparkles';
            case 'REEL': return 'fa-compact-disc';
            case 'LINE': return 'fa-minus';
            case 'ACCESSORY': return 'fa-toolbox';
            default: return 'fa-screwdriver-wrench';
        }
    };

    const getBaitIcon = (type) => {
        switch (type) {
            case 'NATURAL': return 'fa-leaf';
            case 'ARTIFICIAL': return 'fa-robot';
            case 'MIX': return 'fa-blender';
            default: return 'fa-worm';
        }
    };

    if (loading) return <div style={{textAlign: 'center', padding: '50px'}}>Ładowanie profilu...</div>;
    if (!stats) return <div style={{textAlign: 'center', padding: '50px'}}>Nie udało się załadować danych profilu.</div>;

    return (
        <>
            <Header />
            <main className="main-content">

                <section className="profile-header">
                    <div className="profile-info">
                        <div className="profile-avatar-large">
                            <i className="fa-solid fa fa-user" style={{ fontSize: '2.5rem' }}></i>
                        </div>
                        <div className="profile-details">
                            <h1 className="profile-name">{stats.username}</h1>
                            <p className="profile-title">{stats.role}</p>
                        </div>
                    </div>
                </section>

                <section className="stats-section">
                    <div className="stat-card">
                        <div className="stat-icon">
                            <i className="fa-solid fa fa-fish"></i>
                        </div>
                        <div className="stat-content">
                            <p className="stat-label">Total Catches</p>
                            <p className="stat-value">{stats.totalFish}</p>
                        </div>
                    </div>
                    <div className="stat-card">
                        <div className="stat-icon trophy">
                            <i className="fa-solid fa fa-trophy"></i>
                        </div>
                        <div className="stat-content">
                            <p className="stat-label">Biggest Catch</p>
                            <p className="stat-value">{stats.maxWeight} kg</p>
                        </div>
                    </div>
                    <div className="stat-card">
                        <div className="stat-icon location">
                            <i className="fa-solid fa fa-map"></i>
                        </div>
                        <div className="stat-content">
                            <p className="stat-label">My Spots</p>
                            <p className="stat-value">{stats.totalSpots}</p>
                        </div>
                    </div>
                    <div className="stat-card">
                        <div className="stat-icon heart">
                            <i className="fa-solid fa fa-heart"></i>
                        </div>
                        <div className="stat-content">
                            <p className="stat-label">Favorite Spot</p>
                            <p className="stat-value" style={{fontSize: '1.1rem'}}>
                                {stats.favoriteSpot || 'Brak danych'}
                            </p>
                        </div>
                    </div>
                </section>

                <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px', marginBottom: '48px'}}>

                    <section className="gear-section">
                        <div className="gear-header">
                            <h3 className="section-title" style={{marginBottom: 0}}>My Gear</h3>
                            <Link to="/gear/new-tool" className="add-gear-btn">
                                Add
                            </Link>
                        </div>
                        <div className="gear-grid">
                            {tools.length > 0 ? tools.map(t => (
                                <div className="gear-item" key={t.id}>
                                    <div className="gear-icon-wrapper">
                                        <i className={`fa-solid ${getToolIcon(t.type)}`}></i>
                                    </div>
                                    <div className="gear-details">
                                        <h4 className="gear-name">{t.name}</h4>
                                        {(t.brand || t.model) && (
                                            <p className="gear-subtext">
                                                {[t.brand, t.model].filter(Boolean).join(' ')}
                                            </p>
                                        )}
                                    </div>
                                    <span className="gear-type-badge">{t.type}</span>
                                </div>
                            )) : <p style={{color: '#94a3b8', textAlign: 'center', padding: '10px'}}>No gear added.</p>}
                        </div>
                    </section>

                    <section className="gear-section">
                        <div className="gear-header">
                            <h3 className="section-title" style={{marginBottom: 0}}>My Baits</h3>
                            <Link to="/gear/new-bait" className="add-gear-btn">
                                Add
                            </Link>
                        </div>
                        <div className="gear-grid">
                            {baits.length > 0 ? baits.map(b => (
                                <div className="gear-item" key={b.id}>
                                    <div className="gear-icon-wrapper bait">
                                        <i className={`fa-solid ${getBaitIcon(b.type)}`}></i>
                                    </div>
                                    <div className="gear-details">
                                        <h4 className="gear-name">{b.name}</h4>
                                        {b.description && (
                                            <p className="gear-subtext">
                                                {b.description.length > 30
                                                    ? b.description.substring(0, 30) + '...'
                                                    : b.description}
                                            </p>
                                        )}
                                    </div>
                                    <span className="gear-type-badge" style={{background: '#fef3c7', color: '#b45309'}}>
                                        {b.type}
                                    </span>
                                </div>
                            )) : <p style={{color: '#94a3b8', textAlign: 'center', padding: '10px'}}>No baits added.</p>}
                        </div>
                    </section>
                </div>


                <section className="recent-catches">
                    <h2 className="section-title">Recent Catches</h2>

                    {catches.length === 0 ? (
                        <p style={{color: '#64748b'}}>No catches logged yet. Go fishing!</p>
                    ) : (
                        <div className="catches-grid">
                            {catches.map(item => (
                                <article className="catch-card" key={item.id}>
                                    <div className="catch-image">
                                        <img
                                            src={item.imageUrl || `/images/fishes/fish${Math.floor(Math.random() * 8) + 1}.jpg`}
                                            alt={item.fishSpeciesName}
                                            onError={(e) => {e.target.src = `/images/fishes/fish1.jpg`}}
                                        />
                                        <span className="catch-weight">{item.weightKg} kg</span>

                                        {item.wasReleased && (
                                            <span style={{
                                                position: 'absolute', top: '12px', left: '12px',
                                                background: '#dcfce7', color: '#15803d',
                                                padding: '4px 8px', borderRadius: '4px',
                                                fontSize: '12px', fontWeight: 'bold'
                                            }}>
                                                Released
                                            </span>
                                        )}
                                    </div>
                                    <div className="catch-info">
                                        <h3 className="catch-name">{item.fishSpeciesName}</h3>
                                        <div className="catch-details">
                                            <div className="catch-location">
                                                <i className="fa-solid fa fa-map-pin"></i>
                                                <span>{item.locationName}</span>
                                            </div>
                                            <div className="catch-date">
                                                <i className="fa-solid fa fa-calendar"></i>
                                                <span>{new Date(item.catchDate).toLocaleDateString()}</span>
                                            </div>
                                        </div>
                                    </div>
                                </article>
                            ))}
                        </div>
                    )}
                </section>
            </main>
            <Footer />
        </>
    );
};

export default Profile;