const userController = require("../controllers/userController");

const router = require("express").Router();
router.get("/listAllUsers", userController.listAllUsers);
router.get("/listUsers", userController.listUsers);
router.post("/createUser", userController.addUser);

router.delete("/deleteUser", userController.deleteUser);
router.put("/updateUser", userController.updateUser);
router.get("/userDetails", userController.viewUserDetails);
router.get("/exportUsers", userController.exportUser);
router.get("/search", userController.findUsers);
module.exports = router;

// const errors = validateFormData();
// if (Object.keys(errors).length > 0) {
//   toast.error("Please fix the following errors:");
//   setErrors(errors);
//   setLoading(false);
//   return;
// }
