import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import '../styles/main.css';
import '../styles/signup.css';

const NewSpot = () => {
    const navigate = useNavigate();

    const [file, setFile] = useState(null);

    const [formData, setFormData] = useState({
        name: '',
        description: '',
        latitude: '',
        longitude: '',
        isPrivate: false
    });
    const [error, setError] = useState('');

    const handleChange = (e) => {
        const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
        setFormData({
            ...formData,
            [e.target.name]: value
        });
    };

    const handleFileChange = (e) => {
        if (e.target.files && e.target.files[0]) {
            setFile(e.target.files[0]);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        if (formData.latitude < -90 || formData.latitude > 90) return setError('Błędna szerokość geograficzna.');
        if (formData.longitude < -180 || formData.longitude > 180) return setError('Błędna długość geograficzna.');

        const dataToSend = new FormData();
        dataToSend.append('name', formData.name);
        dataToSend.append('description', formData.description);
        dataToSend.append('latitude', formData.latitude);
        dataToSend.append('longitude', formData.longitude);
        dataToSend.append('isPrivate', formData.isPrivate);

        if (file) {
            dataToSend.append('image', file);
        }

        try {
            const token = localStorage.getItem('token');

            const res = await fetch('http://localhost:8080/api/locations', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`
                },
                body: dataToSend
            });

            if (res.ok) {
                alert('Lokalizacja dodana pomyślnie!');
                navigate('/spots');
            } else {
                const errJson = await res.json();
                setError(errJson.message || 'Wystąpił błąd przy dodawaniu lokalizacji.');
            }
        } catch (err) {
            setError('Błąd połączenia z serwerem.');
        }
    };

    return (
        <>
            <Header />
            <div className="auth-container" style={{height: 'auto', minHeight: '80vh', background: '#f8fafc', padding: '50px 0'}}>
                <div className="login-container" style={{margin: '0 auto', maxWidth: '600px'}}>
                    <div className="brand-info" style={{marginBottom: '20px', textAlign: 'center'}}>
                        <h2>Add New Spot</h2>
                        <p>Share your secret place</p>
                    </div>

                    <form className="login-form" onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label>Spot Name</label>
                            <div className="input-wrapper">
                                <input type="text" name="name" value={formData.name} onChange={handleChange} required placeholder="np. Zakole Wisły" />
                            </div>
                        </div>

                        <div className="form-group">
                            <label>Description</label>
                            <div className="input-wrapper">
                                <textarea name="description" value={formData.description} onChange={handleChange} style={{width: '100%', padding: '10px', border: '1.5px solid #d1d5db', borderRadius: '8px'}} rows="3"/>
                            </div>
                        </div>

                        <div style={{display: 'flex', gap: '20px'}}>
                            <div className="form-group" style={{flex: 1}}>
                                <label>Latitude</label>
                                <div className="input-wrapper">
                                    <input type="number" step="any" name="latitude" value={formData.latitude} onChange={handleChange} required />
                                </div>
                            </div>
                            <div className="form-group" style={{flex: 1}}>
                                <label>Longitude</label>
                                <div className="input-wrapper">
                                    <input type="number" step="any" name="longitude" value={formData.longitude} onChange={handleChange} required />
                                </div>
                            </div>
                        </div>

                        <div className="form-group">
                            <label>Spot Image (Optional)</label>
                            <div className="input-wrapper">
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={handleFileChange}
                                    style={{padding: '10px 0'}}
                                />
                            </div>
                        </div>

                        <div className="checkbox-wrapper" style={{margin: '10px 0'}}>
                            <input type="checkbox" id="isPrivate" name="isPrivate" checked={formData.isPrivate} onChange={handleChange} />
                            <label htmlFor="isPrivate" style={{marginLeft: '8px', color: '#333'}}>Keep private</label>
                        </div>

                        {error && <p style={{color: 'red', textAlign: 'center'}}>{error}</p>}
                        <button type="submit" className="sign-in-btn">Save Spot</button>
                    </form>
                </div>
            </div>
            <Footer />
        </>
    );
};

export default NewSpot;