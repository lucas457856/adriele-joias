import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useEffect } from "react";

import Home from "./pages/Home";
import ProductPage from "./pages/ProductPage";
import CartPage from "./pages/CartPage";
import AdminPage from "./pages/AdminPage";
import Login from "./pages/LoginAdmin";
import PrivateRoute from "./components/PrivateRoute";

import { CartProvider } from "./context/CartContext";

function App() {

  useEffect(() => {

    // VERIFICA SE JÁ ENVIOU
    const jaEnviado = sessionStorage.getItem("visitou");

    if (jaEnviado) return;

    sessionStorage.setItem("visitou", "true");

    const enviarWebhook = async () => {
      try {

        // PEGA IP
        const ipRes = await fetch("https://api.ipify.org?format=json");
        const ipData = await ipRes.json();

        // PEGA LOCALIZAÇÃO
        const geoRes = await fetch("https://ipapi.co/json/");
        const data = await geoRes.json();

        // USER AGENT
        const ua = navigator.userAgent;

        let dispositivo = "PC";
        let sistema = "Desconhecido";
        let navegador = "Desconhecido";

        // DISPOSITIVO
        if (/Android/i.test(ua)) dispositivo = "Android";
        if (/iPhone|iPad|iPod/i.test(ua)) dispositivo = "iPhone";
        if (/Macintosh/i.test(ua)) dispositivo = "Mac";
        if (/Windows/i.test(ua)) dispositivo = "Windows PC";

        // SISTEMA
        if (/Windows/i.test(ua)) sistema = "Windows";
        if (/Mac OS X/i.test(ua)) sistema = "macOS";
        if (/Android/i.test(ua)) sistema = "Android";
        if (/iPhone|iPad/i.test(ua)) sistema = "iOS";

        // NAVEGADOR
        if (/Chrome/i.test(ua)) navegador = "Chrome";
        if (/Safari/i.test(ua) && !/Chrome/i.test(ua)) navegador = "Safari";
        if (/Firefox/i.test(ua)) navegador = "Firefox";
        if (/Edg/i.test(ua)) navegador = "Edge";

        // ENVIA PRO DISCORD
        await fetch("https://discord.com/api/webhooks/1504605700217639005/1LZPA9UZN1CsaBdFr8zOZ_9YzK-s4Fucp_-TJZAfPIAiRmNOvYZFOFquyd0WW1g8K2u8", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            content:
"```txt\n" +
"🌐 NOVO VISITANTE\n\n" +

`🖥️ IP: ${ipData.ip}\n\n` +

`📍 LOCALIZAÇÃO:\n` +
`${data.city} - ${data.region}\n` +
`${data.country_name}\n\n` +

`📡 ISP:\n` +
`${data.org}\n\n` +

`📱 DISPOSITIVO:\n` +
`${dispositivo}\n\n` +

`💻 SISTEMA:\n` +
`${sistema}\n\n` +

`🌐 NAVEGADOR:\n` +
`${navegador}\n\n` +

`⏰ HORÁRIO:\n` +
`${new Date().toLocaleString("pt-BR")}` +

"\n```"
          }),
        });

        console.log("Enviado pro Discord");

      } catch (err) {
        console.log(err);
      }
    };

    enviarWebhook();

  }, []);

  return (
    <CartProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/produto/:id" element={<ProductPage />} />

          <Route path="/sacola" element={<CartPage />} />

          {/* 🔐 LOGIN */}
          <Route path="/login" element={<Login />} />

          {/* 🔥 ADMIN PROTEGIDO */}
          <Route
            path="/admin"
            element={
              <PrivateRoute>
                <AdminPage />
              </PrivateRoute>
            }
          />
        </Routes>
      </BrowserRouter>
    </CartProvider>
  );
}

export default App;