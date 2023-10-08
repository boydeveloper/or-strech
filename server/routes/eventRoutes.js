const eventController = require("../controllers/eventController");

const router = require("express").Router();
router.post("/createEvent", eventController.createEvent);
router.put("/updateEvent", eventController.updateEvent);
router.get("/getPreviousLogins", eventController.getPreviousLogins);
router.delete("/deleteEvent", eventController.deleteEvent);
router.get("/getPossibleEvents", eventController.getPossibleEvents);
router.get("/listEvents", eventController.listEvents);
router.get("/eventDetails", eventController.viewEventDetails);
router.get("/exportEvents", eventController.exportEvents);
module.exports = router;
