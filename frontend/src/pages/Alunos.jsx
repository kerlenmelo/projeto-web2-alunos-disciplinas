import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { alunoService } from "../services/alunoService";
import Swal from "sweetalert2";
import Table from "../components/Table";
import Button from "../components/Button";
import Modal from "../components/Modal";
import InputField from "../components/InputField";

const initialFormState = {
  nome: "",
  endereco: "",
  dataNascimento: "",
  cpf: "",
  matricula: "",
  telefone: "",
  email: "",
  curso: "",
};

export default function Alunos() {
  const navigate = useNavigate();
  const [alunos, setAlunos] = useState([]);
  const [form, setForm] = useState(initialFormState);
  const [modalState, setModalState] = useState({ isOpen: false, data: null });

  const loadAlunos = async () => {
    try {
      const res = await alunoService.getAlunos();
      setAlunos(res.data.data);
    } catch (err) {
      Swal.fire("Erro!", "Não foi possível carregar os alunos.", "error");
    }
  };

  useEffect(() => {
    loadAlunos();
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
      await alunoService.createAluno(form);
      setForm(initialFormState);
      Swal.fire("Sucesso!", "Aluno cadastrado com sucesso!", "success");
      loadAlunos();
    } catch (err) {
      const erros = err.response?.data?.error;
      const mensagens = Array.isArray(erros)
        ? erros.map((e) => e.msg).join("<br>")
        : "Erro ao cadastrar aluno.";
      Swal.fire("Erro de validação", mensagens, "warning");
    }
  };

  const handleEdit = (aluno) => {
    setModalState({ isOpen: true, data: aluno });
  };

  const handleDelete = async (id) => {
    const { isConfirmed } = await Swal.fire({
      title: "Excluir aluno?",
      text: "Essa ação não poderá ser desfeita!",
      icon: "warning",
      showCancelButton: true,
    });
    if (isConfirmed) {
      try {
        await alunoService.deleteAluno(id);
        Swal.fire("Excluído!", "Aluno removido com sucesso.", "success");
        loadAlunos();
      } catch (err) {
        Swal.fire("Erro!", "Erro ao excluir aluno.", "error");
      }
    }
  };

  const handleSave = async () => {
    if (!modalState.data) return;
    const { _id, ...dataToUpdate } = modalState.data;
    try {
      await alunoService.updateAluno(_id, dataToUpdate);
      Swal.fire("Atualizado!", "Dados alterados com sucesso.", "success");
      setModalState({ isOpen: false, data: null });
      loadAlunos();
    } catch (err) {
      Swal.fire("Erro!", "Erro ao salvar alterações.", "error");
    }
  };

  const columns = [
    { key: "matricula", header: "Matrícula" },
    { key: "nome", header: "Nome" },
    { key: "email", header: "Email" },
  ];

  const formFields = [
    { name: "nome", label: "Nome completo", required: true },
    { name: "cpf", label: "CPF", required: true },
    { name: "matricula", label: "Matrícula", required: true },
    { name: "email", label: "E-mail", type: "email", required: true },
    { name: "curso", label: "Curso", required: true },
    { name: "endereco", label: "Endereço" },
    { name: "dataNascimento", label: "Data de Nascimento", type: "date" },
    { name: "telefone", label: "Telefone" },
  ];

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h2 className="text-2xl font-bold mb-6">Cadastro de Alunos</h2>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8 p-4 border rounded-lg">
        {formFields.map((field) => (
          <InputField
            key={field.name}
            label={field.label}
            name={field.name}
            type={field.type || "text"}
            value={form[field.name]}
            onChange={handleChange}
            required={field.required}
          />
        ))}
        <div className="md:col-span-3 flex justify-end gap-4 mt-2">
          <Button type="button" className="secondary" onClick={() => navigate("/dashboard")}>
            Cancelar
          </Button>
          <Button type="submit" className="success">
            Criar Aluno
          </Button>
        </div>
      </form>

      <Table
        columns={columns}
        data={alunos}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

      <Modal
        isOpen={modalState.isOpen}
        onClose={() => setModalState({ isOpen: false, data: null })}
        onConfirm={handleSave}
        title="Editar Aluno"
      >
        {modalState.data && (
          <div className="space-y-4">
            <InputField
              label="Endereço"
              name="endereco"
              value={modalState.data.endereco}
              onChange={handleModalChange}
            />
            <InputField
              label="Telefone"
              name="telefone"
              value={modalState.data.telefone}
              onChange={handleModalChange}
            />
             <InputField
              label="E-mail"
              name="email"
              value={modalState.data.email}
              onChange={handleModalChange}
            />
          </div>
        )}
      </Modal>
    </div>
  );
}
