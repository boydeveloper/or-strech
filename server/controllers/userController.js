const db = require("../models");
const User = db.users;

const listAllUsers = async (req, res) => {
  try {
    const users = await User.findAll();
    if (users) {
      return res.status(200).json(users || []);
    }
  } catch (err) {
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

const listUsers = async (req, res) => {
  const page_no = Number(req.query.page_no);
  const no_of_users = Number(req.query.no_of_users);
  const offset = (page_no - 1) * no_of_users;
  const totalNoOfUsers = await User.count();

  if (isNaN(page_no) || page_no <= 0) {
    return res.status(400).json({
      message:
        "Invalid page number parameter. It should be a number and shouldn't be less than one.",
    });
  }

  const users = await User.findAll({
    offset,
    limit: no_of_users,
    order: [["createdAt", "DESC"]],
  });
  return res.status(200).json({ users, totalNoOfUsers });
};

const deleteUser = async (req, res) => {
  try {
    const email = req.query.email;
    const user = await User.findOne({ where: { email } });
    if (user) {
      await User.destroy({ where: { email } }).then(() => {
        return res
          .status(200)
          .json({ message: `User with email ${email} has been deleted.` });
      });
    } else {
      return res
        .status(400)
        .json({ message: `User with email ${email} does not exist.` });
    }
  } catch (err) {
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

const updateUser = async (req, res) => {
  try {
    const email = req.query.email;

    const user = await User.findOne({ where: { email } });
    if (user) {
      await User.update(req.body, { where: { email } });
      return res.status(200).json({ message: `User has been updated. ` });
    } else {
      return res
        .status(400)
        .json({ message: `User with email ${email} does not exist` });
    }
  } catch (err) {
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
module.exports = {
  listUsers,
  deleteUser,
  listAllUsers,
  updateUser,
};
