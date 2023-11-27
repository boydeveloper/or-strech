require("dotenv").config({ path: "../.env" });
const BaselineSurvey = require("../models/model").baseline_survey;
const Users = require("../models/model").users;
const moment = require("moment");
const excelJs = require("exceljs");
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
const exportBaselineSurveys = async (req, res) => {
  try {
    const idArray = req.query.ids;
    let ids;
    if (idArray) ids = JSON.parse(idArray);
    let surveys;
    const workbook = new excelJs.Workbook();
    const sheet = workbook.addWorksheet("baselineSurveys");
    sheet.columns = [
      { header: "ID", key: "id" },
      { header: "UserID", key: "userid" },
      { header: "Age", key: "age" },
      { header: "Days per Week", key: "days_per_week" },
      { header: "Exercise", key: "exercise" },
      { header: "Gender", key: "gender" },
      { header: "Glove Size", key: "glove_size" },
      { header: "Handness", key: "handness" },
      { header: "Height", key: "height" },
      { header: "Most Common Procedures A", key: "most_common_procedures_a" },
      { header: "Most Common Procedures B", key: "most_common_procedures_b" },
      { header: "Most Common Procedures C", key: "most_common_procedures_c" },
      { header: "Pain Interfered Relations", key: "pain_interfered_relations" },
      { header: "Pain Interfered Sleep", key: "pain_interfered_sleep" },
      { header: "Pain Laparoscopic Surgery", key: "pain_laparoscopic_surgery" },
      { header: "Pain Open Surgery", key: "pain_open_surgery" },
      { header: "Pain Past Six Months", key: "pain_past_six_months" },
      { header: "Pain Robotic Surgery", key: "pain_robotic_surgery" },
      { header: "Primary Speciality", key: "primary_speciality" },
      { header: "Surgical Procedures Day", key: "surgical_procedures_day" },
      {
        header: "Years Laparoscopic Surgery",
        key: "years_laparoscopic_surgery",
      },
      { header: "Years Open Surgery", key: "years_open_surgery" },
      { header: "Years Robotic Surgery", key: "years_robotic_surgery" },
      { header: "Created At", key: "createdAt" },
      { header: "Updated At", key: "updatedAt" },
    ];
    if (ids) {
      surveys = await BaselineSurvey.findAll({
        where: {
          id: {
            [Op.in]: ids,
          },
        },
      });
    } else {
      surveys = await BaselineSurvey.findAll();
    }
    await surveys.map((value) => {
      sheet.addRow({
        id: value.id,
        userid: value.userid,
        age: value.age,
        days_per_week: value.days_per_week,
        exercise: value.exercise,
        gender: value.gender,
        glove_size: value.glove_size,
        handness: value.handness,
        height: value.height,
        most_common_procedures_a: value.most_common_procedures_a,
        most_common_procedures_b: value.most_common_procedures_b,
        most_common_procedures_c: value.most_common_procedures_c,
        pain_interfered_relations: value.pain_interfered_relations,
        pain_interfered_sleep: value.pain_interfered_sleep,
        pain_laparoscopic_surgery: value.pain_laparoscopic_surgery,
        pain_open_surgery: value.pain_open_surgery,
        pain_past_six_months: value.pain_past_six_months,
        pain_robotic_surgery: value.pain_robotic_surgery,
        primary_speciality: value.primary_speciality,
        surgical_procedures_day: value.surgical_procedures_day,
        years_laparoscopic_surgery: value.years_laparoscopic_surgery,
        years_open_surgery: value.years_open_surgery,
        years_robotic_surgery: value.years_robotic_surgery,
        createdAt: moment(value.createdAt).format("YYYY-MM-DD HH:MM:SS"),
        updatedAt: moment(value.createdAt).format("YYYY-MM-DD HH:MM:SS"),
      });
    });
    res.setHeader(
      "Content-Type",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    );
    res.setHeader(
      "Content-Disposition",
      "attachment;filename=" + "Baseline-Surveys.xlsx"
    );
    workbook.xlsx.write(res);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: err, isSuccess: false });
  }
};
module.exports = {
  sendEmail,
  exportBaselineSurveys,
  triggerBaselineSurveyJSONWorkflow,
  getSurveyResponses,
  getBaselineSurveys,
};
