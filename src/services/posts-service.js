const { Posts } = require("@models");
const { Tags } = require("@models");
const moment = require("moment");

const postsService = {
  async createPost(postData) {
    try {
      const post = new Posts(postData);
      return await post.save();
    } catch (error) {
      console.log(error);
      return error;
    }
  },

  async getAllPosts(
    page = 1,
    itemsPerPage = 10,
    searchTerm = "",
    sort = { _id: -1 },
    tags = ""
  ) {
    try {
      const skip = (page - 1) * itemsPerPage;
      const limit = itemsPerPage;
      let query = {};

      if (searchTerm) {
        query = {
          $text: {
            $search: searchTerm,
          },
        };
      }
      if (tags) {
        query = {
          tags: {
            $in: tags.split(","),
          },
        };
      }

      return await Posts.find(query).skip(skip).limit(limit).sort(sort);
    } catch (error) {
      console.log(error);
      return error;
    }
  },

  async getPostById(postId) {
    try {
      return await Posts.findById(postId).populate("author", "username -_id");
    } catch (error) {
      console.log(error);
      return error;
    }
  },

  async updatePost(postId, postData) {
    try {
      return await Posts.findByIdAndUpdate(postId, postData, { new: true });
    } catch (error) {
      console.log(error);
      return error;
    }
  },

  async deletePost(postId) {
    try {
      return await Posts.findByIdAndRemove(postId);
    } catch (error) {
      console.log(error);
      return error;
    }
  },

  async saveTags(tags) {
    try {
      const now = moment().valueOf();

      const promises = tags.map(async (tag) => {
        const slug = tag.toLowerCase().replace(/\s+/g, "-");

        const tagData = {
          name: tag,
          slug,
          createdAt: now,
          type: "CUSTOM",
        };

        // Check if a tag with the same slug already exists.
        const existingTag = await Tags.findOne({ "tags.slug": slug });

        if (!existingTag) {
          return Tags.updateOne(
            {},
            { $push: { tags: tagData } },
            { upsert: true }
          );
        }
      });

      return await Promise.all(promises);
    } catch (error) {
      console.error("error in saveTags:", error);
      return error;
    }
  },

  async getAllTags(page = 1, itemsPerPage = 100) {
    try {
      const skip = (page - 1) * itemsPerPage;
      const limit = itemsPerPage;

      return await Tags.find({}, { tags: { $slice: [skip, limit] } });
    } catch (error) {
      console.error("error in getAllTags:", error);
      return error;
    }
  },
};

module.exports = postsService;
