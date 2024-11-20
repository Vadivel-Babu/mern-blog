import React, { useState } from "react";
import { Button, Modal, Input } from "antd";
import useCreateComment from "../services/commentsApi/createComment";

const CommentModal = ({ open, handleCancel, postId }) => {
  const [text, setText] = useState("");
  const { mutate, isPending, isSuccess } = useCreateComment();

  if (isSuccess) {
    handleCancel();
  }
  return (
    <Modal
      title="Comment"
      footer={
        <Button
          onClick={() => mutate({ postId, text })}
          type="primary"
          loading={isPending}
        >
          submit
        </Button>
      }
      open={open}
      onCancel={handleCancel}
    >
      <Input
        placeholder="Add comment..."
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
    </Modal>
  );
};

export default CommentModal;
