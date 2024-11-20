import React, { useState } from "react";
import Postcard from "../components/Postcard";
import useFetchAllPosts from "../services/postApi/getAllPosts";
import { toast } from "react-toastify";
import { Pagination, Spin } from "antd";

const PostListpage = () => {
  const { data, isLoading, isError, error } = useFetchAllPosts();
  const [current, setCurrent] = useState(3);

  if (isError) {
    toast.error(JSON.stringify(error.message));
  }

  return (
    <div className="container">
      {isLoading ? (
        <div className=" h-[70vh] flex flex-col gap-4 justify-center items-center">
          <Spin size="large" />
          <p className="text-blue text-2xl">Loading...</p>
        </div>
      ) : (
        <div className="flex gap-2 flex-wrap justify-center items-center mx-auto">
          {data?.data?.data?.slice(0).map((data) => (
            <Postcard key={data?._id} data={data} />
          ))}
        </div>
      )}
      {!isLoading && data?.data?.data?.length > 10 && (
        <Pagination
          current={current}
          onChange={(page) => {
            setCurrent(page);
          }}
          total={50}
          className="mt-5"
        />
      )}
    </div>
  );
};

export default PostListpage;
