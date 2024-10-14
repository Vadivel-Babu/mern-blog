import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { Usercontext } from "../UserContext";
import useDeletePost from "../services/postApi/deletePost";
import { Button } from "antd";
import { FaTrash } from "react-icons/fa";

const Postcard = ({ data }) => {
  const { user } = useContext(Usercontext);
  const { mutate, isPending } = useDeletePost();

  return (
    <div className="flex flex-col gap-2 border p-2 w-[250px]">
      <img src="" alt="" className="w-full h-[150px] bg-slate-400" />
      <div>
        <p className="font-semibold">
          Created on: {data?.createdAt?.split("T")[0]}
        </p>
        <h1 className="text-xl md:text-3xl font-bold">{data?.title}</h1>
        <p className="my-3">
          {data?.content}{" "}
          <Link
            to={`/post/${data?._id}`}
            className="text-darkblue font-semibold mr-2 underline"
          >
            Read More
          </Link>
        </p>

        {user?._id === data?.user && (
          <Button danger loading={isPending} onClick={() => mutate(data?._id)}>
            <FaTrash />
          </Button>
        )}
      </div>
    </div>
  );
};

export default Postcard;
