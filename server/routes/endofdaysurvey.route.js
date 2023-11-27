const endofDaySurveyController = require("../controllers/endofdaysurvey.controller");

const rateLimit = require("express-rate-limit");
const requestLimiter = rateLimit({
  windowMs: 24 * 60 * 60 * 1000, // 24 hours
  max: 1,
  keyGenerator: (req) => {
    return req.body.email || req.query.email;
  },
  handler: (req, res) => {
    res
      .status(429)
      .json({ error: "Too many requests, please try again later." });
  },
});
const router = require("express").Router();

router.post(
  "/submitEndOfDaySurvey",
  requestLimiter,
  endofDaySurveyController.triggerEndOfDaySurveyJSONWorkflow
);
router.get("/getEndOfDaySurveys", endofDaySurveyController.getEndOfDaySurveys);
module.exports = router;
