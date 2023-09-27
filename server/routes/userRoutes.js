const userController = require("../controllers/userController");

const router = require("express").Router();
router.get("/listUsers", userController.listUsers);

module.exports = router;
