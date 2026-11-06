import { useState } from "react";
import { useAuth } from "../context/AuthContext.jsx";

export default function SignupForm({ onSuccess, onLogin }) {
  const { signup } = useAuth();
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState("");

  const update = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const submit = (e) => {
    e.preventDefault();
    const result = signup(form);
    if (!result.ok) {
      setError(result.error);
      return;
    }
    onSuccess();
  };

  return (
    <section className="auth-section">
      <h2>Create Account</h2>

      <form className="auth-form" onSubmit={submit}>
        <input
          type="text"
          name="name"
          placeholder="Enter your name"
          value={form.name}
          onChange={update}
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Enter your email"
          value={form.email}
          onChange={update}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Create a password (min 6 characters)"
          minLength={6}
          value={form.password}
          onChange={update}
          required
        />
        {error && <p className="form-error">{error}</p>}
        <button type="submit" className="auth-btn">Sign Up</button>
      </form>

      <p className="auth-link">
        Already have an account?{" "}
        <button type="button" className="text-link" onClick={onLogin}>Login</button>
      </p>
    </section>
  );
}
