import React, { useState } from "react";
import { useParams } from "react-router-dom";

const ProductPage = () => {
  const { id } = useParams();
  const [showOrderForm, setShowOrderForm] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    quantity: 1,
  });
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleOrderSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");
    try {
      const res = await fetch(
        "https://e-commerce-application-backend-kohl.vercel.app/api/orders",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            items: [{ product: id, quantity: form.quantity }],
            name: form.name,
            email: form.email,
            phone: form.phone,
            address: form.address,
          }),
        }
      );
      const data = await res.json();
      if (res.ok) {
        setMessage("Order placed! Pending admin approval.");
        setShowOrderForm(false);
      } else {
        setMessage(data.error || "Order failed.");
      }
    } catch {
      setMessage("Server error. Try again later.");
    }
    setLoading(false);
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-semibold text-blue-700 mb-4">
        Product Details
      </h1>
      <div className="bg-white p-6 shadow rounded-md">
        <p className="text-gray-600 mb-2">Product ID: {id}</p>
        <p className="text-gray-700">
          Here you'll display full product details.
        </p>

        {/* Ask AI Button (UI Only) */}
        <div className="mt-6 flex gap-4">
          <button className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700">
            Ask AI about this product
          </button>
          <button
            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
            onClick={() => setShowOrderForm(true)}
          >
            Buy Now
          </button>
        </div>
        {message && (
          <div className="mt-4 text-green-600 text-center">{message}</div>
        )}
      </div>

      {/* Order Form Modal */}
      {showOrderForm && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white p-8 rounded shadow w-full max-w-md relative">
            <button
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
              onClick={() => setShowOrderForm(false)}
            >
              &times;
            </button>
            <h2 className="text-xl font-semibold mb-4">Order Product</h2>
            <form onSubmit={handleOrderSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Name</label>
                <input
                  type="text"
                  className="w-full border px-3 py-2 rounded"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Email</label>
                <input
                  type="email"
                  className="w-full border px-3 py-2 rounded"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Phone</label>
                <input
                  type="text"
                  className="w-full border px-3 py-2 rounded"
                  value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">
                  Address
                </label>
                <input
                  type="text"
                  className="w-full border px-3 py-2 rounded"
                  value={form.address}
                  onChange={(e) =>
                    setForm({ ...form, address: e.target.value })
                  }
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">
                  Quantity
                </label>
                <input
                  type="number"
                  min={1}
                  className="w-full border px-3 py-2 rounded"
                  value={form.quantity}
                  onChange={(e) =>
                    setForm({ ...form, quantity: Number(e.target.value) })
                  }
                  required
                />
              </div>
              <button
                type="submit"
                className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700"
                disabled={loading}
              >
                {loading ? "Placing Order..." : "Place Order"}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductPage;
