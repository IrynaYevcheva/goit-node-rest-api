import User from "../models/user.js";
import jwt from "jsonwebtoken";
import HttpError from "../helpers/HttpError.js";

const tokenValidation = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    throw HttpError(401, "Not authorized");
  }
  const [bearer, token] = authHeader.split(" ", 2);
  if (bearer !== "Bearer") {
    throw HttpError(401, "Not authorized");
  }
  try {
    const decoded = jwt.verify(token, process.env.SECRET);
    const user = await User.findById(decoded.id);
    if (!user) {
      throw HttpError(401, "Not authorized");
    }
    if (user.token !== token) {
      throw HttpError(401, "Not authorized");
    }
    req.user = user;
    next();
  } catch (error) {
    next(error);
  }
};

export default tokenValidation;
