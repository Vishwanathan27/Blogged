const { miscService, postsService } = require("@services");

const { health } = miscService;

const createPost = async (req, res, next) => {
  try {
    const postData = req.body;
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
    const posts = await postsService.getAllPosts();
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

module.exports = {
  createPost,
  getAllPosts,
  getPostById,
  updatePost,
  deletePost,
  health,
};
