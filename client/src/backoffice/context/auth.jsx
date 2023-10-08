import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const login = async (user) => {
    setUser(user);
    sessionStorage.setItem("or_user", JSON.stringify(user));
  };
  const logout = () => {
    setUser(null);
    sessionStorage.clear();
  };

  useEffect(() => {
    const storedUser = sessionStorage.getItem("or_user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);
  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
export const useAuth = () => {
  return useContext(AuthContext);
};
