const mongoose = require("mongoose");

const tagsSchema = new mongoose.Schema(
  {
    tags: {
      type: Array,
    },
  },
  { versionKey: false }
);

// If you want to perform a text search, you can index the tagName.
tagsSchema.index({ tagName: "text" });

const Tags = mongoose.model("Tags", tagsSchema);

module.exports = Tags;
