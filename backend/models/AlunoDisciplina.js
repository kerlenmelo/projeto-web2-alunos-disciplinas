const mongoose = require('mongoose');

const alunoDisciplinaSchema = new mongoose.Schema({
  aluno: { type: mongoose.Schema.Types.ObjectId, ref: 'Aluno', required: true },
  disciplina: { type: mongoose.Schema.Types.ObjectId, ref: 'Disciplina', required: true },
});

module.exports = mongoose.model('AlunoDisciplina', alunoDisciplinaSchema);