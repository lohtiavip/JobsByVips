import { body, param, validationResult } from "express-validator";
import {
  BadRequestError,
  NotFoundError,
  UnauthorizedError,
} from "../errors/customErrors.js";
import { JOB_STATUS, JOB_TYPE } from "../utils/constants.js";
import mongoose from "mongoose";
import Job from "../models/JobModel.js";
import User from "../models/UserModel.js";

const validationMiddleware = (validateValues) => {
  return [
    validateValues,
    (req, res, next) => {
      const error = validationResult(req);
      console.log("error", error);
      if (!error.isEmpty()) {
        const errorMsg = error.array().map((i) => i.msg);
        if (errorMsg[0].startsWith("No job")) {
          throw new NotFoundError(errorMsg);
        }
        if (errorMsg[0].startsWith("unauthorized access denied")) {
          throw new UnauthorizedError(errorMsg);
        }

        throw new BadRequestError(errorMsg);
      }
      next();
    },
  ];
};

//----------------------- JOB VALIDATION --------------------------//
export const validateJobInput = validationMiddleware([
  body("company").trim().notEmpty().withMessage("company is required"),
  body("position").trim().notEmpty().withMessage("position is required"),
  body("jobLocation").trim().notEmpty().withMessage("location is required"),
  body("jobStatus")
    .isIn(Object.values(JOB_STATUS))
    .withMessage("invalid status value"),
  body("jobType")
    .isIn(Object.values(JOB_TYPE))
    .withMessage("invalid type value"),
]);

export const validateParamId = validationMiddleware(
  param("id").custom(async (value, { req }) => {
    const isValid = mongoose.Types.ObjectId.isValid(value);
    if (!isValid) throw new Error("Invalid mongodb id");
    const job = await Job.findById(value);
    if (!job) throw new NotFoundError(`No job with id ${value}`);
    console.log("req", req.user);
    const isAdmin = req.user.role === "admin";
    const isOwner = req.user.userId === job.createdBy.toString();
    if (!isAdmin && !isOwner) {
      console.log("isAdmin", isAdmin);
      console.log("isOwner"), isOwner;
      throw new UnauthorizedError("unauthorized access denied");
    }
  })
);

//----------------------- USER VALIDATION --------------------------//

export const validateRegisterInput = validationMiddleware([
  body("name").trim().notEmpty().withMessage("name is required"),
  body("lastName").trim().notEmpty().withMessage("last name is required"),
  body("email")
    .trim()
    .notEmpty()
    .withMessage("email is required")
    .isEmail()
    .withMessage("Invalid email format")
    .custom(async (email) => {
      const user = await User.findOne({ email: email.toLowerCase() });
      if (user) {
        throw new BadRequestError("email already exits");
      }
    }),
  body("password")
    .trim()
    .notEmpty()
    .withMessage("password is required")
    .isLength({ min: 8 })
    .withMessage("password must be at least 8 characters long"),
  body("location").trim().notEmpty().withMessage("location is required"),
]);

export const validateLoginInput = validationMiddleware([
  body("email")
    .trim()
    .notEmpty()
    .withMessage("email is required")
    .isEmail()
    .withMessage("Invalid email format"),
  body("password").trim().notEmpty().withMessage("password is required"),
]);

export const validateUpdateUserInput = validationMiddleware([
  body("name").trim().notEmpty().withMessage("name is required"),
  body("lastName").trim().notEmpty().withMessage("last name is required"),
  // body("email")
  //   .trim()
  //   .custom(async (email, { req }) => {
  //     if (email) {
  //       const user = await User.findOne({ email: email.toLowerCase() });
  //       console.log("req.user.userId"), req.user.userId;
  //       if (user && user._id.toString() !== req.user.userId) {
  //         throw new BadRequestError("email already exits");
  //       }
  //     }
  //   }),

  body("location").trim().notEmpty().withMessage("location is required"),
]);
