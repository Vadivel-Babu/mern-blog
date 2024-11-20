import React, { useState } from "react";
import { Button, Input } from "antd";

import useSigin from "../services/authApi/authSigin";

const Signup = () => {
  const { mutate, isPending } = useSigin();
  const [data, setData] = useState({ name: "", email: "", password: "" });

  async function handleSignin(e) {
    e.preventDefault();
    mutate(data);
    // try {
    //   setIsLoading(true);
    //   const response = await AxiosInstance.post("auth/signup", data);
    //   console.log(response);

    //   toast.success(response?.data.message);

    //   const token = response?.data.token;
    //   console.log(token);

    //   // const user = {
    //   //   _id,
    //   //   name,
    //   //   email,
    //   //   token,
    //   // };
    //   console.log(token);
    //   handleUser(token);
    //   setIsLoading(false);
    //   setData({ name: "", email: "", password: "" });
    //   navigate("/");
    // } catch (error) {
    //   toast.error(JSON.stringify(error.response?.data.message));
    //   setIsLoading(false);
    // }
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
      <Button type="primary" onClick={handleSignin} loading={isPending}>
        Signup
      </Button>
    </form>
  );
};

export default Signup;
