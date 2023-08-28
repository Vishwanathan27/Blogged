const { miscService, postsService } = require("@services");
const { dataConfig } = require("@config");

const { health } = miscService;

const createPost = async (req, res, next) => {
  try {
    const postData = req.body;
    const { tags } = postData;
    if (tags?.length) {
      await postsService.saveTags(tags);
    }
    const post = await postsService.createPost(postData);
    res.status(201).json({ success: true, data: post });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error: "Internal Server Error",
    });
  }
};

const getAllPosts = async (req, res, next) => {
  try {
    const { query } = req;
    const page = parseInt(query.page) || dataConfig.page;
    const limit = parseInt(query.limit) || dataConfig.limit;
    const sort = query.sort || dataConfig.sort;

    const search = query.search || "";
    const posts = await postsService.getAllPosts(page, limit, search, sort);
    res.status(200).json({ success: true, data: posts });
  } catch (error) {
    res.status(500).send({
      success: false,
      error: "Internal Server Error",
    });
  }
};

const getPostById = async (req, res, next) => {
  try {
    const postId = req.params.id;
    const post = await postsService.getPostById(postId);
    if (!post) {
      return res
        .status(404)
        .json({ success: false, message: "Post not found" });
    }
    res.status(200).json({ success: true, data: post });
  } catch (error) {
    console.error(error);
    res.status(500).send({
      success: false,
      error: "Internal Server Error",
    });
  }
};

const updatePost = async (req, res, next) => {
  try {
    const postId = req.params.id;
    const postData = req.body;
    const updatedPost = await postsService.updatePost(postId, postData);
    if (!updatedPost) {
      return res
        .status(404)
        .json({ success: false, message: "Post not found" });
    }
    res.status(200).json({ success: true, data: updatedPost });
  } catch (error) {
    console.error(error);
    res.status(500).send({
      success: false,
      error: "Internal Server Error",
    });
  }
};

const deletePost = async (req, res, next) => {
  try {
    const postId = req.params.id;
    const deletedPost = await postsService.deletePost(postId);
    if (!deletedPost) {
      return res
        .status(404)
        .json({ success: false, message: "Post not found" });
    }
    res
      .status(200)
      .json({ success: true, message: "Post deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).send({
      success: false,
      error: "Internal Server Error",
    });
  }
};

const getAllTags = async (req, res, next) => {
  try {
    const { query } = req;
    const page = parseInt(query.page) || dataConfig.page;
    const limit = parseInt(query.limit) || dataConfig.maxLimit;
    const tags = await postsService.getAllTags(page, limit);
    res.status(200).json({ success: true, data: tags });
  } catch (error) {
    console.log("error in getAllTags :", error);
    res.status(500).send({
      success: false,
      error: "Internal Server Error",
    });
  }
};

module.exports = {
  createPost,
  getAllPosts,
  getPostById,
  updatePost,
  deletePost,
  getAllTags,
  health,
};
