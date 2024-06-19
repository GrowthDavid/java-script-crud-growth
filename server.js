const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const productRoutes = require('./routes/products'); // Ajuste o caminho para './routes/products'

// Middleware para parsear JSON
app.use(bodyParser.json());

// Conexão ao MongoDB
mongoose.connect('mongodb://localhost:27017/productsdb', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'Erro na conexão ao MongoDB:'));
db.once('open', () => {
  console.log('Conectado ao MongoDB');
});

// Rotas
app.get('/', (req, res) => {
  res.send('Bem-vindo ao CRUD de Produtos!');
});

// Usando as rotas de produtos
app.use('/api', productRoutes);

// Porta do servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
