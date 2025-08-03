const { body } = require('express-validator');

exports.validateAluno = [
  body('nome').notEmpty().withMessage('Nome é obrigatório'),
  body('endereco').notEmpty().withMessage('Endereço é obrigatório'),
  body('dataNascimento').notEmpty().isISO8601().withMessage('Data de nascimento inválida'),
  body('cpf').notEmpty().withMessage('CPF é obrigatório'),
  body('matricula').notEmpty().withMessage('Matrícula é obrigatória'),
  body('telefone').notEmpty().withMessage('Telefone é obrigatório'),
  body('email').isEmail().withMessage('Email inválido'),
  body('curso').notEmpty().withMessage('Curso é obrigatório')
];