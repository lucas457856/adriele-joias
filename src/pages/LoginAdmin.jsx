import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import { FaEye, FaEyeSlash } from "react-icons/fa";

export default function Login() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [showPassword, setShowPassword] = useState(false); // 👈 NOVO
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!email || !senha) {
      alert("Preencha email e senha");
      return;
    }

    try {
      setLoading(true);
      await signInWithEmailAndPassword(auth, email, senha);
      navigate("/admin");
    } catch (error) {
      console.error(error);

      if (error.code === "auth/user-not-found") {
        alert("Usuário não encontrado");
      } else if (error.code === "auth/wrong-password") {
        alert("Senha incorreta");
      } else {
        alert("Erro ao logar");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#f3dada]">
      <Header />

      <div className="max-w-xl mx-auto mt-6 bg-white p-6 rounded-xl shadow">
        
        <h2 className="text-xl font-semibold mb-4 text-center">
          Login Administrativo
        </h2>

        <form onSubmit={handleLogin} className="space-y-3">

          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border p-2 rounded"
          />

          {/* 🔥 INPUT COM ÍCONE */}
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Senha"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              className="w-full border p-2 rounded pr-10"
            />

            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-2.5 text-gray-500"
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-green-500 text-white py-2 rounded hover:bg-green-600 transition"
          >
            {loading ? "Entrando..." : "Entrar"}
          </button>

        </form>

      </div>
    </div>
  );
}