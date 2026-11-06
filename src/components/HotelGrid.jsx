import HotelCard from "./HotelCard.jsx";

export default function HotelGrid({ hotels, onBook }) {
  return (
    <div className="hotel-grid">
      {hotels.map((hotel) => (
        <HotelCard key={hotel.id} hotel={hotel} onBook={onBook} />
      ))}
    </div>
  );
}
