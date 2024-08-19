import React from "react";
import { Button } from "antd";
import { Dropdown, Space, Avatar } from "antd";
import { Link, useNavigate } from "react-router-dom";

const items = [
  {
    label: <Link to="/">1st menu item</Link>,
    key: "0",
  },
  {
    label: <Link to="/">logout</Link>,
    key: "1",
    danger: true,
  },
];
const Navbar = () => {
  const navigate = useNavigate();
  return (
    <header>
      <div className="flex justify-between container p-5 items-center ">
        <h1 className="text-3xl font-bold">Blog</h1>
        <Button onClick={() => navigate("/login")} type="primary">
          Login
        </Button>
        <Dropdown menu={{ items }} trigger={["click"]} arrow>
          <a onClick={(e) => e.preventDefault()}>
            <Avatar className="cursor-pointer" size={50}>
              USER
            </Avatar>
          </a>
        </Dropdown>
      </div>
    </header>
  );
};

export default Navbar;
