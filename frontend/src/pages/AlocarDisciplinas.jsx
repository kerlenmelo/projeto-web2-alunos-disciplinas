import { useEffect, useState } from "react";
import { alunoService } from "../services/alunoService";
import { disciplinaService } from "../services/disciplinaService";
import { alunoDisciplinaService } from "../services/alunoDisciplinaService";
import Swal from "sweetalert2";
import Button from "../components/Button";
import Table from "../components/Table";

export default function AlocarDisciplinas() {
  const [alunos, setAlunos] = useState([]);
  const [disciplinas, setDisciplinas] = useState([]);
  const [selectedAluno, setSelectedAluno] = useState("");
  const [selectedDisciplina, setSelectedDisciplina] = useState("");
  const [disciplinasDoAluno, setDisciplinasDoAluno] = useState([]);

  useEffect(() => {
    const loadData = async () => {
      try {
        const [resAlunos, resDisciplinas] = await Promise.all([
          alunoService.getAlunos(),
          disciplinaService.getDisciplinas(),
        ]);
        setAlunos(resAlunos.data.data);
        setDisciplinas(resDisciplinas.data.data);
      } catch (err) {
        Swal.fire("Erro", "Falha ao carregar alunos e disciplinas", "error");
      }
    };
    loadData();
  }, []);

  useEffect(() => {
    const loadDisciplinasDoAluno = async () => {
      if (selectedAluno) {
        try {
          const res = await alunoDisciplinaService.getAlunoByMatricula(
            alunos.find((a) => a._id === selectedAluno)?.matricula
          );
          setDisciplinasDoAluno(res.data.disciplinas);
        } catch (err) {
          setDisciplinasDoAluno([]);
        }
      } else {
        setDisciplinasDoAluno([]);
      }
    };
    loadDisciplinasDoAluno();
  }, [selectedAluno, alunos]);

  const handleAlocar = async () => {
    try {
      await alunoDisciplinaService.alocarDisciplina(selectedAluno, selectedDisciplina);
      Swal.fire("Sucesso!", "Disciplina alocada com sucesso!", "success");
      // Refresh the list of disciplines for the student
      const res = await alunoDisciplinaService.getAlunoByMatricula(
        alunos.find((a) => a._id === selectedAluno)?.matricula
      );
      setDisciplinasDoAluno(res.data.disciplinas);
    } catch (err) {
      Swal.fire("Erro!", "Falha ao alocar disciplina.", "error");
    }
  };

  const handleDesalocar = async (disciplinaId) => {
     try {
      await alunoDisciplinaService.desalocarDisciplina(selectedAluno, disciplinaId);
      Swal.fire("Sucesso!", "Disciplina desalocada com sucesso!", "success");
      // Refresh the list of disciplines for the student
       const res = await alunoDisciplinaService.getAlunoByMatricula(
        alunos.find((a) => a._id === selectedAluno)?.matricula
      );
      setDisciplinasDoAluno(res.data.disciplinas);
    } catch (err) {
      Swal.fire("Erro!", "Falha ao desalocar disciplina.", "error");
    }
  };

  const columns = [
    { key: 'nome', header: 'Nome' },
    { key: 'cargaHoraria', header: 'Carga Horária' },
  ];

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-6">Alocar e Desalocar Disciplinas</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8 p-4 border rounded-lg">
        <div>
          <label className="block text-sm font-semibold mb-1">Selecione o Aluno</label>
          <select
            value={selectedAluno}
            onChange={(e) => setSelectedAluno(e.target.value)}
            className="w-full p-2 border rounded"
          >
            <option value="">-- Selecione um aluno --</option>
            {alunos.map((aluno) => (
              <option key={aluno._id} value={aluno._id}>
                {aluno.nome}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-sm font-semibold mb-1">Selecione a Disciplina</label>
          <select
            value={selectedDisciplina}
            onChange={(e) => setSelectedDisciplina(e.target.value)}
            className="w-full p-2 border rounded"
          >
            <option value="">-- Selecione uma disciplina --</option>
            {disciplinas.map((disciplina) => (
              <option key={disciplina._id} value={disciplina._id}>
                {disciplina.nome}
              </option>
            ))}
          </select>
        </div>
        <div className="md:col-span-2 flex justify-end">
          <Button onClick={handleAlocar} className="success" disabled={!selectedAluno || !selectedDisciplina}>
            Alocar Disciplina
          </Button>
        </div>
      </div>

      {selectedAluno && (
        <div>
          <h3 className="text-xl font-bold mb-4">Disciplinas Alocadas</h3>
          <Table columns={columns} data={disciplinasDoAluno} onDelete={handleDesalocar} />
        </div>
      )}
    </div>
  );
}
