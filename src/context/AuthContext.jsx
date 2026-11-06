import { createContext, useContext } from "react";
import useLocalStorage from "../hooks/useLocalStorage.js";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [users, setUsers] = useLocalStorage("staynestUsers", []);
  const [currentUser, setCurrentUser] = useLocalStorage("staynestCurrentUser", null);

  const signup = ({ name, email, password }) => {
    const cleanEmail = email.trim().toLowerCase();
    if (users.some((u) => u.email === cleanEmail)) {
      return { ok: false, error: "Email already registered." };
    }
    setUsers([...users, { name: name.trim(), email: cleanEmail, password }]);
    return { ok: true };
  };

  const login = (email, password) => {
    if (users.length === 0) {
      return { ok: false, code: "no-account", error: "No account found. Please sign up first." };
    }
    const cleanEmail = email.trim().toLowerCase();
    const user = users.find((u) => u.email === cleanEmail && u.password === password);
    if (!user) return { ok: false, error: "Invalid email or password." };
    setCurrentUser({ name: user.name, email: user.email });
    return { ok: true };
  };

  const logout = () => setCurrentUser(null);

  return (
    <AuthContext.Provider value={{ currentUser, signup, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
