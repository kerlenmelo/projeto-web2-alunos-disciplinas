import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { disciplinaService } from "../services/disciplinaService";
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
  const [modalState, setModalState] = useState({ isOpen: false, data: null });

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
    setModalState((prev) => ({
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
    setModalState({ isOpen: true, data: disciplina });
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
    if (!modalState.data) return;
    const { _id, ...dataToUpdate } = modalState.data;
    try {
      await disciplinaService.updateDisciplina(_id, dataToUpdate);
      Swal.fire("Atualizada!", "Dados alterados com sucesso.", "success");
      setModalState({ isOpen: false, data: null });
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
            Cancelar
          </Button>
          <Button type="submit" className="success">
            Criar Disciplina
          </Button>
        </div>
      </form>

      <Table
        columns={columns}
        data={disciplinas}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

      <Modal
        isOpen={modalState.isOpen}
        onClose={() => setModalState({ isOpen: false, data: null })}
        onConfirm={handleSave}
        title="Editar Disciplina"
      >
        {modalState.data && (
          <div className="space-y-4">
            <InputField
              label="Nome da Disciplina"
              name="nome"
              value={modalState.data.nome}
              onChange={handleModalChange}
            />
            <InputField
              label="Carga Horária"
              name="cargaHoraria"
              type="number"
              value={modalState.data.cargaHoraria}
              onChange={handleModalChange}
            />
          </div>
        )}
      </Modal>
    </div>
  );
}
