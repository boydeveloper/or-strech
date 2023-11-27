require("dotenv").config({ path: "../.env" });
const EndOfDaySurvey = require("../models/model").endofday_survey;
const triggerEndOfDaySurveyJSONWorkflow = async (req, res) => {
  await fetch(`${process.env.QUALTRICS_ENDODFDAY_TRIGGER}`, {
    method: "POST",
    body: req.body,
  }).then((response) => {
    return res.json(response.statusText);
  });
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
    return res
      .status(200)
      .json({
        endOfDaySurveys,
        totalNoOfSurveys,
        maxPageCount,
        isSuccess: true,
      });
  } catch (err) {
    return res.status(500).json({ message: err, isSuccess: false });
  }
};

module.exports = {
  triggerEndOfDaySurveyJSONWorkflow,
  getEndOfDaySurveys,
};
