const eventController = require("../controllers/eventController");

const router = require("express").Router();
router.post("/createEvent", eventController.createEvent);
router.put("/updateEvent", eventController.updateEvent);
router.delete("/deleteEvent", eventController.deleteEvent);
router.get("/getPossibleEvents", eventController.getPossibleEvents);
router.get("/listEvents", eventController.listEvents);
router.get("/eventDetails", eventController.viewEventDetails);
module.exports = router;
