import { User } from "../modals/userModal.js";
import bcrypt from "bcrypt";
import getToken from "../utils/generateToken.js";

async function signUp(req, res) {
  try {
    const { name, email, password } = req.body;
    const isValidmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!isValidmail.test(email)) {
      return res.status(400).json({ message: "Invalid Email Format" });
    }
    const user = await User.findOne({ email });
    const userName = await User.findOne({ name });
    if (password.trim().length < 4) {
      return res
        .status(400)
        .json({ message: "Password must have atleat 4 character" });
    }
    if (!user && !userName) {
      const hashpassword = await bcrypt.hash(password, 10);
      const newUser = new User({ name, email, password: hashpassword });
      await newUser.save();
      const token = getToken(newUser._id);
      return (
        res
          // .cookie("token", token, {
          //   maxAge: 15 * 24 * 60 * 1000,
          //   httpOnly: true,
          //   sameSite: "strict",
          //   secure: process.env.NODE_ENV !== "development",
          // })
          .status(201)
          .json({
            message: "sigin succesfully",
            token,
          })
      );
    }
    return res.json({
      message: "user name or email already exsist",
    });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ message: "Internal Server Error" });
  }
}

async function login(req, res) {
  try {
    const { email, password } = req.body;
    if (!email.length || !password.length) {
      return res
        .status(400)
        .json({ message: "Email or password cannot be empty" });
    }
    const user = await User.findOne({ email });
    if (!user) {
      console.log("error");

      return res.status(404).json({ message: "User not exisist" });
    }
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({ message: "Incorrect Password" });
    }
    const token = getToken(user._id);
    res
      // .cookie("token", token, {
      //   maxAge: 15 * 24 * 60 * 1000,
      //   httpOnly: true,
      //   sameSite: "strict",
      //   secure: process.env.NODE_ENV !== "development",
      // })
      .status(201)
      .json({
        message: "login successsfully",
        token,
      });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ message: "Internal Server Error" });
  }
}

async function me(req, res) {
  try {
    const user = await User.findOne({ _id: req.user._id }).select("-password");

    res.status(200).json(user);
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ message: "Internal Server Error" });
  }
}

async function logout(req, res) {
  try {
    res.cookie("token", "", {
      maxAge: 0,
      httpOnly: true,
      sameSite: "strict",
      secure: process.env.NODE_ENV !== "development",
    });
    res.json({ message: "logged out" });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ message: "Internal Server Error" });
  }
}

export default { signUp, login, logout, me };
