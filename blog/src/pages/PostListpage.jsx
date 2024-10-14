import React, { useState } from "react";
import Postcard from "../components/Postcard";
import PostListLoading from "../components/PostListLoading";
import useFetchAllPosts from "../services/postApi/getAllPosts";
import { toast } from "react-toastify";
import { Pagination } from "antd";

const PostListpage = () => {
  const { data, isLoading, isError, error } = useFetchAllPosts();
  const [current, setCurrent] = useState(3);

  if (isError) {
    toast.error(JSON.stringify(error));
  }

  return (
    <div className="container">
      {isLoading ? (
        <PostListLoading />
      ) : (
        <div className="flex gap-2 items-center flex-wrap  mx-auto max-w-[1300px]">
          {data?.data?.data?.slice(0).map((data) => (
            <Postcard key={data?._id} data={data} />
          ))}
        </div>
      )}
      <Pagination
        current={current}
        onChange={(page) => {
          setCurrent(page);
        }}
        total={50}
        className="mt-5"
      />
    </div>
  );
};

export default PostListpage;
