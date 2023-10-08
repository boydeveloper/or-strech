const db = require("../models/model");
const User = db.users;
const excelJs = require("exceljs");
const Op = require("sequelize").Op;
const moment = require("moment");

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

const addUser = async (req, res) => {
  try {
    const info = {
      name: req.body.name,
      user_type: req.body.user_type,
      email: req.body.email,
    };

    if (!req.body.name || !req.body.user_type || !req.body.email)
      return res
        .status(400)
        .json({ message: "Invalid params.", isSuccess: false });

    const userExists = await User.findOne({ where: { email: req.body.email } });
    if (userExists)
      return res.status(400).json({
        message: `User with email ${req.body.email} already exists.`,
        isSuccess: false,
      });

    const main_user_id = (await User.count()) + 1;
    const user = await User.create({
      ...info,
      password: "defaultpassword",
      salt: "defaultsalt",
      conf_timer: 45,
      active: 1,
      frequency: 1,
      surveys_number: 10,
      days_number: 5,
      deleted: 0,
      baseline_survey: 0,
      main_user_id,
    });

    return res.status(200).json({
      user,
      message: `User with email ${req.body.email}created`,
      isSuccess: true,
    });
  } catch (err) {
    return res.status(500).json({ message: err, isSuccess: false });
  }
};
const findUsers = async (req, res) => {
  try {
    const nameSubstring = req.query.name || "";
    const tagSubstring = req.query.tag || "";
    const emailSubstring = req.query.email || "";

    if (!nameSubstring && !tagSubstring && !emailSubstring)
      return res
        .status(400)
        .json({ message: "No query parameter specified", isSuccess: false });
    let users;
    if (nameSubstring || tagSubstring || emailSubstring) {
      users = await User.findAll({
        where: {
          [Op.and]: [
            nameSubstring && {
              name: {
                [Op.substring]: nameSubstring,
              },
            },
            tagSubstring && {
              tags_excel: {
                [Op.substring]: tagSubstring,
              },
            },
            emailSubstring && {
              email: {
                [Op.substring]: emailSubstring,
              },
            },
          ],
        },
      });
    }
    return res.status(200).json({ users, isSuccess: true });
  } catch (err) {
    return res.status(500).json({ message: err, isSuccess: false });
  }
};

const listUsers = async (req, res) => {
  try {
    const page_no = Number(req.query.page_no);
    const offset = (page_no - 1) * 20;
    const totalNoOfUsers = await User.count();
    let users;
    let totalNoOfUsersThatMatchSpecifiedParams;
    let maxPageNo;
    const searchParam = req.query.search_param;

    if (isNaN(page_no) || page_no <= 0) {
      return res.status(400).json({
        message:
          "Invalid page number parameter. It should be a number and shouldn't be less than one.",
        isSuccess: false,
      });
    }

    if (searchParam) {
      let totalUsersThatMatchParams = await User.findAll({
        where: {
          [Op.or]: [
            {
              email: {
                [Op.substring]: searchParam,
              },
            },
            {
              tags_excel: {
                [Op.substring]: searchParam,
              },
            },
            {
              name: {
                [Op.substring]: searchParam,
              },
            },
          ],
        },
      });
      let paginatedUsers = await User.findAll({
        where: {
          [Op.or]: [
            {
              email: {
                [Op.substring]: searchParam,
              },
            },
            {
              tags_excel: {
                [Op.substring]: searchParam,
              },
            },
            {
              name: {
                [Op.substring]: searchParam,
              },
            },
          ],
        },
        offset,
        limit: 20,
        order: [["createdAt", "DESC"]],
      });
      totalNoOfUsersThatMatchSpecifiedParams = totalUsersThatMatchParams.length;
      maxPageNo = Math.ceil(totalNoOfUsersThatMatchSpecifiedParams / 20);
      users = paginatedUsers;
    } else {
      users = await User.findAll({
        offset,
        limit: 20,
        order: [["createdAt", "DESC"]],
      });
      maxPageNo = Math.ceil(totalNoOfUsers / 20);
    }

    return res.status(200).json({
      users,
      totalNoOfUsers,
      totalNoOfUsersThatMatchSpecifiedParams,
      maxPageNo,
      isSuccess: true,
    });
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

      return res.status(200).json({
        user,
        message: `User has been updated. `,
        isSuccess: true,
      });
    } else {
      return res.status(400).json({
        message: `User with email ${email} does not exist`,
        isSuccess: false,
      });
    }
  } catch (err) {
    return res.status(500).json({ message: err, isSuccess: false });
  }
};

const exportUser = async (req, res) => {
  try {
    const users = await User.findAll();
    const workbook = new excelJs.Workbook();
    const sheet = workbook.addWorksheet("users");
    sheet.columns = [
      { header: "ID", key: "id" },
      { header: "Email", key: "email" },
      { header: "Alternate Email", key: "alternate_email" },
      { header: "Full Name", key: "name" },
      { header: "Timer (minutes)", key: "conf_timer" },
      { header: "Active", key: "active" },
      { header: "Date Created", key: "createdAt" },
      { header: "Last Updated", key: "updatedAt" },
      { header: "Tags", key: "tags_excel" },
    ];
    await users.map((value) => {
      sheet.addRow({
        id: value.id,
        name: value.name,
        email: value.email,
        alternate_email: value.alternate_email,
        conf_timer: value.conf_timer,
        active: value.active ? "Yes" : "No",
        createdAt: moment(value.createdAt).format("YYYY-MM-DD HH:MM:SS"),
        updatedAt: moment(value.createdAt).format("YYYY-MM-DD HH:MM:SS"),
        tags_excel: value.tags_excel,
      });
    });
    res.setHeader(
      "Content-Type",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    );
    res.setHeader(
      "Content-Disposition",
      "attachment;filename=" + "Or-Stretch-Users.xlsx"
    );
    workbook.xlsx.write(res);
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
  findUsers,
  exportUser,
  addUser,
};
