import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Header from "../components/Header";
import { useCart } from "../context/CartContext";
import { FaWhatsapp } from "react-icons/fa";
import { ShoppingBag } from "lucide-react";
import Footer from "../components/Footer";

// 🔥 FIREBASE
import { db } from "../firebase";
import { doc, getDoc } from "firebase/firestore";

export default function ProductPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  // 🔥 BUSCAR PRODUTO
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const docRef = doc(db, "products", id);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setProduct({
            id: docSnap.id,
            ...docSnap.data(),
          });
        } else {
          setProduct(null);
        }
      } catch (error) {
        console.error("Erro ao buscar produto:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  // ⏳ LOADING
  if (loading) {
    return (
      <div className="min-h-screen">
        <Header />
        <div className="flex items-center justify-center h-[80vh]">
          <p>Carregando...</p>
        </div>
      </div>
    );
  }

  // ❌ NÃO ENCONTRADO
  if (!product) {
    return (
      <div className="min-h-screen">
        <Header />
        <div className="flex items-center justify-center h-[80vh]">
          <p>Produto não encontrado</p>
        </div>
      </div>
    );
  }

  // 🔴 STATUS
  const isOut = product.status === "esgotado";

  return (
    <div className="min-h-screen bg-rose-200">
      <Header />

      <div className="flex items-center justify-center p-4">
        <div className="bg-gray-100 w-full max-w-5xl flex flex-col md:flex-row rounded-md overflow-hidden mt-4">
          
          {/* IMAGEM */}
          <div className="md:w-1/2 p-4">
            <img
              src={product.image}
              alt={product.name}
              className={`w-full rounded ${isOut ? "opacity-60 grayscale" : ""}`}
            />
          </div>

          {/* INFO */}
          <div className="md:w-1/2 p-6 flex flex-col">
            
            <h2 className="text-lg font-medium text-gray-800">
              {product.name}
            </h2>

            <p className="text-3xl mt-2 mb-2">
              R$ {product.price?.toFixed(2).replace(".", ",")}
            </p>

            <p className="text-sm text-gray-500">
              {product.code || "Código não informado"}
            </p>

            <p className="text-sm mb-4">
              Ref. {product.ref}
            </p>

            {/* 🔴 AVISO ESGOTADO */}
            {isOut && (
              <p className="text-red-500 font-semibold mb-3">
                Produto esgotado
              </p>
            )}

            {/* 🛒 SACOLA */}
            <button
              onClick={() => !isOut && addToCart(product)}
              disabled={isOut}
              className={`w-full py-3 mb-2 border rounded-md flex items-center justify-center gap-2 transition
                ${
                  isOut
                    ? "bg-gray-200 cursor-not-allowed text-gray-500"
                    : "hover:bg-gray-200"
                }`}
            >
              <ShoppingBag size={18} strokeWidth={1.5} />
              {isOut ? "Indisponível" : "Adicionar à Sacola"}
            </button>

            {/* 📲 WHATSAPP */}
            {!isOut && (
              <a
                href={`https://wa.me/5585999288032?text=Quero o produto ${product.name} (Ref: ${product.ref})`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3 mb-2 border border-green-500 text-green-600 rounded-md flex items-center justify-center gap-2 hover:bg-green-50 transition"
              >
                <FaWhatsapp size={18} />
                Pedir por Whatsapp
              </a>
            )}

            {/* 🔙 VOLTAR */}
            <button
              onClick={() => navigate(-1)}
              className="w-full py-3 border border-blue-500 text-blue-500 rounded-md hover:bg-blue-50 transition"
            >
              Voltar para o Catálogo
            </button>

          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}