import { useAuth } from "../context/AuthContext.jsx";

export default function Header({ onHome, onSection, onMyBookings, onLogin, onSignup }) {
  const { currentUser, logout } = useAuth();

  return (
    <header>
      <button className="logo" onClick={onHome}>
        🏨 StayNest
      </button>

      <nav>
        <button className="nav-link" onClick={onHome}>Home</button>
        <button className="nav-link" onClick={() => onSection("hotels")}>Hotels</button>
        <button className="nav-link" onClick={() => onSection("features")}>Features</button>
        <button className="nav-link" onClick={onMyBookings}>My Booking</button>

        {currentUser ? (
          <>
            <span className="nav-user">Hi, {currentUser.name.split(" ")[0]}</span>
            <button className="nav-link login-btn" onClick={logout}>Logout</button>
          </>
        ) : (
          <>
            <button className="nav-link login-btn" onClick={onLogin}>Login</button>
            <button className="nav-link" onClick={onSignup}>Sign Up</button>
          </>
        )}
      </nav>
    </header>
  );
}
