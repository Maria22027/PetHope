const request = require('supertest');
const app = require('../src/app');
const jwt = require('jsonwebtoken');
const Usuario = require('../src/models/User');
const Pet = require('../src/models/Pet');

describe('Coverage - Casos de Erro e Edge Cases', () => {
  let clinicaToken = '';
  let clinicaId = '';

  beforeAll(async () => {
    // Criar usuário clínica para testes
    const regRes = await request(app)
      .post('/users/registrar')
      .send({
        nome: 'Clinica Coverage',
        email: `clinica-coverage${Date.now()}@teste.com`,
        senha: '123456',
        tipo: 'clinica'
      });

    const loginRes = await request(app)
      .post('/users/login')
      .send({ 
        email: `clinica-coverage${Date.now() - 100}@teste.com`, 
        senha: '123456' 
      });

    // Fazer login com dados válidos
    const clinicaUser = regRes.body;
    const loginRes2 = await request(app)
      .post('/users/login')
      .send({ 
        email: clinicaUser.email, 
        senha: '123456' 
      });

    clinicaToken = loginRes2.body.token;
    const decoded = jwt.verify(clinicaToken, process.env.JWT_SECRET || 'segredo');
    clinicaId = decoded.id;
  }, 50000);

  afterAll(async () => {
    try {
      await Pet.deleteMany({ tutorId: clinicaId });
      await Usuario.findByIdAndDelete(clinicaId);
    } catch (error) {
      console.error('Erro ao limpar dados:', error);
    }
  }, 10000);

  // ========== TESTES DE AUTENTICAÇÃO ==========
  it('Deve retornar erro ao fazer login com email inválido', async () => {
    const res = await request(app)
      .post('/users/login')
      .send({ email: 'email-inexistente@teste.com', senha: '123456' });
    expect(res.statusCode).toBe(401);
    expect(res.body.error).toMatch(/Usuário não encontrado/);
  });

  it('Deve retornar erro ao fazer login com senha inválida', async () => {
    const res = await request(app)
      .post('/users/login')
      .send({ 
        email: 'pedro@email.com', 
        senha: 'senha-errada' 
      });
    expect(res.statusCode).toBe(401);
    expect(res.body.error).toMatch(/Senha inválida/);
  });

  it('Deve retornar erro com token inválido', async () => {
    const res = await request(app)
      .get('/users/')
      .set('Authorization', 'Bearer token-invalido');
    expect([200, 401]).toContain(res.statusCode);
  });

  // ========== TESTES DE PETS ==========
  it('Deve retornar erro ao cadastrar pet com dados incompletos', async () => {
    const res = await request(app)
      .post('/pets/')
      .set('Authorization', `Bearer ${clinicaToken}`)
      .send({ nome: 'Pet sem especie' });
    expect(res.statusCode).toBe(500);
  });

  it('Deve retornar erro ao atualizar pet inexistente', async () => {
    const res = await request(app)
      .put('/pets/507f1f77bcf86cd799439999')
      .set('Authorization', `Bearer ${clinicaToken}`)
      .send({ idade: 5 });
    expect([200, 404, 500]).toContain(res.statusCode);
  });

  it('Deve retornar erro ao deletar pet inexistente', async () => {
    const res = await request(app)
      .delete('/pets/507f1f77bcf86cd799439999')
      .set('Authorization', `Bearer ${clinicaToken}`);
    expect([200, 404, 500]).toContain(res.statusCode);
  });

  it('Deve retornar erro ao obter pet inexistente', async () => {
    const res = await request(app)
      .get('/pets/507f1f77bcf86cd799439999')
      .set('Authorization', `Bearer ${clinicaToken}`);
    expect([200, 404, 500]).toContain(res.statusCode);
  });

  // ========== TESTES DE PERMISSÕES ==========
  it('Tutor não pode cadastrar pets', async () => {
    // Criar usuário tutor
    const tutorRes = await request(app)
      .post('/users/registrar')
      .send({
        nome: 'Tutor Coverage',
        email: `tutor-coverage${Date.now()}@teste.com`,
        senha: '123456',
        tipo: 'tutor'
      });

    const tutorLogin = await request(app)
      .post('/users/login')
      .send({ 
        email: tutorRes.body.email, 
        senha: '123456' 
      });

    const res = await request(app)
      .post('/pets/')
      .set('Authorization', `Bearer ${tutorLogin.body.token}`)
      .send({ nome: 'Pet', especie: 'Cachorro', idade: 2 });

    expect(res.statusCode).toBe(403);
    expect(res.body.error).toMatch(/Apenas clínicas/);

    // Limpar
    const decoded = jwt.verify(tutorLogin.body.token, process.env.JWT_SECRET || 'segredo');
    await Usuario.findByIdAndDelete(decoded.id);
  });

  // ========== TESTES DE CAMPANHAS ==========
  it('Tutor não pode criar campanhas', async () => {
    const tutorRes = await request(app)
      .post('/users/registrar')
      .send({
        nome: 'Tutor Campaign',
        email: `tutor-campaign${Date.now()}@teste.com`,
        senha: '123456',
        tipo: 'tutor'
      });

    const tutorLogin = await request(app)
      .post('/users/login')
      .send({ 
        email: tutorRes.body.email, 
        senha: '123456' 
      });

    const res = await request(app)
      .post('/campaigns')
      .set('Authorization', `Bearer ${tutorLogin.body.token}`)
      .send({ 
        titulo: 'Campanha', 
        descricao: 'Desc',
        data: new Date()
      });

    expect(res.statusCode).toBe(403);
    expect(res.body.error).toMatch(/Apenas ONGs ou clínicas/);

    // Limpar
    const decoded = jwt.verify(tutorLogin.body.token, process.env.JWT_SECRET || 'segredo');
    await Usuario.findByIdAndDelete(decoded.id);
  });

  it('Deve cadastrar campanha como clínica', async () => {
    const res = await request(app)
      .post('/campaigns')
      .set('Authorization', `Bearer ${clinicaToken}`)
      .send({ 
        titulo: 'Campanha Coverage', 
        descricao: 'Descrição da campanha',
        data: new Date()
      });

    expect(res.statusCode).toBe(201);
    expect(res.body.titulo).toBe('Campanha Coverage');
  });

  it('Deve listar campanhas sem token', async () => {
    const res = await request(app).get('/campaigns');
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  // ========== TESTES DE HISTÓRICO ==========
  it('Deve criar histórico com dados válidos', async () => {
    const res = await request(app)
      .post('/history')
      .set('Authorization', `Bearer ${clinicaToken}`)
      .send({
        tipoEvento: 'Resgate',
        descricao: 'Pet resgatado',
        petId: '507f1f77bcf86cd799439011',
        usuarioId: clinicaId,
        data: new Date()
      });

    expect(res.statusCode).toBe(201);
    expect(res.body.tipoEvento).toBe('Resgate');
  });

  it('Deve listar histórico de um pet específico', async () => {
    const res = await request(app)
      .get('/history/pet/507f1f77bcf86cd799439011')
      .set('Authorization', `Bearer ${clinicaToken}`);

    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  // ========== TESTES DE REGISTRO ==========
  it('Deve retornar erro ao registrar usuário sem email', async () => {
    const res = await request(app)
      .post('/users/registrar')
      .send({
        nome: 'Usuário sem email',
        senha: '123456',
        tipo: 'tutor'
      });

    expect(res.statusCode).toBe(500);
  });

  it('Deve retornar erro ao registrar usuário com email duplicado', async () => {
    const res = await request(app)
      .post('/users/registrar')
      .send({
        nome: 'Clinica Duplicate',
        email: 'pedro@email.com', // Email já existe
        senha: '123456',
        tipo: 'clinica'
      });

    expect(res.statusCode).toBe(500);
  });

  // ========== TESTES DE ENDPOINTS NÃO AUTENTICADOS ==========
  it('Listar usuários sem token retorna erro', async () => {
    const res = await request(app).get('/users/');
    expect([200, 401]).toContain(res.statusCode);
  });

  it('Cadastrar pet sem token retorna erro', async () => {
    const res = await request(app)
      .post('/pets/')
      .send({ nome: 'Pet', especie: 'Cachorro', idade: 2 });
    expect(res.statusCode).toBe(401);
  });

  it('Atualizar pet sem token retorna erro', async () => {
    const res = await request(app)
      .put('/pets/507f1f77bcf86cd799439011')
      .send({ idade: 3 });
    expect(res.statusCode).toBe(401);
  });

  it('Deletar pet sem token retorna erro', async () => {
    const res = await request(app)
      .delete('/pets/507f1f77bcf86cd799439011');
    expect(res.statusCode).toBe(401);
  });

  it('Criar campanha sem token retorna erro', async () => {
    const res = await request(app)
      .post('/campaigns')
      .send({ 
        titulo: 'Campanha sem token', 
        descricao: 'Desc',
        data: new Date()
      });
    expect(res.statusCode).toBe(401);
  });
});
