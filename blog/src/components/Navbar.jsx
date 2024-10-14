import React, { useContext, useEffect } from "react";
import { Button } from "antd";
import { Dropdown, Avatar } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { Usercontext } from "../UserContext";
import { MdCreateNewFolder } from "react-icons/md";
import { toast } from "react-toastify";

const Navbar = () => {
  const navigate = useNavigate();
  const { user, handleLogout } = useContext(Usercontext);
  const items = [
    {
      label: <Link to="/">Profile</Link>,
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

  function handleNavigate() {
    if (user) {
      navigate("/create-post");
    } else {
      toast.warning("Login to create post");
      navigate("/login");
    }
  }

  return (
    <header className="bg-blue">
      <div className="flex justify-between container p-5 items-center ">
        <h1 className="text-3xl font-bold text-white">Blog</h1>
        <div className="flex items-center gap-3">
          <Button
            onClick={handleNavigate}
            className=" text-lg"
            icon={<MdCreateNewFolder />}
          >
            Create Post
          </Button>
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
      </div>
    </header>
  );
};

export default Navbar;
