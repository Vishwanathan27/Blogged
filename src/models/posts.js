const mongoose = require("mongoose");
const moment = require("moment");

const PostSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  content: {
    type: String,
    required: true,
  },
  slug: {
    // Useful for SEO friendly URLs
    type: String,
    trim: true,
    lowercase: true,
  },
  tags: [String], // Optional: for categorizing posts
  author: {
    type: mongoose.Schema.Types.ObjectId, // This references the User model
    ref: "User",
    required: true,
  },
  createdAt: {
    type: Number, // Using Number type for Unix timestamp
    default: () => moment().valueOf(), // Returns current time as Unix timestamp
  },
  updatedAt: {
    type: Number,
  },
  published: {
    // To decide if the post is visible to users or still in draft mode
    type: Boolean,
    default: false,
  },
  publishedAt: {
    // Timestamp of when the post was made public
    type: Number,
  },
});

// Pre-save hook to set updatedAt before saving the document
PostSchema.pre("save", function (next) {
  this.updatedAt = moment().valueOf();

  // If the post is being published now, set the publishedAt timestamp
  if (this.isModified("published") && this.published) {
    this.publishedAt = moment().valueOf();
  }

  // populate author:
  this.populate({
    path: "author",
    select: "_id firstName lastName",
  });

  next();
});

// always populate author before return
PostSchema.pre("find", function (next) {
  this.populate({
    path: "author",
    select: "_id firstName lastName",
  });
  next();
});

const Post = mongoose.model("Post", PostSchema);

module.exports = Post;
