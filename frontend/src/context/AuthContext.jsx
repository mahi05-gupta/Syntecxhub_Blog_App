import { createContext, useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import { TOKEN_KEY, USER_KEY } from "../utils/constants";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem(TOKEN_KEY);
    const savedUser = localStorage.getItem(USER_KEY);

    if (token) {
      try {
        if (savedUser) {
          setUser(JSON.parse(savedUser));
        } else {
          setUser(jwtDecode(token));
        }
      } catch {
        localStorage.clear();
        setUser(null);
      }
    }
  }, []);

  const login = (token, userData) => {
    localStorage.setItem(TOKEN_KEY, token);
    localStorage.setItem(USER_KEY, JSON.stringify(userData));

    setUser(userData);
  };

  const logout = () => {
    localStorage.clear();
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, isAuthenticated: !!user }}>
      {children}
    </AuthContext.Provider>
  );
};