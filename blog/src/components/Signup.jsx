import React, { useState } from "react";
import { Button, Input } from "antd";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState({ name: "", email: "", password: "" });
  const navigate = useNavigate();

  async function handleSignin(e) {
    e.preventDefault();

    try {
      if (!EmailValidator.validate(data.email)) {
        console.log(data.email);

        toast.error("Enter valid Email");
        return;
      }
      if (!data.password.trim().length) {
        toast.error("Enter Password");
        return;
      }
      setIsLoading(true);
      const response = await axios.post(
        "https://mern-blog-9kew.onrender.com/api/signup",
        data
      );
      toast.success(response?.data.message);
      const { _id, name, email } = response?.data.user.user;
      const token = response?.data.user.token;
      const user = {
        _id,
        name,
        email,
        token,
      };
      handleUser(user);
      navigate("/");
    } catch (error) {
      toast.error(JSON.stringify(error.response?.data.message));
    } finally {
      setIsLoading(false);
      // setData({ name: "", email: "", password: "" });
    }
  }
  return (
    <form className="flex flex-col gap-3 w-[300px] md:w-[350px] shadow-lg p-3">
      <h1 className="font-bold text-2xl text-center">Sign Up</h1>
      <Input
        placeholder="Enter your Name..."
        name="name"
        value={data?.name}
        onChange={(e) => setData({ ...data, [e.target.name]: e.target.value })}
      />
      <Input
        placeholder="Enter Your Email... "
        name="email"
        value={data?.email}
        onChange={(e) => setData({ ...data, [e.target.name]: e.target.value })}
      />
      <Input.Password
        placeholder="Enter your Password"
        name="password"
        value={data?.password}
        onChange={(e) => setData({ ...data, [e.target.name]: e.target.value })}
      />
      <Button
        style={{ backgroundColor: "#969aff" }}
        type="primary"
        onClick={handleSignin}
        loading={isLoading}
      >
        Signup
      </Button>
    </form>
  );
};

export default Signup;
