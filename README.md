# StayNest - Hotel Booking Platform (React)

React + Vite version of the StayNest hotel booking site.

## Run it

```bash
npm install
npm run dev        # development server (http://localhost:5173)
npm run build      # production build into dist/
npm run preview    # preview the production build
```

Requires Node.js 18 or newer.

## Project structure

```
src/
  main.jsx                 entry point, wraps the app in AuthProvider
  App.jsx                  page switching + shared state (search, bookings, reviews)
  index.css                all styles (same look as the original index.html)
  data/hotels.js           hotel list and "why choose us" features
  hooks/useLocalStorage.js useState that persists to localStorage
  context/AuthContext.jsx  signup / login / logout
  components/
    Header, Hero, SearchResults, HotelGrid, HotelCard, Features,
    BookingForm, Confirmation, MyBookings, LoginForm, SignupForm,
    Reviews, Footer
```

## How the old code maps to React

| Original (index.html)                    | React                                  |
| ---------------------------------------- | -------------------------------------- |
| `showHome()/showLogin()/...` + display   | `view` state in `App.jsx`              |
| `hotels` array + `displayHotels()`       | `data/hotels.js` + `HotelGrid/Card`    |
| `#hotelSearch` submit handler            | `Hero` form + `handleSearch` in App    |
| `selectHotel()` / booking form           | `handleBook` + `BookingForm`           |
| `localStorage` login/signup code         | `AuthContext` + `useLocalStorage`      |
| `showMyBooking()`                        | `MyBookings`                           |

## Notes

- Data is stored in the browser's localStorage only; there is no backend.
  Passwords are stored in plain text, which is fine for a demo but must be
  replaced by a real backend with hashed passwords before going live.
- Payment is simulated. The UPI QR code is a demo (`demo@upi`).
