import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const ResetPassword = () => {
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();
  const { token } = useParams();

  const handleReset = async (e) => {
    e.preventDefault();
    setMessage("");
    try {
      const res = await fetch(
        "https://e-commerce-application-backend-3qqr.vercel.app/api/auth/reset-password",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ token, password }),
        }
      );
      const data = await res.json();
      if (res.ok) {
        setMessage("Password reset successful. Redirecting to login...");
        setTimeout(() => navigate("/login"), 2000);
      } else {
        setMessage(data.message || "Error resetting password.");
      }
    } catch (err) {
      setMessage("Server error. Try again later.");
    }
  };

  return (
    <div className="max-w-md mx-auto px-4 py-12">
      <h2 className="text-3xl font-semibold text-center text-blue-600 mb-6">
        Reset Password
      </h2>
      <form
        onSubmit={handleReset}
        className="bg-white p-6 rounded shadow space-y-4"
      >
        <div>
          <label className="block text-sm font-medium mb-1">New Password</label>
          <input
            type="password"
            className="w-full border px-3 py-2 rounded"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
          Reset Password
        </button>
        {message && (
          <div className="text-center text-sm mt-4 text-green-600">
            {message}
          </div>
        )}
      </form>
    </div>
  );
};

export default ResetPassword;
