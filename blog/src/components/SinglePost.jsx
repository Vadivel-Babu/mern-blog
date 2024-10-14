import { Button, Spin } from "antd";
import React, { useContext } from "react";
import useDeletePost from "../services/postApi/deletePost";
import { useNavigate, useParams } from "react-router-dom";
import getPost from "../services/postApi/getPost";
import { Usercontext } from "../UserContext";
import { FaTrash, FaEdit } from "react-icons/fa";

const SinglePost = () => {
  const { id } = useParams();

  const { data, isLoading } = getPost(id);
  const { user } = useContext(Usercontext);

  const { mutate, isPending } = useDeletePost();

  const navigate = useNavigate();

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
        <div className="border p-3 mt-4">
          <h1 className="text-xl md:text3xl my-3">{data?.data?.data?.title}</h1>
          {<img src="" alt="" className="" />}
          <p className="text-lg">{data?.data?.data?.content}</p>
          {user?._id === data?.data?.data?.user && (
            <div className="mt-3 space-x-2">
              <Button type="primary" onClick={() => navigate(`/edit/${id}`)}>
                <FaEdit />
              </Button>
              <Button
                type="primary"
                loading={isPending}
                onClick={() => mutate(data._id)}
                danger
              >
                <FaTrash />
              </Button>
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default SinglePost;
