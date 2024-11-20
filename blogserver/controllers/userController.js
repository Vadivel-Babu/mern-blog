import { User } from "../modals/userModal.js";
import { Notification } from "../modals/notificationModal.js";
import bcrypt from "bcrypt";
import cloudinary from "cloudinary";

async function getProfile(req, res) {
  try {
    const { id } = req.params;
    console.log(id);

    const user = await User.findOne({ _id: id });
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }
    console.log(user);

    res.status(200).json(user);
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ message: "Internal Server Error" });
  }
}

async function handleFollow(req, res) {
  try {
    const { id } = req.params;
    const userToModify = await User.findById({ _id: id });
    const currentUser = await User.findById({ _id: req.user._id });

    if (id === req.user._id) {
      return res
        .status(400)
        .json({ message: "Can't follow or unfollow this user" });
    }

    if (!userToModify || !currentUser) {
      return res.status(400).json({ message: "User not found" });
    }

    const isFollowing = currentUser.following.includes(id);

    if (isFollowing) {
      await User.findByIdAndUpdate(
        { _id: id },
        { $pull: { followers: req.user._id } }
      );
      await User.findByIdAndUpdate(
        { _id: req.user._id },
        { $pull: { following: id } }
      );
    } else {
      await User.findByIdAndUpdate(
        { _id: id },
        { $push: { followers: req.user._id } }
      );
      await User.findByIdAndUpdate(
        { _id: req.user._id },
        { $push: { following: id } }
      );
      //notify the user

      const newNoification = new Notification({
        type: "follow",
        from: req.user._id,
        to: userToModify._id,
      });
      await newNoification.save();
    }

    res.status(200).json(user);
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ message: "Internal Server Error" });
  }
}

async function updateUser(req, res) {
  try {
    const userId = req.user._id;
    let { name, email, currentPassword, newPassword, bio, link } = req.body;
    let { profileImg, coverImg } = req.body;
    let user = await User.findById({ _id: userId });
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }
    if (
      (!newPassword && currentPassword) ||
      (!currentPassword && newPassword)
    ) {
      return res
        .status(400)
        .json({ message: "Please provide both new and old password" });
    }
    if (currentPassword && newPassword) {
      const isMatch = await bcrypt.compare(currentPassword, user.password);
      if (!isMatch) {
        return res
          .status(400)
          .json({ message: "Current password is inCorrect" });
      }
      if (newPassword.trim().length < 4) {
        return res
          .status(400)
          .json({ message: "Password must have atleat 4 character" });
      }
      const hashpassword = await bcrypt.hash(newPassword, 10);
      user.password = hashpassword;
    }
    if (profileImg) {
      if (user.profileImg) {
        await cloudinary.uploader.destroy(
          user.profileImg.split("/").pop().split(".")[0]
        );
      }
      const upload = await cloudinary.uploader.upload(profileImg);
      profileImg = upload.secure_url;
    }
    if (coverImg) {
      if (user.coverImg) {
        await cloudinary.uploader.destroy(
          user.coverImg.split("/").pop().split(".")[0]
        );
      }
      const upload = await cloudinary.uploader.upload(coverImg);
      coverImg = upload.secure_url;
    }

    user.email = email || user.email;
    user.bio = bio;
    user.link = link;
    user.name = name || user.name;
    user.profileImg = profileImg || user.profileImg;
    user.coverImg = coverImg || user.coverImg;

    await user.save();

    return res.status(200).json({ message: "User Updated" });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ message: "Internal Server Error" });
  }
}

export default { getProfile, handleFollow, updateUser };
