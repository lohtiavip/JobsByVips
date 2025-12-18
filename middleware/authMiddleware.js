import {
  UnauthenticatedError,
  UnauthorizedError,
  BadRequestError,
} from "../errors/customErrors.js";
import { verifyJWT } from "../utils/tokenUtils.js";

export const authenticateUser = async (req, res, next) => {
  console.log("my cookies", req.cookies);
  const { token } = req.cookies;
  if (!token) throw new UnauthenticatedError("Authentication Invalid");

  try {
    const { userId, role } = await verifyJWT(token);
    req.user = { userId, role };
    console.log("userId, role", userId, role);
    const testUser = userId === "693b264992b3f66aef8bb3f4";
    req.user = { userId, role, testUser };

    next();
  } catch (e) {
    throw new UnauthenticatedError("Authentication Invalid");
  }
};

export const authorizePermissions = (...roles) => {
  return (req, res, next) => {
    console.log("req.user.role", req.user.role);
    if (!roles.includes(req.user.role)) {
      throw new UnauthorizedError("Unauthorized to access");
    }
    next();
  };
};

export const checkForTestUser = (req, res, next) => {
  if (req.user.testUser) {
    throw new BadRequestError("Demo User. Read Only!");
  }
  next();
};
