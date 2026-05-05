import { useCart } from "../context/CartContext";
import { useNavigate, useLocation } from "react-router-dom";
import { ShoppingBag } from "lucide-react";

export default function Header() {
  const { totalItems } = useCart();
  const navigate = useNavigate();
  const location = useLocation();

  // ❌ verifica se está na página da sacola
  const isCartPage = location.pathname === "/sacola";

  return (
    <header className="
      w-full 
      h-[180px] 
      md:h-[220px] 
      bg-gradient-to-b 
      from-[#e7c6c6] 
      to-[#f3dada] 
      flex 
      items-center 
      justify-center
      relative
    ">

      {/* 🔥 AGORA O HEADER É CLICÁVEL */}
      <div
        onClick={() => navigate("/")}
        className="relative flex flex-col items-center cursor-pointer"
      >

        {/* LOGO */}
        <div className="
          text-[clamp(2rem,6vw,5rem)]
          font-serif italic font-bold text-[#5a3e3e]
          z-10
        ">
          Adriele
        </div>

        <div className="
          text-[clamp(0.9rem,2.5vw,1.4rem)]
          tracking-[0.4em]
          font-semibold text-[#5a3e3e]
          z-10 mt-1
        ">
          JÓIAS
        </div>

        {/* 🛒 BOTÃO (SÓ SE NÃO FOR SACOLA) */}
        {!isCartPage && totalItems > 0 && (
          <button
            onClick={(e) => {
              e.stopPropagation(); // 🔥 impede voltar pra home
              navigate("/sacola");
            }}
            className="
              mt-4
              relative
              flex items-center gap-2
              bg-white
              border border-gray-400
              px-4 py-2
              rounded-md
              text-sm
              text-gray-700
              hover:bg-gray-100
              transition
              z-10
            "
          >
            <ShoppingBag size={18} strokeWidth={1.5} />
            Ver a Sacola

<span className="
  bg-red-500
  text-white
  text-xs
  px-2
  py-[2px]
  rounded-md
  font-bold
">
  {totalItems}
</span>
          </button>
        )}

      </div>
    </header>
  );
}