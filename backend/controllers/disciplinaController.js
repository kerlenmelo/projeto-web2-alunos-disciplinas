const Disciplina = require('../models/Disciplina');
const { success, error } = require('../utils/response');

exports.create = async (req, res) => {
  try {
    const disciplina = await Disciplina.create(req.body);
    return success(res, disciplina, 'Disciplina criada com sucesso');
  } catch (err) {
    return error(res, 400, 'Erro ao criar disciplina', err.message);
  }
};

exports.getAll = async (req, res) => {
  try {
    const disciplinas = await Disciplina.find();
    return success(res, disciplinas);
  } catch (err) {
    return error(res, 500, 'Erro ao buscar disciplinas', err.message);
  }
};

exports.getById = async (req, res) => {
  try {
    const disciplina = await Disciplina.findById(req.params.id);
    if (!disciplina) return error(res, 404, 'Disciplina não encontrada');
    return success(res, disciplina);
  } catch (err) {
    return error(res, 500, 'Erro ao buscar disciplina', err.message);
  }
};

exports.update = async (req, res) => {
  try {
    const disciplina = await Disciplina.findByIdAndUpdate(req.params.id, req.body, { new: true });
    return success(res, disciplina, 'Disciplina atualizada com sucesso');
  } catch (err) {
    return error(res, 400, 'Erro ao atualizar disciplina', err.message);
  }
};

exports.remove = async (req, res) => {
  try {
    await Disciplina.findByIdAndDelete(req.params.id);
    return success(res, null, 'Disciplina removida com sucesso');
  } catch (err) {
    return error(res, 500, 'Erro ao remover disciplina', err.message);
  }
};