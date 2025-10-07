
import React from 'react';

const ContactItem = ({ contact, onEdit, onDelete }) => {
    return (
        <div style={{
            backgroundColor: 'white',
            border: '1px solid #dee2e6',
            borderRadius: '8px',
            padding: '15px',
            marginBottom: '10px',
            boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
        }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start' }}>
                <div style={{ flex: 1 }}>
                    <h4 style={{ margin: '0 0 10px 0', color: '#333' }}>
                        {contact.firstname} {contact.lastname}
                    </h4>
                    
                    <div style={{ display: 'grid', gridTemplateColumns: 'auto 1fr', gap: '10px', color: '#666' }}>
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                            <span style={{ fontWeight: 'bold', minWidth: '80px' }}>Téléphone:</span>
                            <span>{contact.phone}</span>
                        </div>
                        
                        {contact.email && (
                            <div style={{ display: 'flex', alignItems: 'center' }}>
                                <span style={{ fontWeight: 'bold', minWidth: '80px' }}>Email:</span>
                                <span>{contact.email}</span>
                            </div>
                        )}
                        
                        {contact.address && (
                            <div style={{ display: 'flex', alignItems: 'start' }}>
                                <span style={{ fontWeight: 'bold', minWidth: '80px' }}>Adresse:</span>
                                <span>{contact.address}</span>
                            </div>
                        )}
                    </div>
                    
                    <div style={{ marginTop: '10px', fontSize: '0.8em', color: '#999' }}>
                        Créé le: {new Date(contact.createdAt).toLocaleDateString('fr-FR')}
                    </div>
                </div>

                <div style={{ display: 'flex', gap: '10px', marginLeft: '20px' }}>
                    <button
                        onClick={onEdit}
                        style={{
                            padding: '5px 10px',
                            backgroundColor: '#ffc107',
                            color: 'white',
                            border: 'none',
                            borderRadius: '4px',
                            cursor: 'pointer',
                            fontSize: '0.9em'
                        }}
                    >
                        Modifier
                    </button>
                    
                    <button
                        onClick={onDelete}
                        style={{
                            padding: '5px 10px',
                            backgroundColor: '#dc3545',
                            color: 'white',
                            border: 'none',
                            borderRadius: '4px',
                            cursor: 'pointer',
                            fontSize: '0.9em'
                        }}
                    >
                        Supprimer
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ContactItem;