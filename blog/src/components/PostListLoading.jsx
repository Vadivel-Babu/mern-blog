import React from "react";
import { Skeleton } from "antd";

const PostListLoading = () => {
  return (
    <div className=" flex flex-col gap-3 max-w-[700px] mx-auto">
      {[1, 2, 3, 4].map((i) => (
        <div key={i} className="flex gap-3 border p-2">
          <Skeleton.Image active={true} />
          <Skeleton active />
        </div>
      ))}
    </div>
  );
};

export default PostListLoading;
