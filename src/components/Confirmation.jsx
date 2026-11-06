export default function Confirmation({ booking, onMyBookings, onHome }) {
  const maskedPhone =
    booking.phone.length >= 4 ? "******" + booking.phone.slice(-4) : booking.phone;

  return (
    <section className="confirmation">
      <h2>✅ Booking Confirmed!</h2>
      <p>Your hotel booking has been successfully completed.</p>

      <div className="confirmation-box">
        <p><strong>Booking ID:</strong> {booking.bookingId}</p>
        <br />
        <p><strong>Guest Name:</strong> {booking.customerName}</p>
        <p><strong>Hotel:</strong> {booking.hotel}</p>
        <p><strong>Location:</strong> {booking.location}</p>
        <p><strong>Rooms:</strong> {booking.rooms}</p>
        <p><strong>Payment:</strong> {booking.payment}</p>
        <p><strong>Total:</strong> ₹{booking.total.toLocaleString("en-IN")}</p>
      </div>

      <p className="sms-note">SMS confirmation sent to {maskedPhone}</p>

      <div className="button-row">
        <button className="confirm-btn" onClick={onMyBookings}>View My Bookings</button>
        <button className="secondary-btn" onClick={onHome}>Back to Home</button>
      </div>
    </section>
  );
}
