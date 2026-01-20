import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { getJSON } from '../utils/api';
import '../styles/main.css';
import '../styles/signup.css';

const EditSpot = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [file, setFile] = useState(null);
    const [currentImageUrl, setCurrentImageUrl] = useState(null);
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        latitude: '',
        longitude: '',
        isPrivate: false
    });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await getJSON(`http://localhost:8080/api/locations/${id}`);

                setFormData({
                    name: data.name,
                    description: data.description || '',
                    latitude: data.latitude,
                    longitude: data.longitude,
                    isPrivate: data.isPrivate !== undefined ? data.isPrivate : (data.private || false)
                });
                setCurrentImageUrl(data.imageUrl);
                setLoading(false);
            } catch (err) {
                setError('Nie udało się pobrać danych lokalizacji.');
                setLoading(false);
            }
        };
        fetchData();
    }, [id]);

    const handleChange = (e) => {
        const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
        setFormData({ ...formData, [e.target.name]: value });
    };

    const handleFileChange = (e) => {
        if (e.target.files && e.target.files[0]) {
            setFile(e.target.files[0]);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

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
            const res = await fetch(`http://localhost:8080/api/locations/${id}`, {
                method: 'PUT',
                headers: {
                    'Authorization': `Bearer ${token}`
                },
                body: dataToSend
            });

            if (res.ok) {
                alert('Lokalizacja zaktualizowana!');
                navigate('/spots');
            } else {
                const errJson = await res.json();
                setError(errJson.message || 'Błąd aktualizacji.');
            }
        } catch (err) {
            setError('Błąd połączenia z serwerem.');
        }
    };

    if (loading) return <div>Ładowanie...</div>;

    return (
        <>
            <Header />
            <div className="auth-container" style={{height: 'auto', minHeight: '80vh', background: '#f8fafc', padding: '50px 0'}}>
                <div className="login-container" style={{margin: '0 auto', maxWidth: '600px'}}>
                    <div className="brand-info" style={{marginBottom: '20px', textAlign: 'center'}}>
                        <h2>Edit Spot</h2>
                    </div>

                    <form className="login-form" onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label>Spot Name</label>
                            <div className="input-wrapper">
                                <input type="text" name="name" value={formData.name} onChange={handleChange} required />
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

                        {currentImageUrl && !file && (
                            <div style={{textAlign: 'center', margin: '10px 0'}}>
                                <p style={{fontSize: '0.8rem'}}>Obecne zdjęcie:</p>
                                <img src={currentImageUrl} alt="Current" style={{height: '100px', borderRadius: '8px'}} />
                            </div>
                        )}

                        <div className="form-group">
                            <label>New Image (Optional)</label>
                            <div className="input-wrapper">
                                <input type="file" accept="image/*" onChange={handleFileChange} style={{padding: '10px 0'}} />
                            </div>
                        </div>

                        <div className="checkbox-wrapper" style={{margin: '10px 0'}}>
                            <input type="checkbox" id="isPrivate" name="isPrivate" checked={formData.isPrivate} onChange={handleChange} />
                            <label htmlFor="isPrivate" style={{marginLeft: '8px', color: '#333'}}>Keep private</label>
                        </div>

                        {error && <p style={{color: 'red', textAlign: 'center'}}>{error}</p>}

                        <div style={{display: 'flex', gap: '10px'}}>
                            <button type="button" onClick={() => navigate('/spots')} className="sign-in-btn" style={{background: '#9ca3af'}}>Cancel</button>
                            <button type="submit" className="sign-in-btn">Update Spot</button>
                        </div>
                    </form>
                </div>
            </div>
            <Footer />
        </>
    );
};

export default EditSpot;