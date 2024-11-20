import React, { useContext, useEffect } from "react";
import { Button } from "antd";
import { Dropdown, Avatar, Badge } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { Usercontext } from "../UserContext";
import { IoMdNotifications } from "react-icons/io";
import { toast } from "react-toastify";
import useLogout from "../services/authApi/authLogout";
import { FaUser } from "react-icons/fa";
import useFetchAllNotification from "../services/notificationApi/getNotification";
// import useFetchMe from "../services/userApi/getUser";

const Navbar = () => {
  const navigate = useNavigate();
  const { user, handleLogout } = useContext(Usercontext);
  //const { data: user, isLoading: userLoading, onError } = useFetchMe();
  const { mutate: logout } = useLogout();
  const { data, isLoading } = useFetchAllNotification();

  const items = [
    {
      label: <Link to={`/profile/${user?._id}`}>Profile</Link>,
      key: "0",
    },
    {
      label: (
        <Link
          onClick={() => {
            logout();
            handleLogout();
          }}
          to="/"
        >
          logout
        </Link>
      ),
      key: "3",
      danger: true,
    },
    {
      label: (
        <Link className="md:hidden" to="/notification">
          Notification
        </Link>
      ),
      key: "1",
    },
    {
      label: (
        <Link className="md:hidden" to="/create-post">
          Create Post
        </Link>
      ),
      key: "2",
    },
  ];

  function handleNavigate() {
    if (user?.name) {
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
            className="hidden md:flex text-white text-lg "
            type="primary"
          >
            Create Post
          </Button>
          <Badge
            className="mx-3 hidden md:flex"
            showZero
            count={data === undefined ? 0 : data?.data?.length}
            color="purple"
          >
            <Button
              onClick={() => {
                if (user?.name) {
                  navigate("/notification");
                } else {
                  toast.warning("Login to see notification");
                  navigate("/login");
                }
              }}
              className="hidden md:inline"
              loading={isLoading}
              icon={<IoMdNotifications className="text-lg" />}
            />
          </Badge>
          {user ? (
            <Dropdown menu={{ items }} trigger={["click"]} arrow>
              <a onClick={(e) => e.preventDefault()}>
                <Avatar
                  src={user?.profileImg}
                  alt="user"
                  icon={<FaUser />}
                  className="cursor-pointer"
                  size={35}
                />
              </a>
            </Dropdown>
          ) : (
            <Button
              onClick={() => navigate("/login")}
              className="text-lg"
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
