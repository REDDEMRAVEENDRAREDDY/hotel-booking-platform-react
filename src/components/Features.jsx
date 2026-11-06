import { features } from "../data/hotels.js";

export default function Features() {
  return (
    <section className="section" id="features">
      <div className="section-title">
        <h2>Why Choose StayNest?</h2>
        <p>Everything you need for an easy hotel booking experience.</p>
      </div>

      <div className="features">
        {features.map((f) => (
          <div className="feature" key={f.title}>
            <div className="feature-icon">{f.icon}</div>
            <h3>{f.title}</h3>
            <p>{f.text}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
