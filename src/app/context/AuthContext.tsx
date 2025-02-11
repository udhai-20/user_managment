import { createContext, useContext, useEffect, useState } from "react";
interface User {
  id: string;
  name: string;
  email: string;
}
interface AuthContextType {
  user: User|null;
  handleReset: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User|null>(null);

  useEffect(() => {
    // Get user data from localStorage on mount
    const storedUserData = localStorage.getItem("userData");
    if (storedUserData!=undefined) {
      setUser(JSON.parse(storedUserData));
    }
  }, []);

  const handleReset = () => {
    setUser(null);
    localStorage.removeItem("userData"); // Clear user data from localStorage
  };

  return (
    <AuthContext.Provider value={{ user, handleReset }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
