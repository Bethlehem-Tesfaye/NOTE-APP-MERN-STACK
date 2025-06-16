import React, { useState, useContext, createContext, useEffect } from "react";

const authContext = createContext();

function ContextProvider({ children }) {
  const [user, setUser] = useState(null);

  const login = (user) => {
    setUser(user);
    localStorage.setItem("user", JSON.stringify(user));
  };
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);
  return (
    <authContext.Provider value={{ user, login }}>
      {children}
    </authContext.Provider>
  );
}

export const useAuth = () => useContext(authContext);
export default ContextProvider;
