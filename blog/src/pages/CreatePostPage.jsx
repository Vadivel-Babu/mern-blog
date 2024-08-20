import React from "react";
import BackButton from "../uicomponents/BackButton";
import CreatePost from "../components/CreatePost";

const CreatePostPage = () => {
  return (
    <div className="container">
      <BackButton />
      <CreatePost />
    </div>
  );
};

export default CreatePostPage;
