
const request = require('supertest');
const app = require('../src/app');
const jwt = require('jsonwebtoken');
const Usuario = require('../src/models/User');
const Campanha = require('../src/models/Campaign');
const Historico = require('../src/models/History');

describe('API - Usuário ONG (Permissões Amplas)', () => {
  let token = '';
  let userId = '';
  let campaignId = '';
  const ongUser = {
    nome: 'ONG Teste',
    email: `ong${Date.now()}@teste.com`,
    senha: '123456',
    tipo: 'ong'
  };

  beforeAll(async () => {
    // Registrar usuário tipo ong
    const regRes = await request(app)
      .post('/users/registrar')
      .send(ongUser);
    console.log('Registro usuário ONG:', regRes.statusCode, regRes.body);

    // Login para obter token
    const res = await request(app)
      .post('/users/login')
      .send({ email: ongUser.email, senha: ongUser.senha });
    token = res.body.token;
    
    // Extrair userId do token JWT
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'segredo');
    userId = decoded.id;
    console.log('Token JWT ONG:', token);
    console.log('User ID extraído:', userId);
  }, 50000);

  afterAll(async () => {
    // Limpar dados do teste
    try {
      await Campanha.deleteMany({ organizacaoId: userId });
      await Historico.deleteMany({ usuarioId: userId });
      await Usuario.findByIdAndDelete(userId);
      console.log('Dados de teste da ONG removidos com sucesso!');
    } catch (error) {
      console.error('Erro ao limpar dados de teste:', error);
    }
  }, 10000);  it('Deve listar usuários', async () => {
    const res = await request(app)
      .get('/users/')
      .set('Authorization', `Bearer ${token}`);
    console.log('ONG - Listar usuários:', res.statusCode);
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  }, 20000);

  it('Deve retornar erro ao cadastrar pet (apenas clínicas podem)', async () => {
    const pet = {
      nome: 'Pet ONG',
      especie: 'Gato',
      idade: 1
    };
    const res = await request(app)
      .post('/pets/')
      .set('Authorization', `Bearer ${token}`)
      .send(pet);
    console.log('ONG - Cadastrar pet (deve falhar):', res.statusCode, res.body);
    expect(res.statusCode).toBe(403);
    expect(res.body.error).toMatch(/Apenas clínicas/);
  }, 20000);

  it('Deve listar pets', async () => {
    const res = await request(app)
      .get('/pets/')
      .set('Authorization', `Bearer ${token}`);
    console.log('ONG - Listar pets:', res.statusCode);
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  }, 20000);

  it('Deve criar uma campanha (ONG)', async () => {
    const campanha = {
      titulo: 'Campanha de Resgate ONG',
      descricao: 'Resgate de pets abandonados',
      data: new Date()
    };
    const res = await request(app)
      .post('/campaigns')
      .set('Authorization', `Bearer ${token}`)
      .send(campanha);
    console.log('ONG - Criar campanha:', res.statusCode, res.body);
    expect(res.statusCode).toBe(201);
    expect(res.body.titulo).toBe('Campanha de Resgate ONG');
    campaignId = res.body._id;
  }, 20000);

  it('Deve listar campanhas', async () => {
    const res = await request(app)
      .get('/campaigns')
      .set('Authorization', `Bearer ${token}`);
    console.log('ONG - Listar campanhas:', res.statusCode);
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  }, 20000);

  it('Deve criar histórico', async () => {
    const historico = {
      tipoEvento: 'Resgate',
      descricao: 'Pet resgatado pela ONG',
      petId: '507f1f77bcf86cd799439011',
      usuarioId: userId,
      data: new Date()
    };
    const res = await request(app)
      .post('/history')
      .set('Authorization', `Bearer ${token}`)
      .send(historico);
    console.log('ONG - Criar histórico:', res.statusCode);
    expect(res.statusCode).toBe(201);
  }, 20000);

  it('Deve listar histórico de um pet', async () => {
    const petTestId = '507f1f77bcf86cd799439011';
    const res = await request(app)
      .get(`/history/pet/${petTestId}`)
      .set('Authorization', `Bearer ${token}`);
    console.log('ONG - Listar histórico pet:', res.statusCode);
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  }, 20000);

  it('Deve retornar erro ao tentar criar campanha sem token', async () => {
    const campanha = {
      titulo: 'Campanha sem token',
      descricao: 'Deve falhar',
      data: new Date()
    };
    const res = await request(app)
      .post('/campaigns')
      .send(campanha);
    console.log('ONG - Criar campanha sem token:', res.statusCode);
    expect(res.statusCode).toBe(401);
    expect(res.body.error).toMatch(/Token não fornecido/);
  }, 20000);
});
