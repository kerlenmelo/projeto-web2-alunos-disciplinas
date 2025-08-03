import { useEffect, useState } from "react";
import api from "../api/api";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

export default function Alunos() {
  const navigate = useNavigate();

  const [alunos, setAlunos] = useState([]);
  const [form, setForm] = useState({
    nome: "",
    endereco: "",
    dataNascimento: "",
    cpf: "",
    matricula: "",
    telefone: "",
    email: "",
    curso: "",
  });

  const [editando, setEditando] = useState(null);
  const [editData, setEditData] = useState({
    endereco: "",
    telefone: "",
    email: "",
  });

  const camposObrigatorios = ["nome", "cpf", "matricula", "email", "curso"];

  const carregarAlunos = async () => {
    try {
      const res = await api.get("/alunos");
      setAlunos(res.data.data);
    } catch (err) {
      Swal.fire("Erro!", "Não foi possível carregar os alunos.", "error");
    }
  };

  const validarCampos = () => {
    for (let campo of camposObrigatorios) {
      if (!form[campo].trim()) {
        Swal.fire(
          "Campo obrigatório",
          `Preencha o campo "${campo}"`,
          "warning"
        );
        return false;
      }
    }

    // Validações específicas
    if (!/^\d{11}$/.test(form.cpf)) {
      Swal.fire(
        "CPF inválido",
        "O CPF deve conter 11 dígitos numéricos.",
        "warning"
      );
      return false;
    }

    if (!/\S+@\S+\.\S+/.test(form.email)) {
      Swal.fire("E-mail inválido", "Informe um e-mail válido.", "warning");
      return false;
    }

    if (form.telefone && !/^\(\d{2}\) \d{4,5}-\d{4}$/.test(form.telefone)) {
      Swal.fire("Telefone inválido", "Formato: (XX) XXXXX-XXXX", "warning");
      return false;
    }

    if (form.dataNascimento && isNaN(Date.parse(form.dataNascimento))) {
      Swal.fire(
        "Data inválida",
        "Informe uma data de nascimento válida.",
        "warning"
      );
      return false;
    }

    return true;
  };

  const criarAluno = async (e) => {
    e.preventDefault();
    if (!validarCampos()) return;

    try {
      await api.post("/alunos", form);
      setForm({
        nome: "",
        endereco: "",
        dataNascimento: "",
        cpf: "",
        matricula: "",
        telefone: "",
        email: "",
        curso: "",
      });
      Swal.fire("Sucesso!", "Aluno cadastrado com sucesso!", "success");
      carregarAlunos();
    } catch (err) {
      console.error("Erro completo:", err.response?.data); // Mostra os campos inválidos
      const erros = err.response?.data?.error;
      if (Array.isArray(erros)) {
        const mensagens = erros.map((e) => e.msg).join("<br>");
        Swal.fire("Erro de validação", mensagens, "warning");
      } else {
        Swal.fire("Erro!", "Erro ao cadastrar aluno.", "error");
      }
    }
  };

  const cancelarCriacao = () => {
    Swal.fire("Cancelado", "Cadastro cancelado.", "info");
    navigate("/dashboard");
  };

  const abrirEdicao = (aluno) => {
    setEditando(aluno._id);
    setEditData({
      endereco: aluno.endereco || "",
      telefone: aluno.telefone || "",
      email: aluno.email || "",
    });
  };

  const cancelarEdicao = () => {
    setEditando(null);
    setEditData({ endereco: "", telefone: "", email: "" });
  };

  const salvarEdicao = async () => {
    try {
      await api.put(`/alunos/${editando}`, editData);
      Swal.fire("Atualizado!", "Dados alterados com sucesso.", "success");
      cancelarEdicao();
      carregarAlunos();
    } catch (err) {
      Swal.fire("Erro!", "Erro ao salvar alterações.", "error");
    }
  };

  const deletarAluno = async (id) => {
    const confirm = await Swal.fire({
      title: "Excluir aluno?",
      text: "Essa ação não poderá ser desfeita!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Sim, excluir!",
      cancelButtonText: "Cancelar",
    });

    if (confirm.isConfirmed) {
      try {
        await api.delete(`/alunos/${id}`);
        Swal.fire("Excluído!", "Aluno removido com sucesso.", "success");
        carregarAlunos();
      } catch {
        Swal.fire("Erro!", "Erro ao excluir aluno.", "error");
      }
    }
  };

  useEffect(() => {
    carregarAlunos();
  }, []);

  const labels = {
    nome: "Nome completo",
    endereco: "Endereço",
    dataNascimento: "Data de nascimento",
    cpf: "CPF",
    matricula: "Matrícula",
    telefone: "Telefone",
    email: "E-mail",
    curso: "Curso",
  };

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h2 className="text-2xl font-bold mb-6">Cadastro de Alunos</h2>

      {/* Formulário */}
      <form
        onSubmit={criarAluno}
        className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8"
      >
        {Object.entries(form).map(([key, value]) => (
          <div key={key} className="flex flex-col">
            <label className="text-sm font-semibold mb-1">
              {labels[key] || key}
            </label>
            <input
              type={key === "dataNascimento" ? "date" : "text"}
              className="border p-2 rounded"
              placeholder={labels[key]}
              value={value}
              onChange={(e) => setForm({ ...form, [key]: e.target.value })}
            />
          </div>
        ))}
        <div className="col-span-2 md:col-span-3 flex justify-end gap-4 mt-2">
          <button
            type="submit"
            className="bg-green-600 text-white px-4 py-2 rounded"
          >
            Criar
          </button>
          <button
            type="button"
            onClick={cancelarCriacao}
            className="bg-gray-600 text-white px-4 py-2 rounded"
          >
            Cancelar
          </button>
        </div>
      </form>

      {/* Tabela de alunos */}
      <div className="grid grid-cols-4 font-semibold border-b pb-2 mb-2">
        <span>Matrícula</span>
        <span>Nome</span>
        <span>Email</span>
        <span>Opções</span>
      </div>

      <ul className="space-y-2">
        {alunos.map((a) => (
          <li
            key={a._id}
            className="grid grid-cols-4 border-b pb-2 items-center"
          >
            <span>{a.matricula}</span>
            <span>{a.nome}</span>
            <span>{a.email}</span>
            <span className="space-x-2">
              <button
                onClick={() => abrirEdicao(a)}
                className="text-blue-600 hover:underline"
              >
                ✏️
              </button>
              <button
                onClick={() => deletarAluno(a._id)}
                className="text-red-600 hover:underline"
              >
                🗑️
              </button>
            </span>
          </li>
        ))}
      </ul>

      {/* Modal de edição */}
      {editando && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-10">
          <div className="bg-white p-6 rounded-lg w-96 shadow-lg">
            <h3 className="text-lg font-bold mb-4">Editar Aluno</h3>
            <input
              className="border p-2 mb-2 w-full rounded"
              placeholder="Endereço"
              value={editData.endereco}
              onChange={(e) =>
                setEditData({ ...editData, endereco: e.target.value })
              }
            />
            <input
              className="border p-2 mb-4 w-full rounded"
              placeholder="Telefone"
              value={editData.telefone}
              onChange={(e) =>
                setEditData({ ...editData, telefone: e.target.value })
              }
            />
            <div className="flex justify-end gap-2">
              <button
                onClick={cancelarEdicao}
                className="bg-gray-400 text-white px-4 py-1 rounded"
              >
                Cancelar
              </button>
              <button
                onClick={salvarEdicao}
                className="bg-blue-600 text-white px-4 py-1 rounded"
              >
                Salvar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
