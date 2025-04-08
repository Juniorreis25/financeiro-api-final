const express = require('express');
const { connectDB, mongoose } = require('./database');
const app = express();
const port = 3000;

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Middleware de log
app.use((req, res, next) => {
  console.log('Recebeu requisição:', req.method, req.url);
  next();
});

// Modelo Financeiro
const financeiroSchema = new mongoose.Schema({
  data: Date,
  descricao: String,
  valor: Number,
  tipo: String
});

const Financeiro = mongoose.model('Financeiro', financeiroSchema);

// Rotas
app.get('/', (req, res) => {
  console.log('Recebeu requisição GET para a rota /');
  res.send('Hello World!');
});

app.post('/teste', (req, res) => {
  console.log('Rota POST /teste acionada');
  res.send('Funcionando!');
});

app.post('/financeiro', async (req, res) => {
  console.log('ENTROU NA ROTA FINANCEIRO!!!');
  console.log('----------------------------------------');
  console.log('Recebeu requisição POST para a rota /financeiro');
  console.log('Cabeçalhos:', req.headers);
  console.log('Corpo:', req.body);
  console.log('----------------------------------------');

  const { data, descricao, valor, tipo } = req.body;

  // Validação simples
  if (!data || !descricao || typeof valor !== 'number' || !tipo) {
    return res.status(400).send('Dados inválidos. Certifique-se de preencher data, descrição, valor numérico e tipo.');
  }

  const financeiro = new Financeiro({ data, descricao, valor, tipo });

  try {
    await financeiro.save();
    console.log('Documento salvo com sucesso!');
    res.send('Informação financeira cadastrada com sucesso!');
  } catch (err) {
    console.error('Erro ao salvar documento:', err);
    res.status(500).send('Erro ao salvar no banco de dados.');
  }
});

// Rota não encontrada
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  next();
});

// Conecta ao banco e inicia o servidor
connectDB().then(() => {
  app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`);
  });
});
