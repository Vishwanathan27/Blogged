const { Posts } = require("@models");

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
};

module.exports = postsService;
