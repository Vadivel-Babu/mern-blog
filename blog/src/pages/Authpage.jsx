import React, { useState } from "react";
import Signup from "../components/Signup";
import Login from "../components/Login";
import { Tabs } from "antd";
import BackButton from "../uicomponents/BackButton";

const Authpage = () => {
  const [isActive, setActive] = useState("login");
  return (
    <div className="container">
      <BackButton />
      <div className="max-w-max mx-auto mt-3 space-y-3">
        <Tabs
          defaultActiveKey="1"
          centered
          size="large"
          items={["Login", "Signup"].map((item, i) => {
            return {
              label: item,
              key: item,
            };
          })}
          onChange={(val) => setActive(val.toLowerCase())}
        />
        {isActive === "signup" ? <Signup /> : <Login />}
      </div>
    </div>
  );
};

export default Authpage;
