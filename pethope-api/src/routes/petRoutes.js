const router = require("express").Router();
const controller = require("../controllers/petController");
const auth = require("../middleware/auth");

/**
 * @swagger
 * tags:
 *   name: Pets
 *   description: Endpoints para gerenciamento de pets
 */

/**
 * @swagger
 * /pets:
 *   post:
 *     summary: Cadastrar um novo pet
 *     tags: [Pets]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nome: { type: string }
 *               especie: { type: string }
 *               idade: { type: number }
 *               descricao: { type: string }
 *     responses:
 *       201:
 *         description: Pet criado com sucesso
 */
router.post("/", auth, controller.create);

/**
 * @swagger
 * /pets:
 *   get:
 *     summary: Listar todos os pets
 *     tags: [Pets]
 *     responses:
 *       200:
 *         description: Lista de pets retornada com sucesso
 */
router.get("/", controller.list);

/**
 * @swagger
 * /pets/{id}:
 *   get:
 *     summary: Obter um pet pelo ID
 *     tags: [Pets]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Pet encontrado
 *       404:
 *         description: Pet não encontrado
 */
router.get("/:id", controller.getById);

/**
 * @swagger
 * /pets/{id}:
 *   put:
 *     summary: Atualizar informações de um pet
 *     tags: [Pets]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *     responses:
 *       200:
 *         description: Pet atualizado com sucesso
 */
router.put("/:id", auth, controller.update);

/**
 * @swagger
 * /pets/{id}:
 *   delete:
 *     summary: Remover um pet
 *     tags: [Pets]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Pet removido com sucesso
 */
router.delete("/:id", auth, controller.remove);

module.exports = router;
