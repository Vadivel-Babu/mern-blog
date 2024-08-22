import React, { useContext } from "react";
import { Button } from "antd";
import { Dropdown, Avatar } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { Usercontext } from "../UserContext";

const items = [
  {
    label: <Link to="/create-post">create post</Link>,
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
  const user = useContext(Usercontext);
  console.log(user);

  return (
    <header className="bg-blue">
      <div className="flex justify-between container p-5 items-center ">
        <h1 className="text-3xl font-bold text-white">Blog</h1>
        <Button
          style={{ backgroundColor: "#969aff", fontSize: "1.5rem" }}
          onClick={() => navigate("/login")}
          type="primary"
        >
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
