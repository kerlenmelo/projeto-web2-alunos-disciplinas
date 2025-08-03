const { body } = require('express-validator');

exports.validateDisciplina = [
  body('nome').notEmpty().withMessage('Nome é obrigatório'),
  body('cargaHoraria').isInt({ min: 1 }).withMessage('Carga horária deve ser um número positivo')
];