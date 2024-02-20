require("dotenv").config;
const db = require("../models/model");
const axios = require("axios");
// const db = require("../models/model");
const UserOtps = db.user_otps;
// const db = require("../models/model");
const sdk = require("api")("@sendchamp/v1.0#1bxhir2hkyyg62rn");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const nodeMailer = require("nodemailer");
const Account = db.accounts;
const User = db.users;
const Event = db.events;

function getCurrentTimestamp() {
  const now = new Date();

  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0"); // Months are zero-based
  const day = String(now.getDate()).padStart(2, "0");

  const hours = String(now.getHours()).padStart(2, "0");
  const minutes = String(now.getMinutes()).padStart(2, "0");
  const seconds = String(now.getSeconds()).padStart(2, "0");

  const timestamp = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;

  return timestamp;
}

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
        Event.create({
          userid: existingUser.id,
          event_type: "LOGIN_ADMIN",
          value: 0,
          notes: "",
          timestamp: getCurrentTimestamp(),
        });
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
const checkUserIsNew = async (req, res) => {
  try {
    const userAccountExists = await Account.findOne({
      where: { email: req.body.email },
    });

    return res.status(200).json({
      isNew: userAccountExists ? false : true,
      isSuccess: true,
    });
  } catch (err) {
    return res.status(500).json({ message: err, isSuccess: false });
  }
};
const loginAccount = async (req, res) => {
  try {
    let info = {
      email: req.body.email,
    };
    const userAccountExists = await Account.findOne({
      where: { email: req.body.email },
    });
    const user = await User.findOne({
      where: { email: req.body.email },
    });
    if (user) {
      const token = generateToken(user.id);
      console.log(user.id);
      Event.create({
        userid: user.id,
        event_type: "LOGIN_NORMALUSER",
        value: 0,
        notes: "",
        timestamp: getCurrentTimestamp(),
      });
      return res.status(200).json({
        account: {
          id: user.id,
          email: user.email,
          createdAt: user.createdAt,
          isNew: userAccountExists ? false : true,
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
      Event.create({
        userid: user.id,
        event_type: "LOGIN_NORMALUSER",
        value: 0,
        notes: "",
        timestamp: getCurrentTimestamp(),
      });
      return res.status(200).json({
        account: {
          id: user.id,
          email: account.email,
          createdAt: account.createdAt,
          isNew: true,
          isNew: userAccountExists ? false : true,
          token,
          user_type: account.user_type,
        },
        isSuccess: true,
      });
    }
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: err, isSuccess: false });
  }
};

const sendToken = async (req, res) => {
  sdk.auth(
    "Bearer sendchamp_live_$2a$10$GRdY0AGEX3wSmJTYfGkZ.eBowX7wckUiSnrGnXA5Ix0Q3bkBMorUO"
  );
  sdk
    .sendOtpApi({
      channel: "email",
      token_type: "numeric",
      token_length: 6,
      expiration_time: 10,
      customer_email_address: "adeleyetemiloluwa.work@gmail.com",
    })
    .then(({ data }) => console.log(data))
    .catch((err) => console.error(err));
};
const sendOTP = async (req, res) => {
  const email = req.body.email; // Destructuring unnecessary for a single variable
  try {
    const otp = `${Math.floor(Math.random() * 900000) + 100000}`;

    // Save OTP details (you can adjust this part based on your database structure)
    const userOtp = await UserOtps.create({
      email,
      expiresAt: Date.now() + 3600000,
      otp,
    });

    const transporter = nodeMailer.createTransport({
      host: process.env.SMTPHOST,
      port: process.env.SMTPPORT,
      secure: false,
      auth: {
        user: process.env.SMTPUSER,
        pass: process.env.SMTPPASSWORD,
      },
    });

    const mailOptions = {
      from: process.env.SMTPUSER,
      to: email,
      subject: "MAYO CLINIC ORSTRETCH ONE TIME VERIFICATION CODE",
      html: `<p>Hello, ${email}.</p><br/> <p>Your OTP is <b>${otp}</b>. </p> <br/> <p>It expires in 1 hour. </p>`,
    };

    transporter.sendMail(mailOptions, (error) => {
      if (error) {
        return res.status(500).json({
          message: error,
          isSuccess: false,
        });
      } else {
        return res.status(200).json({
          message: `Email sent. This is the OTP for testing purposes: ${userOtp.otp}`,
          otp: userOtp.otp,
          isSuccess: true,
        });
      }
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: err });
  }
};
const verifyOTP = async (req, res) => {
  const [email, otp] = [req.body.email, req.body.otp];
  try {
    if (!email || !otp) {
      return res.status(400).json({ message: "User not found" });
    }
    const userVerificationRecord = await UserOtps.findAll({ where: { email } });
    if (userVerificationRecord.length <= 0) {
      return res.status(400).json({
        message:
          "Account record does'nt exist or has been verified already. Please sign up or login.",
      });
    } else {
      const { expiresAt } = userVerificationRecord[0];
      const { otp: dbOtp } = userVerificationRecord[0];
      if (expiresAt < Date.now()) {
        await UserOtps.destroy({ where: { email } });
        return res
          .status(402)
          .json({ message: "Otp has expired", isSuccess: false });
      } else {
        if (otp === dbOtp) {
          await UserOtps.destroy({ where: { email } });
          return res
            .status(200)
            .json({ message: "The email has been verified", isSuccess: true });
        } else {
          return res
            .status(402)
            .json({ message: "Otp is incorrect", isSuccess: false });
        }
      }
    }
  } catch (err) {
    console.log(err);
    return res.status(500).json({ err });
  }
};
module.exports = {
  loginAccount,
  loginAdminAccount,
  checkUserIsNew,
  sendToken,
  sendOTP,
  verifyOTP,
};
