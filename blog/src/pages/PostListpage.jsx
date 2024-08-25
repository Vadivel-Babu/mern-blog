import React from "react";
import Postcard from "../components/Postcard";
import PostListLoading from "../components/PostListLoading";
import useFetchAllPosts from "../services/postApi/getAllPosts";
import { toast } from "react-toastify";

const PostListpage = () => {
  const { data, isLoading, isError, error } = useFetchAllPosts();

  if (isError) {
    toast.error(JSON.stringify(error));
  }

  return (
    <div className="container">
      {isLoading ? (
        <PostListLoading />
      ) : (
        data?.data?.data?.map((data) => <Postcard key={data._id} data={data} />)
      )}
    </div>
  );
};

export default PostListpage;
