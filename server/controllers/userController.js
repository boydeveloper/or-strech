const db = require("../models");
const User = db.users;

const listUsers = async (req, res) => {
  const page_no = Number(req.query.page_no);
  const no_of_users = Number(req.query.no_of_users);

  if (isNaN(page_no) || page_no <= 0) {
    return res.status(400).json({
      message:
        "Invalid id parameter. It should be a number and shouldn't be less than one.",
    });
  }
  const offset = (page_no - 1) * no_of_users;
  const users = await User.findAll({
    offset,
    limit: no_of_users,
    order: [["create_timestamp", "DESC"]],
  });
  const totalNoOfUsers = await User.count();
  return res.status(200).json({ users, totalNoOfUsers });
};

module.exports = {
  listUsers,
};
