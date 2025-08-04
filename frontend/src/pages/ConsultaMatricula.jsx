import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../api/api";
import ModalEditarAluno from "../components/ModalEditarAluno"; // Modal de Edição
import ModalExcluirAluno from "../components/ModalExcluirAluno"; // Atualiza o nome para ModalExcluirAluno

export default function ConsultaMatricula() {
  const [matricula, setMatricula] = useState("");
  const [aluno, setAluno] = useState(null);
  const [disciplinas, setDisciplinas] = useState([]);
  const [erro, setErro] = useState("");
  const [loading, setLoading] = useState(false);
  const [showModalEditar, setShowModalEditar] = useState(false); // Controla a exibição do modal de edição
  const [showModalExcluir, setShowModalExcluir] = useState(false); // Controla a exibição do modal de exclusão
  const navigate = useNavigate();

  const consultar = async () => {
    if (!matricula) {
      setErro("Por favor, insira uma matrícula válida.");
      return;
    }

    setErro("");
    setLoading(true);

    try {
      const res = await api.get(`/matricula/${matricula}`);
      if (res.data) {
        const { aluno, disciplinas } = res.data;
        setAluno(aluno);
        setDisciplinas(disciplinas);
      } else {
        setErro("Nenhuma disciplina encontrada para essa matrícula.");
        setDisciplinas([]);
      }
    } catch (error) {
      setErro("Aluno não encontrado ou erro ao buscar disciplinas.");
      console.error("Erro ao consultar disciplinas:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleConfirmDelete = () => {
    setShowModalExcluir(true); // Exibe o modal de confirmação de exclusão
  };

  const handleCancelDelete = () => {
    setShowModalExcluir(false); // Fecha o modal de confirmação de exclusão
  };

  // Função para excluir o aluno
  const excluirAluno = async () => {
    try {
      await api.delete(`/alunos/${aluno._id}`); // Rota correta de exclusão
      alert("Aluno excluído com sucesso");
      navigate("/dashboard"); // Redireciona para o Dashboard após excluir
    } catch (error) {
      setErro("Erro ao excluir aluno");
      console.error(error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-10">
      <div className="w-full max-w-4xl bg-white shadow-lg rounded-lg p-6">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
          Consultar Disciplinas por Matrícula
        </h2>

        <div className="space-y-4">
          <div className="flex flex-col space-y-2">
            <input
              className="border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Digite a Matrícula"
              value={matricula}
              onChange={(e) => setMatricula(e.target.value)}
            />
            <button
              onClick={consultar}
              className="bg-blue-600 text-white p-2 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              disabled={loading}
            >
              {loading ? "Carregando..." : "Consultar"}
            </button>
          </div>

          {erro && <p className="text-red-500 text-center">{erro}</p>}

          {aluno && (
            <div className="mt-4">
              <h3 className="font-semibold text-lg text-gray-700">
                Informações do Aluno
              </h3>
              <table className="min-w-full table-auto mt-2 border-collapse border border-gray-300">
                <thead>
                  <tr>
                    <th className="border-b px-4 py-2 text-left">Nome</th>
                    <th className="border-b px-4 py-2 text-left">Matrícula</th>
                    <th className="border-b px-4 py-2 text-left">Curso</th>
                    <th className="border-b px-4 py-2 text-left">Email</th>
                    <th className="border-b px-4 py-2 text-left">Ações</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border-b px-4 py-2">{aluno.nome}</td>
                    <td className="border-b px-4 py-2">{aluno.matricula}</td>
                    <td className="border-b px-4 py-2">{aluno.curso}</td>
                    <td className="border-b px-4 py-2">{aluno.email}</td>
                    <td className="border-b px-4 py-2">
                      <button
                        onClick={() => setShowModalEditar(true)} // Abre o modal de edição
                        className="text-blue-600 hover:text-blue-800"
                      >
                        Editar
                      </button>
                      <button
                        onClick={handleConfirmDelete} // Abre o modal de confirmação de exclusão
                        className="ml-4 text-red-600 hover:text-red-800"
                      >
                        Excluir
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          )}

          {disciplinas.length > 0 ? (
            <div className="mt-6">
              <h3 className="font-semibold text-lg text-gray-700">
                Disciplinas Associadas
              </h3>
              <table className="min-w-full table-auto mt-2 border-collapse border border-gray-300">
                <thead>
                  <tr>
                    <th className="border-b px-4 py-2 text-left">
                      Nome da Disciplina
                    </th>
                    <th className="border-b px-4 py-2 text-left">
                      Carga Horária
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {disciplinas.map((d, index) => (
                    <tr key={index}>
                      <td className="border-b px-4 py-2">{d.nome}</td>
                      <td className="border-b px-4 py-2">{d.cargaHoraria}h</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            !erro && (
              <p className="text-gray-500 mt-4 text-center">
                Nenhuma disciplina encontrada.
              </p>
            )
          )}

          <div className="mt-6 text-center">
            <Link
              to="/dashboard"
              className="bg-gray-600 text-white p-2 rounded-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500"
            >
              Voltar ao Dashboard
            </Link>
          </div>
        </div>
      </div>

      {/* Modal de Edição */}
      {showModalEditar && (
        <ModalEditarAluno
          aluno={aluno}
          onClose={() => setShowModalEditar(false)} // Fecha o modal de edição
          onSave={(updatedAluno) => {
            // Salva as atualizações no aluno
            console.log(updatedAluno);
            setShowModalEditar(false);
          }}
        />
      )}

      {/* Modal de Confirmação de Exclusão */}
      {showModalExcluir && (
        <ModalExcluirAluno
          onConfirm={excluirAluno}
          onCancel={handleCancelDelete}
        />
      )}
    </div>
  );
}
