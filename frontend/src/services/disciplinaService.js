import api from "./api";

const getDisciplinas = () => {
  return api.get("/disciplinas");
};

const createDisciplina = (data) => {
  return api.post("/disciplinas", data);
};

const updateDisciplina = (id, data) => {
  return api.put(`/disciplinas/${id}`, data);
};

const deleteDisciplina = (id) => {
  return api.delete(`/disciplinas/${id}`);
};

export const disciplinaService = {
  getDisciplinas,
  createDisciplina,
  updateDisciplina,
  deleteDisciplina,
};
