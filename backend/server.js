require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/database');
const { swaggerUi, specs } = require('./config/swagger');

const authRoutes = require('./routes/auth');
const contactRoutes = require('./routes/contacts');

const app = express();
const PORT = process.env.PORT || 5000;



app.use(cors());
app.use(express.json());

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs, {
    explorer: true,
    customCss: '.swagger-ui .topbar { display: none }',
    customSiteTitle: 'API Carnet de Contacts'
}));

app.use('/api/auth', authRoutes);
app.use('/api/contacts', contactRoutes);

app.get('/', (req, res) => {
    res.json({
        message: 'API Carnet de Contacts',
        documentation: 'http://localhost:' + PORT + '/api-docs',
        version: '1.0.0'
    });
});


if (process.env.NODE_ENV !== 'test') {
    connectDB();
    app.listen(PORT, () => {
        console.log(`Serveur démarré sur le port ${PORT}`);
        console.log(`Documentation Swagger disponible sur http://localhost:${PORT}/api-docs`);
    });
}

module.exports = app;