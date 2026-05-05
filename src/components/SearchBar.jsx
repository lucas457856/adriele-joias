import React from "react";
import {
  FaSearch,
  FaWhatsapp,
  FaPhone,
  FaInstagram,
  FaFacebookF,
  FaTiktok,
  FaMapMarkerAlt,
} from "react-icons/fa";

const SearchBar = ({
  search,
  setSearch,
  sort,
  setSort,
  category,
  setCategory,
}) => {
  return (
    <div className="w-[280px] bg-gray-100 p-4 rounded-lg text-sm">
      
      {/* 🔎 PESQUISA */}
      <h3 className="font-semibold mb-2">Pesquisar</h3>
      <div className="flex mb-4">
        <input
          type="text"
          placeholder="Digite aqui"
          value={search || ""}
          onChange={(e) => setSearch && setSearch(e.target.value)}
          className="flex-1 px-2 py-2 border border-gray-300 rounded-l-md outline-none"
        />
        <button className="px-3 border border-gray-300 bg-white rounded-r-md">
          <FaSearch />
        </button>
      </div>

      {/* 🔃 ORDENAÇÃO */}
      <h4 className="font-medium mb-2">Ordenar por</h4>
      <div className="space-y-1 mb-3">
        {[
          { label: "Novidades", value: "novidades" },
          { label: "Menor preço", value: "menor" },
          { label: "Maior preço", value: "maior" },
          { label: "A-Z", value: "az" },
          { label: "Z-A", value: "za" },
        ].map((item, i) => (
          <label key={i} className="flex items-center gap-2 cursor-pointer">
            <input
              type="radio"
              name="order"
              checked={sort === item.value}
              onChange={() => setSort && setSort(item.value)}
            />
            {item.label}
          </label>
        ))}
      </div>

      <hr className="my-3" />

      {/* 📂 CATEGORIA */}
      <h4 className="font-medium mb-1">Categoria</h4>

      <select
        value={category}
        onChange={(e) => setCategory && setCategory(e.target.value)}
        className="w-full mb-2 px-2 py-2 border border-gray-300 rounded-md bg-white"
      >
        <option value="ALL">- Todas -</option>
        <option value="ANEL">ANEL</option>
        <option value="BRINCO">BRINCO</option>
        <option value="COLAR">COLAR</option>
        <option value="CONJUNTO">CONJUNTO</option>
        <option value="PULSEIRA">PULSEIRA</option>
      </select>

      {/* 📞 CONTATOS */}
      <div className="mt-4">
        <h4 className="font-medium mb-2">CONSULTORES</h4>

        <div className="space-y-2">
<a
  href="https://wa.me/5585999288032"
  target="_blank"
  rel="noopener noreferrer"
  className="flex items-center gap-2 hover:underline"
>
  <FaWhatsapp className="text-green-500" /> (85) 99928-8032
</a>
          <p className="flex items-center gap-2">
            <FaPhone /> (85) 99928-8032
          </p>
<a
  href="https://www.instagram.com/adrielejoias__/"
  target="_blank"
  rel="noopener noreferrer"
  className="flex items-center gap-2 hover:underline"
>
  <FaInstagram className="text-pink-500" /> @adrielejoias__
</a>


        </div>

        
      </div>
    </div>
  );
};

export default SearchBar;