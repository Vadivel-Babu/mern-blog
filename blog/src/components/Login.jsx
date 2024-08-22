import React, { useContext, useState } from "react";
import * as EmailValidator from "email-validator";
import { Button, Input } from "antd";
import axios from "axios";
import { toast } from "react-toastify";
import { Usercontext } from "../UserContext";
import { useNavigate } from "react-router-dom";

const Login = () => {
  // const { mutate, isSuccess, isPending, isError, error } = useLogin();
  const { handleUser } = useContext(Usercontext);
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  async function handleLogin(e) {
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
        "http://localhost:4000/api/login",
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
      toast.error(error?.response?.data.message);
    } finally {
      setIsLoading(false);
      setData({ email: "", password: "" });
    }
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
        <Button
          style={{ backgroundColor: "#969aff" }}
          type="primary"
          onClick={handleLogin}
          loading={isLoading}
        >
          Login
        </Button>
      </form>
    </>
  );
};

export default Login;
