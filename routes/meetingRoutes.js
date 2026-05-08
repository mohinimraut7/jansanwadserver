const express = require("express");
const router  = express.Router();

const {
  getAllMeetings,
  getMeetingById,
  extractDecisions,
  createMeeting,
  updateMeeting,
    getNextMeetingId,
  deleteMeeting,
  updateSubject

} = require("../controllers/meetingController");

const uploadMeetingRecording = require("../middlewares/Uploadmeetingrecording");

router.get("/getMeetings",        getAllMeetings);
router.get("/getMeeting/:id",     getMeetingById);
router.post("/extractDecisions", extractDecisions);
router.post("/createMeeting",     uploadMeetingRecording, createMeeting);
router.put("/updateMeeting/:id",  uploadMeetingRecording, updateMeeting);
router.delete("/deleteMeeting/:id", deleteMeeting);
router.get("/getNextMeetingId",        getNextMeetingId);
router.put("/updateMeeting/updateSubject/:subject_id",uploadMeetingRecording, updateSubject);


module.exports = router;



