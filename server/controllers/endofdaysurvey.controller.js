require("dotenv").config({ path: "../.env" });
const Op = require("sequelize").Op;
const excelJs = require("exceljs");
const moment = require("moment");
const axios = require("axios");

const EndOfDaySurvey = require("../models/model").endofday_survey;
const User = require("../models/model").users;
const triggerEndOfDaySurveyJSONWorkflow = async (req, res) => {
  try {
    const response = await axios.post(
      `https://iad1.qualtrics.com/inbound-event/v1/events/json/triggers?urlTokenId=${process.env.QUALTRICS_ENDOFDAY_URLTOKENID}`,
      { data: req.body }
    );
    return res.status(200).json({ data: response.data, isSuccess: true });
  } catch (err) {
    return res.status(500).json({ message: err, isSuccess: false });
  }
};
const exportEndOfDaySurveys = async (req, res) => {
  try {
    const idArray = req.query.ids;
    let ids;
    if (idArray) ids = JSON.parse(idArray);
    let endofday_surveys;
    const workbook = new excelJs.Workbook();
    const sheet = workbook.addWorksheet("endofday_survey");
    sheet.columns = [
      { header: "ID", key: "id" },
      { header: "User Email", key: "email" },
      { header: "Day", key: "day" },
      {
        header: "Mentally Demanding Surgeries",
        key: "mentaly_demanding_surgeries",
      },
      {
        header: "Physically Demanding Surgeries",
        key: "physically_demanding_surgeries",
      },
      { header: "Complex Surgeries", key: "complex_surgeries" },
      { header: "Difficult Surgeries", key: "difficult_surgeries" },
      { header: "Impact (Physical)", key: "impact_physical" },
      { header: "Impact (Mental)", key: "impact_mental" },
      { header: "Impact (Pain)", key: "impact_pain" },
      { header: "Impact (Fatigue)", key: "impact_fatigue" },
      { header: "Distracting", key: "distracting" },
      { header: "Flow Impact", key: "flow_impact" },
      { header: "Comment", key: "comment" },
      { header: "Created At", key: "createdAt" },
      { header: "Updated At", key: "updatedAt" },
    ];
    if (ids) {
      endofday_surveys = await EndOfDaySurvey.findAll({
        where: {
          id: {
            [Op.in]: ids,
          },
        },
        include: [{ model: User, as: "user", attributes: ["email"] }],
      });
    } else {
      endofday_surveys = await EndOfDaySurvey.findAll({
        include: [{ model: User, as: "user", attributes: ["email"] }],
      });
    }
    await endofday_surveys.map((value) => {
      sheet.addRow({
        id: value.id,
        email: value.user.email,
        day: value.day,
        mentaly_demanding_surgeries: value.mentaly_demanding_surgeries,
        physically_demanding_surgeries: value.physically_demanding_surgeries,
        complex_surgeries: value.complex_surgeries,
        difficult_surgeries: value.difficult_surgeries,
        impact_physical: value.impact_physical,
        impact_mental: value.impact_mental,
        impact_pain: value.impact_pain,
        impact_fatigue: value.impact_fatigue,
        distracting: value.distracting,
        flow_impact: value.flow_impact,
        comment: value.comment,
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
      "attachment;filename=" + "Endofday-Surveys.xlsx"
    );
    workbook.xlsx.write(res);
  } catch (err) {
    return res.status(500).json({ message: err, isSuccess: false });
  }
};
const getEndOfDaySurveys = async (req, res) => {
  try {
    let page_no = Number(req.query.page_no) || 1;
    let no_of_surveys = Number(req.query.no_of_surveys) || 10;
    let order = req.query.order || "DESC";
    let sortBy = req.query.sortBy || "createdAt";

    let day = req.query.day;
    let mentaly_demanding_surgeries = req.query.mentaly_demanding_surgeries;
    let physically_demanding_surgeries =
      req.query.physically_demanding_surgeries;
    let complex_surgeries = req.query.complex_surgeries;
    let difficult_surgeries = req.query.difficult_surgeries;
    let impact_physical = req.query.impact_physical;
    let impact_mental = req.query.impact_mental;
    let impact_pain = req.query.impact_pain;
    let impact_fatigue = req.query.impact_fatigue;
    let distracting = req.query.distracting;
    let flow_impact = req.query.flow_impact;
    let comment = req.query.comment;
    let createdAt = req.query.createdAt;
    let updatedAt = req.query.updatedAt;

    // Add new parameters
    let userid = req.query.userid;
    let id = req.query.id;

    const totalNoOfSurveys = await EndOfDaySurvey.count({
      where: {
        [Op.and]: [
          day !== undefined && day !== "" && { day: { [Op.eq]: day } },
          mentaly_demanding_surgeries !== undefined &&
            mentaly_demanding_surgeries !== "" && {
              mentaly_demanding_surgeries: {
                [Op.eq]: mentaly_demanding_surgeries,
              },
            },
          physically_demanding_surgeries !== undefined &&
            physically_demanding_surgeries !== "" && {
              physically_demanding_surgeries: {
                [Op.eq]: physically_demanding_surgeries,
              },
            },
          complex_surgeries !== undefined &&
            complex_surgeries !== "" && {
              complex_surgeries: { [Op.eq]: complex_surgeries },
            },
          difficult_surgeries !== undefined &&
            difficult_surgeries !== "" && {
              difficult_surgeries: { [Op.eq]: difficult_surgeries },
            },
          impact_physical !== undefined &&
            impact_physical !== "" && {
              impact_physical: { [Op.eq]: impact_physical },
            },
          impact_mental !== undefined &&
            impact_mental !== "" && {
              impact_mental: { [Op.eq]: impact_mental },
            },
          impact_pain !== undefined &&
            impact_pain !== "" && {
              impact_pain: { [Op.eq]: impact_pain },
            },
          impact_fatigue !== undefined &&
            impact_fatigue !== "" && {
              impact_fatigue: { [Op.eq]: impact_fatigue },
            },
          distracting !== undefined &&
            distracting !== "" && {
              distracting: { [Op.eq]: distracting },
            },
          flow_impact !== undefined &&
            flow_impact !== "" && {
              flow_impact: { [Op.eq]: flow_impact },
            },
          comment !== undefined &&
            comment !== "" && { comment: { [Op.eq]: comment } },
          userid !== undefined &&
            userid !== "" && { userid: { [Op.eq]: userid } },
          id !== undefined && id !== "" && { id: { [Op.eq]: id } },
        ],
      },
    });

    const endOfDaySurveys = await EndOfDaySurvey.findAll({
      offset: (page_no - 1) * no_of_surveys,
      limit: no_of_surveys,
      order: [[sortBy, order]],
      where: {
        [Op.and]: [
          day !== undefined && day !== "" && { day: { [Op.eq]: day } },
          mentaly_demanding_surgeries !== undefined &&
            mentaly_demanding_surgeries !== "" && {
              mentaly_demanding_surgeries: {
                [Op.eq]: mentaly_demanding_surgeries,
              },
            },
          physically_demanding_surgeries !== undefined &&
            physically_demanding_surgeries !== "" && {
              physically_demanding_surgeries: {
                [Op.eq]: physically_demanding_surgeries,
              },
            },
          complex_surgeries !== undefined &&
            complex_surgeries !== "" && {
              complex_surgeries: { [Op.eq]: complex_surgeries },
            },
          difficult_surgeries !== undefined &&
            difficult_surgeries !== "" && {
              difficult_surgeries: { [Op.eq]: difficult_surgeries },
            },
          impact_physical !== undefined &&
            impact_physical !== "" && {
              impact_physical: { [Op.eq]: impact_physical },
            },
          impact_mental !== undefined &&
            impact_mental !== "" && {
              impact_mental: { [Op.eq]: impact_mental },
            },
          impact_pain !== undefined &&
            impact_pain !== "" && {
              impact_pain: { [Op.eq]: impact_pain },
            },
          impact_fatigue !== undefined &&
            impact_fatigue !== "" && {
              impact_fatigue: { [Op.eq]: impact_fatigue },
            },
          distracting !== undefined &&
            distracting !== "" && {
              distracting: { [Op.eq]: distracting },
            },
          flow_impact !== undefined &&
            flow_impact !== "" && {
              flow_impact: { [Op.eq]: flow_impact },
            },
          comment !== undefined &&
            comment !== "" && { comment: { [Op.eq]: comment } },
          userid !== undefined &&
            userid !== "" && { userid: { [Op.eq]: userid } },
          id !== undefined && id !== "" && { id: { [Op.eq]: id } },
        ],
      },
    });

    const maxPageCount = Math.ceil(totalNoOfSurveys / no_of_surveys);

    return res.status(200).json({
      endOfDaySurveys,
      totalNoOfSurveys,
      isSuccess: true,
      maxPageCount,
    });
  } catch (err) {
    return res.status(500).json({ message: err.message, isSuccess: false });
  }
};

module.exports = {
  triggerEndOfDaySurveyJSONWorkflow,
  getEndOfDaySurveys,
  exportEndOfDaySurveys,
};
