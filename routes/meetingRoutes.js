// const express = require("express");
// const router = express.Router();

// const {
//   getAllMeetings,
//   getMeetingById,
//   createMeeting,
//   updateMeeting,
//   deleteMeeting,
// } = require("../controllers/meetingController");

// router.get("/getMeetings", getAllMeetings);
// router.get("/getMeeting/:id", getMeetingById);
// router.post("/createMeeting", createMeeting);
// router.put("/updateMeeting/:id", updateMeeting);
// router.delete("/deleteMeeting/:id", deleteMeeting);

// module.exports = router;



const express = require("express");
const router  = express.Router();

const {
  getAllMeetings,
  getMeetingById,
  createMeeting,
  updateMeeting,
  deleteMeeting,
} = require("../controllers/meetingController");

const uploadMeetingRecording = require("../middlewares/Uploadmeetingrecording");

router.get("/getMeetings",        getAllMeetings);
router.get("/getMeeting/:id",     getMeetingById);
router.post("/createMeeting",     uploadMeetingRecording, createMeeting);
router.put("/updateMeeting/:id",  uploadMeetingRecording, updateMeeting);
router.delete("/deleteMeeting/:id", deleteMeeting);

module.exports = router;