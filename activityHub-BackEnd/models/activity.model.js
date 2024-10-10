import mongoose from "mongoose";

const { Schema } = mongoose;

const commentSchema = new mongoose.Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  text: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const ratingSchema = new mongoose.Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  score: {
    type: Number,
    required: true,
    min: 1,
    max: 5,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});
const activitySchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    type: {
      type: String,
      enum: ["online", "physical"],
      required: true,
    },
    link: {
      type: String,
      trim: true,
      validate: {
        validator: function (v) {
          if (this.type === "online") {
            return v && v.length > 0;
          }
          return true;
        },
        message: "For online activities, a link is required",
      },
    },

    address: {
      type: String,
      trim: true,
      validate: {
        validator: function (v) {
          if (this.type === "physical") {
            return v && v.length > 0;
          }
          return true;
        },
        message: "For physical activities, an address is required",
      },
    },
    visibility: {
      type: String,
      enum: ["public", "private"],
      default: "public",
    },
    time: {
      type: String,
      required: true,
    },
    date: {
      type: Date,
      required: true,
    },
    imageUrls: {
      type: [String],
      default: ["https://picsum.photos/seed/picsum/200/300"],
    },
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    participants: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    invitedUsers: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    comments: [commentSchema],
    ratings: [ratingSchema],
  },

  { timestamps: true }
);

const Activity = mongoose.model("Listing", activitySchema);

export default Activity;
