import api from "./api";

const getAlunoByMatricula = (matricula) => {
  return api.get(`/matricula/${matricula}`);
};

const alocarDisciplina = (alunoId, disciplinaId) => {
  return api.post("/alocar", { alunoId, disciplinaId });
};

const desalocarDisciplina = (alunoId, disciplinaId) => {
  return api.post("/desalocar", { alunoId, disciplinaId });
};

const getAlunosDaDisciplina = (disciplinaId) => {
  return api.get(`/disciplinas/${disciplinaId}/alunos`);
};

export const alunoDisciplinaService = {
  getAlunoByMatricula,
  alocarDisciplina,
  desalocarDisciplina,
  getAlunosDaDisciplina,
};
