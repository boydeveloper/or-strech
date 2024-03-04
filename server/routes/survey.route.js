const surveyController = require("../controllers/survey.controller");
const router = require("express").Router();
router.post("/createSurvey", surveyController.createSurvey);
router.get("/getAllSurveys", surveyController.getAllSurveys);
router.put("/edit/:survey_id", surveyController.editSurvey);
router.delete("/:survey_id", surveyController.deleteSurvey);
module.exports = router;
