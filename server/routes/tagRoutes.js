const tagController = require("../controllers/tagController");
const router = require("express").Router();
router.post("/createTag", tagController.createTag);
router.put("/updateTag", tagController.updateTag);
router.delete("/deleteTag", tagController.deleteTag);
router.get("/tagDetails", tagController.viewTagDetails);
router.get("/listTags", tagController.listTags);
router.get("/listAllTags", tagController.listAllTags);

module.exports = router;
