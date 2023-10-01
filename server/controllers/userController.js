const db = require("../models/model");
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

const viewUserDetails = async (req, res) => {
  try {
    const email = req.query.email;
    if (!email)
      return res
        .status(400)
        .json({ message: "Email parameter not specified", isSuccess: false });
    const user = await User.findOne({ where: { email } });
    if (user) {
      return res.status(200).json({
        user: {
          id: user.id,
          email: user.email,
          alternate_email: user.alternate_email,
          name: user.name,
          conf_timer: user.conf_timer,
          tags: user.tags_excel,
          frequency: user.frequency,
          surveys_number: user.surveys_number,
          days_number: user.days_number,
          current_survey_number: user.current_survey_number,
          last_survey_check: user.last_survey_check,
          deleted: user.deleted,
          main_user_id: user.main_user_id,
          baseline_survey: user.baseline_survey,
          createdAt: user.createdAt,
          updatedAt: user.updatedAt,
        },
        isSuccess: true,
      });
    } else {
      return res.status(400).json({
        message: `User with email ${email} not found.`,
        isSuccess: false,
      });
    }
  } catch (err) {
    return res.status(500).json({ message: err, isSuccess: false });
  }
};

const listUsers = async (req, res) => {
  try {
    const page_no = Number(req.query.page_no);
    const no_of_users = Number(req.query.no_of_users);
    const offset = (page_no - 1) * no_of_users;
    const totalNoOfUsers = await User.count();

    if (isNaN(page_no) || page_no <= 0) {
      return res.status(400).json({
        message:
          "Invalid page number parameter. It should be a number and shouldn't be less than one.",
        isSuccess: false,
      });
    }

    const users = await User.findAll({
      offset,
      limit: no_of_users,
      order: [["createdAt", "DESC"]],
    });
    return res.status(200).json({ users, totalNoOfUsers, isSuccess: true });
  } catch (err) {
    return res.status(500).json({ message: err, isSuccess: false });
  }
};

const deleteUser = async (req, res) => {
  try {
    const email = req.query.email;
    const user = await User.findOne({ where: { email } });
    if (user) {
      await User.destroy({ where: { email } }).then(() => {
        return res.status(200).json({
          message: `User with email ${email} has been deleted.`,
          isSuccess: true,
        });
      });
    } else {
      return res.status(400).json({
        message: `User with email ${email} does not exist.`,
        isSuccess: false,
      });
    }
  } catch (err) {
    return res.status(500).json({ message: err, isSuccess: false });
  }
};

const updateUser = async (req, res) => {
  try {
    const email = req.query.email;

    const user = await User.findOne({ where: { email } });
    if (user) {
      await User.update(req.body, { where: { email } });
      return res
        .status(200)
        .json({ message: `User has been updated. `, isSuccess: true });
    } else {
      return res
        .status(400)
        .json({
          message: `User with email ${email} does not exist`,
          isSuccess: false,
        });
    }
  } catch (err) {
    return res.status(500).json({ message: err, isSuccess: false });
  }
};
module.exports = {
  listUsers,
  deleteUser,
  listAllUsers,
  updateUser,
  viewUserDetails,
};
