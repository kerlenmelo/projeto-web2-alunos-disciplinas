import { Link, useNavigate } from "react-router-dom";

export default function Dashboard() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    sessionStorage.removeItem("token");

    navigate("/");
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-10">
      <div className="w-full max-w-sm bg-white shadow-lg rounded-lg p-6">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">
          Painel Principal
        </h1>

        <div className="space-y-4">
          <div className="border-b border-gray-200 pb-4">
            <Link
              to="/alunos"
              className="block text-lg font-semibold text-gray-700 hover:text-gray-900 transition duration-200 ease-in-out"
            >
              Gerenciar Alunos
            </Link>
          </div>

          <div className="border-b border-gray-200 pb-4">
            <Link
              to="/disciplinas"
              className="block text-lg font-semibold text-gray-700 hover:text-gray-900 transition duration-200 ease-in-out"
            >
              Gerenciar Disciplinas
            </Link>
          </div>

          <div className="border-b border-gray-200 pb-4">
            <Link
              to="/alocar"
              className="block text-lg font-semibold text-gray-700 hover:text-gray-900 transition duration-200 ease-in-out"
            >
              Alocar/Desalocar Disciplinas
            </Link>
          </div>

          <div>
            <Link
              to="/consulta"
              className="block text-lg font-semibold text-gray-700 hover:text-gray-900 transition duration-200 ease-in-out"
            >
              Consultar por Matrícula
            </Link>
          </div>

          {/* Botão de Logout */}
          <div className="mt-6 text-center">
            <button
              onClick={handleLogout}
              className="bg-red-600 text-white p-2 rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
