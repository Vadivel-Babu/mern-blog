import jwt from "jsonwebtoken";
import { User } from "../modals/userModal.js";

const auth = async (req, res, next) => {
  let token = req.headers.authorization?.split(" ")[1];
  console.log(req.headers.authorization);

  if (token) {
    try {
      //token = req.headers.authorization.split(" ")[1];

      const decode = jwt.verify(token, process.env.JWT_KEY);

      const user = await User.findById(decode.id).select("-password");
      if (!user) {
        return res.status(400).json({ message: "User not found" });
      }
      req.user = user;
      next();
    } catch (error) {
      res.status(401).json({ message: "Not authorized" });
    }
  }
  if (!token) {
    return res.status(401).json({ message: "No token" });
  }
};

export default auth;
