const Aluno = require('../models/Aluno');
const { success, error } = require('../utils/response');

exports.create = async (req, res) => {
  try {
    const aluno = await Aluno.create(req.body);
    return success(res, aluno, 'Aluno criado com sucesso');
  } catch (err) {
    return error(res, 400, 'Erro ao criar aluno', err.message);
  }
};

exports.getAll = async (req, res) => {
  try {
    const alunos = await Aluno.find();
    return success(res, alunos);
  } catch (err) {
    return error(res, 500, 'Erro ao buscar alunos', err.message);
  }
};

exports.getById = async (req, res) => {
  try {
    const aluno = await Aluno.findById(req.params.id);
    if (!aluno) return error(res, 404, 'Aluno não encontrado');
    return success(res, aluno);
  } catch (err) {
    return error(res, 500, 'Erro ao buscar aluno', err.message);
  }
};

exports.update = async (req, res) => {
  try {
    const aluno = await Aluno.findByIdAndUpdate(req.params.id, req.body, { new: true });
    return success(res, aluno, 'Aluno atualizado com sucesso');
  } catch (err) {
    return error(res, 400, 'Erro ao atualizar aluno', err.message);
  }
};

exports.remove = async (req, res) => {
  try {
    await Aluno.findByIdAndDelete(req.params.id);
    return success(res, null, 'Aluno removido com sucesso');
  } catch (err) {
    return error(res, 500, 'Erro ao remover aluno', err.message);
  }
};