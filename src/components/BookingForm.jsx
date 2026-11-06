import { useState } from "react";

export default function BookingForm({ hotel, user, onConfirm, onCancel }) {
  const [form, setForm] = useState({
    customerName: user?.name || "",
    email: user?.email || "",
    phone: "",
    rooms: 1,
    payment: "",
  });

  const update = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const rooms = Math.max(1, Number(form.rooms) || 1);
  const total = hotel.price * rooms;

  const submit = (e) => {
    e.preventDefault();
    onConfirm({
      bookingId: "SN" + Math.floor(100000 + Math.random() * 900000),
      userEmail: user.email,
      customerName: form.customerName.trim(),
      email: form.email.trim(),
      phone: form.phone.trim(),
      hotel: hotel.name,
      location: hotel.city,
      rooms,
      payment: form.payment,
      total,
      date: new Date().toLocaleDateString(),
    });
  };

  const upiLink = `upi://pay?pa=demo@upi&pn=StayNest&am=${total}`;
  const qrSrc = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(upiLink)}`;

  return (
    <section className="booking-section">
      <h2>Complete Your Booking</h2>

      <div className="booking-details">
        <p><strong>Hotel:</strong> {hotel.name}</p>
        <p><strong>Location:</strong> {hotel.city}</p>
        <p><strong>Price:</strong> ₹{hotel.price.toLocaleString("en-IN")} / night</p>
      </div>

      <form className="booking-form" onSubmit={submit}>
        <input
          type="text"
          name="customerName"
          placeholder="Enter your name"
          value={form.customerName}
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
          type="tel"
          name="phone"
          placeholder="Enter mobile number"
          value={form.phone}
          onChange={update}
          pattern="[0-9+\- ]{7,15}"
          title="Enter a valid mobile number"
          required
        />
        <input
          type="number"
          name="rooms"
          min="1"
          placeholder="Number of rooms"
          value={form.rooms}
          onChange={update}
          required
        />
        <select name="payment" value={form.payment} onChange={update} required>
          <option value="">Select Payment Method</option>
          <option value="UPI">UPI</option>
          <option value="Credit Card">Credit Card</option>
          <option value="Debit Card">Debit Card</option>
        </select>

        {form.payment === "UPI" && (
          <div className="upi-qr">
            <h3>Scan to Pay with UPI</h3>
            <img src={qrSrc} alt="UPI QR Code" width="200" height="200" />
            <p>Scan this QR code using any UPI app</p>
          </div>
        )}

        <p className="booking-total">
          Total: <strong>₹{total.toLocaleString("en-IN")}</strong>
        </p>

        <button type="submit" className="confirm-btn">Confirm Booking</button>
        <button type="button" className="secondary-btn" onClick={onCancel}>Cancel</button>
      </form>
    </section>
  );
}
