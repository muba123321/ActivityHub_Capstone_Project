import Activity from "../models/activity.model.js";
import User from "../models/user.model.js";

class ActivityControllers {
  async createActivity(req, res, next) {
    try {
      const {
        title,
        description,
        type,
        link,
        address,
        visibility,
        time,
        date,
        imageUrls,
      } = req.body;

      const user = await User.findOne({ uid: req.user.uid });
      // This check to ensure link or address in provided depending on the the type selected.
      if (type === "online" && !link) {
        return res.status(400).json({
          succes: false,
          message: "Link is required for online activities",
        });
      }

      if (type === "physical" && !address) {
        return res.status(400).json({
          succes: false,
          message: "Address is required for physical activities",
        });
      }

      const activity = new Activity({
        title,
        description,
        type,
        link: type === "online" ? link : "Activity is not Remote",
        address: type === "physical" ? address : "Activity is Online",
        visibility,
        time,
        date,
        imageUrls,
        createdBy: user._id,
      });
      await activity.save();

      res.status(201).json({
        success: true,
        message: "Activity created successfully",
        activity,
      });
    } catch (err) {
      next(err);
    }
  }

  async updateActivity(req, res, next) {
    try {
      const {
        title,
        description,
        type,
        link,
        address,
        visibility,
        time,
        date,
        imageUrls,
      } = req.body;
      const activityId = req.params.id;
      const activity = await Activity.findById(activityId);
      if (!activity) {
        return res.status(404).json({
          succes: false,
          message: "Activity not found",
        });
      }
      if (activity.createdBy.toString() !== req.user.uid) {
        return res.status(403).json({
          succes: false,
          message: "You are not authorized to update this activity",
        });
      }
      activity.title = title || activity.title;
      activity.description = description || activity.description;
      activity.type = type || activity.type;
      activity.link = type === "online" ? link : undefined;
      activity.address = type === "physical" ? address : undefined;
      activity.visibility = visibility || activity.visibility;
      activity.time = time || activity.time;
      activity.date = date || activity.date;
      activity.imageUrls = imageUrls || activity.imageUrls;
      await activity.save();

      res.status(200).json({
        succes: true,
        message: "Activity updated successfully",
        activity,
      });
    } catch (err) {
      next(err);
    }
  }

  async getActivities(req, res, next) {
    try {
      const activities = await Activity.find()
        .populate("createdBy", "name email")
        .populate("participants", "name email")
        .populate("invitedUsers", "name email");
      res.status(200).json({
        succes: true,
        activities,
      });
    } catch (err) {
      next(err);
    }
  }

  async getActivtiesByid(req, res, next) {
    try {
      const id = req.params.id;
      const activity = await Activity.findById(id)
        .populate("createdBy", "name email")
        .populate("participants", "name email")
        .populate("invitedUsers", "name email");
      if (!activity) {
        return res.status(404).json({
          succes: false,
          message: "Activity not found",
        });
      }
      res.status(200).json({
        succes: true,
        activity,
      });
    } catch (err) {
      next(err);
    }
  }

  async deleteActivity(req, res, next) {
    try {
      const activity = await Activity.findById(req.params.id);
      if (!activity) {
        return res
          .status(404)
          .json({ success: false, message: "Activity not found" });
      }

      // Check if the user is the creator
      if (activity.createdBy.toString() !== req.user.uid) {
        return res.status(403).json({
          success: false,
          message: "Unauthorized to delete this activity",
        });
      }

      await Activity.findByIdAndDelete(req.params.id);

      res.status(200).json({
        success: true,
        message: "Activity deleted successfully",
      });
    } catch (err) {
      next(err);
    }
  }
  // Add a comment to an activity
  async addCommentToActivity(req, res, next) {
    try {
      const { text } = req.body;
      const activity = await Activity.findById(req.params.id);

      if (!activity) {
        return res
          .status(404)
          .json({ success: false, message: "Activity not found" });
      }

      const newComment = {
        user: req.user.uid,
        name: req.user.name,
        text,
      };

      activity.comments.push(newComment);
      await activity.save();

      res.status(201).json({
        success: true,
        message: "Comment added successfully",
        activity,
      });
    } catch (err) {
      next(err);
    }
  }

  // Add a rating to an activity
  async addRatingToActivity(req, res, next) {
    try {
      const { score } = req.body;
      const activity = await Activity.findById(req.params.id);

      if (!activity) {
        return res
          .status(404)
          .json({ success: false, message: "Activity not found" });
      }

      // Check if the user has already rated this activity
      const existingRating = activity.ratings.find(
        (rating) => rating.user.toString() === req.user.uid
      );

      if (existingRating) {
        return res.status(400).json({
          success: false,
          message: "You have already rated this activity",
        });
      }

      const newRating = {
        user: req.user.uid,
        name: req.user.name,
        score,
      };

      activity.ratings.push(newRating);
      await activity.save();

      res.status(201).json({
        success: true,
        message: "Rating added successfully",
        activity,
      });
    } catch (err) {
      next(err);
    }
  }

  // Join an activity
  async joinActivity(req, res, next) {
    try {
      const activity = await Activity.findById(req.params.id);
      if (!activity) {
        return res
          .status(404)
          .json({ success: false, message: "Activity not found" });
      }

      // Check if the activity is private
      if (activity.visibility === "private") {
        if (!activity.invitedUsers.includes(req.user.uid)) {
          return res.status(403).json({
            success: false,
            message: "You are not invited to this private activity",
          });
        }
      }

      // Check if the user is already a participant
      if (activity.participants.includes(req.user.uid)) {
        return res.status(400).json({
          success: false,
          message: "You have already joined this activity",
        });
      }

      // Add user to participants
      activity.participants.push(req.user.uid);
      await activity.save();

      res.status(200).json({
        success: true,
        message: "Successfully joined the activity",
        activity,
      });
    } catch (err) {
      next(err);
    }
  }

  // Invite a user to a private activity
  async inviteUserToActivity(req, res, next) {
    try {
      const { userId } = req.body;
      const activity = await Activity.findById(req.params.id);
      if (!activity) {
        return res
          .status(404)
          .json({ success: false, message: "Activity not found" });
      }

      // Only the creator can invite users
      if (activity.createdBy.toString() !== req.user.uid) {
        return res.status(403).json({
          success: false,
          message: "Unauthorized to invite users to this activity",
        });
      }

      // Only for private activities
      if (activity.visibility !== "private") {
        return res.status(400).json({
          success: false,
          message: "Can only invite users to private activities",
        });
      }

      // Check if user is already invited or a participant
      if (
        activity.invitedUsers.includes(userId) ||
        activity.participants.includes(userId)
      ) {
        return res.status(400).json({
          success: false,
          message: "User is already invited or is a participant",
        });
      }

      // Add user to invitedUsers
      activity.invitedUsers.push(userId);
      await activity.save();

      res.status(200).json({
        success: true,
        message: "User invited successfully",
        activity,
      });
    } catch (err) {
      next(err);
    }
  }
}

export default new ActivityControllers();
