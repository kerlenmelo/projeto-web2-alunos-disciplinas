import api from "./api";

const getAlunos = () => {
  return api.get("/alunos");
};

const createAluno = (data) => {
  return api.post("/alunos", data);
};

const updateAluno = (id, data) => {
  return api.put(`/alunos/${id}`, data);
};

const deleteAluno = (id) => {
  return api.delete(`/alunos/${id}`);
};

export const alunoService = {
  getAlunos,
  createAluno,
  updateAluno,
  deleteAluno,
};
