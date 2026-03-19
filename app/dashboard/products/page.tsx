"use client";

import { useEffect, useState } from "react";
import { z } from "zod";

/* ------------------ ZOD SCHEMA ------------------ */
const schema = z.object({
  title: z.string().min(3, "Title too short"),
  description: z.string().min(5, "Description too short"),
  price: z.string().min(1, "Price required"),
  category: z.string().min(2, "Category required"),
  totalCount: z.coerce.number().min(0, "Stock required"),
  images: z.array(z.string()).min(1, "Image required"),
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

  const [form, setForm] = useState<any>({});

  /* ------------------ FETCH ------------------ */
  const fetchProducts = async () => {
    const res = await fetch("/api/products");
    setProducts(await res.json());
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  /* ------------------ FILTER ------------------ */
  const filtered = products.filter((p) => {
    return (
      p.title.toLowerCase().includes(search.toLowerCase()) &&
      (categoryFilter ? p.category === categoryFilter : true) &&
      (stockFilter === "low"
        ? p.totalCount < 5
        : stockFilter === "high"
        ? p.totalCount >= 5
        : true)
    );
  });

  /* ------------------ IMAGE UPLOAD ------------------ */
  const handleImageUpload = (e: any) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      setForm({ ...form, images: [reader.result] });
    };
    reader.readAsDataURL(file);
  };

  /* ------------------ SUBMIT ------------------ */
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

    setErrors({});

    const url = editing
      ? `/api/products/${editing.product_id}`
      : "/api/products";

    const method = editing ? "PUT" : "POST";

    await fetch(url, {
      method,
      body: JSON.stringify({
        ...result.data,
        seller_id: "REPLACE_WITH_USER_ID",
        type: "IMPORT",
      }),
    });

    setOpen(false);
    setEditing(null);
    setForm({});
    fetchProducts();
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
    if (!confirm("Delete this product?")) return;
    await fetch(`/api/products/${id}`, { method: "DELETE" });
    fetchProducts();
  };

  return (
    <div className="p-6 space-y-6">

      {/* HEADER */}
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Products</h1>
        <button
          onClick={() => {
            setOpen(true);
            setEditing(null);
            setForm({});
          }}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg"
        >
          + Add Product
        </button>
      </div>

      {/* FILTERS */}
      <div className="bg-white p-4 rounded-xl shadow flex flex-wrap gap-3">
        <input
          placeholder="Search..."
          className="border p-2 rounded"
          onChange={(e) => setSearch(e.target.value)}
        />

        <input
          placeholder="Category"
          className="border p-2 rounded"
          onChange={(e) => setCategoryFilter(e.target.value)}
        />

        <select
          className="border p-2 rounded"
          onChange={(e) => setStockFilter(e.target.value)}
        >
          <option value="">All Stock</option>
          <option value="low">Low Stock</option>
          <option value="high">In Stock</option>
        </select>
      </div>

      {/* TABLE */}
      <div className="bg-white rounded-xl shadow overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50 text-left">
            <tr>
              <th className="p-4">Product</th>
              <th className="p-4">Category</th>
              <th className="p-4">Price</th>
              <th className="p-4">Stock</th>
              <th className="p-4 text-right">Actions</th>
            </tr>
          </thead>

          <tbody>
            {filtered.map((p) => (
              <tr key={p.product_id} className="border-t">
                <td className="p-4 flex items-center gap-3">
                  {p.images?.[0] && (
                    <img
                      src={p.images[0]}
                      className="w-10 h-10 rounded object-cover"
                    />
                  )}
                  {p.title}
                </td>
                <td>{p.category}</td>
                <td>${p.price}</td>
                <td>{p.totalCount}</td>

                <td className="p-4 text-right space-x-2">
                  <button
                    onClick={() => handleEdit(p)}
                    className="px-3 py-1 bg-yellow-400 text-white rounded"
                  >
                    Edit
                  </button>

                  <button
                    onClick={() => handleDelete(p.product_id)}
                    className="px-3 py-1 bg-red-500 text-white rounded"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}

            {filtered.length === 0 && (
              <tr>
                <td colSpan={5} className="text-center p-6 text-gray-500">
                  No products found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* MODAL */}
      {open && (
        <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">
          <form
            onSubmit={handleSubmit}
            className="bg-white p-6 rounded-xl w-full max-w-md space-y-3"
          >
            <h2 className="text-lg font-semibold">
              {editing ? "Edit Product" : "Add Product"}
            </h2>

            <input
              placeholder="Title"
              value={form.title || ""}
              onChange={(e) =>
                setForm({ ...form, title: e.target.value })
              }
              className="border p-2 w-full"
            />
            {errors.title && <p className="text-red-500">{errors.title}</p>}

            <input
              placeholder="Price"
              value={form.price || ""}
              onChange={(e) =>
                setForm({ ...form, price: e.target.value })
              }
              className="border p-2 w-full"
            />

            <input
              placeholder="Category"
              value={form.category || ""}
              onChange={(e) =>
                setForm({ ...form, category: e.target.value })
              }
              className="border p-2 w-full"
            />

            <input
              type="number"
              placeholder="Stock"
              value={form.totalCount || ""}
              onChange={(e) =>
                setForm({ ...form, totalCount: e.target.value })
              }
              className="border p-2 w-full"
            />

            <textarea
              placeholder="Description"
              value={form.description || ""}
              onChange={(e) =>
                setForm({ ...form, description: e.target.value })
              }
              className="border p-2 w-full"
            />

            <input type="file" onChange={handleImageUpload} />
            {errors.images && (
              <p className="text-red-500">{errors.images}</p>
            )}

            {form.images?.[0] && (
              <img
                src={form.images[0]}
                className="h-32 rounded object-cover"
              />
            )}

            <div className="flex justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="border px-3 py-1 rounded"
              >
                Cancel
              </button>

              <button
                disabled={loading}
                className="bg-blue-600 text-white px-3 py-1 rounded"
              >
                {loading ? "Saving..." : "Save"}
              </button>
            </div>
          </form>
        </div>
      )}

    </div>
  );
}