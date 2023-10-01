const linkController = require("../controllers/linkController")
const router = require("express").Router()
router.post("/createLink", linkController.createLink)
router.put("/updateLink", linkController.updateLink)
router.delete("/deleteLink", linkController.deleteLink)
router.get("/linkDetails", linkController.linkDetails)
router.get("/possibleLinks", linkController.possibleLinks)

module.exports = router