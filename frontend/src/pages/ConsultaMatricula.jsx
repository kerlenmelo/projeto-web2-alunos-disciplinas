import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { alunoDisciplinaService } from "../services/alunoDisciplinaService";
import { alunoService } from "../services/alunoService";
import Swal from "sweetalert2";
import InputField from "../components/InputField";
import Button from "../components/Button";
import Table from "../components/Table";
import Modal from "../components/Modal";

export default function ConsultaMatricula() {
  const [matricula, setMatricula] = useState("");
  const [aluno, setAluno] = useState(null);
  const [disciplinas, setDisciplinas] = useState([]);
  const [erro, setErro] = useState("");
  const [loading, setLoading] = useState(false);
  const [modalState, setModalState] = useState({ isOpen: false, data: null });
  const navigate = useNavigate();

  const handleConsultar = async () => {
    if (!matricula) {
      setErro("Por favor, insira uma matrícula válida.");
      return;
    }
    setErro("");
    setLoading(true);
    setAluno(null);
    setDisciplinas([]);
    try {
      const res = await alunoDisciplinaService.getAlunoByMatricula(matricula);
      setAluno(res.data.aluno);
      setDisciplinas(res.data.disciplinas);
    } catch (error) {
      setErro("Aluno não encontrado ou erro ao buscar disciplinas.");
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = () => {
    setModalState({ isOpen: true, data: aluno });
  };

  const handleDelete = async () => {
    const { isConfirmed } = await Swal.fire({
      title: "Excluir aluno?",
      text: "Essa ação não poderá ser desfeita!",
      icon: "warning",
      showCancelButton: true,
    });
    if (isConfirmed) {
      try {
        await alunoService.deleteAluno(aluno._id);
        Swal.fire("Excluído!", "Aluno removido com sucesso.", "success");
        navigate("/dashboard");
      } catch (err) {
        Swal.fire("Erro!", "Erro ao excluir aluno.", "error");
      }
    }
  };

  const handleSave = async () => {
    if (!modalState.data) return;
    const { _id, ...dataToUpdate } = modalState.data;
    try {
      const res = await alunoService.updateAluno(_id, dataToUpdate);
      Swal.fire("Atualizado!", "Dados alterados com sucesso.", "success");
      setAluno(res.data.data);
      setModalState({ isOpen: false, data: null });
    } catch (err) {
      Swal.fire("Erro!", "Erro ao salvar alterações.", "error");
    }
  };

  const handleModalChange = (e) => {
    const { name, value } = e.target;
    setModalState((prev) => ({
      ...prev,
      data: { ...prev.data, [name]: value },
    }));
  };

  const alunoColumns = [
    { key: "nome", header: "Nome" },
    { key: "matricula", header: "Matrícula" },
    { key: "curso", header: "Curso" },
    { key: "email", header: "Email" },
  ];

  const disciplinaColumns = [
    { key: "nome", header: "Nome da Disciplina" },
    { key: "cargaHoraria", header: "Carga Horária (h)" },
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-10">
      <div className="w-full max-w-4xl bg-white shadow-lg rounded-lg p-6">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
          Consultar por Matrícula
        </h2>

        <div className="flex gap-2 mb-4">
          <InputField
            placeholder="Digite a Matrícula"
            value={matricula}
            onChange={(e) => setMatricula(e.target.value)}
          />
          <Button onClick={handleConsultar} className="primary" disabled={loading}>
            {loading ? "Carregando..." : "Consultar"}
          </Button>
        </div>

        {erro && <p className="text-red-500 text-center mb-4">{erro}</p>}

        {aluno && (
          <>
            <h3 className="text-xl font-bold mb-4">Informações do Aluno</h3>
            <Table
              columns={alunoColumns}
              data={[aluno]}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          </>
        )}

        {disciplinas.length > 0 && (
          <div className="mt-6">
            <h3 className="text-xl font-bold mb-4">Disciplinas Associadas</h3>
            <Table columns={disciplinaColumns} data={disciplinas} />
          </div>
        )}

        <div className="mt-6 text-center">
          <Link to="/dashboard">
            <Button className="secondary">Voltar ao Dashboard</Button>
          </Link>
        </div>
      </div>

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
