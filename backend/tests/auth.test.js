const request = require('supertest');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const app = require('../server');

describe('/api/auth', () => {
    beforeEach(async () => {
        await User.deleteMany({});
    });

    describe('POST /register', () => {
        it('devrait créer un nouvel utilisateur avec des données valides', async () => {
            const userData = {
                name: 'Test User',
                email: 'test@example.com',
                password: 'password123'
            };

            const response = await request(app)
                .post('/api/auth/register')
                .send(userData)
                .expect(201);

            expect(response.body).toHaveProperty('token');
            
            const user = await User.findOne({ email: userData.email });
            expect(user).toBeTruthy();
            expect(user.name).toBe(userData.name);
        });

        it('devrait retourner une erreur avec un email invalide', async () => {
            const userData = {
                name: 'Test User',
                email: 'invalid-email',
                password: 'password123'
            };

            const response = await request(app)
                .post('/api/auth/register')
                .send(userData)
                .expect(400);

            expect(response.body).toHaveProperty('message');
        });

        it('devrait retourner une erreur avec un mot de passe trop court', async () => {
            const userData = {
                name: 'Test User',
                email: 'test@example.com',
                password: '123'
            };

            const response = await request(app)
                .post('/api/auth/register')
                .send(userData)
                .expect(400);

            expect(response.body).toHaveProperty('message');
        });

        it('devrait retourner une erreur si l\'utilisateur existe déjà', async () => {
            const userData = {
                name: 'Test User',
                email: 'test@example.com',
                password: 'password123'
            };

            await request(app)
                .post('/api/auth/register')
                .send(userData);

            const response = await request(app)
                .post('/api/auth/register')
                .send(userData)
                .expect(400);

            expect(response.body.message).toContain('existe déjà');
        });
    });

    describe('POST /login', () => {
        beforeEach(async () => {
            const userData = {
                name: 'Test User',
                email: 'test@example.com',
                password: 'password123'
            };

            await request(app)
                .post('/api/auth/register')
                .send(userData);
        });

        it('devrait connecter un utilisateur avec des identifiants valides', async () => {
            const loginData = {
                email: 'test@example.com',
                password: 'password123'
            };

            const response = await request(app)
                .post('/api/auth/login')
                .send(loginData)
                .expect(200);

            expect(response.body).toHaveProperty('token');
            
            const decoded = jwt.verify(response.body.token, process.env.JWT_SECRET);
            expect(decoded).toHaveProperty('userId');
        });

        it('devrait retourner une erreur avec un email incorrect', async () => {
            const loginData = {
                email: 'wrong@example.com',
                password: 'password123'
            };

            const response = await request(app)
                .post('/api/auth/login')
                .send(loginData)
                .expect(400);

            expect(response.body.message).toContain('Identifiants invalides');
        });

        it('devrait retourner une erreur avec un mot de passe incorrect', async () => {
            const loginData = {
                email: 'test@example.com',
                password: 'wrongpassword'
            };

            const response = await request(app)
                .post('/api/auth/login')
                .send(loginData)
                .expect(400);

            expect(response.body.message).toContain('Identifiants invalides');
        });
    });
});