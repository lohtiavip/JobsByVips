import { StatusCodes } from "http-status-codes";
import User from "../models/UserModel.js";
import { hashedPassword, confirmPassword } from "../utils/passwordUtils.js";
import { UnauthenticatedError } from "../errors/customErrors.js";
import { createJWT } from "../utils/tokenUtils.js";

export const register = async (req, res) => {
  const isFirstAccount = (await User.countDocuments()) === 0;
  req.body.role = isFirstAccount ? "admin" : "user";
  const password = await hashedPassword(req.body.password);
  req.body.password = password;
  req.body.email = req.body.email.toLowerCase();
  const user = await User.create(req.body);
  res.status(StatusCodes.CREATED).json({ msg: "user created successfully" });
};

export const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email: email.toLowerCase() });
  if (!user) throw new UnauthenticatedError("Invalid email");
  const isPasswordCorrect = await confirmPassword(password, user.password);
  if (!isPasswordCorrect) throw new UnauthenticatedError("password correct");
  const token = await createJWT({ userId: user.id, role: user.role });

  const oneDay = 1000 * 60 * 60 * 24;
  res.cookie("token", token, {
    httpOnly: true,
    expires: new Date(Date.now() + oneDay),
    secure: process.env.NODE_ENV === "production",
  });
  res.status(StatusCodes.OK).json({ msg: "WOW.... YOU ARE LOGGED IN (^_^)" });
};

export const logout = async (req, res) => {
  res.cookie("token", "logout", {
    httpOnly: true,
    expires: new Date(Date.now()),
  });

  res.status(StatusCodes.OK).json({ msg: "user logged out!" });
};
