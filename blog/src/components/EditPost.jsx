import React from "react";
import { Button, Input } from "antd";

const EditPost = () => {
  return (
    <form className="flex flex-col gap-3 mx-auto w-[300px] md:w-[350px] shadow-lg p-3">
      <h1 className="font-bold text-2xl text-center">Edit Post</h1>
      <Input placeholder="Enter your Name..." />
      <Input placeholder="Enter Your Email..." />
      <Input.Password placeholder="Enter your Password" />
      <Button type="primary" loading={false}>
        Update Post
      </Button>
    </form>
  );
};

export default EditPost;
