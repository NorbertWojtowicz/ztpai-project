import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import '../styles/main.css';
import '../styles/signup.css';

const NewTool = () => {
    const navigate = useNavigate();

    // Stan formularza zgodny z FishingToolRequest
    const [formData, setFormData] = useState({
        name: '',
        brand: '',
        model: '',
        type: 'ROD' // Domyślna wartość (musi pasować do Enuma w Java)
    });

    const [error, setError] = useState('');

    // Obsługa zmian w polach
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
            const res = await fetch('http://localhost:8080/api/tools', {
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
                // Wyświetl wiadomość z backendu lub ogólną
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
                    <h2 style={{textAlign: 'center', marginBottom: '20px'}}>Add New Fishing Gear</h2>

                    <form className="login-form" onSubmit={handleSubmit}>

                        {/* NAME */}
                        <div className="form-group">
                            <label>Name (e.g. Nickname)</label>
                            <div className="input-wrapper">
                                <input
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    placeholder="np. Mój ulubiony Spinning"
                                    required
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
                                    <option value="ROD">Rod (Wędka)</option>
                                    <option value="REEL">Reel (Kołowrotek)</option>
                                    <option value="LINE">Line (Żyłka/Plecionka)</option>
                                    <option value="ACCESSORY">Accessory (Akcesoria)</option>
                                </select>
                            </div>
                        </div>

                        {/* BRAND & MODEL */}
                        <div style={{display: 'flex', gap: '20px'}}>
                            <div className="form-group" style={{flex: 1}}>
                                <label>Brand</label>
                                <div className="input-wrapper">
                                    <input
                                        type="text"
                                        name="brand"
                                        value={formData.brand}
                                        onChange={handleChange}
                                        placeholder="np. Shimano"
                                    />
                                </div>
                            </div>
                            <div className="form-group" style={{flex: 1}}>
                                <label>Model</label>
                                <div className="input-wrapper">
                                    <input
                                        type="text"
                                        name="model"
                                        value={formData.model}
                                        onChange={handleChange}
                                        placeholder="np. Stradic FL"
                                    />
                                </div>
                            </div>
                        </div>

                        {error && <p style={{color: 'red', textAlign: 'center', marginBottom: '10px'}}>{error}</p>}

                        <div style={{display: 'flex', gap: '10px'}}>
                            <button type="button" onClick={() => navigate('/profile')} className="sign-in-btn" style={{background: '#9ca3af'}}>Cancel</button>
                            <button type="submit" className="sign-in-btn">Add Gear</button>
                        </div>
                    </form>
                </div>
            </div>
            <Footer />
        </>
    );
};

export default NewTool;