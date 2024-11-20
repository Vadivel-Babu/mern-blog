import React from "react";
import { Avatar, Button } from "antd";
import { FaTrash } from "react-icons/fa";
import { FaUser } from "react-icons/fa";
import useDeleteComment from "../services/commentsApi/deleteComment";

const Comment = ({ comment, user, id }) => {
  const { mutate, isPending } = useDeleteComment();

  return (
    <div className="border mt-1 mx-auto">
      <div className="p-2">
        <div className="flex gap-1 justify-between">
          <div className="flex gap-1">
            <Avatar
              src={comment?.user?.profileImg}
              alt="user"
              icon={<FaUser />}
            />
            <h1 className="font-bold tracking-wide text-lg capitalize">
              {comment?.user?.name}
            </h1>
          </div>
          <div className="flex gap-1">
            {comment?.user?._id === user?._id && (
              <Button
                loading={isPending}
                className="text-primary"
                danger
                icon={<FaTrash />}
                onClick={() => mutate({ postId: id, ...comment })}
              />
            )}

            {/* <Button
              loading={false}
              className="text-primary"
              icon={<MdEdit />}
            /> */}
          </div>
        </div>
        <p className="mt-1">{comment?.text}</p>
      </div>
    </div>
  );
};

export default Comment;
