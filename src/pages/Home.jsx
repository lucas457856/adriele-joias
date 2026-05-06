import { useState, useEffect } from "react";
import Header from "../components/Header";
import SearchBar from "../components/SearchBar";
import ProductCard from "../components/ProductCard";
import Footer from "../components/Footer";

// 🔥 FIREBASE
import { db } from "../firebase";
import { collection, getDocs } from "firebase/firestore";

export default function Home() {
  const [category, setCategory] = useState("ALL");
  const [sort, setSort] = useState("novidades");
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  const [products, setProducts] = useState([]);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setItemsPerPage(5);
      } else {
        setItemsPerPage(10);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "products"));

        const lista = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        localStorage.setItem("products", JSON.stringify(lista));
        localStorage.setItem("products_time", Date.now());

        setProducts(lista);
      } catch (error) {
        console.error("Erro ao buscar produtos:", error);
      }
    };

    const loadProducts = () => {
      const cache = localStorage.getItem("products");

      if (cache) {
        setProducts(JSON.parse(cache));
        fetchProducts();
      } else {
        fetchProducts();
      }
    };

    loadProducts();
  }, []);

  // 🔎 FILTRO (com status tratado)
  const filteredProducts = products.filter((p) => {
    const matchCategory =
      category === "ALL" || p.category === category;

    const matchSearch =
      p.name?.toLowerCase().includes(search.toLowerCase());

    return matchCategory && matchSearch;
  });

  // 🔽 ORDENAÇÃO
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sort) {
      case "menor":
        return a.price - b.price;
      case "maior":
        return b.price - a.price;
      case "az":
        return a.name.localeCompare(b.name);
      case "za":
        return b.name.localeCompare(a.name);
      default:
        return 0;
    }
  });

  // 📄 PAGINAÇÃO
  const totalPages = Math.ceil(sortedProducts.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentProducts = sortedProducts.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  return (
    <div className="min-h-screen bg-[#e7c6c6] overflow-x-hidden">
      <Header />

      <div className="flex flex-col md:flex-row">
        <div className="hidden md:block w-[260px] p-4">
          <SearchBar
            search={search}
            setSearch={setSearch}
            sort={sort}
            setSort={setSort}
            category={category}
            setCategory={setCategory}
          />
        </div>

        <div className="flex-1 px-2 md:px-10">
          <div className="bg-white p-4 md:p-5 rounded-2xl shadow-sm mt-4">

            {/* MOBILE */}
            <div className="md:hidden mb-5 space-y-3">
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="Pesquise aqui"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="flex-1 px-3 py-2 text-sm border rounded-xl"
                />

                <select
                  value={sort}
                  onChange={(e) => setSort(e.target.value)}
                  className="w-[120px] border rounded-xl px-2 text-sm"
                >
                  <option value="novidades">Novidades</option>
                  <option value="menor">Menor preço</option>
                  <option value="maior">Maior preço</option>
                  <option value="az">A-Z</option>
                  <option value="za">Z-A</option>
                </select>
              </div>

              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full border rounded-xl px-3 py-2 text-sm"
              >
                <option value="ALL">- Todas categorias -</option>
                <option value="ANEL">ANEL</option>
                <option value="BRINCO">BRINCO</option>
                <option value="COLAR">COLAR</option>
                <option value="CONJUNTO">CONJUNTO</option>
                <option value="PULSEIRA">PULSEIRA</option>
                <option value="ACESSORIOS">ACESSÓRIOS</option> {/* ✅ NOVA */}
              </select>
            </div>

            <p className="mb-4 text-sm text-gray-600">
              <span className="font-semibold">
                {sortedProducts.length}
              </span>{" "}
              produtos encontrados
            </p>

            {/* GRID */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
              {currentProducts.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>

            {/* PAGINAÇÃO */}
            <div className="flex justify-center items-center gap-3 mt-7">
              <button
                onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
                disabled={currentPage === 1}
                className="px-4 py-2 border rounded-xl"
              >
                ⬅️
              </button>

              <span className="text-sm bg-gray-100 px-4 py-2 rounded-xl">
                {currentPage} / {totalPages}
              </span>

              <button
                onClick={() =>
                  setCurrentPage((p) =>
                    Math.min(p + 1, totalPages)
                  )
                }
                disabled={currentPage === totalPages}
                className="px-4 py-2 border rounded-xl"
              >
                ➡️
              </button>
            </div>

          </div>
        </div>
      </div>

      {/* WHATSAPP FIXO */}
      <a
        href="https://wa.me/5585999288032"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-4 right-4"
      >
        <img
          src="https://cdn-icons-png.flaticon.com/512/733/733585.png"
          className="w-14 h-14"
        />
      </a>

      <Footer />
    </div>
  );
}