import React from "react";
import SinglePost from "../components/SinglePost";
import BackButton from "../uicomponents/BackButton";
import Comment from "../components/Comment";
import getPost from "../services/postApi/getPost";
import useFetchMe from "../services/userApi/getUser";

import { useParams } from "react-router-dom";
import { Badge } from "antd";
const PostPage = () => {
  const { id } = useParams();

  const { data, isLoading } = getPost(id);
  const { data: me, isLoading: meLoading, onError } = useFetchMe();

  const comments = data?.data?.data?.comments;

  return (
    <div className="container">
      <BackButton />
      <SinglePost data={data} isLoading={isLoading} me={me} id={id} />
      <div className="mt-5 mx-auto  max-w-[650px]">
        <h1 className="font-bold text-lg md:text-xl">
          {!isLoading && "Comments: "}
          {!isLoading && (
            <Badge
              count={comments !== undefined ? comments.length : 0}
              showZero
            />
          )}
        </h1>
        {comments?.length
          ? comments?.map((comment, i) => (
              <Comment id={id} comment={comment} user={me?.data} key={i} />
            ))
          : !isLoading && (
              <h1 className="text-xl font-semibold text-center mt-5">
                No comments Found
              </h1>
            )}
      </div>
    </div>
  );
};

export default PostPage;
