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

export const alunoDisciplinaService = {
  getAlunoByMatricula,
  alocarDisciplina,
  desalocarDisciplina,
};
