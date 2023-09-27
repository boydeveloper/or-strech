const accountController = require("../controllers/accountController");

const router = require("express").Router();
router.post("/loginAccount", accountController.loginAccount);

module.exports = router;
