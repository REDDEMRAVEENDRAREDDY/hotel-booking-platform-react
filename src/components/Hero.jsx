import { useState } from "react";

const today = () => new Date().toISOString().split("T")[0];

export default function Hero({ initialSearch, onSearch }) {
  const [form, setForm] = useState({
    destination: initialSearch?.destination || "",
    checkin: initialSearch?.checkin || "",
    checkout: initialSearch?.checkout || "",
    guests: initialSearch?.guests || "",
  });

  const update = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const submit = (e) => {
    e.preventDefault();
    onSearch(form);
  };

  return (
    <section className="hero" id="home">
      <div className="hero-content">
        <h1>Find Your Perfect Stay</h1>
        <p>Search hotels, compare prices and book your room easily.</p>

        <form className="search-box" onSubmit={submit}>
          <input
            type="text"
            name="destination"
            placeholder="Where do you want to stay?"
            value={form.destination}
            onChange={update}
            required
          />
          <input
            type="date"
            name="checkin"
            min={today()}
            value={form.checkin}
            onChange={update}
            required
          />
          <input
            type="date"
            name="checkout"
            min={form.checkin || today()}
            value={form.checkout}
            onChange={update}
            required
          />
          <select name="guests" value={form.guests} onChange={update}>
            <option value="">Guests</option>
            {[1, 2, 3, 4, 5].map((n) => (
              <option key={n} value={n}>
                {n} {n === 1 ? "Guest" : "Guests"}
              </option>
            ))}
          </select>
          <button type="submit" className="search-btn">Search Hotels</button>
        </form>
      </div>
    </section>
  );
}
