import { Link } from 'react-router-dom';

export default function Dashboard() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Painel Principal</h1>
      <ul className="space-y-2">
        <li><Link to="/alunos" className="text-blue-600 hover:underline">Gerenciar Alunos</Link></li>
        <li><Link to="/disciplinas" className="text-blue-600 hover:underline">Gerenciar Disciplinas</Link></li>
        <li><Link to="/alocar" className="text-blue-600 hover:underline">Alocar/Desalocar Disciplinas</Link></li>
        <li><Link to="/consulta" className="text-blue-600 hover:underline">Consultar por Matrícula</Link></li>
      </ul>
    </div>
  );
}
