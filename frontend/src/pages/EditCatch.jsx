import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { getJSON } from '../utils/api';
import '../styles/main.css';
import '../styles/signup.css';

const EditCatch = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [file, setFile] = useState(null);
    const [currentImageUrl, setCurrentImageUrl] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    const [speciesList, setSpeciesList] = useState([]);
    const [locationsList, setLocationsList] = useState([]);
    const [toolsList, setToolsList] = useState([]);
    const [baitsList, setBaitsList] = useState([]);

    const [formData, setFormData] = useState({
        fishSpeciesId: '',
        locationId: '',
        fishingToolId: '',
        fishingBaitId: '',
        catchDate: '',
        weightKg: '',
        lengthCm: '',
        description: '',
        isPrivate: false,
        wasReleased: false
    });

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [species, locs, tools, baits] = await Promise.all([
                    getJSON('http://localhost:8080/api/species'),
                    getJSON('http://localhost:8080/api/locations'),
                    getJSON('http://localhost:8080/api/tools'),
                    getJSON('http://localhost:8080/api/baits')
                ]);

                setSpeciesList(species);
                setLocationsList(locs);
                setToolsList(tools);
                setBaitsList(baits);

                const catchData = await getJSON(`http://localhost:8080/api/catches/${id}`);

                setFormData({
                    fishSpeciesId: catchData.fishSpeciesId || '',
                    locationId: catchData.locationId || '',
                    fishingToolId: catchData.fishingToolId || '',
                    fishingBaitId: catchData.fishingBaitId || '',

                    catchDate: catchData.catchDate ? catchData.catchDate.slice(0, 16) : '',

                    weightKg: catchData.weightKg,
                    lengthCm: catchData.lengthCm,
                    description: catchData.description || '',
                    isPrivate: catchData.isPrivate !== undefined ? catchData.isPrivate : (catchData.private || false),
                    wasReleased: catchData.wasReleased !== undefined ? catchData.wasReleased : false
                });

                setCurrentImageUrl(catchData.imageUrl);
                setLoading(false);

            } catch (e) {
                console.error("Błąd pobierania danych", e);
                setError("Nie udało się pobrać danych połowu.");
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
        Object.keys(formData).forEach(key => {
            if ((key === 'fishingToolId' || key === 'fishingBaitId') && formData[key] === '') {
                return;
            }
            dataToSend.append(key, formData[key]);
        });

        if (file) {
            dataToSend.append('image', file);
        }

        try {
            const token = localStorage.getItem('token');
            const res = await fetch(`http://localhost:8080/api/catches/${id}`, {
                method: 'PUT',
                headers: { 'Authorization': `Bearer ${token}` },
                body: dataToSend
            });

            if (res.ok) {
                alert('Połów zaktualizowany!');
                navigate('/catches');
            } else {
                const errJson = await res.json();
                setError(errJson.message || 'Błąd aktualizacji');
            }
        } catch (err) {
            setError('Błąd połączenia z serwerem');
        }
    };

    if (loading) return <div style={{textAlign: 'center', padding: '50px'}}>Ładowanie danych...</div>;

    return (
        <>
            <Header />
            <div className="auth-container" style={{height: 'auto', minHeight: '80vh', background: '#f8fafc', padding: '50px 0'}}>
                <div className="login-container" style={{margin: '0 auto', maxWidth: '600px'}}>
                    <h2 style={{textAlign: 'center', marginBottom: '20px'}}>Edit Catch</h2>

                    <form className="login-form" onSubmit={handleSubmit}>

                        <div className="form-group">
                            <label>Fish Species</label>
                            <div className="input-wrapper">
                                <select name="fishSpeciesId" value={formData.fishSpeciesId} onChange={handleChange} required style={{width: '100%', padding: '10px'}}>
                                    <option value="">Select Species...</option>
                                    {speciesList.map(s => <option key={s.id} value={s.id}>{s.name}</option>)}
                                </select>
                            </div>
                        </div>

                        <div className="form-group">
                            <label>Location</label>
                            <div className="input-wrapper">
                                <select name="locationId" value={formData.locationId} onChange={handleChange} required style={{width: '100%', padding: '10px'}}>
                                    <option value="">Select Location...</option>
                                    {locationsList.map(l => <option key={l.id} value={l.id}>{l.name}</option>)}
                                </select>
                            </div>
                        </div>

                        <div style={{display: 'flex', gap: '20px'}}>
                            <div className="form-group" style={{flex: 1}}>
                                <label>Weight (kg)</label>
                                <input className="input-wrapper" type="number" step="0.01" name="weightKg" value={formData.weightKg} onChange={handleChange} required style={{padding: '10px', width: '100%'}}/>
                            </div>
                            <div className="form-group" style={{flex: 1}}>
                                <label>Length (cm)</label>
                                <input className="input-wrapper" type="number" step="0.1" name="lengthCm" value={formData.lengthCm} onChange={handleChange} required style={{padding: '10px', width: '100%'}}/>
                            </div>
                        </div>

                        <div className="form-group">
                            <label>Date & Time</label>
                            <input type="datetime-local" name="catchDate" value={formData.catchDate} onChange={handleChange} required style={{padding: '10px', width: '100%', border: '1px solid #ccc', borderRadius: '5px'}}/>
                        </div>

                        <div style={{display: 'flex', gap: '20px'}}>
                            <div className="form-group" style={{flex: 1}}>
                                <label>Rod</label>
                                <select name="fishingToolId" value={formData.fishingToolId} onChange={handleChange} style={{width: '100%', padding: '10px'}}>
                                    <option value="">None</option>
                                    {toolsList.map(t => <option key={t.id} value={t.id}>{t.name}</option>)}
                                </select>
                            </div>
                            <div className="form-group" style={{flex: 1}}>
                                <label>Bait</label>
                                <select name="fishingBaitId" value={formData.fishingBaitId} onChange={handleChange} style={{width: '100%', padding: '10px'}}>
                                    <option value="">None</option>
                                    {baitsList.map(b => <option key={b.id} value={b.id}>{b.name}</option>)}
                                </select>
                            </div>
                        </div>

                        <div className="form-group">
                            <label>Description</label>
                            <textarea name="description" value={formData.description} onChange={handleChange} rows="3" style={{width: '100%', padding: '10px'}}/>
                        </div>

                        {currentImageUrl && !file && (
                            <div style={{textAlign: 'center', margin: '10px 0'}}>
                                <p style={{fontSize: '0.8rem'}}>Obecne zdjęcie:</p>
                                <img src={currentImageUrl} alt="Current" style={{height: '100px', borderRadius: '8px'}}
                                     onError={(e) => e.target.style.display = 'none'} />
                            </div>
                        )}

                        <div className="form-group">
                            <label>Change Photo (Optional)</label>
                            <input type="file" accept="image/*" onChange={handleFileChange} />
                        </div>

                        <div style={{display: 'flex', gap: '20px'}}>
                            <div className="checkbox-wrapper">
                                <input type="checkbox" id="isPrivate" name="isPrivate" checked={formData.isPrivate} onChange={handleChange} />
                                <label htmlFor="isPrivate">Private</label>
                            </div>
                            <div className="checkbox-wrapper">
                                <input type="checkbox" id="wasReleased" name="wasReleased" checked={formData.wasReleased} onChange={handleChange} />
                                <label htmlFor="wasReleased">Released</label>
                            </div>
                        </div>

                        {error && <p style={{color: 'red', textAlign: 'center'}}>{error}</p>}

                        <div style={{display: 'flex', gap: '10px'}}>
                            <button type="button" onClick={() => navigate('/catches')} className="sign-in-btn" style={{background: '#9ca3af'}}>Cancel</button>
                            <button type="submit" className="sign-in-btn">Update Catch</button>
                        </div>
                    </form>
                </div>
            </div>
            <Footer />
        </>
    );
};

export default EditCatch;