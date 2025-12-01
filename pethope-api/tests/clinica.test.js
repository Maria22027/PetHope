
const request = require('supertest');
const app = require('../src/app');
const jwt = require('jsonwebtoken');
const Usuario = require('../src/models/User');
const Pet = require('../src/models/Pet');
const Campanha = require('../src/models/Campaign');
const Historico = require('../src/models/History');

describe('API - Usuários e Pets', () => {
  let token = '';
  let userId = '';
  let petId = '';
  const clinicaUser = {
    nome: 'Clinica Teste',
    email: `clinica${Date.now()}@teste.com`,
    senha: '123456',
    tipo: 'clinica'
  };

  beforeAll(async () => {
    // Registrar usuário tipo clinica
    const regRes = await request(app)
      .post('/users/registrar')
      .send(clinicaUser);
    console.log('Registro usuário clinica:', regRes.statusCode, regRes.body);

    // Login para obter token
    const res = await request(app)
      .post('/users/login')
      .send({ email: clinicaUser.email, senha: clinicaUser.senha });
    token = res.body.token;
    
    // Extrair userId do token JWT
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'segredo');
    userId = decoded.id;
    console.log('Token JWT:', token);
    console.log('User ID extraído:', userId);
  }, 50000);

  afterAll(async () => {
    // Limpar dados do teste
    try {
      await Pet.deleteMany({ tutorId: userId });
      await Campanha.deleteMany({ organizacaoId: userId });
      await Historico.deleteMany({ usuarioId: userId });
      await Usuario.findByIdAndDelete(userId);
      console.log('Dados de teste removidos com sucesso!');
    } catch (error) {
      console.error('Erro ao limpar dados de teste:', error);
    }
  }, 10000);

  it('Deve retornar 200 ao listar usuários', async () => {
    const res = await request(app)
      .get('/users/')
      .set('Authorization', `Bearer ${token}`);
    console.log('Listar usuários:', res.statusCode, res.body);
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  }, 20000);

  it('Deve cadastrar um pet', async () => {
    const pet = {
      nome: 'Rex',
      especie: 'Cachorro',
      idade: 3
    };
    const res = await request(app)
      .post('/pets/')
      .set('Authorization', `Bearer ${token}`)
      .send(pet);
    console.log('Cadastrar pet:', res.statusCode, res.body);
    expect(res.statusCode).toBe(201);
    expect(res.body.nome).toBe('Rex');
    petId = res.body._id;
  }, 20000);

  it('Deve listar pets', async () => {
    const res = await request(app)
      .get('/pets/')
      .set('Authorization', `Bearer ${token}`);
    console.log('Listar pets:', res.statusCode, res.body);
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  }, 20000);

  it('Deve atualizar um pet', async () => {
    const res = await request(app)
      .put(`/pets/${petId}`)
      .set('Authorization', `Bearer ${token}`)
      .send({ idade: 4 });
    console.log('Atualizar pet:', res.statusCode, res.body);
    expect(res.statusCode).toBe(200);
    expect(res.body.idade).toBe(4);
  }, 20000);

  it('Deve remover um pet', async () => {
    const res = await request(app)
      .delete(`/pets/${petId}`)
      .set('Authorization', `Bearer ${token}`);
    console.log('Remover pet:', res.statusCode, res.body);
    expect(res.statusCode).toBe(200);
    expect(res.body.message).toMatch(/Pet removido/);
  }, 20000);

  it('Deve retornar erro ao cadastrar pet sem token', async () => {
    const pet = {
      nome: 'SemToken',
      especie: 'Gato',
      idade: 2
    };
    const res = await request(app)
      .post('/pets/')
      .send(pet);
    console.log('Cadastrar pet sem token:', res.statusCode, res.body);
    expect(res.statusCode).toBe(401);
    expect(res.body.error).toMatch(/Token não fornecido/);
  }, 20000);

  it('Deve criar uma campanha (clínica)', async () => {
    const campanha = {
      titulo: 'Campanha de Vacinação',
      descricao: 'Vacinação gratuita para pets de rua',
      data: new Date()
    };
    const res = await request(app)
      .post('/campaigns')
      .set('Authorization', `Bearer ${token}`)
      .send(campanha);
    console.log('Criar campanha:', res.statusCode, res.body);
    expect(res.statusCode).toBe(201);
    expect(res.body.titulo).toBe('Campanha de Vacinação');
  }, 20000);

  it('Deve listar campanhas', async () => {
    const res = await request(app)
      .get('/campaigns')
      .set('Authorization', `Bearer ${token}`);
    console.log('Listar campanhas:', res.statusCode, res.body);
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  }, 20000);

  it('Deve criar histórico', async () => {
    const historico = {
      tipoEvento: 'Resgate',
      descricao: 'Pet resgatado com sucesso',
      petId: petId,
      usuarioId: userId,
      data: new Date()
    };
    const res = await request(app)
      .post('/history')
      .set('Authorization', `Bearer ${token}`)
      .send(historico);
    console.log('Criar histórico:', res.statusCode, res.body);
    expect(res.statusCode).toBe(201);
  }, 20000);

  it('Deve listar histórico de um pet', async () => {
    const res = await request(app)
      .get(`/history/pet/${petId}`)
      .set('Authorization', `Bearer ${token}`);
    console.log('Listar histórico pet:', res.statusCode, res.body);
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  }, 20000);
});
