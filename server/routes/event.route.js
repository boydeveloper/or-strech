const eventController = require("../controllers/event.controller");

const router = require("express").Router();

router.post("/createEvent", eventController.createEvent);
router.put("/updateEvent", eventController.updateEvent);
router.delete("/deleteEvent", eventController.deleteEvent);
router.get("/getPossibleEvents", eventController.getPossibleEvents);

router.get("/listEvents", eventController.listEvents);

router.get("/eventDetails", eventController.viewEventDetails);
router.get("/export", eventController.exportEvents);
router.get("/getPreviousLogins", eventController.getPreviousLogins);

module.exports = router;
