import { useState } from 'react';
import api from '../api/api';

export default function AlocarDisciplinas() {
  const [alunoId, setAlunoId] = useState('');
  const [disciplinaId, setDisciplinaId] = useState('');

  const alocar = async () => {
    await api.post('/alocar', { alunoId, disciplinaId });
    alert('Disciplina alocada');
  };

  const desalocar = async () => {
    await api.post('/desalocar', { alunoId, disciplinaId });
    alert('Disciplina desalocada');
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Alocação de Disciplinas</h2>
      <input className="border p-2 mr-2" placeholder="ID do Aluno" value={alunoId} onChange={(e) => setAlunoId(e.target.value)} />
      <input className="border p-2 mr-2" placeholder="ID da Disciplina" value={disciplinaId} onChange={(e) => setDisciplinaId(e.target.value)} />
      <button onClick={alocar} className="bg-blue-600 text-white p-2 rounded mr-2">Alocar</button>
      <button onClick={desalocar} className="bg-red-600 text-white p-2 rounded">Desalocar</button>
    </div>
  );
}
