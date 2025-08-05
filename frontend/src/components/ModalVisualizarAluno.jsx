import React from "react";

const ModalVisualizarAluno = ({ aluno, onClose }) => {
  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-4xl w-full">
        <h3 className="text-lg font-semibold mb-4">Detalhes do Aluno</h3>

        <div className="space-y-4">
          <div>
            <strong>Nome:</strong> {aluno.nome}
          </div>
          <div>
            <strong>Matrícula:</strong> {aluno.matricula}
          </div>
          <div>
            <strong>Curso:</strong> {aluno.curso}
          </div>
          <div>
            <strong>Email:</strong> {aluno.email}
          </div>
          <div>
            <strong>Endereço:</strong> {aluno.endereco}
          </div>
          <div>
            <strong>Telefone:</strong> {aluno.telefone}
          </div>
          <div>
            <strong>Data de Nascimento:</strong> {aluno.dataNascimento}
          </div>
        </div>

        {/* Botão para fechar o modal */}
        <div className="mt-6 text-center">
          <button
            onClick={onClose}
            className="bg-gray-600 text-white p-2 rounded-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500"
          >
            Fechar
          </button>
        </div>
      </div>
    </div>
  );
};

export default ModalVisualizarAluno;
