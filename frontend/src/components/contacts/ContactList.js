
import React, { useState, useEffect } from 'react';
import { contactAPI } from '../../services/api';
import ContactForm from './ContactForm';
import ContactItem from './ContactItem';

const ContactList = () => {
    const [contacts, setContacts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [showForm, setShowForm] = useState(false);
    const [editingContact, setEditingContact] = useState(null);

    useEffect(() => {
        loadContacts();
    }, []);

    const loadContacts = async () => {
        try {
            setLoading(true);
            const response = await contactAPI.getAll();
            setContacts(response.data);
        } catch (error) {
            setError('Erreur lors du chargement des contacts');
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const handleCreateContact = async (contactData) => {
        try {
            const response = await contactAPI.create(contactData);
            setContacts([response.data.contact, ...contacts]);
            setShowForm(false);
        } catch (error) {
            throw new Error(error.response?.data?.message || 'Erreur lors de la création');
        }
    };

    const handleUpdateContact = async (id, contactData) => {
        try {
            const response = await contactAPI.update(id, contactData);
            setContacts(contacts.map(contact => 
                contact._id === id ? response.data.contact : contact
            ));
            setEditingContact(null);
        } catch (error) {
            throw new Error(error.response?.data?.message || 'Erreur lors de la mise à jour');
        }
    };

    const handleDeleteContact = async (id) => {
        if (window.confirm('Êtes-vous sûr de vouloir supprimer ce contact ?')) {
            try {
                await contactAPI.delete(id);
                setContacts(contacts.filter(contact => contact._id !== id));
            } catch (error) {
                setError('Erreur lors de la suppression');
            }
        }
    };

    const handleEdit = (contact) => {
        setEditingContact(contact);
        setShowForm(true);
    };

    const handleCancelForm = () => {
        setShowForm(false);
        setEditingContact(null);
    };

    if (loading) {
        return <div style={{ textAlign: 'center', padding: '20px' }}>Chargement...</div>;
    }

    return (
        <div style={{ maxWidth: '800px', margin: '0 auto', padding: '20px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                <h1>Mes Contacts</h1>
                <button 
                    onClick={() => setShowForm(true)}
                    style={{
                        padding: '10px 20px',
                        backgroundColor: '#28a745',
                        color: 'white',
                        border: 'none',
                        borderRadius: '4px',
                        cursor: 'pointer'
                    }}
                >
                    Nouveau Contact
                </button>
            </div>

            {error && (
                <div style={{ color: 'red', marginBottom: '20px', padding: '10px', backgroundColor: '#ffe6e6', borderRadius: '4px' }}>
                    {error}
                </div>
            )}

            {showForm && (
                <ContactForm
                    contact={editingContact}
                    onSubmit={editingContact ? 
                        (data) => handleUpdateContact(editingContact._id, data) : 
                        handleCreateContact
                    }
                    onCancel={handleCancelForm}
                />
            )}

            <div style={{ marginTop: '20px' }}>
                {contacts.length === 0 ? (
                    <div style={{ textAlign: 'center', padding: '40px', color: '#666' }}>
                        Aucun contact trouvé. Créez votre premier contact !
                    </div>
                ) : (
                    contacts.map(contact => (
                        <ContactItem
                            key={contact._id}
                            contact={contact}
                            onEdit={() => handleEdit(contact)}
                            onDelete={() => handleDeleteContact(contact._id)}
                        />
                    ))
                )}
            </div>
        </div>
    );
};

export default ContactList;