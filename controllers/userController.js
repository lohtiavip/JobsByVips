import { StatusCodes } from "http-status-codes";
import User from "../models/UserModel.js";
import Job from "../models/JobModel.js";
import cloudinary from "cloudinary";
import { promises as fs } from "fs";

export const getCurrentUser = async (req, res) => {
  const user = await User.findOne({ _id: req.user.userId });
  const safeUser = user.toJSON();
  res.status(StatusCodes.OK).json({ msg: "success", data: safeUser });
};

export const getApplicationStats = async (req, res) => {
  const users = await User.countDocuments();
  const jobs = await Job.countDocuments();

  res.status(StatusCodes.OK).json({ msg: "success", data: { users, jobs } });
};

export const updateUser = async (req, res) => {
  const obj = { ...req.body };
  console.log("obj", req.file);
  if (req.file) {
    const response = await cloudinary.v2.uploader.upload(req.file.path);
    await fs.unlink(req.file.path);
    obj.avatar = response.secure_url;
    obj.avatarPublicId = response.public_id;
  }

  delete obj.password;
  delete obj.role;
  const user = await User.findByIdAndUpdate(req.user.userId, obj);
  if (req.file && user.avatarPublicId) {
    await cloudinary.v2.uploader.destroy(user.avatarPublicId);
  }
  res.status(StatusCodes.OK).json({ msg: "user update successfully" });
};
