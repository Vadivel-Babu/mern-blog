import React from "react";
import BackButton from "../uicomponents/BackButton";
import EditPost from "../components/EditPost";

const EditPostPage = () => {
  return (
    <div className="container">
      <BackButton />
      <EditPost />
    </div>
  );
};

export default EditPostPage;
