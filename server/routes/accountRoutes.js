const accountController = require("../controllers/accountController");

const router = require("express").Router();

router.post("/loginAccount", accountController.loginAccount);
router.post("/loginAdminAccount", accountController.loginAdminAccount);

module.exports = router;
