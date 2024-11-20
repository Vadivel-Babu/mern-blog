import { Input, Button } from "antd";
import React, { useRef, useState } from "react";
import { FaUser, FaLink } from "react-icons/fa";
import { MdEmail } from "react-icons/md";

const EditProfile = ({ user, inputHandler }) => {
  //const [img, setImg] = useState(null);
  const fileInput = useRef();
  return (
    <div>
      <form action="" className="space-y-1">
        {user?.profileImg ? (
          <div>
            <img
              src={user?.profileImg}
              alt="post image"
              className="w-[100px] object-contain"
            />
            <Button
              className="mt-1"
              onClick={() => inputHandler({ ...user, profileImg: null })}
              danger
            >
              Delete Image
            </Button>
          </div>
        ) : (
          <input
            ref={fileInput}
            accept=".png,.jpg,.jpeg"
            type="file"
            name="img"
            id="image"
            placeholder="profile image"
            onChange={(e) => {
              const file = e.target.files[0];
              if (file) {
                const reader = new FileReader();
                reader.onload = () => {
                  inputHandler({ ...user, profileImg: reader.result });
                };
                reader.readAsDataURL(file);
              }
            }}
          />
        )}
        <Input
          prefix={<FaUser />}
          name="name"
          onChange={(e) =>
            inputHandler({ ...user, [e.target.name]: e.target.value })
          }
          placeholder="Enter Name"
          value={user.name}
        />
        <Input
          prefix={<MdEmail />}
          name="email"
          placeholder="Enter mail"
          value={user.email}
          onChange={(e) =>
            inputHandler({ ...user, [e.target.name]: e.target.value })
          }
        />
        <Input
          prefix={<FaLink />}
          name="link"
          placeholder="Enter social link"
          value={user.link}
          onChange={(e) =>
            inputHandler({ ...user, [e.target.name]: e.target.value })
          }
        />
        <Input.TextArea
          value={user.bio}
          onChange={(e) =>
            inputHandler({ ...user, [e.target.name]: e.target.value })
          }
          placeholder="Enter bio"
          name="bio"
          autoSize={{ minRows: 3, maxRows: 5 }}
        />
      </form>
    </div>
  );
};

export default EditProfile;
