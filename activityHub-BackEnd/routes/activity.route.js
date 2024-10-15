import express from "express";
import ActivityControllers from "../controllers/activity.controllers";
import { verifyUserToken } from "../utils/verifyUserToken";

const router = express.Router();

// Protect all activity routes with the token verification middleware
router.use(verifyUserToken);

// Route to create a new activity
router.post("/", ActivityControllers.createActivity);

// Route to get all activities
router.get("/", ActivityControllers.getActivities);

// Route to get a specific activity by ID
router.get("/:id", ActivityControllers.getActivtiesByid);

// Route to update an activity
router.put("/:id", ActivityControllers.updateActivity);

// Route to delete an activity
router.delete("/:id", ActivityControllers.deleteActivity);

// Route to add a comment to an activity
router.post("/:id/comment", ActivityControllers.addCommentToActivity);

// Route to add a rating to an activity
router.post("/:id/rate", ActivityControllers.addRatingToActivity);

// Route to join an activity
router.post("/:id/join", ActivityControllers.joinActivity);

// Route to invite a user to an activity
router.post("/:id/invite", ActivityControllers.inviteUserToActivity);

export default router;
