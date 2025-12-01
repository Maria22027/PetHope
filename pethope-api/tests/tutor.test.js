
const request = require('supertest');
const app = require('../src/app');
const jwt = require('jsonwebtoken');
const Usuario = require('../src/models/User');
const Historico = require('../src/models/History');

describe('API - Usuário Tutor (Permissões Limitadas)', () => {
  let token = '';
  let userId = '';
  const tutorUser = {
    nome: 'Tutor Teste',
    email: `tutor${Date.now()}@teste.com`,
    senha: '123456',
    tipo: 'tutor'
  };

  beforeAll(async () => {
    // Registrar usuário tipo tutor
    const regRes = await request(app)
      .post('/users/registrar')
      .send(tutorUser);
    console.log('Registro usuário tutor:', regRes.statusCode, regRes.body);

    // Login para obter token
    const res = await request(app)
      .post('/users/login')
      .send({ email: tutorUser.email, senha: tutorUser.senha });
    token = res.body.token;
    
    // Extrair userId do token JWT
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'segredo');
    userId = decoded.id;
    console.log('Token JWT Tutor:', token);
    console.log('User ID extraído:', userId);
  }, 50000);

  afterAll(async () => {
    // Limpar dados do teste
    try {
      await Historico.deleteMany({ usuarioId: userId });
      await Usuario.findByIdAndDelete(userId);
      console.log('Dados de teste do tutor removidos com sucesso!');
    } catch (error) {
      console.error('Erro ao limpar dados de teste:', error);
    }
  }, 10000);  it('Deve listar usuários', async () => {
    const res = await request(app)
      .get('/users/')
      .set('Authorization', `Bearer ${token}`);
    console.log('Tutor - Listar usuários:', res.statusCode);
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  }, 20000);

  it('Deve retornar erro ao cadastrar pet (apenas clínicas podem)', async () => {
    const pet = {
      nome: 'Meu Pet',
      especie: 'Cachorro',
      idade: 2
    };
    const res = await request(app)
      .post('/pets/')
      .set('Authorization', `Bearer ${token}`)
      .send(pet);
    console.log('Tutor - Cadastrar pet (deve falhar):', res.statusCode, res.body);
    expect(res.statusCode).toBe(403);
    expect(res.body.error).toMatch(/Apenas clínicas/);
  }, 20000);

  it('Deve listar pets', async () => {
    const res = await request(app)
      .get('/pets/')
      .set('Authorization', `Bearer ${token}`);
    console.log('Tutor - Listar pets:', res.statusCode);
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  }, 20000);

  it('Deve retornar erro ao criar campanha (apenas ONG ou clínica)', async () => {
    const campanha = {
      titulo: 'Campanha do Tutor',
      descricao: 'Campanha inválida',
      data: new Date()
    };
    const res = await request(app)
      .post('/campaigns')
      .set('Authorization', `Bearer ${token}`)
      .send(campanha);
    console.log('Tutor - Criar campanha (deve falhar):', res.statusCode, res.body);
    expect(res.statusCode).toBe(403);
    expect(res.body.error).toMatch(/Apenas ONGs ou clínicas/);
  }, 20000);

  it('Deve listar campanhas', async () => {
    const res = await request(app)
      .get('/campaigns')
      .set('Authorization', `Bearer ${token}`);
    console.log('Tutor - Listar campanhas:', res.statusCode);
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  }, 20000);

  it('Deve criar histórico', async () => {
    const historico = {
      tipoEvento: 'Adoção',
      descricao: 'Pet adotado com sucesso',
      petId: '507f1f77bcf86cd799439011',
      usuarioId: userId,
      data: new Date()
    };
    const res = await request(app)
      .post('/history')
      .set('Authorization', `Bearer ${token}`)
      .send(historico);
    console.log('Tutor - Criar histórico:', res.statusCode);
    expect(res.statusCode).toBe(201);
  }, 20000);

  it('Deve listar histórico de um pet', async () => {
    const petTestId = '507f1f77bcf86cd799439011';
    const res = await request(app)
      .get(`/history/pet/${petTestId}`)
      .set('Authorization', `Bearer ${token}`);
    console.log('Tutor - Listar histórico pet:', res.statusCode);
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  }, 20000);
});
