const request = require('supertest');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const Contact = require('../models/Contact');
const app = require('../server');

describe('/api/contacts', () => {
    let token;
    let userId;

    beforeEach(async () => {
        await User.deleteMany({});
        await Contact.deleteMany({});

        const userData = {
            name: 'Test User',
            email: 'test@example.com',
            password: 'password123'
        };

        const authResponse = await request(app)
            .post('/api/auth/register')
            .send(userData);

        token = authResponse.body.token;
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        userId = decoded.userId;
    });

    describe('GET /api/contacts', () => {
        it('devrait retourner une liste vide si aucun contact', async () => {
            const response = await request(app)
                .get('/api/contacts')
                .set('Authorization', `Bearer ${token}`)
                .expect(200);

            expect(response.body).toEqual([]);
        });

        it('devrait retourner les contacts de l\'utilisateur', async () => {
            const contact1 = new Contact({
                name: 'Contact 1',
                email: 'contact1@example.com',
                user: userId
            });
            const contact2 = new Contact({
                name: 'Contact 2',
                email: 'contact2@example.com',
                user: userId
            });

            await contact1.save();
            await contact2.save();

            const response = await request(app)
                .get('/api/contacts')
                .set('Authorization', `Bearer ${token}`)
                .expect(200);

            expect(response.body).toHaveLength(2);
            expect(response.body[0].name).toBe('Contact 1');
            expect(response.body[1].name).toBe('Contact 2');
        });

        it('devrait retourner 401 sans token', async () => {
            await request(app)
                .get('/api/contacts')
                .expect(401);
        });
    });

    describe('POST /api/contacts', () => {
        it('devrait créer un nouveau contact', async () => {
            const contactData = {
                name: 'Nouveau Contact',
                email: 'nouveau@example.com',
                phone: '0123456789'
            };

            const response = await request(app)
                .post('/api/contacts')
                .set('Authorization', `Bearer ${token}`)
                .send(contactData)
                .expect(201);

            expect(response.body.name).toBe(contactData.name);
            expect(response.body.email).toBe(contactData.email);
            expect(response.body.phone).toBe(contactData.phone);
            expect(response.body.user).toBe(userId);
        });

        it('devrait retourner une erreur sans nom', async () => {
            const contactData = {
                email: 'nouveau@example.com'
            };

            const response = await request(app)
                .post('/api/contacts')
                .set('Authorization', `Bearer ${token}`)
                .send(contactData)
                .expect(400);

            expect(response.body).toHaveProperty('message');
        });

        it('devrait retourner une erreur sans email', async () => {
            const contactData = {
                name: 'Nouveau Contact'
            };

            const response = await request(app)
                .post('/api/contacts')
                .set('Authorization', `Bearer ${token}`)
                .send(contactData)
                .expect(400);

            expect(response.body).toHaveProperty('message');
        });
    });

    describe('GET /api/contacts/:id', () => {
        let contactId;

        beforeEach(async () => {
            const contact = new Contact({
                name: 'Test Contact',
                email: 'test@example.com',
                user: userId
            });
            const savedContact = await contact.save();
            contactId = savedContact._id;
        });

        it('devrait retourner un contact par son ID', async () => {
            const response = await request(app)
                .get(`/api/contacts/${contactId}`)
                .set('Authorization', `Bearer ${token}`)
                .expect(200);

            expect(response.body.name).toBe('Test Contact');
            expect(response.body.email).toBe('test@example.com');
        });

        it('devrait retourner 404 pour un ID inexistant', async () => {
            const fakeId = '507f1f77bcf86cd799439011';
            
            await request(app)
                .get(`/api/contacts/${fakeId}`)
                .set('Authorization', `Bearer ${token}`)
                .expect(404);
        });
    });

    describe('PUT /api/contacts/:id', () => {
        let contactId;

        beforeEach(async () => {
            const contact = new Contact({
                name: 'Test Contact',
                email: 'test@example.com',
                user: userId
            });
            const savedContact = await contact.save();
            contactId = savedContact._id;
        });

        it('devrait mettre à jour un contact', async () => {
            const updateData = {
                name: 'Contact Modifié',
                email: 'modifie@example.com',
                phone: '0987654321'
            };

            const response = await request(app)
                .put(`/api/contacts/${contactId}`)
                .set('Authorization', `Bearer ${token}`)
                .send(updateData)
                .expect(200);

            expect(response.body.name).toBe(updateData.name);
            expect(response.body.email).toBe(updateData.email);
            expect(response.body.phone).toBe(updateData.phone);
        });
    });

    describe('DELETE /api/contacts/:id', () => {
        let contactId;

        beforeEach(async () => {
            const contact = new Contact({
                name: 'Test Contact',
                email: 'test@example.com',
                user: userId
            });
            const savedContact = await contact.save();
            contactId = savedContact._id;
        });

        it('devrait supprimer un contact', async () => {
            const response = await request(app)
                .delete(`/api/contacts/${contactId}`)
                .set('Authorization', `Bearer ${token}`)
                .expect(200);

            expect(response.body.message).toContain('supprimé');

            const contact = await Contact.findById(contactId);
            expect(contact).toBeNull();
        });
    });
});