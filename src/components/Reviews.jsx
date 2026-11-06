import { useState } from "react";

const LABELS = {
  5: "Excellent",
  4: "Very Good",
  3: "Good",
  2: "Fair",
  1: "Poor",
};

export default function Reviews({ reviews, onAdd }) {
  const [form, setForm] = useState({ name: "", rating: "", experience: "" });

  const update = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const submit = (e) => {
    e.preventDefault();
    onAdd({
      id: Date.now(),
      name: form.name.trim(),
      rating: Number(form.rating),
      experience: form.experience.trim(),
      date: new Date().toLocaleDateString(),
    });
    setForm({ name: "", rating: "", experience: "" });
  };

  return (
    <section className="section" id="experience">
      <div className="section-title">
        <h2>Guest Experience &amp; Ratings</h2>
        <p>Share your experience and rate your stay</p>
      </div>

      <div className="experience-box">
        <form className="review-form" onSubmit={submit}>
          <input
            type="text"
            name="name"
            placeholder="Enter your name"
            value={form.name}
            onChange={update}
            required
          />
          <select name="rating" value={form.rating} onChange={update} required>
            <option value="">Select Rating</option>
            {[5, 4, 3, 2, 1].map((n) => (
              <option key={n} value={n}>
                {"⭐".repeat(n)} {LABELS[n]}
              </option>
            ))}
          </select>
          <textarea
            name="experience"
            placeholder="Write about your hotel experience..."
            rows={5}
            value={form.experience}
            onChange={update}
            required
          />
          <button type="submit" className="confirm-btn">Submit Rating</button>
        </form>

        <div className="reviews-list">
          {reviews.length === 0 ? (
            <p className="muted">No reviews yet. Be the first to share your stay.</p>
          ) : (
            reviews.map((r) => (
              <article className="review" key={r.id}>
                <div className="review-head">
                  <strong>{r.name}</strong>
                  <span className="review-stars">{"⭐".repeat(r.rating)}</span>
                </div>
                <p>{r.experience}</p>
                <small>{r.date}</small>
              </article>
            ))
          )}
        </div>
      </div>
    </section>
  );
}
