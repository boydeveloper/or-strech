const db = require("../models/model");
const Survey = db.survey;
const createSurvey = async (req, res) => {
  try {
    const surveyBody = req.body;
    const sObj = Array.from(Object.keys(surveyBody));
    if (sObj.indexOf("name") === -1 || sObj.indexOf("endpointLink") === -1) {
      return res.status(400).json({
        message:
          "The name of the survey and survey endpoints should be provided",
        isSuccess: false,
      });
    }

    console.log(
      sObj.indexOf("name") === -1 || sObj.indexOf("endpointLink") === -1
    );
    const survey = await Survey.create(surveyBody);
    if (survey)
      return res

        .status(200)
        .json({ message: "Survey successfully created", isSuccess: true });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: err, isSuccess: false });
  }
};
const getAllSurveys = async (req, res) => {
  try {
    const surveys = await Survey.findAll();

    return res.status(200).json({ surveys, isSuccess: true });
  } catch (err) {
    console.log(err, "kkk");
    return res.status(500).json({ message: err, isSuccess: false });
  }
};
const deleteSurvey = async (req, res) => {
  try {
    const surveyId = req.params.survey_id;

    if (surveyId === undefined || surveyId === null) {
      return res.status(400).json({
        message: "The survey ID hasn't been provided",
        isSuccess: false,
      });
    }

    const surveyExists = await Survey.findOne({ where: { id: surveyId } });

    if (!surveyExists) {
      return res.status(404).json({
        message: `Survey with ID ${surveyId} could not be found`,
        isSuccess: false,
      });
    }

    await Survey.destroy({ where: { id: surveyId } });

    return res.status(200).json({
      message: `Survey with ID ${surveyId} deleted successfully`,
      isSuccess: true,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: err, isSuccess: false });
  }
};

const editSurvey = async (req, res) => {
  try {
    console.log(req.params);
    const surveyId = req.params.survey_id;
    console.log(req.params);
    if (surveyId === undefined || surveyId === null) {
      return res.status(400).json({
        message: "The survey ID hasn't been provided",
        isSuccess: false,
      });
    }
    const surveyExists = await Survey.findOne({ where: { id: surveyId } });
    if (!surveyExists) {
      return res.status(404).json({
        message: `Survey with ID ${surveyId} could not be found`,
        isSuccess: false,
      });
    }
    // await Tag.update(req.body, { where: { name: req.query.name } });
    await Survey.update(req.body, { where: { id: surveyId } });
    return res
      .status(200)
      .json({ message: "Survey updated successfully", isSuccess: true });
  } catch (err) {
    console.log(err, "kkkkk");
    return res.status(500).json({ message: err, isSuccess: false });
  }
};

module.exports = {
  deleteSurvey,
  createSurvey,
  getAllSurveys,
  editSurvey,
};
