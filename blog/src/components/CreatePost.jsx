import React, { useEffect, useState } from "react";
import { Button, Input } from "antd";
import useCreatePost from "../services/postApi/createPost";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const CreatePost = () => {
  const { mutate, isError, isPending, error, isSuccess } = useCreatePost();
  const [data, setData] = useState({ title: "", content: "" });
  const navigate = useNavigate();

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

  useEffect(() => {
    if (!isPending && isSuccess) {
      setData({ title: " ", content: " " });
      toast.success("Post Created");
      navigate("/");
    }
    if (isError) {
      toast.error(error.response.data.message);
    }
  }, [isPending, isError]);

  return (
    <form className="flex flex-col gap-3 mx-auto w-[300px] md:w-[350px] shadow-lg p-3">
      <h1 className="font-bold text-2xl text-center">Create Post</h1>
      <Input
        placeholder="Title"
        name="title"
        value={data.title}
        onChange={(e) => setData({ ...data, [e.target.name]: e.target.value })}
      />
      <Input
        placeholder="Content"
        name="content"
        value={data.content}
        onChange={(e) => setData({ ...data, [e.target.name]: e.target.value })}
      />
      <Button onClick={handleCreatePost} type="primary" loading={isPending}>
        Create Post
      </Button>
    </form>
  );
};

export default CreatePost;
