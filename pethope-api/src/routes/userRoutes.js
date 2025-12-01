const router = require('express').Router();
const controller = require('../controllers/userController');

/**
 * @swagger
 * /users/registrar:
 *   post:
 *     summary: Registrar um novo usuário
 *     description: Cria um novo usuário no sistema.
 *     tags:
 *       - Usuários
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nome:
 *                 type: string
 *               email:
 *                 type: string
 *               senha:
 *                 type: string
 *               tipo:
 *                 type: string
 *                 enum: [tutor, ong, clinica]
 *     responses:
 *       201:
 *         description: Usuário criado com sucesso
 *       400:
 *         description: Erro de validação
 */
router.post('/registrar', controller.registrar);


/**
 * @swagger
 * /users/:
 *   get:
 *     summary: Listar usuários
 *     description: Retorna a lista de usuários cadastrados.
 *     tags:
 *       - Usuários
 *     responses:
 *       200:
 *         description: Lista de usuários retornada com sucesso
 */
router.get('', controller.listar);


/**
 * @swagger
 * /users/login:
 *   post:
 *     summary: Login de usuário
 *     description: Realiza o login de um usuário existente.
 *     tags:
 *       - Usuários
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               senha:
 *                 type: string
 *     responses:
 *       200:
 *         description: Login realizado com sucesso
 *       401:
 *         description: Credenciais inválidas
 */
router.post('/login', controller.login);

/**
 * @swagger
 * /users/me:
 *   get:
 *     summary: Buscar usuário autenticado
 *     description: Retorna os dados do usuário autenticado.
 *     tags:
 *       - Usuários
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Usuário encontrado
 *       401:
 *         description: Não autenticado
 */
const auth = require('../middleware/auth');
router.get('/me', auth, controller.buscarUsuarioAutenticado);

/**
 * @swagger
 * /users/{id}:
 *   get:
 *     summary: Buscar usuário por ID
 *     description: Retorna os dados de um usuário específico.
 *     tags:
 *       - Usuários
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Usuário encontrado
 *       404:
 *         description: Usuário não encontrado
 */
router.get('/:id', controller.buscarPorId);

/**
 * @swagger
 * /users/me:
 *   put:
 *     summary: Atualizar usuário autenticado
 *     description: Atualiza os dados do usuário autenticado.
 *     tags:
 *       - Usuários
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nome:
 *                 type: string
 *               email:
 *                 type: string
 *               telefone:
 *                 type: string
 *               cidade:
 *                 type: string
 *               estado:
 *                 type: string
 *     responses:
 *       200:
 *         description: Usuário atualizado com sucesso
 */
router.put('/me', auth, controller.atualizarUsuarioAutenticado);

/**
 * @swagger
 * /users/{id}:
 *   put:
 *     summary: Atualizar usuário
 *     description: Atualiza os dados de um usuário existente.
 *     tags:
 *       - Usuários
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
 *               nome:
 *                 type: string
 *               email:
 *                 type: string
 *               senha:
 *                 type: string
 *               telefone:
 *                 type: string
 *     responses:
 *       200:
 *         description: Usuário atualizado com sucesso
 *       404:
 *         description: Usuário não encontrado
 */
router.put('/:id', controller.atualizar);

/**
 * @swagger
 * /users/{id}:
 *   delete:
 *     summary: Deletar usuário
 *     description: Remove um usuário do sistema.
 *     tags:
 *       - Usuários
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Usuário removido com sucesso
 *       404:
 *         description: Usuário não encontrado
 */
router.delete('/:id', controller.deletar);

module.exports = router;
