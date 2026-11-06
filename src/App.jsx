import { useEffect, useState } from "react";
import { hotels } from "./data/hotels.js";
import { useAuth } from "./context/AuthContext.jsx";
import useLocalStorage from "./hooks/useLocalStorage.js";

import Header from "./components/Header.jsx";
import Hero from "./components/Hero.jsx";
import SearchResults from "./components/SearchResults.jsx";
import HotelGrid from "./components/HotelGrid.jsx";
import Features from "./components/Features.jsx";
import Reviews from "./components/Reviews.jsx";
import BookingForm from "./components/BookingForm.jsx";
import Confirmation from "./components/Confirmation.jsx";
import MyBookings from "./components/MyBookings.jsx";
import LoginForm from "./components/LoginForm.jsx";
import SignupForm from "./components/SignupForm.jsx";
import Footer from "./components/Footer.jsx";

export default function App() {
  const { currentUser } = useAuth();

  // which "page" is showing: home | login | signup | booking | confirmation | myBookings
  const [view, setView] = useState("home");
  const [notice, setNotice] = useState("");

  const [searchResult, setSearchResult] = useState(null);
  const [savedSearch, setSavedSearch] = useLocalStorage("hotelSearch", null);

  const [selectedHotel, setSelectedHotel] = useState(null);
  const [pendingHotel, setPendingHotel] = useState(null); // hotel chosen before logging in
  const [lastBooking, setLastBooking] = useState(null);

  const [bookings, setBookings] = useLocalStorage("staynestBookings", []);
  const [reviews, setReviews] = useLocalStorage("staynestReviews", []);

  const go = (nextView, message = "") => {
    setView(nextView);
    setNotice(message);
  };

  // Jump to the top whenever we leave the home page.
  useEffect(() => {
    if (view !== "home") window.scrollTo({ top: 0 });
  }, [view]);

  const goHome = () => {
    go("home");
    setTimeout(() => window.scrollTo({ top: 0, behavior: "smooth" }), 0);
  };

  const goToSection = (id) => {
    go("home");
    setTimeout(() => {
      document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    }, 0);
  };

  /* ---------- search ---------- */
  const handleSearch = (form) => {
    setSavedSearch(form);

    const query = form.destination.trim();
    const q = query.toLowerCase();
    const matches = hotels.filter(
      (h) => h.city.toLowerCase().includes(q) || h.name.toLowerCase().includes(q)
    );

    setSearchResult({
      query,
      matches: matches.length,
      hotels: matches.length > 0 ? matches : hotels,
    });
  };

  /* ---------- booking ---------- */
  const handleBook = (hotel) => {
    if (!currentUser) {
      setPendingHotel(hotel);
      go("login", "Please login before booking a hotel.");
      return;
    }
    setSelectedHotel(hotel);
    go("booking");
  };

  const handleConfirmBooking = (booking) => {
    setBookings([...bookings, booking]);
    setLastBooking(booking);
    go("confirmation");
  };

  /* ---------- auth ---------- */
  const handleLoginSuccess = () => {
    if (pendingHotel) {
      setSelectedHotel(pendingHotel);
      setPendingHotel(null);
      go("booking");
    } else {
      goHome();
    }
  };

  const handleSignupSuccess = () => go("login", "Signup successful! Please login.");

  /* ---------- guard pages that need data ---------- */
  let current = view;
  if (current === "booking" && (!currentUser || !selectedHotel)) current = "home";
  if (current === "confirmation" && !lastBooking) current = "home";

  return (
    <>
      <Header
        onHome={goHome}
        onSection={goToSection}
        onMyBookings={() => go("myBookings")}
        onLogin={() => go("login")}
        onSignup={() => go("signup")}
      />

      <main>
        {current === "home" && (
          <>
            <Hero initialSearch={savedSearch} onSearch={handleSearch} />

            {searchResult && <SearchResults result={searchResult} onBook={handleBook} />}

            <section className="section" id="hotels">
              <div className="section-title">
                <h2>Popular Hotels</h2>
                <p>Choose from our popular hotel destinations</p>
              </div>
              <HotelGrid hotels={hotels} onBook={handleBook} />
            </section>

            <Features />
            <Reviews reviews={reviews} onAdd={(r) => setReviews([r, ...reviews])} />
          </>
        )}

        {current === "login" && (
          <LoginForm
            notice={notice}
            onSuccess={handleLoginSuccess}
            onSignup={() => go("signup")}
          />
        )}

        {current === "signup" && (
          <SignupForm onSuccess={handleSignupSuccess} onLogin={() => go("login")} />
        )}

        {current === "booking" && (
          <BookingForm
            hotel={selectedHotel}
            user={currentUser}
            onConfirm={handleConfirmBooking}
            onCancel={goHome}
          />
        )}

        {current === "confirmation" && (
          <Confirmation
            booking={lastBooking}
            onMyBookings={() => go("myBookings")}
            onHome={goHome}
          />
        )}

        {current === "myBookings" && (
          <MyBookings
            bookings={bookings}
            onBrowse={() => goToSection("hotels")}
            onLogin={() => go("login")}
          />
        )}
      </main>

      <Footer />
    </>
  );
}
