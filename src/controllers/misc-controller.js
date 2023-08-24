module.exports = {
  /* checking server's health */
  health: async (_, res) => {
    res.status(200).send('OK!');
  },
};
