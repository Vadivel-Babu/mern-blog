import React, { useState } from "react";
import { Button, Input } from "antd";
import useCreatePost from "../services/postApi/createPost";
import { toast } from "react-toastify";

const CreatePost = () => {
  const { mutate, isError, isPending, error } = useCreatePost();
  const [data, setData] = useState({ title: "", content: "" });
  if (isError) {
    toast.error(error);
  }
  function handleCreatePost(e) {
    e.preventDefault();
    if (data.title.trim().length === 0) {
      toast.error("Title can not be empty");
      return;
    }
    if (data.content.trim().length === 0) {
      toast.error("content can not be empty");
      return;
    }
    mutate(data);
  }
  return (
    <form className="flex flex-col gap-3 mx-auto w-[300px] md:w-[350px] shadow-lg p-3">
      <h1 className="font-bold text-2xl text-center">Create Post</h1>
      <Input
        placeholder="Title"
        name="title"
        onChange={(e) => setData({ ...data, [e.target.name]: e.target.value })}
      />
      <Input
        placeholder="Content"
        name="content"
        onChange={(e) => setData({ ...data, [e.target.name]: e.target.value })}
      />
      <Button onClick={handleCreatePost} type="primary" loading={isPending}>
        Create Post
      </Button>
    </form>
  );
};

export default CreatePost;
