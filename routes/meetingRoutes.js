const express = require("express");
const router = express.Router();

const {
  getAllMeetings,
  getMeetingById,
  createMeeting,
  updateMeeting,
  deleteMeeting,
} = require("../controllers/meetingController");

router.get("/getMeetings", getAllMeetings);
router.get("/getMeeting/:id", getMeetingById);
router.post("/createMeeting", createMeeting);
router.put("/updateMeeting/:id", updateMeeting);
router.delete("/deleteMeeting/:id", deleteMeeting);

module.exports = router;