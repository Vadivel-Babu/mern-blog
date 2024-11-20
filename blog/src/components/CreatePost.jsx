import React, { useEffect, useRef, useState } from "react";
import { Button, Input, Upload } from "antd";
import useCreatePost from "../services/postApi/createPost";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { FaRegImage } from "react-icons/fa";

const CreatePost = () => {
  const { mutate, isPending, isSuccess } = useCreatePost();
  const [data, setData] = useState({ title: "", content: "" });
  const [img, setImg] = useState(null);
  const navigate = useNavigate();
  const fileInput = useRef();

  function handleCreatePost(e) {
    e.preventDefault();

    mutate({ ...data, img });
  }

  useEffect(() => {
    if (!isPending && isSuccess) {
      setData({ title: " ", content: " " });
      setImg("");
      navigate("/");
    }
  }, [isPending]);

  return (
    <form className="flex flex-col gap-3 mx-auto w-[300px] md:w-[350px] shadow-lg p-3">
      <h1 className="font-bold text-2xl text-center">Create Post</h1>

      {img ? (
        <div>
          <img
            src={img}
            alt="post image"
            className="w-[100px] object-contain"
          />
          <Button className="mt-1" onClick={() => setImg(null)} danger>
            Delete Image
          </Button>
        </div>
      ) : (
        <input
          ref={fileInput}
          accept=".png,.jpg,.jpeg"
          type="file"
          name="img"
          id="image"
          onChange={(e) => {
            const file = e.target.files[0];
            if (file) {
              const reader = new FileReader();
              reader.onload = () => {
                setImg(reader.result);
              };
              reader.readAsDataURL(file);
            }
          }}
        />
      )}
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
