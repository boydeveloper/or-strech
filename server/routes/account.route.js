const accountController = require("../controllers/account.controller");

const router = require("express").Router();
router.post("/loginAccount", accountController.loginAccount);
router.post("/loginAdminAccount", accountController.loginAdminAccount);
router.post("/sendToken", accountController.sendToken);
router.post("/sendOTP", accountController.sendOTP);
router.post("/verifyOTP", accountController.verifyOTP);
router.post("/checkIsNew", accountController.checkUserIsNew);

module.exports = router;
