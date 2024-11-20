import React from "react";
import BackButton from "../uicomponents/BackButton";
import { Avatar, Button, Spin, FloatButton } from "antd";
import { FaTrash } from "react-icons/fa";
import useFetchAllNotification from "../services/notificationApi/getNotification";
import useDeleteNotification from "../services/notificationApi/deleteNotification";

const NotificationPage = () => {
  const { data, isLoading } = useFetchAllNotification();
  const { mutate, isPending } = useDeleteNotification();
  const notify = data?.data;

  return (
    <div className="container">
      <BackButton />
      {isLoading ? (
        <div className=" h-[70vh] flex flex-col gap-4 justify-center items-center">
          <Spin size="large" />
          <p className="text-blue text-2xl">Loading...</p>
        </div>
      ) : (
        ""
      )}
      {!isLoading && notify?.length > 0 && (
        <div className="flex justify-center gap-2 mb-2">
          <h1 className="text-2xl font-semibold">Notifications</h1>
          <Button
            loading={isPending}
            onClick={() => mutate()}
            danger
            icon={<FaTrash />}
          >
            Delete All
          </Button>
        </div>
      )}
      {!isLoading && notify?.length > 0 ? (
        notify?.map((notification, i) => {
          return (
            <div
              className="border-2 mb-1 max-w-[450px] mx-auto p-2 rounded-lg"
              key={i}
            >
              <div className="flex justify-between">
                <h1 className="font-bold">Notification</h1>
              </div>
              <p>
                {notification?.from?.name}{" "}
                {notification?.type === "like" ? "liked" : "commented"} your
                blog.
              </p>
            </div>
          );
        })
      ) : (
        <div className=" h-[70vh] flex flex-col gap-4 justify-center items-center">
          <p className="text-blue text-2xl">No Notification</p>
        </div>
      )}
    </div>
  );
};

export default NotificationPage;
