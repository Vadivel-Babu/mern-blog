import React, { useState, useEffect, useRef } from "react";
import { Button, Input, Spin } from "antd";
import { useNavigate, useParams } from "react-router-dom";
import getPost from "../services/postApi/getPost";
import { toast } from "react-toastify";
import updatePost from "../services/postApi/updatePost";

const EditPost = () => {
  const { id } = useParams();
  const { data: post, isLoading } = getPost(id);
  const { mutate, isPending, isSuccess } = updatePost();
  const [data, setData] = useState({ title: "", content: "" });
  const [img, setImg] = useState(null);
  const fileInput = useRef();

  const navigate = useNavigate();

  useEffect(() => {
    setData({
      title: post?.data?.data?.title,
      content: post?.data?.data?.content,
    });
    setImg(post?.data?.data?.img);
  }, [id, isLoading]);

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

    mutate({ ...data, img, id });
  }

  useEffect(() => {
    if (!isPending && isSuccess) {
      setData({ title: " ", content: " " });
      toast.success("Post updated");
      navigate(-1);
    }
  }, [isPending]);
  return (
    <>
      {isLoading ? (
        <div className="flex items-center justify-center min-h-[50vh]">
          <div className="flex flex-col items-center justify-center gap-3">
            <Spin size="large" />
            <p className="font-bold text-3xl">Loading...</p>
          </div>
        </div>
      ) : (
        <form className="flex flex-col gap-3 mx-auto w-[300px] md:w-[350px] shadow-lg p-3">
          <h1 className="font-bold text-2xl text-center">Edit Post</h1>
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
            placeholder="Title..."
            name="title"
            value={data.title}
            onChange={(e) =>
              setData({ ...data, [e.target.name]: e.target.value })
            }
          />
          <Input
            placeholder="content..."
            name="content"
            value={data.content}
            onChange={(e) =>
              setData({ ...data, [e.target.name]: e.target.value })
            }
          />

          <Button type="primary" onClick={handleSubmit} loading={isPending}>
            Update Post
          </Button>
        </form>
      )}
    </>
  );
};

export default EditPost;
