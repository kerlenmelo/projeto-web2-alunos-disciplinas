import { useEffect, useState } from 'react';
import api from '../api/api';

export default function Disciplinas() {
  const [disciplinas, setDisciplinas] = useState([]);
  const [form, setForm] = useState({ nome: '', cargaHoraria: '' });

  const carregar = async () => {
    const res = await api.get('/disciplinas');
    setDisciplinas(res.data.data);
  };

  const criar = async (e) => {
    e.preventDefault();
    await api.post('/disciplinas', form);
    setForm({ nome: '', cargaHoraria: '' });
    carregar();
  };

  useEffect(() => { carregar(); }, []);

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Disciplinas</h2>
      <form onSubmit={criar} className="grid grid-cols-2 gap-4 mb-6">
        <input className="border p-2 rounded" placeholder="Nome" value={form.nome}
          onChange={(e) => setForm({ ...form, nome: e.target.value })} />
        <input className="border p-2 rounded" placeholder="Carga Horária" value={form.cargaHoraria}
          onChange={(e) => setForm({ ...form, cargaHoraria: e.target.value })} />
        <button className="col-span-2 bg-green-600 text-white p-2 rounded">Criar</button>
      </form>
      <ul className="space-y-2">
        {disciplinas.map((d) => (
          <li key={d._id} className="border-b pb-1">{d.nome} — {d.cargaHoraria}h</li>
        ))}
      </ul>
    </div>
  );
}
