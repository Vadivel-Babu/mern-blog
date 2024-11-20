import jwt from "jsonwebtoken";

function getToken(id) {
  return jwt.sign({ id }, process.env.JWT_KEY, {
    expiresIn: "30d",
  });
}

export default getToken;
