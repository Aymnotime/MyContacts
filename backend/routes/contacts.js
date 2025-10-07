const express = require('express');
const auth = require('../middleware/auth');
const {
    getContacts,
    getContact,
    createContact,
    updateContact,
    deleteContact
} = require('../controllers/contactController');

const router = express.Router();

// Toutes les routes sont protégées par le middleware auth
router.use(auth);

/**
 * @swagger
 * /api/contacts:
 *   get:
 *     summary: Récupérer tous les contacts de l'utilisateur
 *     tags: [Contacts]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Liste des contacts
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Contact'
 *       401:
 *         description: Token manquant ou invalide
 */
router.get('/', getContacts);

/**
 * @swagger
 * /api/contacts/{id}:
 *   get:
 *     summary: Récupérer un contact par son ID
 *     tags: [Contacts]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID du contact
 *     responses:
 *       200:
 *         description: Contact trouvé
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Contact'
 *       404:
 *         description: Contact non trouvé
 *       401:
 *         description: Token manquant ou invalide
 */
router.get('/:id', getContact);

/**
 * @swagger
 * /api/contacts:
 *   post:
 *     summary: Créer un nouveau contact
 *     tags: [Contacts]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - firstname
 *               - lastname
 *               - phone
 *             properties:
 *               firstname:
 *                 type: string
 *                 example: "Marie"
 *               lastname:
 *                 type: string
 *                 example: "Martin"
 *               email:
 *                 type: string
 *                 format: email
 *                 example: "marie.martin@email.com"
 *               phone:
 *                 type: string
 *                 example: "06 12 34 56 78"
 *               address:
 *                 type: string
 *                 example: "123 Rue de la Paix, 75001 Paris"
 *     responses:
 *       201:
 *         description: Contact créé avec succès
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Contact'
 *       400:
 *         description: Données invalides
 *       401:
 *         description: Token manquant ou invalide
 */
router.post('/', createContact);

/**
 * @swagger
 * /api/contacts/{id}:
 *   put:
 *     summary: Mettre à jour un contact
 *     tags: [Contacts]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID du contact
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               firstname:
 *                 type: string
 *                 example: "Marie"
 *               lastname:
 *                 type: string
 *                 example: "Martin"
 *               email:
 *                 type: string
 *                 format: email
 *                 example: "marie.martin@email.com"
 *               phone:
 *                 type: string
 *                 example: "06 12 34 56 78"
 *               address:
 *                 type: string
 *                 example: "123 Rue de la Paix, 75001 Paris"
 *     responses:
 *       200:
 *         description: Contact mis à jour avec succès
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Contact'
 *       404:
 *         description: Contact non trouvé
 *       401:
 *         description: Token manquant ou invalide
 */
router.put('/:id', updateContact);

/**
 * @swagger
 * /api/contacts/{id}:
 *   delete:
 *     summary: Supprimer un contact
 *     tags: [Contacts]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID du contact
 *     responses:
 *       200:
 *         description: Contact supprimé avec succès
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Contact supprimé"
 *       404:
 *         description: Contact non trouvé
 *       401:
 *         description: Token manquant ou invalide
 */
router.delete('/:id', deleteContact);

module.exports = router;