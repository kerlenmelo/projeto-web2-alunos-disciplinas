import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Alunos from './pages/Alunos';
import Disciplinas from './pages/Disciplinas';
import AlocarDisciplinas from './pages/AlocarDisciplinas';
import ConsultaMatricula from './pages/ConsultaMatricula';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/alunos" element={<Alunos />} />
        <Route path="/disciplinas" element={<Disciplinas />} />
        <Route path="/alocar" element={<AlocarDisciplinas />} />
        <Route path="/consulta" element={<ConsultaMatricula />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
