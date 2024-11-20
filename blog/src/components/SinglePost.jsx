import { Avatar, Button, Spin } from "antd";
import React, { useContext, useState } from "react";
import useDeletePost from "../services/postApi/deletePost";
import { useNavigate, useParams } from "react-router-dom";

import { Usercontext } from "../UserContext";
import {
  FaTrash,
  FaEdit,
  FaRegCommentDots,
  FaImage,
  FaUser,
} from "react-icons/fa";

import { FcLike, FcLikePlaceholder } from "react-icons/fc";
import CommentModal from "./CommentModal";
import useLikePost from "../services/commentsApi/likePost";

const SinglePost = ({ data, me, isLoading, id }) => {
  const { user } = useContext(Usercontext);
  const isUserLiked = data?.data?.data.likes.includes(me?.data._id);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { mutate, isPending } = useDeletePost();
  const { mutate: handleLike, isPending: likeLoading } = useLikePost();

  const navigate = useNavigate();

  function handleCancel() {
    setIsModalOpen(false);
  }

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
        <div className="border-4 p-3 mt-4 max-w-[650px] mx-auto">
          <h1 className="text-xl md:text3xl text-center capitalize font-semibold">
            {data?.data?.data?.title}
          </h1>
          <div className="p-2 flex justify-center items-center gap-2">
            <Avatar
              src={user?.profileImg}
              size={40}
              alt="user"
              icon={<FaUser />}
            />
            <p className="capitalize font-medium text-slate-600">
              author:{" "}
              <span className="font-semibold text-black">{user?.name}</span>{" "}
            </p>
          </div>
          {data?.data?.data?.img ? (
            <img
              src={data?.data?.data?.img}
              alt="post image"
              className="w-[150px] mx-auto object-contain"
            />
          ) : (
            <div className="flex items-center justify-center w-[150px] mx-auto h-[150px] bg-slate-100">
              <FaImage className="text-4xl text-purple-600" />
            </div>
          )}
          <p className="text-lg tracking-wider text-center">
            {data?.data?.data?.content}
          </p>
          {user?._id === data?.data?.data?.user ? (
            <div className="mt-3 mx-auto w-max space-x-2">
              <Button type="primary" onClick={() => navigate(`/edit/${id}`)}>
                <FaEdit />
              </Button>
              <Button
                type="primary"
                loading={isPending}
                onClick={() => mutate(data?.data?.data._id)}
                danger
              >
                <FaTrash />
              </Button>
            </div>
          ) : (
            user?._id && (
              <div className="mt-3 mx-auto w-max space-x-2">
                <Button
                  onClick={() => setIsModalOpen(true)}
                  icon={<FaRegCommentDots />}
                ></Button>
                <Button
                  loading={likeLoading}
                  onClick={() => handleLike(data?.data?.data._id)}
                  icon={isUserLiked ? <FcLike /> : <FcLikePlaceholder />}
                ></Button>
              </div>
            )
          )}
        </div>
      )}
      <CommentModal
        postId={data?.data?.data._id}
        open={isModalOpen}
        handleCancel={handleCancel}
      />
    </>
  );
};

export default SinglePost;
