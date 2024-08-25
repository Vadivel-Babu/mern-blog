import { Button } from "antd";
import React, { useContext } from "react";
import useDeletePost from "../services/postApi/deletePost";
import { useNavigate, useParams } from "react-router-dom";
import getPost from "../services/postApi/getPost";
import { Usercontext } from "../UserContext";

const SinglePost = () => {
  const { id } = useParams();

  const { data, isLoading } = getPost(id);
  const { user } = useContext(Usercontext);

  const { mutate, isPending } = useDeletePost();

  const navigate = useNavigate();
  if (isLoading) {
    return <p>Loading...</p>;
  }
  return (
    <div className="border p-3 mt-4">
      <h1 className="text-xl md:text3xl my-3">{data?.data?.data?.title}</h1>
      {<img src="" alt="" className="" />}
      <p className="text-lg">{data?.data?.data?.content}</p>
      {user?._id === data?.data?.data?.user && (
        <div className="mt-3 space-x-2">
          <Button type="primary" onClick={() => navigate(`/edit/${id}`)}>
            Edit
          </Button>
          <Button
            type="primary"
            loading={isPending}
            onClick={() => mutate(data._id)}
            danger
          >
            Delete
          </Button>
        </div>
      )}
    </div>
  );
};

export default SinglePost;
