import React, { useState } from 'react';
import { AuthProvider, useAuth } from './context/AuthContext';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import ContactList from './components/contacts/ContactList';
import Navbar from './components/layout/Navbar';
import './App.css';

const AppContent = () => {
    const { isAuthenticated } = useAuth();
    const [showRegister, setShowRegister] = useState(false);

    if (!isAuthenticated) {
        return (
            <div style={{ minHeight: '100vh', backgroundColor: '#f8f9fa', paddingTop: '50px' }}>
                {showRegister ? (
                    <Register onSwitchToLogin={() => setShowRegister(false)} />
                ) : (
                    <Login onSwitchToRegister={() => setShowRegister(true)} />
                )}
            </div>
        );
    }

    return (
        <div style={{ minHeight: '100vh', backgroundColor: '#f8f9fa' }}>
            <Navbar />
            <div style={{ 
                display: 'flex', 
                justifyContent: 'center', 
                padding: '20px',
                minHeight: 'calc(100vh - 80px)'
            }}>
                <div style={{
                    maxWidth: '1200px',
                    width: '100%',
                    backgroundColor: 'white',
                    borderRadius: '12px',
                    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
                    padding: '30px',
                    border: '1px solid #e9ecef'
                }}>
                    <ContactList />
                </div>
            </div>
        </div>
    );
};

const App = () => {
    return (
        <AuthProvider>
            <AppContent />
        </AuthProvider>
    );
};

export default App;