const db = require("../models/model");
const User = db.users;
const excelJs = require("exceljs");
const Op = require("sequelize").Op;
const moment = require("moment");
const bcrypt = require("bcryptjs");

const hashPassword = async (password) => {
  const hash = await bcrypt.hash(password, 10);
  return hash;
};

const extractSaltFromHash = (hash) => {
  const components = hash.slice(1, 10);
  const salt = components;
  return salt;
};

const comparePasswords = async (plainTextPassword, hash) => {
  const result = await bcrypt.compare(plainTextPassword, hash);
  return result;
};

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

    return res.status(200).json({ user, isSuccess: true });
  } catch (err) {
    return res.status(500).json({ message: err, isSuccess: false });
  }
};

const changeUserPassword = async (req, res) => {
  try {
    const email = req.body.email;
    const password = req.body.password;
    const new_password = req.body.new_password;
    if (!email)
      return res
        .status(400)
        .json({ message: "Invalid email parameters", isSuccess: false });
    const user = await User.findOne({ where: { email: email } });
    if (!user)
      return res
        .status(400)
        .json({ message: "User does not exist.", isSuccess: false });

    if (
      user.password != password ||
      comparePasswords(password, user.password) === false
    ) {
      return res
        .status(400)
        .json({ message: "Invalid password.", isSuccess: false });
    }
    const hash = await hashPassword(new_password);
    const salt = await extractSaltFromHash(hash);
    if (user) {
      await User.update({ password: hash, salt }, { where: { email } });
      return res
        .status(200)
        .json({ message: "Password updated successfully", isSuccess: true });
    }
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

const searchUsers = async (req, res) => {
  try {
    const email = req.query.email;
    const id = req.query.id;
    const tags = req.query.tags;
    const name = req.query.name;
    const timer = req.query.timer;
    const sortBy = req.query.sortBy ?? "createdAt";
    const createdAt = req.query.createdAt;
    const updatedAt = req.query.updatedAt;
    const order = req.query.order ?? "DESC";

    if (!email && !id && !tags && !name && !timer) {
      return res.status(400).json({ message: "No search parameter specified" });
    }
    let totalNoOfUsersThatMatchSpecifiedParams = await User.findAll({
      where: {
        [Op.and]: [
          id !== undefined && {
            id: {
              [Op.eq]: id,
            },
          },
          email !== undefined && {
            email: {
              [Op.substring]: email,
            },
          },
          name !== undefined && {
            name: {
              [Op.substring]: name,
            },
          },
          timer !== undefined && {
            conf_timer: {
              [Op.eq]: timer,
            },
          },
          tags !== undefined && {
            tags_excel: {
              [Op.substring]: tags,
            },
          },
        ],
      },
      order: [[sortBy, order]],
    });

    return res
      .status(200)
      .json({ totalNoOfUsersThatMatchSpecifiedParams, isSuccess: true });
  } catch (err) {
    return res.status(500).json({ message: err, isSuccess: false });
  }
};

const listUsers = async (req, res) => {
  try {
    const page_no = Number(req.query.page_no);
    let no_of_users = 10;
    if (req.query.userNo) {
      no_of_users = Number(req.query.userNo) ?? 10;
    }
    const email = req.query.email;
    const id = req.query.id;
    const tags = req.query.tags;
    const name = req.query.name;
    const timer = req.query.timer;
    const sortBy = req.query.sortBy ?? "createdAt";
    const order = req.query.order ?? "DESC";
    const createdAt = req.query.createdAt;
    const updatedAt = req.query.updatedAt;
    const offset = (page_no - 1) * no_of_users;
    let totalNoOfUsers;
    let users;
    let maxPageNo;
    let possibleTags = [
      "createdAt",
      "updatedAt",
      "tags_excel",
      "name",
      "conf_timer",
      "email",
    ];
    if (isNaN(page_no) || page_no <= 0) {
      return res.status(400).json({
        message:
          "Invalid page number parameter. It should be a number and shouldn't be less than one.",
        isSuccess: false,
      });
    }

    if (sortBy && possibleTags.includes(sortBy) !== true)
      return res.status(400).json({
        message: `Sort By param is not correct. can only be one of the following: ${[
          ...possibleTags,
        ]}`,
      });
    if (email || id || tags || name || timer || createdAt || updatedAt) {
      const startDate = createdAt ? new Date(createdAt) : "";
      const endDate = updatedAt ? new Date(updatedAt) : "";
      let totalUsersThatMatchParams = await User.findAll({
        where: {
          [Op.and]: [
            startDate !== undefined &&
              startDate !== "" && {
                createdAt: {
                  [Op.gte]: startDate,
                },
              },
            endDate !== undefined &&
              endDate !== "" && {
                updatedAt: {
                  [Op.lte]: endDate,
                },
              },
            id !== undefined &&
              id !== "" && {
                id: {
                  [Op.eq]: Number(id),
                },
              },
            email !== undefined &&
              email !== "" && {
                email: {
                  [Op.substring]: email,
                },
              },
            name !== undefined &&
              name !== "" && {
                name: {
                  [Op.substring]: name,
                },
              },
            timer !== undefined &&
              timer !== "" && {
                conf_timer: {
                  [Op.eq]: Number(timer),
                },
              },
            tags !== undefined &&
              tags !== "" && {
                tags_excel: {
                  [Op.substring]: tags,
                },
              },
          ],
        },
      });
      totalNoOfUsers = totalUsersThatMatchParams.length;
      console.log({ totalNoOfUsers });
      maxPageNo = Math.ceil(totalUsersThatMatchParams.length / no_of_users);
      users = await User.findAll({
        where: {
          [Op.and]: [
            startDate !== undefined &&
              startDate !== "" && {
                createdAt: {
                  [Op.gte]: startDate,
                },
              },
            endDate !== undefined &&
              endDate !== "" && {
                updatedAt: {
                  [Op.lte]: endDate,
                },
              },
            id !== undefined &&
              id !== "" && {
                id: {
                  [Op.eq]: Number(id),
                },
              },
            email !== undefined &&
              email !== "" && {
                email: {
                  [Op.substring]: email,
                },
              },
            name !== undefined &&
              name !== "" && {
                name: {
                  [Op.substring]: name,
                },
              },
            timer !== undefined &&
              timer !== "" && {
                conf_timer: {
                  [Op.eq]: Number(timer),
                },
              },
            tags !== undefined &&
              tags !== "" && {
                tags_excel: {
                  [Op.substring]: tags,
                },
              },
          ],
        },
        offset,
        limit: no_of_users,
        order: [[sortBy, order]],
      });
    } else {
      totalNoOfUsers = await User.count();
      maxPageNo = Math.ceil(totalNoOfUsers / no_of_users);
      users = await User.findAll({
        offset,
        limit: no_of_users,
        order: [[sortBy, order]],
      });
    }
    return res.status(200).json({
      users,
      totalNoOfUsers,
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
      return res
        .status(200)
        .json({ message: `User has been updated. `, isSuccess: true });
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
    const idArray = req.query.ids;
    let ids;
    if (idArray) ids = JSON.parse(idArray);
    let users;
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
    if (ids) {
      users = await User.findAll({
        where: {
          id: {
            [Op.in]: ids,
          },
        },
      });
    } else {
      users = await User.findAll();
    }
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
  addUser,
  changeUserPassword,
  findUsers,
  searchUsers,
  exportUser,
};
