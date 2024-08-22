import React, { useContext, useEffect } from "react";
import { Button } from "antd";
import { Dropdown, Avatar } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { Usercontext } from "../UserContext";

const Navbar = () => {
  const navigate = useNavigate();
  const { user, handleLogout } = useContext(Usercontext);
  const items = [
    {
      label: <Link to="/create-post">create post</Link>,
      key: "0",
    },
    {
      label: (
        <Link onClick={handleLogout} to="/">
          logout
        </Link>
      ),
      key: "1",
      danger: true,
    },
  ];

  return (
    <header className="bg-blue">
      <div className="flex justify-between container p-5 items-center ">
        <h1 className="text-3xl font-bold text-white">Blog</h1>
        {user ? (
          <Dropdown menu={{ items }} trigger={["click"]} arrow>
            <a onClick={(e) => e.preventDefault()}>
              <Avatar className="cursor-pointer" size={50}>
                {user.name[0].toUpperCase()}
              </Avatar>
            </a>
          </Dropdown>
        ) : (
          <Button
            style={{ backgroundColor: "#969aff", fontSize: "1.5rem" }}
            onClick={() => navigate("/login")}
            type="primary"
          >
            Login
          </Button>
        )}
      </div>
    </header>
  );
};

export default Navbar;
