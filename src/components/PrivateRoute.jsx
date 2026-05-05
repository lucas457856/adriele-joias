import { useEffect, useState } from "react";
import { auth } from "../firebase";
import { onAuthStateChanged } from "firebase/auth";
import { Navigate } from "react-router-dom";

export default function PrivateRoute({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (u) => {
      setUser(u);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  // 🔄 Tela de carregamento estilizada
  if (loading) {
    return (
      <div className="min-h-screen bg-[#f3dada] flex items-center justify-center">
        <div className="bg-white px-6 py-4 rounded-xl shadow">
          <p className="text-gray-600">Verificando acesso...</p>
        </div>
      </div>
    );
  }

  // 🔒 Proteção
  return user ? children : <Navigate to="/login" replace />;
}