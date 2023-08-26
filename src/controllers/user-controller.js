const { userService } = require("@services");
const { miscService } = require("@services");

const { health } = miscService;

const register = async (req, res) => {
  try {
    const { password, ...otherUserData } = req.body;
    const hashedPassword = await userService.hashPassword(password);
    await userService.register({
      password: hashedPassword,
      ...otherUserData,
    });
    res
      .status(201)
      .send({ success: true, message: "User Successfully Registered" });
  } catch (error) {
    console.error(error);
    res.status(500).send({
      success: false,
      error: "Internal Server Error",
    });
  }
};

module.exports = {
  health,
  register,
};
