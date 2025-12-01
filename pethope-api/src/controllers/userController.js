const Usuario = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

module.exports = {
    async registrar(req, res) {
        try {
            const { nome, email, senha, tipo, telefone, cpf, cnpj, crmvResponsavel, nomeOrganizacao, nomeClinica, endereco } = req.body;

            // Validação básica
            if (!nome || !email || !senha || !tipo) {
                return res.status(400).json({ error: 'Nome, email, senha e tipo são obrigatórios' });
            }

            // Verificar se o email já existe
            const usuarioExistente = await Usuario.findOne({ email });
            if (usuarioExistente) {
                return res.status(400).json({ error: 'Email já cadastrado' });
            }

            const senhaHash = await bcrypt.hash(senha, 10);

            const dadosUsuario = {
                nome,
                email,
                senhaHash,
                tipo
            };

            // Adicionar campos opcionais se fornecidos
            if (telefone) dadosUsuario.telefone = telefone;
            if (cpf) dadosUsuario.cpf = cpf;
            if (cnpj) dadosUsuario.cnpj = cnpj;
            if (crmvResponsavel) dadosUsuario.crmvResponsavel = crmvResponsavel;
            if (nomeOrganizacao) dadosUsuario.nomeOrganizacao = nomeOrganizacao;
            if (nomeClinica) dadosUsuario.nomeClinica = nomeClinica;
            if (endereco) dadosUsuario.endereco = endereco;

            const usuario = await Usuario.create(dadosUsuario);

            // Gerar token JWT e retornar junto com usuário
            const token = jwt.sign({ id: usuario._id, tipo: usuario.tipo }, process.env.JWT_SECRET || 'segredo', { expiresIn: '7d' });
            
            return res.status(201).json({
                _id: usuario._id,
                token,
                nome: usuario.nome,
                email: usuario.email,
                tipo: usuario.tipo
            });

        } catch (error) {
            console.error('Erro no registro:', error);
            return res.status(500).json({ error: 'Erro ao registrar usuário', details: error.message });
        }
    },

    async listar(req, res) {
        const usuarios = await Usuario.find();
        res.json(usuarios);
    },

    async buscarUsuarioAutenticado(req, res) {
        try {
            const usuario = await Usuario.findById(req.user.id).select('-senhaHash');
            if (!usuario) {
                return res.status(404).json({ error: 'Usuário não encontrado' });
            }
            
            // Retornar dados formatados
            const userData = {
                id: usuario._id,
                nome: usuario.nome,
                email: usuario.email,
                tipo: usuario.tipo,
                telefone: usuario.telefone,
                cpf: usuario.cpf,
                cnpj: usuario.cnpj,
                crmvResponsavel: usuario.crmvResponsavel,
                nomeOrganizacao: usuario.nomeOrganizacao,
                nomeClinica: usuario.nomeClinica,
                cidade: usuario.endereco?.cidade,
                estado: usuario.endereco?.uf,
                rua: usuario.endereco?.rua
            };
            
            return res.json(userData);
        } catch (error) {
            return res.status(500).json({ error: 'Erro ao buscar usuário' });
        }
    },

    async buscarPorId(req, res) {
        try {
            const usuario = await Usuario.findById(req.params.id).select('-senhaHash');
            if (!usuario) {
                return res.status(404).json({ error: 'Usuário não encontrado' });
            }
            return res.json(usuario);
        } catch (error) {
            return res.status(500).json({ error: 'Erro ao buscar usuário' });
        }
    },

    async atualizarUsuarioAutenticado(req, res) {
        try {
            const { senha, cidade, estado, ...dadosAtualizacao } = req.body;

            // Se houver senha nova, criptografar
            if (senha) {
                dadosAtualizacao.senhaHash = await bcrypt.hash(senha, 10);
            }

            // Se houver cidade ou estado, atualizar no objeto endereco
            if (cidade || estado) {
                const usuario = await Usuario.findById(req.user.id);
                if (!usuario.endereco) {
                    usuario.endereco = {};
                }
                if (cidade) usuario.endereco.cidade = cidade;
                if (estado) usuario.endereco.uf = estado;
                dadosAtualizacao.endereco = usuario.endereco;
            }

            const usuario = await Usuario.findByIdAndUpdate(
                req.user.id, 
                dadosAtualizacao, 
                { new: true }
            ).select('-senhaHash');

            if (!usuario) {
                return res.status(404).json({ error: 'Usuário não encontrado' });
            }

            // Retornar dados formatados
            const userData = {
                id: usuario._id,
                nome: usuario.nome,
                email: usuario.email,
                tipo: usuario.tipo,
                telefone: usuario.telefone,
                cidade: usuario.endereco?.cidade,
                estado: usuario.endereco?.uf
            };

            return res.json(userData);
        } catch (error) {
            return res.status(500).json({ error: 'Erro ao atualizar usuário' });
        }
    },

    async atualizar(req, res) {
        try {
            const { senha, ...dadosAtualizacao } = req.body;

            // Se houver senha nova, criptografar
            if (senha) {
                dadosAtualizacao.senhaHash = await bcrypt.hash(senha, 10);
            }

            const usuario = await Usuario.findByIdAndUpdate(
                req.params.id, 
                dadosAtualizacao, 
                { new: true }
            ).select('-senhaHash');

            if (!usuario) {
                return res.status(404).json({ error: 'Usuário não encontrado' });
            }

            return res.json(usuario);
        } catch (error) {
            return res.status(500).json({ error: 'Erro ao atualizar usuário' });
        }
    },

    async deletar(req, res) {
        try {
            const usuario = await Usuario.findByIdAndDelete(req.params.id);
            if (!usuario) {
                return res.status(404).json({ error: 'Usuário não encontrado' });
            }
            return res.json({ message: 'Usuário removido com sucesso' });
        } catch (error) {
            return res.status(500).json({ error: 'Erro ao remover usuário' });
        }
    },

    async login(req, res) {
        try {
            const { email, senha } = req.body;
            const usuario = await Usuario.findOne({ email });
            if (!usuario) {
                return res.status(401).json({ error: 'Usuário não encontrado' });
            }
            const senhaValida = await bcrypt.compare(senha, usuario.senhaHash);
            if (!senhaValida) {
                return res.status(401).json({ error: 'Senha inválida' });
            }
            const token = jwt.sign({ id: usuario._id, tipo: usuario.tipo }, process.env.JWT_SECRET || 'segredo', { expiresIn: '7d' });
            return res.json({
                token,
                user: {
                    _id: usuario._id,
                    nome: usuario.nome,
                    email: usuario.email,
                    tipo: usuario.tipo,
                    cnpj: usuario.cnpj,
                    crmvResponsavel: usuario.crmvResponsavel,
                    endereco: usuario.endereco,
                    nomeOrganizacao: usuario.nomeOrganizacao,
                    nomeClinica: usuario.nomeClinica,
                    telefone: usuario.telefone
                }
            });
        } catch (error) {
            return res.status(500).json({ error: 'Erro ao autenticar usuário' });
        }
    }
};
