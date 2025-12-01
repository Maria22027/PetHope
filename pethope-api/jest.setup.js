const mongoose = require('mongoose');
require('dotenv').config();

beforeAll(async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('MongoDB conectado para os testes!');
  } catch (error) {
    console.error('Erro ao conectar ao MongoDB para testes:', error);
    process.exit(1);
  }
});

afterAll(async () => {
  try {
    await mongoose.connection.close();
    console.log('Conexão com MongoDB fechada!');
  } catch (error) {
    console.error('Erro ao fechar conexão com MongoDB:', error);
  }
});
