import { Router } from "express";
const router = Router();

import {
  getAllJobs,
  getJob,
  createJob,
  updateJob,
  deleteJob,
  showStats,
} from "../controllers/jobController.js";
import {
  validateJobInput,
  validateParamId,
} from "../middleware/validationMiddleware.js";
import { checkForTestUser } from "../middleware/authMiddleware.js";

router
  .route("/")
  .get(getAllJobs)
  .post(checkForTestUser, validateJobInput, createJob);
router.route("/stats").get(showStats);

router
  .route("/:id")
  .get(validateParamId, getJob)
  .patch(checkForTestUser, validateParamId, validateJobInput, updateJob)
  .delete(checkForTestUser, validateParamId, deleteJob);

export default router;
