import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import '../styles/main.css';
import '../styles/signup.css';

const NewBait = () => {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        name: '',
        type: 'ARTIFICIAL',
        description: ''
    });

    const [error, setError] = useState('');

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        const token = localStorage.getItem('token');

        try {
            const res = await fetch('http://localhost:8080/api/baits', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(formData)
            });

            if (res.ok) {
                navigate('/profile');
            } else {
                const errData = await res.json();
                setError(errData.message || 'Błąd walidacji danych.');
            }
        } catch (err) {
            console.error(err);
            setError('Błąd połączenia z serwerem.');
        }
    };

    return (
        <>
            <Header />
            <div className="auth-container" style={{height: 'auto', minHeight: '80vh', background: '#f8fafc', padding: '50px 0'}}>
                <div className="login-container" style={{margin: '0 auto', maxWidth: '600px'}}>
                    <h2 style={{textAlign: 'center', marginBottom: '20px'}}>Add New Bait</h2>

                    <form className="login-form" onSubmit={handleSubmit}>

                        {/* NAME */}
                        <div className="form-group">
                            <label>Bait Name</label>
                            <div className="input-wrapper">
                                <input
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    placeholder="np. Wobler 7cm"
                                    required
                                    style={{width: '100%', padding: '10px'}}
                                />
                            </div>
                        </div>

                        {/* TYPE (ENUM) */}
                        <div className="form-group">
                            <label>Type</label>
                            <div className="input-wrapper">
                                <select
                                    name="type"
                                    value={formData.type}
                                    onChange={handleChange}
                                    style={{width: '100%', padding: '10px'}}
                                >
                                    <option value="ARTIFICIAL">Artificial (Sztuczna)</option>
                                    <option value="NATURAL">Natural (Naturalna)</option>
                                    <option value="MIX">Mix (Mieszana)</option>
                                </select>
                            </div>
                        </div>

                        {/* DESCRIPTION */}
                        <div className="form-group">
                            <label>Description (Optional)</label>
                            <div className="input-wrapper">
                                <textarea
                                    name="description"
                                    value={formData.description}
                                    onChange={handleChange}
                                    placeholder="Kolor, waga, głębokość schodzenia..."
                                    rows="3"
                                    style={{width: '100%', padding: '10px', border: '1.5px solid #d1d5db', borderRadius: '8px'}}
                                />
                            </div>
                        </div>

                        {error && <p style={{color: 'red', textAlign: 'center', marginBottom: '10px'}}>{error}</p>}

                        <div style={{display: 'flex', gap: '10px'}}>
                            <button type="button" onClick={() => navigate('/profile')} className="sign-in-btn" style={{background: '#9ca3af'}}>Cancel</button>
                            <button type="submit" className="sign-in-btn">Add Bait</button>
                        </div>
                    </form>
                </div>
            </div>
            <Footer />
        </>
    );
};

export default NewBait;