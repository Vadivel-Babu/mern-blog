import React from "react";
import { Link, useNavigate } from "react-router-dom";
//import { Usercontext } from "../UserContext";
//import useDeletePost from "../services/postApi/deletePost";
import { Badge } from "antd";
import { FaRegCommentDots, FaImage } from "react-icons/fa";
import { FcLike } from "react-icons/fc";
//import useLikePost from "../services/commentsApi/likePost";
//import { toast } from "react-toastify";

const Postcard = ({ data }) => {
  const navigate = useNavigate();
  // const { mutate, isPending } = useDeletePost();
  // const { mutate: handleLike, isPending: likeLoading } = useLikePost();

  return (
    <div className="flex flex-col gap-2 border p-2 w-[250px] shadow-lg">
      {data?.img ? (
        <img
          src={data.img}
          alt={"img"}
          className="w-full h-[150px] object-contain object-center"
        />
      ) : (
        <div className="flex items-center justify-center w-full h-[150px] bg-slate-100">
          <FaImage className="text-4xl text-purple-600" />
        </div>
      )}

      <div>
        <p className="font-semibold">
          Created on: {data?.createdAt?.split("T")[0]}
        </p>
        <h1 className="text-lg md:text-xl mb-4 font-bold">{data?.title}</h1>

        <Badge showZero count={data?.likes.length} color="magenta">
          <div className="border p-1">
            <FcLike className="text-lg" />
          </div>
        </Badge>
        <Badge showZero count={data?.comments.length} color="purple">
          <div className="border p-1 ml-4">
            <FaRegCommentDots className="text-lg" />
          </div>
        </Badge>
        <Link
          to={`/post/${data?._id}`}
          className="text-darkblue font-semibold mr-2 underline block"
        >
          see post
        </Link>
      </div>
    </div>
  );
};

export default Postcard;
