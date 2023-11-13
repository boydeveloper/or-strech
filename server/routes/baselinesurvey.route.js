const baselineSurveyController = require("../controllers/baselinesurvey.controller");

const router = require("express").Router();
router.post("/sendBaselineSurvey", baselineSurveyController.sendEmail);

module.exports = router;
