require("dotenv").config;
const db = require("../models/model");
const crypto = require("crypto");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Account = db.accounts;
const User = db.users;

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
      const hash = await hashPassword(password);
      const salt = await extractSaltFromHash(hash);
      const newAccount = await Account.create({ email, password });
      const token = generateToken(newAccount.id);

      const user = await User.create({
        email: req.body.email,
        password: hash,
        salt: salt,
        conf_timer: 45,
        active: 1,
        frequency: 1,
        surveys_number: 10,
        days_number: 5,
        deleted: 0,
        baseline_survey: 0,
        main_user_id: newAccount.id,
        user_type: "admin",
      });
      await User.update({ main_user_id: user.id }, { where: { email } });
      return res.status(200).json({
        account: {
          id: newAccount.id,
          email: newAccount.email,
          createdAt: newAccount.createdAt,
          user_type: "admin",
          token,
        },
        isSuccess: true,
      });
    }
    if (existingUser && existingUser.user_type === "admin") {
      const token = generateToken(existingUser.id);
      const result = await comparePasswords(password, existingUser.password);
      if (result) {
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
      const hash = await hashPassword(password);
      const salt = await extractSaltFromHash(hash);
      const token = generateToken(existingUser.id);
      await User.update(
        {
          user_type: "admin",
          password: hash,
          salt,
        },
        { where: { email } }
      );
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
    const account = await Account.findOne({
      where: { email: req.body.email },
    });
    if (account) {
      return res.status(200).json({
        account: {
          id: account.id,
          email: account.email,
          createdAt: account.createdAt,
          isNew: true,
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
