const userController = require("../controllers/userController");

const router = require("express").Router();
router.get("/listAllUsers", userController.listAllUsers);
router.get("/listUsers", userController.listUsers);
router.delete("/deleteUser", userController.deleteUser);
router.put("/updateUser", userController.updateUser);

module.exports = router;
