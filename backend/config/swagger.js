const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API Carnet de Contacts',
      version: '1.0.0',
      description: 'API REST pour la gestion d\'un carnet de contacts avec authentification',
      contact: {
        name: 'Support API',
        email: 'support@carnet-contacts.fr'
      }
    },
    servers: [
      {
        url: 'http://localhost:5000',
        description: 'Serveur de développement'
      }
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT'
        }
      },
      schemas: {
        User: {
          type: 'object',
          required: ['name', 'email', 'password'],
          properties: {
            id: {
              type: 'string',
              description: 'ID unique de l\'utilisateur'
            },
            name: {
              type: 'string',
              description: 'Nom de l\'utilisateur'
            },
            email: {
              type: 'string',
              format: 'email',
              description: 'Email de l\'utilisateur'
            },
            password: {
              type: 'string',
              minLength: 6,
              description: 'Mot de passe (minimum 6 caractères)'
            }
          }
        },
        Contact: {
          type: 'object',
          required: ['firstname', 'lastname', 'phone'],
          properties: {
            id: {
              type: 'string',
              description: 'ID unique du contact'
            },
            firstname: {
              type: 'string',
              description: 'Prénom du contact',
              example: 'Marie'
            },
            lastname: {
              type: 'string',
              description: 'Nom de famille du contact',
              example: 'Martin'
            },
            email: {
              type: 'string',
              format: 'email',
              description: 'Email du contact',
              example: 'marie.martin@email.com'
            },
            phone: {
              type: 'string',
              description: 'Numéro de téléphone',
              example: '06 12 34 56 78'
            },
            address: {
              type: 'string',
              description: 'Adresse du contact',
              example: '123 Rue de la Paix, 75001 Paris'
            },
            userId: {
              type: 'string',
              description: 'ID de l\'utilisateur propriétaire'
            },
            createdAt: {
              type: 'string',
              format: 'date-time',
              description: 'Date de création'
            }
          }
        },
        Error: {
          type: 'object',
          properties: {
            message: {
              type: 'string',
              description: 'Message d\'erreur'
            },
            status: {
              type: 'integer',
              description: 'Code de statut HTTP'
            }
          }
        }
      }
    }
  },
  apis: ['./routes/*.js', './controllers/*.js']
};

const specs = swaggerJsdoc(options);

module.exports = { swaggerUi, specs };