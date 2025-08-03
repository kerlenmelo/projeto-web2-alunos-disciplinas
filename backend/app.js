const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const connectDB = require('./database/conn');
const router = require('./routes/router');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());
app.use('/api', router);

// Conexão com o banco
connectDB();
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));
