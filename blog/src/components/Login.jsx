import React, { useState } from "react";
import { Button, Input, message } from "antd";
import useLogin from "../services/authApi/loginApi";
import axios from "axios";

const Login = () => {
  // const { mutate, isSuccess, isPending, isError, error } = useLogin();
  const [messageApi, contextHolder] = message.useMessage();
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState({});

  async function handleLogin(e) {
    e.preventDefault();

    try {
      setIsLoading(true);
      const response = await axios.post(
        "https://mern-blog-9kew.onrender.com/api/auth/login",
        data
      );
      console.log(response);
    } catch (error) {
      messageApi.error({ content: error.response.data.message });
    } finally {
      setIsLoading(false);
    }
  }
  return (
    <>
      {contextHolder}
      <form className="flex flex-col gap-3 w-[300px] md:w-[350px] shadow-lg p-3">
        <h1 className="font-bold text-2xl text-center">Login</h1>
        <Input
          placeholder="Enter Your Email..."
          name="email"
          value={data?.email}
          onChange={(e) =>
            setData({ ...data, [e.target.name]: e.target.value })
          }
        />
        <Input.Password
          placeholder="Enter your Password"
          name="password"
          value={data?.password}
          onChange={(e) =>
            setData({ ...data, [e.target.name]: e.target.value })
          }
        />
        <Button type="primary" onClick={handleLogin} loading={isLoading}>
          Login
        </Button>
      </form>
    </>
  );
};

export default Login;
