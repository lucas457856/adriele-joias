import { useState, useEffect } from "react";
import { db, auth } from "../firebase";
import {
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  doc,
  updateDoc
} from "firebase/firestore";
import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";

export default function AdminPage() {
  const [form, setForm] = useState({
    name: "",
    price: "",
    category: "ANEL",
    ref: "",
    code: "",
    status: "disponivel",
  });

  const [products, setProducts] = useState([]);
  const [editingId, setEditingId] = useState(null);

  const [imageFile, setImageFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    const snapshot = await getDocs(collection(db, "products"));
    const list = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
    setProducts(list.reverse());
  };

  const handleLogout = async () => {
    await signOut(auth);
    navigate("/login");
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const uploadImage = async (file) => {
    const data = new FormData();
    data.append("file", file);
    data.append("upload_preset", "adriele_preset");
    data.append("folder", "products");

    const res = await fetch(
      "https://api.cloudinary.com/v1_1/dfbci2sh4/image/upload",
      {
        method: "POST",
        body: data,
      }
    );

    const json = await res.json();

    if (!json.secure_url) {
      throw new Error("Erro no upload");
    }

    return json.secure_url;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.name || !form.price) {
      alert("Preencha tudo");
      return;
    }

    try {
      setLoading(true);

      let imageUrl = form.image;

      if (imageFile) {
        imageUrl = await uploadImage(imageFile);
      }

      const formattedPrice = Number(
        form.price.replace(/\./g, "").replace(",", ".")
      );

      if (editingId) {
        await updateDoc(doc(db, "products", editingId), {
          ...form,
          price: formattedPrice,
          image: imageUrl,
        });

        alert("Produto atualizado 🔥");
      } else {
        await addDoc(collection(db, "products"), {
          ...form,
          price: formattedPrice,
          image: imageUrl,
        });

        alert("Produto criado 🔥");
      }

      setForm({
        name: "",
        price: "",
        category: "ANEL",
        ref: "",
        code: "",
        status: "disponivel",
      });

      setEditingId(null);
      setImageFile(null);
      setPreview(null);

      fetchProducts();

    } catch (error) {
      console.error(error);
      alert("Erro ao salvar");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm("Excluir produto?")) return;

    await deleteDoc(doc(db, "products", id));
    fetchProducts();
  };

  const handleEdit = (product) => {
    setForm({
      ...product,
      status: product.status || "disponivel",
    });
    setEditingId(product.id);
    setPreview(product.image);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f8e7e7] to-[#f3dada]">
      <Header />

      <div className="flex justify-between items-center max-w-5xl mx-auto pt-6 px-4">
        <h1 className="text-2xl font-bold text-gray-700">
          Painel Admin
        </h1>

        <button
          onClick={handleLogout}
          className="bg-red-500 text-white px-4 py-2 rounded-lg shadow hover:bg-red-600 transition"
        >
          Sair
        </button>
      </div>

      <div className="max-w-5xl mx-auto mt-6 bg-white p-6 rounded-2xl shadow-lg">

        <h2 className="text-xl font-semibold mb-4 text-gray-700">
          {editingId ? "✏️ Editar Produto" : "➕ Novo Produto"}
        </h2>

        <form onSubmit={handleSubmit} className="grid md:grid-cols-2 gap-4">

          <input
            placeholder="Nome"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            className="border p-2 rounded-lg focus:ring-2 focus:ring-pink-300"
          />

          <input
            placeholder="Preço"
            value={form.price}
            onChange={(e) => setForm({ ...form, price: e.target.value })}
            className="border p-2 rounded-lg focus:ring-2 focus:ring-pink-300"
          />

          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="border p-2 rounded-lg"
          />

          <select
            value={form.category}
            onChange={(e) => setForm({ ...form, category: e.target.value })}
            className="border p-2 rounded-lg"
          >
            <option value="ANEL">ANEL</option>
            <option value="BRINCO">BRINCO</option>
            <option value="COLAR">COLAR</option>
            <option value="PULSEIRA">PULSEIRA</option>
            <option value="CONJUNTO">CONJUNTO</option>
            <option value="ACESSORIOS">ACESSÓRIOS</option> {/* ✅ NOVA */}
          </select>

          <select
            value={form.status}
            onChange={(e) => setForm({ ...form, status: e.target.value })}
            className="border p-2 rounded-lg"
          >
            <option value="disponivel">Disponível</option>
            <option value="esgotado">Esgotado</option>
          </select>

          <input
            placeholder="Referência"
            value={form.ref}
            onChange={(e) => setForm({ ...form, ref: e.target.value })}
            className="border p-2 rounded-lg"
          />

          <input
            placeholder="Código"
            value={form.code}
            onChange={(e) => setForm({ ...form, code: e.target.value })}
            className="border p-2 rounded-lg"
          />

          {preview && (
            <div className="md:col-span-2">
              <img
                src={preview}
                className="w-full h-52 object-cover rounded-xl border"
              />
            </div>
          )}

          <button
            disabled={loading}
            className="md:col-span-2 bg-green-500 text-white py-3 rounded-xl font-semibold hover:bg-green-600 transition shadow"
          >
            {loading
              ? "Salvando..."
              : editingId
                ? "Atualizar Produto"
                : "Salvar Produto"}
          </button>

        </form>
      </div>

      <div className="max-w-5xl mx-auto mt-6 px-4 pb-10">

        <h3 className="text-xl font-semibold mb-4 text-gray-700">
          📦 Produtos
        </h3>

        <div className="grid md:grid-cols-2 gap-4">

          {products.map((p) => {
            const isOut = p.status === "esgotado";

            return (
              <div
                key={p.id}
                className={`bg-white rounded-2xl shadow p-4 flex gap-4 items-center transition
                ${isOut ? "opacity-60 grayscale" : "hover:scale-[1.02]"}`}
              >
                <img
                  src={p.image}
                  className="w-20 h-20 object-cover rounded-xl"
                />

                <div className="flex-1">
                  <p className="font-semibold text-gray-700">{p.name}</p>

                  {/* ✅ CORREÇÃO AQUI */}
                  <p className="text-pink-600 font-bold">
                    R$ {p.price.toLocaleString("pt-BR", {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })}
                  </p>

                  <p className="text-xs text-gray-400">{p.category}</p>

                  {isOut && (
                    <p className="text-xs text-red-500 font-semibold">
                      ESGOTADO
                    </p>
                  )}
                </div>

                <div className="flex flex-col gap-2">
                  <button
                    onClick={() => handleEdit(p)}
                    className="bg-yellow-400 text-white px-3 py-1 rounded-lg text-sm hover:bg-yellow-500"
                  >
                    Editar
                  </button>

                  <button
                    onClick={() => handleDelete(p.id)}
                    className="bg-red-500 text-white px-3 py-1 rounded-lg text-sm hover:bg-red-600"
                  >
                    Excluir
                  </button>
                </div>
              </div>
            );
          })}

        </div>
      </div>
    </div>
  );
}