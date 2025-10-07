const Contact = require('../models/Contact');

const getContacts = async (req, res) => {
    try {
    const contacts = await Contact.find({ user: req.userId }).sort({ createdAt: 1 });
        res.json(contacts);
    } catch (error) {
        res.status(500).json({ message: 'Erreur serveur', error: error.message });
    }
};

const getContact = async (req, res) => {
    try {
        const contact = await Contact.findOne({
            _id: req.params.id,
            user: req.userId
        });
        if (!contact) {
            return res.status(404).json({ message: 'Contact non trouvé' });
        }
        res.json(contact);
    } catch (error) {
        res.status(500).json({ message: 'Erreur serveur', error: error.message });
    }
};

const createContact = async (req, res) => {
    try {
        const { name, email, phone, address } = req.body;
        if (!name || !phone) {
            return res.status(400).json({ message: 'name et phone sont requis' });
        }
        const contact = new Contact({
            name,
            email,
            phone,
            address,
            user: req.userId
        });
        await contact.save();
        res.status(201).json(contact);
    } catch (error) {
        if (error.name === 'ValidationError') {
            return res.status(400).json({ message: error.message });
        }
        res.status(500).json({ message: 'Erreur serveur', error: error.message });
    }
};

const updateContact = async (req, res) => {
    try {
        const { name, email, phone, address } = req.body;
        if (!name || !phone) {
            return res.status(400).json({ message: 'name et phone sont requis' });
        }
        const contact = await Contact.findOneAndUpdate(
            { _id: req.params.id, user: req.userId },
            { name, email, phone, address },
            { new: true, runValidators: true }
        );
        if (!contact) {
            return res.status(404).json({ message: 'Contact non trouvé' });
        }
        res.json(contact);
    } catch (error) {
        if (error.name === 'ValidationError') {
            return res.status(400).json({ message: error.message });
        }
        res.status(500).json({ message: 'Erreur serveur', error: error.message });
    }
};

const deleteContact = async (req, res) => {
    try {
        const contact = await Contact.findOneAndDelete({
            _id: req.params.id,
            user: req.userId
        });
        if (!contact) {
            return res.status(404).json({ message: 'Contact non trouvé' });
        }
        res.json({ message: 'Contact supprimé' });
    } catch (error) {
        res.status(500).json({ message: 'Erreur serveur', error: error.message });
    }
};

module.exports = {
    getContacts,
    getContact,
    createContact,
    updateContact,
    deleteContact
};