require("dotenv").config;
const db = require("../models/model");

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const Account = db.accounts;
const User = db.users;


const comparePasswords = async (plainTextPassword, hash) => {
  const result = await bcrypt.compare(plainTextPassword, hash);
  return result;
};

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_KEY, { expiresIn: "12h" });
};

const loginAdminAccount = async (req, res) => {
  const { email, password } = req.body;
  if (!email)
    return res
      .status(500)
      .json({ message: "Invalid email parameter.", isSuccess: false });
  if (!password)
    return res
      .status(500)
      .json({ message: "Invalid password parameter.", isSuccess: false });
  try {
    const existingUser = await User.findOne({
      where: { email },
    });
    if (!existingUser) {
      return res
        .status(400)
        .json({ message: "Invalid login credentials", isSuccess: false });
    }
    if (existingUser && existingUser.user_type === "admin") {
      const token = generateToken(existingUser.id);
      const isCorrectHashedPassword = await comparePasswords(
        password,
        existingUser.password
      );
      const isCorrectPassword = password === existingUser.password;
      if (isCorrectHashedPassword || isCorrectPassword) {

        return res.status(200).json({
          account: {
            id: existingUser.id,
            email: existingUser.email,
            createdAt: existingUser.createdAt,
            user_type: "admin",
            token,
          },
          isSuccess: true,
        });
      } else {
        return res
          .status(400)
          .json({ message: "Invalid email or password", isSuccess: false });
      }
    } else if (existingUser && existingUser.user_type === "normal_user") {
      return res
        .status(500)
        .json({ message: "Invalid login credentials", isSuccess: false });
    }
  } catch (err) {
    return res.status(500).json({ message: err, isSuccess: false });
  }
};

const loginAccount = async (req, res) => {
  try {
    let info = {
      email: req.body.email,
    };
    const user = await User.findOne({
      where: { email: req.body.email },
    });

    if (user) {
      const token = generateToken(user.id);

      return res.status(200).json({
        account: {
          id: user.id,
          email: user.email,
          createdAt: user.createdAt,
          isNew: false,
          token,
        },
        isSuccess: true,
      });
    } else {
      const account = await Account.create(info);
      const user = await User.create({
        email: req.body.email,
        password: "defaultpassword",
        salt: "defaultsalt",
        conf_timer: 45,
        active: 1,
        frequency: 1,
        surveys_number: 10,
        days_number: 5,
        deleted: 0,
        baseline_survey: 0,
        main_user_id: account.id,
        user_type: "normal_user",
      });
      const token = generateToken(user.id);
      await User.update(
        { main_user_id: user.id },
        { where: { email: req.body.email } }
      );


      return res.status(200).json({
        account: {
          id: account.id,
          email: account.email,
          createdAt: account.createdAt,
          isNew: true,
          token,
          user_type: account.user_type,
        },
        isSuccess: true,
      });
    }
  } catch (err) {
    return res.status(500).json({ message: err, isSuccess: false });
  }
};

module.exports = {
  loginAccount,
  loginAdminAccount,
};
