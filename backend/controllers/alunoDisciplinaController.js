const AlunoDisciplina = require('../models/AlunoDisciplina');
const Aluno = require('../models/Aluno');

exports.alocar = async (req, res) => {
  try {
    const { alunoId, disciplinaId } = req.body;
    const existe = await AlunoDisciplina.findOne({ aluno: alunoId, disciplina: disciplinaId });
    if (existe) return res.status(400).json({ error: 'Já alocado' });

    const alocacao = await AlunoDisciplina.create({ aluno: alunoId, disciplina: disciplinaId });
    res.status(201).json(alocacao);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.desalocar = async (req, res) => {
  try {
    const { alunoId, disciplinaId } = req.body;
    await AlunoDisciplina.findOneAndDelete({ aluno: alunoId, disciplina: disciplinaId });
    res.json({ message: 'Disciplina desalocada com sucesso' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getDisciplinasDoAluno = async (req, res) => {
  try {
    const alunoId = req.params.id;
    const disciplinas = await AlunoDisciplina.find({ aluno: alunoId }).populate('disciplina');
    res.json(disciplinas);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getDisciplinasPorMatricula = async (req, res) => {
  try {
    const aluno = await Aluno.findOne({ matricula: req.params.matricula });
    if (!aluno) return res.status(404).json({ error: 'Aluno não encontrado' });

    const disciplinas = await AlunoDisciplina.find({ aluno: aluno._id }).populate('disciplina');
    res.json(disciplinas);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};