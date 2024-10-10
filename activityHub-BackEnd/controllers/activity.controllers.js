import Activity from "../models/activity.model";

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
        createdBy: req.user.uid,
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
}

export default new ActivityControllers();
