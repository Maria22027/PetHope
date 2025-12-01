const router = require("express").Router();
const controller = require("../controllers/historyController");

/**
 * @swagger
 * tags:
 *   name: Histórico
 *   description: Registros de adoções e resgates
 */

/**
 * @swagger
 * /history:
 *   post:
 *     summary: Criar um novo registro no histórico
 *     tags: [Histórico]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               tipoEvento: { type: string }
 *               descricao: { type: string }
 *               petId: { type: string }
 *               usuarioId: { type: string }
 *               data: { type: string, format: date }
 *     responses:
 *       201:
 *         description: Registro criado com sucesso
 */
router.post("/", controller.create);

/**
 * @swagger
 * /history:
 *   get:
 *     summary: Listar todo o histórico
 *     tags: [Histórico]
 *     responses:
 *       200:
 *         description: Histórico retornado com sucesso
 */
router.get("/", controller.listAll);

/**
 * @swagger
 * /history/pet/{id}:
 *   get:
 *     summary: Listar histórico de um pet específico
 *     tags: [Histórico]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID do pet
 *     responses:
 *       200:
 *         description: Histórico retornado com sucesso
 */
router.get("/pet/:id", controller.listByPet);

/**
 * @swagger
 * /history/usuario/{id}:
 *   get:
 *     summary: Listar histórico de um usuário específico
 *     tags: [Histórico]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID do usuário
 *     responses:
 *       200:
 *         description: Histórico retornado com sucesso
 */
router.get("/usuario/:id", controller.listByUser);

module.exports = router;

