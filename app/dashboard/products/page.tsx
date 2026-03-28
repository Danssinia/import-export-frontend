"use client";

import { useEffect, useState } from "react";
import { z } from "zod";

/* ------------------ API ------------------ */
const API_URL = "http://localhost:3000/products";

/* ------------------ ZOD SCHEMA ------------------ */
const schema = z.object({
  seller_id: z.string().min(36, "Seller id required"),
  title: z.string().min(3, "Title too short"),
  description: z.string().min(5, "Description too short"),
  price: z.string().min(1, "Price required"),
  category: z.string().min(2, "Category required"),
  totalCount: z.coerce.number().min(0, "Stock required"),
});

export default function ProductsPage() {
  const [products, setProducts] = useState<any[]>([]);
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");
  const [stockFilter, setStockFilter] = useState("");
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<any>(null);
  const [errors, setErrors] = useState<any>({});
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(false);
  const [form, setForm] = useState<any>({});

  /* ------------------ PAGINATION ------------------ */
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  /* ------------------ FETCH PRODUCTS ------------------ */
  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    setFetching(true);
    try {
      const res = await fetch(API_URL);
      if (!res.ok) throw new Error("Failed to fetch");
      const data = await res.json();
      setProducts(data);
    } catch (err) {
      console.error("Fetch error:", err);
    }
    setFetching(false);
  };

  /* ------------------ FILTER ------------------ */
  const filtered = products.filter((p) => {
    return (
      p.title?.toLowerCase().includes(search.toLowerCase()) &&
      (categoryFilter ? p.category === categoryFilter : true) &&
      (stockFilter === "low"
        ? p.totalCount < 5
        : stockFilter === "high"
        ? p.totalCount >= 5
        : true)
    );
  });

  /* ------------------ PAGINATION ------------------ */
  const totalPages = Math.ceil(filtered.length / itemsPerPage);
  const paginatedProducts = filtered.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  /* ------------------ IMAGE UPLOAD ------------------ */
 //const handleImageUpload = (e: any) => {
 // const file = e.target.files[0]; if (!file) return; setForm({ ...form, file }); // store actual file
//};
const handleImageUpload = (e: any) => {
  setForm({ ...form, files: e.target.files });
};
  /* ------------------ CREATE / UPDATE ------------------ */
const handleSubmit = async (e: any) => {
  e.preventDefault();
  setLoading(true);

  const result = schema.safeParse(form);

  if (!result.success) {
    const fieldErrors: any = {};
    result.error.issues.forEach((err) => {
      fieldErrors[err.path[0]] = err.message;
    });
    setErrors(fieldErrors);
    setLoading(false);
    return;
  }

  try {
    const formData = new FormData();

    // append all fields
    formData.append("seller_id", form.seller_id);
    formData.append("title", form.title);
    formData.append("description", form.description);
    formData.append("price", form.price);
    formData.append("category", form.category);
    formData.append("totalCount", String(form.totalCount));

    // append file
   if (form.files) {
  Array.from(form.files).forEach((file: any) => {
    formData.append("images", file);
  });
}

    const url = editing
      ? `${API_URL}/${editing.product_id}`
      : API_URL;

    const method = editing ? "PATCH" : "POST";

    await fetch(url, {
      method,
      body: formData, // ✅ IMPORTANT: no headers
    });

    await fetchProducts();
    setOpen(false);
    setEditing(null);
    setForm({});
    setErrors({});
  } catch (err) {
    console.error("Save error:", err);
  }

  setLoading(false);
};

  /* ------------------ EDIT ------------------ */
  const handleEdit = (p: any) => {
    setEditing(p);
    setForm(p);
    setOpen(true);
  };

  /* ------------------ DELETE ------------------ */
  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this product?")) return;

    try {
      await fetch(`${API_URL}/${id}`, //fetch(`${API_URL}?seller_id=YOUR_ID`)
        {
        method: "DELETE",
      });
      setProducts((prev) => prev.filter((p) => p.product_id !== id));
    } catch (err) {
      console.error("Delete error:", err);
    }
  };

  return (
    <div className="p-6 space-y-6 font-sans">

      {/* HEADER */}
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-800">Product Inventory</h1>
        <button
          onClick={() => { setOpen(true); setEditing(null); setForm({}); }}
          className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg shadow"
        >
          + Add Product
        </button>
      </div>

      {/* FILTERS */}
      <div className="bg-white p-4 rounded-xl shadow flex flex-wrap gap-3">
        <input
          placeholder="Search..."
          className="border p-2 rounded flex-1"
          onChange={(e) => { setSearch(e.target.value); setCurrentPage(1); }}
        />
        <input
          placeholder="Category"
          className="border p-2 rounded flex-1"
          onChange={(e) => { setCategoryFilter(e.target.value); setCurrentPage(1); }}
        />
        <select
          className="border p-2 rounded"
          onChange={(e) => { setStockFilter(e.target.value); setCurrentPage(1); }}
        >
          <option value="">All Stock</option>
          <option value="low">Low Stock</option>
          <option value="high">High Stock</option>
        </select>
      </div>

      {/* TABLE */}
      <div className="bg-white rounded-xl shadow overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-4">Product</th>
              <th>Category</th>
              <th>Price</th>
              <th>Stock</th>
              <th className="text-right p-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {fetching ? (
              <tr>
                <td colSpan={5} className="text-center p-6">Loading...</td>
              </tr>
            ) : paginatedProducts.length === 0 ? (
              <tr>
                <td colSpan={5} className="text-center p-6">No products found</td>
              </tr>
            ) : (
              paginatedProducts.map((p) => (
                <tr key={p.product_id} className="border-t">
                  <td className="p-4 flex gap-3">
                   {p.images?.[0] && (
  <img
    src={`http://localhost:3000/uploads/${p.images[0]}`}
    className="w-12 h-12 rounded"
  />
)}
                    <div>
                      <div>{p.title}</div>
                      <div className="text-sm text-gray-500">{p.description}</div>
                    </div>
                  </td>
                  <td>{p.category}</td>
                  <td>${p.price}</td>
                  <td>{p.totalCount}</td>
                  <td className="p-4 text-right space-x-2">
                    <button onClick={() => handleEdit(p)} className="bg-yellow-400 px-3 py-1 rounded text-white">
                      Edit
                    </button>
                    <button onClick={() => handleDelete(p.product_id)} className="bg-red-500 px-3 py-1 rounded text-white">
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* MODAL */}
      {open && (
        <div className="fixed inset-0 bg-black/40 flex justify-center items-center">
          <form onSubmit={handleSubmit} className="bg-white p-6 rounded w-full max-w-md space-y-3">
            <input placeholder="Seller ID" value={form.seller_id || ""} onChange={(e) => setForm({ ...form, seller_id: e.target.value })} className="border p-2 w-full"/>
            <input placeholder="Title" value={form.title || ""} onChange={(e) => setForm({ ...form, title: e.target.value })} className="border p-2 w-full"/>
            <input placeholder="Price" value={form.price || ""} onChange={(e) => setForm({ ...form, price: e.target.value })} className="border p-2 w-full"/>
            <input placeholder="Category" value={form.category || ""} onChange={(e) => setForm({ ...form, category: e.target.value })} className="border p-2 w-full"/>
            <input type="number" placeholder="Stock" value={form.totalCount || ""} onChange={(e) => setForm({ ...form, totalCount: e.target.value })} className="border p-2 w-full"/>
            <textarea placeholder="Description" value={form.description || ""} onChange={(e) => setForm({ ...form, description: e.target.value })} className="border p-2 w-full"/>
            <input type="file" onChange={handleImageUpload} />

            <div className="flex justify-end gap-2">
              <button type="button" onClick={() => setOpen(false)}>Cancel</button>
              <button className="bg-blue-600 text-white px-3 py-1 rounded">
                {loading ? "Saving..." : "Save"}
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}