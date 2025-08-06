import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { authService } from "../services/authService";
import InputField from "../components/InputField";
import Button from "../components/Button";
import Swal from "sweetalert2";

export default function Login() {
  const [form, setForm] = useState({ email: "", senha: "" });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!form.email || !form.senha) {
      Swal.fire("Campos obrigatórios", "Preencha e-mail e senha", "warning");
      return;
    }
    try {
      await authService.login(form.email, form.senha);
      navigate("/dashboard");
    } catch (err) {
      Swal.fire("Erro!", "Credenciais inválidas.", "error");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form
        onSubmit={handleLogin}
        className="bg-white p-8 rounded shadow-md w-full max-w-sm space-y-4"
      >
        <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
        <InputField
          label="E-mail"
          type="email"
          name="email"
          value={form.email}
          onChange={handleChange}
          required
        />
        <InputField
          label="Senha"
          type="password"
          name="senha"
          value={form.senha}
          onChange={handleChange}
          required
        />
        <Button type="submit" className="bg-green-500 text-white w-full py-2 px-4 rounded hover:bg-green-700">
          Login
        </Button>
      </form>
    </div>
  );
}
