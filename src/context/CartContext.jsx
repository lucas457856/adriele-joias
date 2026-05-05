import { createContext, useContext, useEffect, useState } from "react";

const CartContext = createContext();

export function CartProvider({ children }) {
  // 💾 carregar com proteção (EVITA BUG do reduce)
  const [cart, setCart] = useState(() => {
    try {
      const saved = localStorage.getItem("cart");
      const parsed = saved ? JSON.parse(saved) : [];

      // 🔒 garante que SEMPRE seja array
      return Array.isArray(parsed) ? parsed : [];
    } catch (error) {
      return [];
    }
  });

  // 💾 salvar no localStorage
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  // ➕ adicionar produto
  const addToCart = (product) => {
    setCart((prev) => {
      if (!Array.isArray(prev)) return [];

      const exists = prev.find((item) => item.id === product.id);

      if (exists) {
        return prev.map((item) =>
          item.id === product.id
            ? { ...item, qty: item.qty + 1 }
            : item
        );
      }

      return [...prev, { ...product, qty: 1 }];
    });
  };

  // ➖ diminuir quantidade
  const decreaseQty = (id) => {
    setCart((prev) => {
      if (!Array.isArray(prev)) return [];

      return prev
        .map((item) =>
          item.id === id
            ? { ...item, qty: item.qty - 1 }
            : item
        )
        .filter((item) => item.qty > 0);
    });
  };

  // ❌ remover item
  const removeFromCart = (id) => {
    setCart((prev) => {
      if (!Array.isArray(prev)) return [];
      return prev.filter((item) => item.id !== id);
    });
  };

  // 🧹 limpar carrinho
  const clearCart = () => {
    setCart([]);
  };

  // 🔢 total de itens (blindado)
  const totalItems = Array.isArray(cart)
    ? cart.reduce((acc, item) => acc + item.qty, 0)
    : 0;

  // 💰 total do valor (blindado)
  const totalPrice = Array.isArray(cart)
    ? cart.reduce((acc, item) => acc + item.price * item.qty, 0)
    : 0;

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        decreaseQty,
        removeFromCart,
        clearCart,
        totalItems,
        totalPrice,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

// hook
export function useCart() {
  return useContext(CartContext);
}