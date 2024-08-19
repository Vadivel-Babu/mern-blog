import React from "react";
import { Button, Input } from "antd";

const Login = () => {
  return (
    <form className="flex flex-col gap-3 w-[300px] md:w-[350px] shadow-lg p-3">
      <h1 className="font-bold text-2xl text-center">Login</h1>

      <Input placeholder="Enter Your Email..." />
      <Input.Password placeholder="Enter your Password" />
      <Button type="primary" loading={false}>
        Login
      </Button>
    </form>
  );
};

export default Login;
