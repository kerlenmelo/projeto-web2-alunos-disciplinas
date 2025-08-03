const { body } = require('express-validator');

exports.validateAluno = [
  body('nome').notEmpty().withMessage('Nome é obrigatório'),
  body('cpf').notEmpty().withMessage('CPF é obrigatório'),
  body('cpf')
    .isLength({ min: 11, max: 11 })
    .withMessage('CPF deve ter 11 dígitos'),
  body('matricula').notEmpty().withMessage('Matrícula é obrigatória'),
  body('email').isEmail().withMessage('Email inválido'),
  body('curso').notEmpty().withMessage('Curso é obrigatório'),
  body('endereco').optional().isString(),
  body('telefone').optional().isString(),
  body('dataNascimento')
    .optional()
    .isDate()
    .withMessage('Data de nascimento inválida'),
];
