import React from "react";

const ModalExcluirAluno = ({ onConfirm, onCancel }) => {
  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h3 className="text-lg font-semibold mb-4">
          Tem certeza que deseja excluir este aluno?
        </h3>
        <div className="flex justify-between">
          <button
            onClick={onConfirm}
            className="bg-red-600 text-white p-2 rounded-md hover:bg-red-700"
          >
            Sim, Excluir
          </button>
          <button
            onClick={onCancel}
            className="bg-gray-300 text-black p-2 rounded-md hover:bg-gray-400"
          >
            Cancelar
          </button>
        </div>
      </div>
    </div>
  );
};

export default ModalExcluirAluno;
