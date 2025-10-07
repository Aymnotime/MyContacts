import React from 'react';
import { useAuth } from '../../context/AuthContext';

const Navbar = () => {
    const { user, logout } = useAuth();
    const handleLogout = () => {
        if (window.confirm('Êtes-vous sûr de vouloir vous déconnecter ?')) {
            logout();
        }
    };
    return (
        <nav style={{
            backgroundColor: '#489bd3ff',
            color: 'white',
            padding: '1rem 2rem',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '20px'
        }}>
            <div>
                <h2 style={{ margin: 0 }}>Carnet de Contacts</h2>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                <span>Bonjour, {user?.name}</span>
                <button
                    onClick={handleLogout}
                    style={{
                        padding: '5px 15px',
                        backgroundColor: '#dc3545',
                        color: 'white',
                        border: 'none',
                        borderRadius: '4px',
                        cursor: 'pointer'
                    }}
                >
                    Déconnexion
                </button>
            </div>
        </nav>
    );
};

export default Navbar;