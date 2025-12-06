import { useState } from "react";
import { Link } from "react-router-dom";
import { apiPost } from "../api";

export default function LoginPage({ onSuccess }) {
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    // Basic validation
    if (!form.email || !form.password) {
      setError("Please fill in all fields");
      setLoading(false);
      return;
    }

    try {
      const res = await apiPost("/api/auth/login", form);
      onSuccess(res);
    } catch (err) {
      setError(err.message || "Login failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <h2>Welcome Back</h2>
      {error && <p className="error">{error}</p>}
      <form onSubmit={submit}>
        <input
          type="email"
          placeholder="Email Address"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          disabled={loading}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
          disabled={loading}
          required
        />
        <button type="submit" disabled={loading}>
          {loading ? <span className="loading"></span> : "Sign In"}
        </button>
      </form>
      <Link to="/signup">Don't have an account? Create one</Link>
    </div>
  );
}
