// const express = require("express");
// const router = express.Router();

// const {
//   addInwardApplication,getAllApplications
// } = require("../controllers/InwardApplication");

// const uploadInwardApplication = require("../middlewares/uploadInwardApplication");

// // POST API
// router.post(
//   "/inwardAdd",
//   uploadInwardApplication.single("documents"),
//   addInwardApplication
// );

// router.get(
//   "/getAllApplications",
//   getAllApplications
// );

// module.exports = router;


// routes/inwardRoutes.js

// =================================================

const express = require("express");
const router  = express.Router();

const {
  addInwardApplication,
  getAllApplications,
  replyApplication,          // ← NEW
} = require("../controllers/InwardApplication");

const uploadInwardApplication = require("../middlewares/uploadInwardApplication");

// ── Inward Add ──
router.post(
  "/inwardAdd",
  uploadInwardApplication.single("documents"),
  addInwardApplication
);

// ── Get All Applications ──
router.get(
  "/getAllApplications",
  getAllApplications
);

// ── Reply Application ──   POST /api/replyApplication
router.post(
  "/replyApplication",
  replyApplication
);

module.exports = router;