import React, { useEffect, useState } from "react";
import BackButton from "../uicomponents/BackButton";
import { Avatar, Badge, Button, Modal, Spin } from "antd";
import EditProfile from "../components/EditProfile";
import useFetchProfile from "../services/userApi/getProfile";
import { useNavigate, useParams } from "react-router-dom";
import { FaUser } from "react-icons/fa";

const Profilepage = () => {
  const { id } = useParams();

  const { data, isLoading } = useFetchProfile(id);
  const navigate = useNavigate();
  console.log(data);

  return (
    <div className="container">
      <BackButton />
      {isLoading ? (
        <div className="flex items-center justify-center min-h-[50vh]">
          <div className="flex flex-col items-center justify-center gap-3">
            <Spin size="large" />
            <p className="font-bold text-3xl">Loading...</p>
          </div>
        </div>
      ) : (
        <>
          <div className="border rounded-lg w-[300px] mx-auto my-2">
            <div className="bg-blue w-full flex p-3 justify-center">
              <Avatar
                style={{ backgroundColor: "#ece0ff", color: "#865ad1" }}
                size={60}
                src={data?.data?.profileImg}
                icon={<FaUser />}
                alt="user"
              />
            </div>
            <div className="flex flex-col items-center gap-2 p-2">
              <h1 className="capitalize font-semibold text-xl">
                {data?.data?.name}
              </h1>
              <h2 className="font-semibold text-lg">{data?.data?.email}</h2>
              {/* <p className="font-medium text-lg">
                Followers:{" "}
                <Badge count={false ? 110 : 100} showZero color="volcano" />
              </p>
              <p className="font-medium text-lg">
                Following:{" "}
                <Badge count={false ? 110 : 100} showZero color="purple" />
              </p> */}
              <p className="font-medium text-lg">
                Liked Posts:{" "}
                <Badge
                  count={
                    data?.data?.likedPosts.length
                      ? data?.data?.likedPosts.length
                      : 0
                  }
                  showZero
                  color="geekblue"
                />
              </p>
              {data?.data?.link && (
                <a
                  target="_blank"
                  href={data?.data?.link}
                  className="underline text-white font-semibold bg-darkblue px-2 py-1 rounded-lg"
                >
                  social link &rarr;
                </a>
              )}
              <p className="mt-2 text-center">{data?.data?.bio}</p>
              <button
                onClick={() => navigate(`/edit-profile/${data?.data?._id}`)}
                className="bg-blue text-white py-1 px-3 rounded-lg text-lg"
              >
                Edit
              </button>
            </div>
          </div>
          {/* <Modal
            title="Edit Profile"
            open={isModalOpen}
            onCancel={() => setIsModalOpen(false)}
            footer={
              <Button loading={isPending} onClick={() => mutate(user)}>
                Update
              </Button>
            }
          >
            <EditProfile user={user} inputHandler={setUser} />
          </Modal> */}
        </>
      )}
    </div>
  );
};

export default Profilepage;
