import React from "react";
import { Button } from "antd";
import { IoArrowBack } from "react-icons/io5";
import { useNavigate } from "react-router-dom";

const BackButton = () => {
  const navigate = useNavigate();
  return (
    <Button
      style={{ backgroundColor: "black" }}
      type="primary"
      shape="round"
      icon={<IoArrowBack />}
      onClick={() => navigate(-1)}
    />
  );
};

export default BackButton;
