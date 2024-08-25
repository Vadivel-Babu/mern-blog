import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { Usercontext } from "../UserContext";
import useDeletePost from "../services/postApi/deletePost";
import { Button } from "antd";

const Postcard = ({ data }) => {
  const { user } = useContext(Usercontext);
  const { mutate, isPending } = useDeletePost();
  return (
    <>
      <div className="flex gap-2 border p-3 max-w-[750px] mx-auto">
        <img src="" alt="" className="w-[200px] h-[200px] bg-slate-400" />
        <div>
          <h1 className="text-xl md:text-3xl font-bold">{data?.title}</h1>
          <p className="my-3">{data?.content}</p>
          <Link to={`/post/${data?._id}`} className="text-blue font-bold">
            Read More
          </Link>
          {user._id === data.user && (
            <Button loading={isPending} onClick={() => mutate(data._id)}>
              delete
            </Button>
          )}
        </div>
      </div>
    </>
  );
};

export default Postcard;
