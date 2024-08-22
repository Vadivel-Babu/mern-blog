import jwt from "jsonwebtoken";
import { User } from "../modals/userModal.js";
import bcrypt from "bcrypt";

async function signUp(req, res) {
  try {
    const { name, email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      const hashpassword = await bcrypt.hash(password, 10);
      const newUser = new User({ name, email, password: hashpassword });
      await newUser.save();
      const token = getToken(newUser._id);
      res.cookie("token", token);
      return res.status(201).json({
        message: "sigin succesfully",
        user: { newUser, token },
      });
    }
    return res.json({
      message: "user already exsist",
    });
  } catch (error) {
    return res.json({ message: error.message });
  }
}

async function login(req, res) {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not exisist" });
    }
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({ message: "Incorrect Password" });
    }
    const token = getToken(user._id);
    res.cookie("token", token);

    return res.json({
      message: "login successsfully",
      user: { user, token },
    });
  } catch (error) {
    console.log(error.message);
    return res.json({ message: error.message });
  }
}

async function getProfile(req, res) {
  const { token } = req.cookies;
  console.log(req.cookies);
  // if (cookie) {
  //   const decode = jwt.verify(cookie, process.env.JWT_KEY);
  //   const user = await User.findById(decode.id).select("-password");
  //   return res.json(user);
  // }
}

async function logout(req, res) {
  res.cookie("token", "");
  return res.json({ message: "logged out" });
}

function getToken(id) {
  return jwt.sign({ id }, process.env.JWT_KEY, {
    expiresIn: "30d",
  });
}
export default { signUp, login, logout, getProfile };
