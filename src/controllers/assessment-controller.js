const { assessmentService } = require('@services');

const list = async (req, res) => {
  const query = {
    organization_id: 1,
    state: { $in: [1, 2, 4] },
  };
  const fetch = {
    assessment_name: 1,
    description: 1,
    state: 1,
    _id: 1,
  };
  const sort = {
    _id: -1,
  };
  const finalList = await assessmentService.getAllAssessments(query, fetch, 10, sort);
  res.status(finalList.status).send(finalList.data);
};

module.exports = {
  list,
};
