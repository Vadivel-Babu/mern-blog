import React, { useEffect, useState } from "react";
import { createContext } from "react";
import axios from "axios";

export const Usercontext = createContext();

const UserContext = ({ children }) => {
  const [user, setUser] = useState(null);
  useEffect(() => {
    async function getUser() {
      const response = await axios.get("http://localhost:4000/api/profile");
      const data = await response.json();
      setUser(data);
    }
    getUser();
  }, []);
  return <Usercontext.Provider value={user}>{children}</Usercontext.Provider>;
};

export default UserContext;
