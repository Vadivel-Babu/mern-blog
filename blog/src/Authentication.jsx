import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Usercontext } from "./UserContext";

const Authentication = ({ children }) => {
  const navigate = useNavigate();
  const { user } = useContext(Usercontext);
  useEffect(() => {
    if (!user) {
      return navigate("/login");
    }
  }, [user]);
  return children;
};

export default Authentication;
