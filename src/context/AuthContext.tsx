import { createContext, useContext, useState, type ReactNode } from "react";

interface User {
  email: string;
  password: string;
}

interface AuthContextType {
  user: string | null;
  login: (email: string, password: string) => boolean;
  signup: (email: string, password: string) => boolean;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// dummy test accounts
const INITIAL_USERS: User[] = [
  { email: "demo@example.com", password: "password123" },
  { email: "test@user.com", password: "testpass" },
];

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<string | null>(localStorage.getItem("user"));
  const [users, setUsers] = useState<User[]>(INITIAL_USERS);

  const login = (email: string, password: string): boolean => {
    const account = users.find(
      (acc) => acc.email === email && acc.password === password
    );
    if (account) {
      setUser(email);
      localStorage.setItem("user", email);
      return true;
    }
    return false;
  };

  const signup = (email: string, password: string): boolean => {
    const exists = users.find((acc) => acc.email === email);
    if (exists) return false; // email already exists case
    const newUser = { email, password };
    setUsers((prev) => [...prev, newUser]);
    setUser(email);
    localStorage.setItem("user", email);
    return true;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  return (
    <AuthContext.Provider value={{ user, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
};
