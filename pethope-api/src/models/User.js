const mongoose = require('mongoose');

const UsuarioSchema = new mongoose.Schema({
    nome: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    senhaHash: { type: String, required: true },
    telefone: String,
    tipo: { type: String, enum: ["tutor", "ong", "clinica"], required: true },

    cpf: { type: String },
    cnpj: { type: String },
    crmvResponsavel: { type: String },
    nomeOrganizacao: { type: String },
    nomeClinica: { type: String },

    endereco: {
        rua: String, 
        cidade: String,
        uf: String
    }
});

module.exports = mongoose.model('Usuario', UsuarioSchema);