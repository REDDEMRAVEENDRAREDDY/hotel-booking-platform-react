import { useState } from "react";
import { useAuth } from "../context/AuthContext.jsx";

export default function LoginForm({ notice, onSuccess, onSignup }) {
  const { login } = useAuth();
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");

  const update = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const submit = (e) => {
    e.preventDefault();
    const result = login(form.email, form.password);
    if (!result.ok) {
      setError(result.error);
      if (result.code === "no-account") setTimeout(onSignup, 1200);
      return;
    }
    onSuccess();
  };

  return (
    <section className="auth-section">
      <h2>Login</h2>
      {notice && <p className="notice">{notice}</p>}

      <form className="auth-form" onSubmit={submit}>
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
          placeholder="Enter your password"
          value={form.password}
          onChange={update}
          required
        />
        {error && <p className="form-error">{error}</p>}
        <button type="submit" className="auth-btn">Login</button>
      </form>

      <p className="auth-link">
        Don't have an account?{" "}
        <button type="button" className="text-link" onClick={onSignup}>Sign Up</button>
      </p>
    </section>
  );
}
