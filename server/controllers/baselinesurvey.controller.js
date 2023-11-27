require("dotenv").config({ path: "../.env" });
const BaselineSurvey = require("../models/model").baseline_survey;
const Users = require("../models/model").users;
const nodeMailer = require("nodemailer");
const Client = require("ssh2-sftp-client");
const fs = require("fs");
const sendEmail = async (req, res) => {
  let emailToSendMessageTo = req.query.email;
  console.log({ emailToSendMessageTo });
  let config = {
    service: "gmail",
    auth: {
      user: process.env.EMAIL,
      pass: process.env.PASSWORD,
    },
  };

  let transporter = nodeMailer.createTransport(config);

  let message = {
    from: `'"Mayo Clinic" <${process.env.EMAIL}>'`,
    to: "adeleyetemiloluwa674@gmail.com",
    subject: "Mayo Clinic OR Stretch Baseline Survey",
    html: `<p>Hello, ${emailToSendMessageTo}</p></br><p><a href="https://surveys.mayoclinic.org/jfe/form/SV_ebd7AWFnBL8r02O">Here is the link to the baseline survey.</a><p>`,
  };

  transporter
    .sendMail(message)
    .then(() => {
      return res.status(201).json({
        message: "You should receive an email",
        isSuccess: true,
      });
    })
    .catch((error) => {
      return res.status(400).json({ message: error, isSuccess: false });
    });
};

const triggerBaselineSurveyJSONWorkflow = async (req, res) => {
  await fetch(`${process.env.QUALTRICS_BASELINE_TRIGGER}`, {
    method: "POST",
    body: req.body,
  }).then((response) => {
    return res.json(response);
  });
};

const getSurveyResponses = async (req, res) => {
  const sftp = new Client();
  const config = {
    host: process.env.SFTPHOST,
    user: process.env.SFTPUSER,
    password: process.env.SFTPPASSWORD,
    port: process.env.SFTPPORT,
  };
  const filePath = "/inbox";

  try {
    await sftp.connect(config);
    const files = await sftp.list(filePath);
    const fileInfo = JSON.stringify(files);
    if (files && files.length > 0) {
      return res.status(200).json(JSON.parse(fileInfo));
    } else {
      return res.status(500).json({ m: "error" });
    }
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Internal Server Error" });
  } finally {
    sftp.end();
  }
};

const getBaselineSurveys = async (req, res) => {
  try {
    let page_no = 1;
    let no_of_surveys = 10;
    if (req.query.page_no) {
      page_no = Number(req.query.page_no) ?? 1;
    }
    if (req.query.no_of_surveys) {
      no_of_surveys = Number(req.query.no_of_surveys) ?? 10;
    }
    const offset = (page_no - 1) * no_of_surveys;
    const totalNoOfSurveys = await BaselineSurvey.count();

    if (isNaN(page_no) || page_no <= 0) {
      return res.status(400).json({
        message:
          "Invalid page number parameter. It should be a number and shouldn't be less than one.",
        isSuccess: false,
      });
    }

    const baselineSurveys = await BaselineSurvey.findAll({
      offset,
      limit: no_of_surveys,
      order: [["createdAt", "DESC"]],
    });
    const maxPageCount = Math.ceil(totalNoOfSurveys / no_of_surveys);
    return res.status(200).json({
      baselineSurveys,
      totalNoOfSurveys,
      totalNoOfSurveys,
      isSuccess: true,
    });
  } catch (err) {
    return res.status(500).json({ message: err, isSuccess: false });
  }
};
module.exports = {
  sendEmail,
  triggerBaselineSurveyJSONWorkflow,
  getSurveyResponses,
  getBaselineSurveys,
};
