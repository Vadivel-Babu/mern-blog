import React from "react";
import Postcard from "../components/Postcard";
import PostListLoading from "../components/PostListLoading";
import useFetchAllPosts from "../services/postApi/getAllPosts";

const PostListpage = () => {
  const { data, isLoading, isError, error } = useFetchAllPosts();
  console.log(data?.data.data);

  if (isError) {
    alert(error);
  }
  if (isLoading) {
    console.log("hi");
  }

  return (
    <div className="container">
      {isLoading ? <PostListLoading /> : <Postcard />}
    </div>
  );
};

export default PostListpage;
