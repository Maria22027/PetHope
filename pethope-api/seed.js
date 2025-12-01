// seed.js - Script para popular o banco com dados de teste
require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const axios = require('axios');

const connectDB = require('./src/config/database');
const User = require('./src/models/User');
const Pet = require('./src/models/Pet');
const Campaign = require('./src/models/Campaign');

// Função para buscar imagem de gato da API pública
async function getCatImage() {
    try {
        const response = await axios.get('https://api.thecatapi.com/v1/images/search');
        return response.data[0].url;
    } catch (error) {
        console.error('Erro ao buscar imagem de gato:', error.message);
        return 'https://placekitten.com/400/400'; // Fallback
    }
}

// Função para buscar imagem de cachorro da API pública
async function getDogImage() {
    try {
        const response = await axios.get('https://dog.ceo/api/breeds/image/random');
        return response.data.message;
    } catch (error) {
        console.error('Erro ao buscar imagem de cachorro:', error.message);
        return 'https://placedog.net/400/400'; // Fallback
    }
}

async function seed() {
    try {
        await connectDB();
        console.log('Conectado ao MongoDB');

        // Limpar dados antigos
        await User.deleteMany({});
        await Pet.deleteMany({});
        await Campaign.deleteMany({});
        console.log('Banco limpo');

        // Criar usuários de teste
        const tutorSenha = await bcrypt.hash('123456', 10);
        const tutor = await User.create({
            nome: 'João Silva',
            email: 'joao@example.com',
            senhaHash: tutorSenha,
            tipo: 'tutor',
            telefone: '11999999999',
            endereco: {
                rua: 'Rua das Flores, 123',
                cidade: 'São Paulo',
                uf: 'SP'
            }
        });
        console.log('Tutor criado:', tutor.nome);

        const clinicaSenha = await bcrypt.hash('123456', 10);
        const clinica = await User.create({
            nome: 'Clínica VetPet',
            email: 'clinica@example.com',
            senhaHash: clinicaSenha,
            tipo: 'clinica',
            cnpj: '12.345.678/0001-99',
            crmvResponsavel: 'CRMV-12345',
            endereco: {
                rua: 'Avenida Paulista, 1000',
                cidade: 'São Paulo',
                uf: 'SP'
            }
        });
        console.log('Clínica criada:', clinica.nome);

        const ongSenha = await bcrypt.hash('123456', 10);
        const ong = await User.create({
            nome: 'ONG Proteção Animal',
            email: 'ong@example.com',
            senhaHash: ongSenha,
            tipo: 'ong',
            cnpj: '98.765.432/0001-11'
        });
        console.log('ONG criada:', ong.nome);

        // Criar pets para adoção com imagens das APIs públicas
        console.log('Buscando imagens de pets das APIs públicas...');
        
        const pets = await Pet.insertMany([
            {
                nome: 'Max',
                especie: 'Cachorro',
                idade: 2,
                tipoSanguineo: 'DEA 1.1',
                status: 'adocao',
                descricao: 'Cachorro carinhoso e dócil, adora brincar',
                imageUrl: await getDogImage(),
                tutorId: clinica._id
            },
            {
                nome: 'Luna',
                especie: 'Gato',
                idade: 1,
                tipoSanguineo: 'AB',
                status: 'adocao',
                descricao: 'Gatinha mansa e carinhosa',
                imageUrl: await getCatImage(),
                tutorId: clinica._id
            },
            {
                nome: 'Rex',
                especie: 'Cachorro',
                idade: 4,
                tipoSanguineo: 'DEA 1.1',
                status: 'doacao',
                descricao: 'Doador de sangue saudável',
                imageUrl: await getDogImage(),
                tutorId: clinica._id
            },
            {
                nome: 'Miau',
                especie: 'Gato',
                idade: 3,
                tipoSanguineo: 'AB',
                status: 'adocao',
                descricao: 'Gato tranquilo e companheiro',
                imageUrl: await getCatImage(),
                tutorId: clinica._id
            },
            {
                nome: 'Bilu',
                especie: 'Cachorro',
                idade: 2,
                tipoSanguineo: 'DEA 1.1',
                status: 'doacao',
                descricao: 'Cão saudável disponível para doação',
                imageUrl: await getDogImage(),
                tutorId: clinica._id
            },
            {
                nome: 'Mel',
                especie: 'Gato',
                idade: 2,
                tipoSanguineo: 'A',
                status: 'adocao',
                descricao: 'Gatinha linda e brincalhona',
                imageUrl: await getCatImage(),
                tutorId: clinica._id
            }
        ]);
        console.log(`${pets.length} pets criados com imagens`);

        // Criar campanhas
        const campanhas = await Campaign.insertMany([
            {
                titulo: 'Campanha de Adoção - Gatos',
                descricao: 'Ajude um gatinho a encontrar um novo lar! Temos vários gatos incríveis esperando por você.',
                data: new Date(),
                organizacaoId: ong._id
            },
            {
                titulo: 'Doação de Sangue para Cães',
                descricao: 'Seu cão pode ser um herói! Participe do programa de doação de sangue e ajude cães necessitados.',
                data: new Date(),
                organizacaoId: clinica._id
            },
            {
                titulo: 'Resgate de Animais em Perigo',
                descricao: 'Juntos podemos salvar vidas! Conheça a história de animais resgatados.',
                data: new Date(),
                organizacaoId: ong._id
            }
        ]);
        console.log(`${campanhas.length} campanhas criadas`);

        console.log('\n✅ Database seed concluído com sucesso!');
        console.log('\n📧 Credenciais de teste:');
        console.log('Tutor: joao@example.com / 123456');
        console.log('Clínica: clinica@example.com / 123456');
        console.log('ONG: ong@example.com / 123456');

        process.exit(0);
    } catch (error) {
        console.error('❌ Erro ao fazer seed:', error);
        process.exit(1);
    }
}

seed();
