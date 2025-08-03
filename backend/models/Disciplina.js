const mongoose = require('mongoose');

const disciplinaSchema = new mongoose.Schema({
  nome: { type: String, required: true },
  cargaHoraria: { type: Number, required: true },
});

module.exports = mongoose.model('Disciplina', disciplinaSchema);