const baselineSurveyController = require("../controllers/baselinesurvey.controller");

const router = require("express").Router();
// console.log(baselineSurveyController);
router.post("/sendBaselineSurvey", baselineSurveyController.sendEmail);
router.post("/sendBaselineSurvey", baselineSurveyController.sendEmail);
router.post(
  "/triggerBaselineSurveyWorkflow",
  baselineSurveyController.triggerBaselineSurveyJSONWorkflow
);
router.get("/getSurveyResponses", baselineSurveyController.getSurveyResponses);
router.get("/getBaselineSurveys", baselineSurveyController.getBaselineSurveys);
module.exports = router;
