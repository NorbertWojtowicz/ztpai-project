import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

import Login from './pages/Login';
import Register from './pages/Register';
import Home from './pages/Home';
import Spots from './pages/Spots';
import NewSpot from './pages/NewSpot';
import EditSpot from "./pages/EditSpot.jsx";

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Navigate to="/login" replace />} />

                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />

                <Route path="/home" element={<Home />} />
                <Route path="/" element={<Home />} />
                <Route path="/spots" element={<Spots />} />
                <Route path="/spots/new" element={<NewSpot />} />
                <Route path="/spots/edit/:id" element={<EditSpot />} />
                <Route path="*" element={<div>404 - Nie znaleziono strony</div>} />
            </Routes>
        </Router>
    );
}

export default App;