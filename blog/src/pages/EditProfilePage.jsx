import React, { useState, useEffect } from "react";
import BackButton from "../uicomponents/BackButton";
import useFetchProfile from "../services/userApi/getProfile";
import useUpdateProfile from "../services/userApi/updateProfile";
import { useParams, useNavigate } from "react-router-dom";
import EditProfile from "../components/EditProfile";
import { Button } from "antd";

const EditProfilePage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data, isLoading } = useFetchProfile(id);
  const { mutate, isPending } = useUpdateProfile();
  const [user, setUser] = useState({
    name: "",
    email: "",
    link: "",
    bio: "",
    profileImg: null,
  });

  useEffect(() => {
    setUser({
      name: data?.data?.name,
      email: data?.data?.email,
      bio: data?.data?.bio,
      link: data?.data?.link,
      profileImg: data?.data?.profileImg,
    });
  }, [isLoading, data]);
  return (
    <div className="container">
      <BackButton />
      <div className="max-w-[320px] border p-2 space-y-2 mt-2 mx-auto">
        <h1 className="font-bold text-xl">Edit Profile</h1>
        <EditProfile user={user} inputHandler={setUser} />
        <Button type="primary" onClick={() => mutate(user)} loading={isPending}>
          Update
        </Button>
        <Button
          type="primary"
          danger
          onClick={() => navigate(-1)}
          className="ml-2"
        >
          Cancel
        </Button>
      </div>
    </div>
  );
};

export default EditProfilePage;
