const express = require('express');
const alunoController = require('../controllers/alunoController');
const disciplinaController = require('../controllers/disciplinaController');
const alunoDisciplinaController = require('../controllers/alunoDisciplinaController');
const authController = require('../controllers/authController');

const { validateAluno } = require('../validators/alunoValidator');
const { validateDisciplina } = require('../validators/disciplinaValidator');
const handleValidation = require('../validators/handleValidation');
const auth = require('../middlewareAuth');

const router = express.Router();

// Login
router.post('/login', authController.login);

// Aluno
router.post('/alunos', auth, validateAluno, handleValidation, alunoController.create);
router.get('/alunos', auth, alunoController.getAll);
router.get('/alunos/:id', auth, alunoController.getById);
router.put('/alunos/:id', auth, validateAluno, handleValidation, alunoController.update);
router.delete('/alunos/:id', auth, alunoController.remove);

// Disciplina
router.post('/disciplinas', auth, validateDisciplina, handleValidation, disciplinaController.create);
router.get('/disciplinas', auth, disciplinaController.getAll);
router.get('/disciplinas/:id', auth, disciplinaController.getById);
router.put('/disciplinas/:id', auth, validateDisciplina, handleValidation, disciplinaController.update);
router.delete('/disciplinas/:id', auth, disciplinaController.remove);

// AlunoDisciplina
router.post('/alocar', auth, alunoDisciplinaController.alocar);
router.post('/desalocar', auth, alunoDisciplinaController.desalocar);
router.get('/alunos/:id/disciplina', auth, alunoDisciplinaController.getDisciplinasDoAluno);
router.get('/matricula/:matricula', auth, alunoDisciplinaController.getDisciplinasPorMatricula);

module.exports = router;