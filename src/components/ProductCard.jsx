import { useNavigate } from "react-router-dom";
import { FaWhatsapp } from "react-icons/fa";

export default function ProductCard({ product }) {
  const navigate = useNavigate();

  const isOut = product.status === "esgotado";

  return (
    <div
      onClick={() => {
        if (!isOut) navigate(`/produto/${product.id}`);
      }}
      className={`
        w-full bg-white rounded-xl overflow-hidden shadow-sm transition relative cursor-pointer
        ${isOut ? "opacity-60 grayscale" : "hover:shadow-md hover:scale-[1.02]"}
      `}
    >

      {/* 🔴 ESGOTADO */}
      {isOut && (
        <span className="absolute top-2 left-2 bg-red-500 text-white text-xs px-2 py-1 rounded">
          ESGOTADO
        </span>
      )}

      <img
        src={product.image}
        alt={product.name}
        className="w-full h-[160px] object-cover"
      />

      <div className="p-3">
        <p className="text-sm font-medium uppercase line-clamp-2">
          {product.name}
        </p>

        <p className="font-bold mt-1">
          R$ {product.price.toFixed(2).replace(".", ",")}
        </p>

        <p className="text-xs text-gray-500">
          Ref. {product.ref}
        </p>
      </div>

      {/* WHATSAPP */}
      {!isOut && (
        <a
          href={`https://wa.me/5585999288032?text=Quero o produto ${product.name} (Ref: ${product.ref})`}
          target="_blank"
          onClick={(e) => e.stopPropagation()}
          className="absolute bottom-2 right-2 bg-green-500 text-white p-2 rounded-lg"
        >
          <FaWhatsapp size={18} />
        </a>
      )}

    </div>
  );
}