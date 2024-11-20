import React, { useEffect, useState } from "react";
import { createContext } from "react";

export const Usercontext = createContext();

const UserContext = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);

  const getUser = () => {
    const user = localStorage.getItem("user")
      ? JSON.parse(localStorage.getItem("user"))
      : null;
    setUser(user);
  };

  useEffect(() => {
    getUser();
  }, []);
  function handleLogout() {
    console.log("logout");

    setUser(localStorage.removeItem("user"));
    localStorage.removeItem("token");
    getUser();
  }

  function handleSetToken(token) {
    localStorage.setItem("token", token);
  }

  function handleUser(user) {
    setUser(localStorage.setItem("user", JSON.stringify(user)));
    getUser();
  }
  return (
    <Usercontext.Provider
      value={{ user, handleLogout, handleUser, handleSetToken }}
    >
      {children}
    </Usercontext.Provider>
  );
};

export default UserContext;
