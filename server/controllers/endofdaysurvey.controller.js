const excelJs = require("exceljs");
const Op = require("sequelize").Op;
const moment = require("moment");
const fetch = require("node-fetch");
require("dotenv").config({ path: "../.env" });

const EndOfDaySurvey = require("../models/model").endofday_survey;

const triggerEndOfDaySurveyJSONWorkflow = async (req, res) => {
  try {
    await fetch(`${process.env.QUALTRICS_ENDODFDAY_TRIGGER}`, {
      method: "POST",
      body: req.body,
    }).then((response) => {
      return res.json(response.statusText);
    });
  } catch (err) {
    return res.status(500).json({ message: err, isSuccess: false });
  }
};

const getEndOfDaySurveys = async (req, res) => {
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
    const totalNoOfSurveys = await EndOfDaySurvey.count();

    if (isNaN(page_no) || page_no <= 0) {
      return res.status(400).json({
        message:
          "Invalid page number parameter. It should be a number and shouldn't be less than one.",
        isSuccess: false,
      });
    }
    const endOfDaySurveys = await EndOfDaySurvey.findAll({
      offset,
      limit: no_of_surveys,
      order: [["createdAt", "DESC"]],
    });
    const maxPageCount = Math.ceil(totalNoOfSurveys / no_of_surveys);
    return res.status(200).json({
      endOfDaySurveys,
      totalNoOfSurveys,
      maxPageCount,
      isSuccess: true,
    });
  } catch (err) {
    return res.status(500).json({ message: err, isSuccess: false });
  }
};

const exportEndOfDaySurveys = async (req, res) => {
  try {
    const idArray = req.query.ids;
    let ids;
    if (idArray) ids = JSON.parse(idArray);
    let surveys;
    const workbook = new excelJs.Workbook();
    const sheet = workbook.addWorksheet("endOfDaySurveys");
    sheet.columns = [
      { header: "ID", key: "id" },
      { header: "User ID", key: "userid" },
      { header: "Comment", key: "comment" },
      { header: "Complex Surgeries", key: "complex_surgeries" },
      { header: "Difficult Surgeries", key: "difficult_surgeries" },
      { header: "Distracting", key: "distracting" },
      { header: "Flow Impact", key: "flow_impact" },
      { header: "Impact Fatigue", key: "impact_fatigue" },
      { header: "Impact Mental", key: "impact_mental" },
      { header: "Impact Pain", key: "impact_pain" },
      { header: "Impact Physical", key: "impact_physical" },
      {
        header: "Mentally Demanding Surgeries",
        key: "mentally_demanding_surgeries",
      },
      {
        header: "Physically Demanding Surgeries",
        key: "physically_demanding_surgeries",
      },
      { header: "Date Created", key: "createdAt" },
      { header: "Last Updated", key: "updatedAt" },
    ];
    if (ids) {
      surveys = await EndOfDaySurvey.findAll({
        where: {
          id: {
            [Op.in]: ids,
          },
        },
      });
    } else {
      surveys = await EndOfDaySurvey.findAll();
    }
    await surveys.map((value) => {
      sheet.addRow({
        id: value.id,
        userid: value.userid,
        comment: value.comment,
        complex_surgeries: value.complex_surgeries,
        difficult_surgeries: value.difficult_surgeries,
        distracting: value.distracting,
        flow_impact: value.flow_impact,
        impact_fatigue: value.impact_fatigue,
        impact_mental: value.impact_mental,
        impact_pain: value.impact_pain,
        impact_physical: value.impact_physical,
        mentally_demanding_surgeries: value.mentally_demanding_surgeries,
        physically_demanding_surgeries: value.physically_demanding_surgeries,
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
      "attachment;filename=" + "End-Of-Day-Surveys.xlsx"
    );
    workbook.xlsx.write(res);
  } catch (err) {
    return res.status(500).json({ message: err, isSuccess: false });
  }
};

module.exports = {
  triggerEndOfDaySurveyJSONWorkflow,
  getEndOfDaySurveys,
  exportEndOfDaySurveys,
};
