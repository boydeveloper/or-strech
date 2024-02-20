const userController = require("../controllers/user.controller");

const router = require("express").Router();
router.get("/listUsers", userController.listUsers);
router.get("/listAllUsers", userController.listAllUsers);
router.delete("/deleteUser", userController.deleteUser);
router.put("/updateUser", userController.updateUser);
router.get("/userDetails", userController.viewUserDetails);
router.get("/export", userController.exportUser);
router.get("/search", userController.findUsers);
router.get("/searchUsers", userController.searchUsers);
router.post("/createUser", userController.addUser);
router.post("/sendOTP", userController.sendOTP);
router.post("/verifyOTP", userController.verifyOTP);

router.post("/changeUserPassword", userController.changeUserPassword);
module.exports = router;
