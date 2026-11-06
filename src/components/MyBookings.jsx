import { useAuth } from "../context/AuthContext.jsx";

export default function MyBookings({ bookings, onBrowse, onLogin }) {
  const { currentUser } = useAuth();
  const mine = currentUser
    ? bookings.filter((b) => b.userEmail === currentUser.email)
    : [];

  return (
    <section className="my-booking-section">
      <div className="my-booking-container">
        <h2>My Booking</h2>

        {!currentUser ? (
          <div className="no-booking">
            <h3>Please login</h3>
            <p>Login to see your hotel bookings.</p>
            <button className="my-booking-btn" onClick={onLogin}>Login</button>
          </div>
        ) : mine.length === 0 ? (
          <div className="no-booking">
            <h3>No Booking Found</h3>
            <p>You have not made any hotel booking yet.</p>
            <button className="my-booking-btn" onClick={onBrowse}>Book a Hotel</button>
          </div>
        ) : (
          <>
            {mine.map((b) => (
              <div className="my-booking-card" key={b.bookingId}>
                <h3>✅ Booking Confirmed</h3>
                <p><strong>Booking ID:</strong> {b.bookingId}</p>
                <p><strong>Guest Name:</strong> {b.customerName}</p>
                <p><strong>Email:</strong> {b.email}</p>
                <p><strong>Phone:</strong> {b.phone}</p>
                <p><strong>Hotel:</strong> {b.hotel}</p>
                <p><strong>Location:</strong> {b.location}</p>
                <p><strong>Rooms:</strong> {b.rooms}</p>
                <p><strong>Payment:</strong> {b.payment}</p>
                <p><strong>Total Amount:</strong> ₹{b.total.toLocaleString("en-IN")}</p>
                <p><strong>Booking Date:</strong> {b.date}</p>
              </div>
            ))}
            <div className="center">
              <button className="my-booking-btn" onClick={onBrowse}>Book Another Hotel</button>
            </div>
          </>
        )}
      </div>
    </section>
  );
}
