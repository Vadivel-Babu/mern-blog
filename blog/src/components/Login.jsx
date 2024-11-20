import React, { useState } from "react";

import { Button, Input } from "antd";

import useLogin from "../services/authApi/authLogin";

const Login = () => {
  const [data, setData] = useState({ email: "", password: "" });
  const { mutate, isPending } = useLogin();

  async function handleLogin(e) {
    e.preventDefault();
    mutate(data);
  }
  return (
    <>
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
        <Button type="primary" onClick={handleLogin} loading={isPending}>
          Login
        </Button>
      </form>
    </>
  );
};

export default Login;
