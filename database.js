const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    await mongoose.connect('mongodb://localhost:27017/financeiro');
    console.log('Conectado ao banco de dados');
  } catch (err) {
    console.error('Erro ao conectar ao banco de dados:', err);
  }
};

module.exports = { connectDB, mongoose };
