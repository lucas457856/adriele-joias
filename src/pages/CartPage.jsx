import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import Header from "../components/Header";
import { FaWhatsapp } from "react-icons/fa";
import Footer from "../components/Footer";

export default function CartPage() {
  const navigate = useNavigate();

  const {
    cart,
    removeFromCart,
    decreaseQty,
    addToCart,
    totalPrice,
    totalItems,
  } = useCart();

  const [showForm, setShowForm] = useState(false);

  const message = cart
    .map(
      (item) =>
        `${item.name} (Ref: ${item.ref}) x${item.qty} = R$ ${(
          item.price * item.qty
        )
          .toFixed(2)
          .replace(".", ",")}`
    )
    .join("%0A");

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#e7c6c6] to-[#f3dada]">
      <Header hideCart />

      <div className="p-4 flex justify-center">
        <div className="w-full max-w-6xl bg-white rounded-lg p-6 shadow mt-4">
          <h2 className="text-xl font-semibold text-center mb-6">
            Sacola
          </h2>

          {/* 🛒 SACOLA VAZIA */}
          {cart.length === 0 && (
            <div className="text-center">
              <p className="text-gray-600 mb-4">
                Sua sacola está vazia
              </p>

              <div className="border-t pt-3 text-sm">
                <p>Qtd. 0</p>
                <p className="font-bold">Total R$ 0,00</p>
              </div>

              <button
                onClick={() => navigate("/")}
                className="w-full mt-4 border border-blue-500 text-blue-500 py-3 rounded hover:bg-blue-50 transition"
              >
                Voltar para o Catálogo
              </button>
            </div>
          )}

          {/* 🧾 ITENS */}
          {cart.length > 0 && (
            <>
              {cart.map((item) => (
                <div key={item.id} className="mb-6 border-b pb-4">

                  <div className="flex flex-col gap-3">

                    {/* 🔝 PARTE DE CIMA */}
                    <div className="flex gap-4">
                      <img
                        src={item.image}
                        className="w-[120px] rounded"
                        alt=""
                      />

                      <div className="flex-1">
                        <p className="text-sm font-medium">
                          {item.name}
                        </p>

                        <p className="font-bold">
                          R$ {item.price.toFixed(2).replace(".", ",")}
                        </p>

                        <p className="text-xs text-gray-500">
                          {item.code}
                        </p>

                        <p className="text-xs">{item.ref}</p>
                      </div>
                    </div>

                    {/* 🔻 LINHA DE BAIXO */}
                    <div className="flex items-center justify-between">

                      {/* CONTROLES */}
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => decreaseQty(item.id)}
                          className="border px-3 py-1 text-red-500 rounded"
                        >
                          -
                        </button>

                        <span>{item.qty}</span>

                        <button
                          onClick={() => addToCart(item)}
                          className="border px-3 py-1 text-green-500 rounded"
                        >
                          +
                        </button>
                      </div>

                      {/* PREÇO + LIXEIRA */}
                      <div className="flex items-center gap-4">
                        <p className="font-semibold">
                          R$ {(item.price * item.qty)
                            .toFixed(2)
                            .replace(".", ",")}
                        </p>

                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="text-gray-500 hover:text-red-500 transition"
                        >
                          🗑️
                        </button>
                      </div>

                    </div>

                  </div>
                </div>
              ))}

              {/* 💰 TOTAL */}
              <div className="border-t pt-4 text-sm flex justify-between md:justify-center md:gap-8">
                <p>Qtd. {totalItems}</p>
                <p className="font-bold">
                  Total R$ {totalPrice.toFixed(2).replace(".", ",")}
                </p>
              </div>

              {/* 🚀 BOTÕES */}
              <div className="mt-4 flex flex-col md:flex-row items-center justify-center gap-3">

                <a
                  href={`https://wa.me/5585999288032?text=${message}`}
                  target="_blank"
                  className="
                    w-full md:w-[230px]
                    py-2.5
                    border border-green-500
                    text-green-600
                    rounded
                    hover:bg-green-50
                    transition
                    flex items-center justify-center gap-2
                    font-medium
                  "
                >
                  <FaWhatsapp size={18} />
                  Pedir tudo por Whatsapp
                </a>

                <div className="flex items-center justify-center gap-3 w-full md:w-auto">

                  <button
                    onClick={() => navigate("/")}
                    className="
                      flex-1 md:w-[230px]
                      py-2.5
                      border border-blue-500
                      text-blue-500
                      rounded
                      hover:bg-blue-50
                      transition
                      font-medium
                    "
                  >
                    Voltar para o Catálogo
                  </button>

                  <button
                    onClick={() => setShowForm(!showForm)}
                    className="
                      w-[42px] h-[42px]
                      flex items-center justify-center
                      bg-green-500 text-white
                      rounded-md
                      hover:bg-green-600
                      transition
                    "
                  >
                    ⬆️
                  </button>

                </div>
              </div>

              {/* 📄 FORM */}
              {showForm && (
                <div className="mt-4 border-t pt-4">
                  <h3 className="text-center font-medium mb-3">
                    Termo de Garantia:
                  </h3>

                  <input
                    placeholder="CPF/CNPJ"
                    className="w-full border rounded p-2 mb-2"
                  />

                  <input
                    placeholder="Nome/Razão"
                    className="w-full border rounded p-2 mb-2"
                  />

                  <div className="flex gap-2 mb-2">
                    <input
                      placeholder="DDD"
                      className="w-1/3 border rounded p-2"
                    />
                    <input
                      placeholder="Telefone"
                      className="w-2/3 border rounded p-2"
                    />
                  </div>

                  <input
                    type="date"
                    className="w-full border rounded p-2 mb-2"
                  />

                  <p className="text-red-500 text-xs mb-2">
                    Campos com * são obrigatórios
                  </p>

                  <button className="bg-green-500 text-white px-4 py-2 rounded">
                    Confirmar
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
}