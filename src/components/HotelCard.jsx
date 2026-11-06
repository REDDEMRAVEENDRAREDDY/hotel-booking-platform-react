export default function HotelCard({ hotel, onBook }) {
  return (
    <div className="hotel-card">
      <img src={hotel.image} alt={hotel.name} loading="lazy" />

      <div className="hotel-info">
        <h3>{hotel.name}</h3>
        <p className="location">
          📍 {hotel.city}, {hotel.state}
        </p>
        <p className="rating">
          {"⭐".repeat(hotel.stars)} {hotel.rating}
        </p>
        <div className="room">
          🛏️ {hotel.room} • 2 Guests • {hotel.perk}
        </div>
        <p className="price">
          ₹{hotel.price.toLocaleString("en-IN")} <span>/ night</span>
        </p>
        <button className="book-btn" onClick={() => onBook(hotel)}>
          Book Now
        </button>
      </div>
    </div>
  );
}
