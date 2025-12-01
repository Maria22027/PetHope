const router = require("express").Router();
const controller = require("../controllers/campaignController");
const auth = require("../middleware/auth");

/**
 * @swagger
 * tags:
 *   name: Campanhas
 *   description: Endpoints relacionados a campanhas
 */

/**
 * @swagger
 * /campaigns:
 *   post:
 *     summary: Criar nova campanha
 *     tags: [Campanhas]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - titulo
 *               - organizacaoId
 *             properties:
 *               titulo:
 *                 type: string
 *               descricao:
 *                 type: string
 *               data:
 *                 type: string
 *                 format: date
 *               organizacaoId:
 *                 type: string
 *                 description: ID da organização criadora da campanha
 *     responses:
 *       201:
 *         description: Campanha criada com sucesso
 */
router.post("/", auth, controller.create);

/**
 * @swagger
 * /campaigns:
 *   get:
 *     summary: Listar campanhas cadastradas
 *     tags: [Campanhas]
 *     responses:
 *       200:
 *         description: Lista de campanhas retornada com sucesso
 */
router.get("/", controller.list);

/**
 * @swagger
 * /campaigns/{id}:
 *   get:
 *     summary: Buscar campanha por ID
 *     tags: [Campanhas]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Campanha encontrada
 *       404:
 *         description: Campanha não encontrada
 */
router.get("/:id", controller.getById);

/**
 * @swagger
 * /campaigns/{id}:
 *   put:
 *     summary: Atualizar campanha
 *     tags: [Campanhas]
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
 *             properties:
 *               titulo:
 *                 type: string
 *               descricao:
 *                 type: string
 *               data:
 *                 type: string
 *                 format: date
 *     responses:
 *       200:
 *         description: Campanha atualizada com sucesso
 *       404:
 *         description: Campanha não encontrada
 */
router.put("/:id", auth, controller.update);

/**
 * @swagger
 * /campaigns/{id}:
 *   delete:
 *     summary: Deletar campanha
 *     tags: [Campanhas]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Campanha removida com sucesso
 *       404:
 *         description: Campanha não encontrada
 */
router.delete("/:id", auth, controller.remove);

module.exports = router;
