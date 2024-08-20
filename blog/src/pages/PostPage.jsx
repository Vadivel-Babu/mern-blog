import React from "react";
import SinglePost from "../components/SinglePost";
import BackButton from "../uicomponents/BackButton";

const PostPage = () => {
  return (
    <div className="container">
      <BackButton />
      <SinglePost />
    </div>
  );
};

export default PostPage;
