import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { disciplinaService } from "../services/disciplinaService";
import { alunoDisciplinaService } from "../services/alunoDisciplinaService";
import Swal from "sweetalert2";
import Table from "../components/Table";
import Button from "../components/Button";
import Modal from "../components/Modal";
import InputField from "../components/InputField";

const initialFormState = {
  nome: "",
  cargaHoraria: "",
};

export default function Disciplinas() {
  const navigate = useNavigate();
  const [disciplinas, setDisciplinas] = useState([]);
  const [form, setForm] = useState(initialFormState);
  const [editModalState, setEditModalState] = useState({ isOpen: false, data: null });
  const [viewModalState, setViewModalState] = useState({ isOpen: false, data: null, alunos: [] });

  const loadDisciplinas = async () => {
    try {
      const res = await disciplinaService.getDisciplinas();
      setDisciplinas(res.data.data);
    } catch (err) {
      Swal.fire("Erro!", "Não foi possível carregar as disciplinas.", "error");
    }
  };

  useEffect(() => {
    loadDisciplinas();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleModalChange = (e) => {
    const { name, value } = e.target;
    setEditModalState((prev) => ({
      ...prev,
      data: { ...prev.data, [name]: value },
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await disciplinaService.createDisciplina(form);
      setForm(initialFormState);
      Swal.fire("Sucesso!", "Disciplina cadastrada com sucesso!", "success");
      loadDisciplinas();
    } catch (err) {
      Swal.fire("Erro!", "Erro ao cadastrar disciplina.", "error");
    }
  };

  const handleEdit = (disciplina) => {
    setEditModalState({ isOpen: true, data: disciplina });
  };

  const handleView = async (disciplina) => {
    try {
        const res = await alunoDisciplinaService.getAlunosDaDisciplina(disciplina._id);
        const validAlunos = res.data.map(item => item.aluno).filter(Boolean);
        setViewModalState({ isOpen: true, data: disciplina, alunos: validAlunos });
    } catch (err) {
        Swal.fire("Erro!", "Não foi possível carregar os alunos da disciplina.", "error");
    }
  };

  const handleDelete = async (id) => {
    const { isConfirmed } = await Swal.fire({
      title: "Excluir disciplina?",
      text: "Essa ação não poderá ser desfeita!",
      icon: "warning",
      showCancelButton: true,
    });
    if (isConfirmed) {
      try {
        await disciplinaService.deleteDisciplina(id);
        Swal.fire("Excluída!", "Disciplina removida com sucesso.", "success");
        loadDisciplinas();
      } catch (err) {
        Swal.fire("Erro!", "Erro ao excluir disciplina.", "error");
      }
    }
  };

  const handleSave = async () => {
    if (!editModalState.data) return;
    const { _id, ...dataToUpdate } = editModalState.data;
    try {
      await disciplinaService.updateDisciplina(_id, dataToUpdate);
      Swal.fire("Atualizada!", "Dados alterados com sucesso.", "success");
      setEditModalState({ isOpen: false, data: null });
      loadDisciplinas();
    } catch (err) {
      Swal.fire("Erro!", "Erro ao salvar alterações.", "error");
    }
  };

  const columns = [
    { key: "nome", header: "Nome" },
    { key: "cargaHoraria", header: "Carga Horária (h)" },
  ];

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-6">Cadastro de Disciplinas</h2>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8 p-4 border rounded-lg">
        <InputField
          label="Nome da Disciplina"
          name="nome"
          value={form.nome}
          onChange={handleChange}
          required
        />
        <InputField
          label="Carga Horária"
          name="cargaHoraria"
          type="number"
          value={form.cargaHoraria}
          onChange={handleChange}
          required
        />
        <div className="md:col-span-3 flex justify-end gap-4 mt-2">
           <Button type="button" className="secondary" onClick={() => navigate("/dashboard")}>
            Voltar
          </Button>
          <Button type="submit" className="success">
            Criar Disciplina
          </Button>
        </div>
      </form>

      <Table
        columns={columns}
        data={disciplinas}
        onView={handleView}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

      <Modal
        isOpen={editModalState.isOpen}
        onClose={() => setEditModalState({ isOpen: false, data: null })}
        onConfirm={handleSave}
        title="Editar Disciplina"
      >
        {editModalState.data && (
          <div className="space-y-4">
            <InputField
              label="Nome da Disciplina"
              name="nome"
              value={editModalState.data.nome}
              onChange={handleModalChange}
            />
            <InputField
              label="Carga Horária"
              name="cargaHoraria"
              type="number"
              value={editModalState.data.cargaHoraria}
              onChange={handleModalChange}
            />
          </div>
        )}
      </Modal>

      <Modal
        isOpen={viewModalState.isOpen}
        onClose={() => setViewModalState({ isOpen: false, data: null, alunos: [] })}
        onConfirm={() => setViewModalState({ isOpen: false, data: null, alunos: [] })}
        title={`Alunos em ${viewModalState.data?.nome}`}
      >
        {viewModalState.alunos.length > 0 ? (
            <ul>
                {viewModalState.alunos.map(aluno => (
                    <li key={aluno._id}>{aluno.nome} (Matrícula: {aluno.matricula})</li>
                ))}
            </ul>
        ) : (
            <p>Nenhum aluno matriculado nesta disciplina.</p>
        )}
      </Modal>
    </div>
  );
}
