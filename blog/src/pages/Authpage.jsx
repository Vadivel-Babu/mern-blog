import React, { useState } from "react";
import Signup from "../components/Signup";
import Login from "../components/Login";

import BackButton from "../uicomponents/BackButton";

const Authpage = () => {
  const [isActive, setActive] = useState("signup");
  return (
    <div className="container">
      <BackButton />
      <div className="max-w-max mx-auto mt-3 space-y-2">
        <div className="border  flex gap-2 rounded-xl overflow-hidden max-w-max mx-auto">
          <p
            className={`${
              isActive === "signup"
                ? "bg-green-400/45 text-green-800 "
                : " text-black "
            }font-bold text-xl p-2 cursor-pointer`}
            onClick={() => setActive("signup")}
          >
            Signup
          </p>
          <p
            className={`${
              isActive === "login"
                ? "bg-green-400/45 text-green-800 "
                : " text-black "
            }font-bold text-xl p-2 cursor-pointer`}
            onClick={() => setActive("login")}
          >
            Login
          </p>
        </div>
        {isActive === "signup" ? <Signup /> : <Login />}
      </div>
    </div>
  );
};

export default Authpage;
