import { useState } from 'react';
import api from '../api/api';

export default function ConsultaMatricula() {
  const [matricula, setMatricula] = useState('');
  const [disciplinas, setDisciplinas] = useState([]);

  const consultar = async () => {
    const res = await api.get(`/matricula/${matricula}`);
    setDisciplinas(res.data.data);
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Consultar Disciplinas por Matrícula</h2>
      <input className="border p-2 mr-2" placeholder="Matrícula" value={matricula} onChange={(e) => setMatricula(e.target.value)} />
      <button onClick={consultar} className="bg-blue-600 text-white p-2 rounded">Consultar</button>
      <ul className="mt-4 space-y-1">
        {disciplinas.map((d) => <li key={d._id}>{d.nome} — {d.cargaHoraria}h</li>)}
      </ul>
    </div>
  );
}
