import React, { useState, useEffect } from "react";
import { Button, Input } from "antd";
import { useNavigate, useParams } from "react-router-dom";
import getPost from "../services/postApi/getPost";
import { toast } from "react-toastify";
import updatePost from "../services/postApi/updatePost";

const EditPost = () => {
  const { id } = useParams();
  const { data: post, isLoading } = getPost(id);
  const { mutate, isPending, isSuccess } = updatePost();
  const [data, setData] = useState({ title: "", content: "" });
  const navigate = useNavigate();

  useEffect(() => {
    setData(post?.data?.data);
  }, [id, isLoading]);

  if (isLoading) {
    return <p>Loading...</p>;
  }
  function handleSubmit(e) {
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
    // navigate("/");
  }
  if (isSuccess) {
    navigate("/");
  }
  return (
    <form className="flex flex-col gap-3 mx-auto w-[300px] md:w-[350px] shadow-lg p-3">
      <h1 className="font-bold text-2xl text-center">Edit Post</h1>
      <Input
        placeholder="Title..."
        name="title"
        value={data.title}
        onChange={(e) => setData({ ...data, [e.target.name]: e.target.value })}
      />
      <Input
        placeholder="content..."
        name="content"
        value={data.content}
        onChange={(e) => setData({ ...data, [e.target.name]: e.target.value })}
      />

      <Button type="primary" onClick={handleSubmit} loading={isPending}>
        Update Post
      </Button>
    </form>
  );
};

export default EditPost;
