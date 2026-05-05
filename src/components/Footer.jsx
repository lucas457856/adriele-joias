import {
  FaWhatsapp,
  FaInstagram,
  FaFacebookF,
  FaTiktok,
  FaMapMarkerAlt,
} from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-white mt-10 border-t">
      <div className="max-w-7xl mx-auto px-6 py-10 grid md:grid-cols-3 gap-8 text-sm">
        
        {/* 🏪 SOBRE */}
        <div>
          <h3 className="text-lg font-semibold mb-3">Adriele Jóias</h3>
          <p className="text-gray-600">
            Elegância e brilho em cada detalhe. Trabalhamos com peças de alta qualidade
            para valorizar ainda mais o seu estilo.
          </p>
        </div>


        {/* 📞 CONTATO */}
{/* 📞 CONTATO */}
<div className="text-left md:text-right">
  <h3 className="text-lg font-semibold mb-3">Contato</h3>

  <div className="space-y-2 text-gray-600">
    
    <a
      href="https://wa.me/5585999288032"
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center gap-2 md:justify-end hover:text-green-500 transition"
    >
      <FaWhatsapp /> (85) 99928-8032
    </a>

    <a
      href="https://www.instagram.com/adrielejoias__/"
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center gap-2 md:justify-end hover:text-pink-500 transition"
    >
      <FaInstagram /> @adrielejoias__
    </a>

  </div>
</div>
      
      
      </div>

      {/* 🔻 BARRA FINAL */}
<div className="bg-gray-100 text-center text-xs py-3 text-gray-600">
  © {new Date().getFullYear()}{" "}
  <a
    href="https://wa.me/5585999348700"
    target="_blank"
    rel="noopener noreferrer"
    
  >
    Luquete — Todos os direitos reservados
  </a>{" "}

</div>
    </footer>
  );
}