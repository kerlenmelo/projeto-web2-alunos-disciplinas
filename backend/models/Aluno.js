const mongoose = require('mongoose');

const alunoSchema = new mongoose.Schema({
  nome: { type: String, required: true },
  endereco: { type: String },
  dataNascimento: { type: Date },
  cpf: { type: String, required: true, unique: true },
  matricula: { type: String, required: true, unique: true },
  telefone: { type: String },
  email: { type: String, required: true, unique: true },
  curso: { type: String, required: true },
});

module.exports = mongoose.model('Aluno', alunoSchema);
