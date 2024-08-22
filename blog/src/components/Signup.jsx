import React, { useState } from "react";
import { Button, Input } from "antd";
import axios from "axios";
import { toast } from "react-toastify";

const Signup = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState({ name: "", email: "", password: "" });

  async function handleSignin(e) {
    e.preventDefault();
    try {
      if (!EmailValidator.validate(data.email)) {
        toast.error("Enter valid Email");
        return;
      }
      if (!data.password.trim().length) {
        toast.error("Enter Password");
        return;
      }
      setIsLoading(true);
      const response = await axios.post(
        "https://mern-blog-9kew.onrender.com/api/auth/sigup",
        data
      );
      toast.success(JSON.stringify(response));
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      setIsLoading(false);
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
