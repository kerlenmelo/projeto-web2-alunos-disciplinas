import { useState } from "react";

const ModalEditarAluno = ({ aluno, onClose, onSave }) => {
  const [formData, setFormData] = useState({
    nome: aluno.nome || "",
    matricula: aluno.matricula || "",
    curso: aluno.curso || "",
    email: aluno.email || "",
    endereco: aluno.endereco || "",
    telefone: aluno.telefone || "",
    dataNascimento: aluno.dataNascimento || "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Chama a função de salvar no backend
    onSave(formData);
  };

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-4xl w-full">
        <h3 className="text-lg font-semibold mb-4">
          Editar Informações do Aluno
        </h3>

        <form onSubmit={handleSubmit}>
          {/* Formulário de Edição */}
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Nome
              </label>
              <input
                type="text"
                name="nome"
                value={formData.nome}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded-md"
                disabled
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Matrícula
              </label>
              <input
                type="text"
                name="matricula"
                value={formData.matricula}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded-md"
                disabled
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Curso
              </label>
              <input
                type="text"
                name="curso"
                value={formData.curso}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded-md"
                disabled
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded-md"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Endereço
              </label>
              <input
                type="text"
                name="endereco"
                value={formData.endereco}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded-md"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Telefone
              </label>
              <input
                type="text"
                name="telefone"
                value={formData.telefone}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded-md"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Data de Nascimento
              </label>
              <input
                type="date"
                name="dataNascimento"
                value={formData.dataNascimento}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded-md"
              />
            </div>
          </div>

          <div className="flex justify-between mt-4">
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-600 text-white p-2 rounded-md hover:bg-gray-700"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="bg-blue-600 text-white p-2 rounded-md hover:bg-blue-700"
            >
              Salvar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ModalEditarAluno;
