// const multer = require("multer");
// const { CloudinaryStorage } = require("multer-storage-cloudinary");
// const cloudinary = require("../config/cloudinary");

// const storage = new CloudinaryStorage({
//   cloudinary,
//   params: async (req, file) => ({
//     folder: "jan-sanwad/meeting-recordings",
//     resource_type: "video",          // Cloudinary uses "video" for audio too
//     allowed_formats: ["webm", "mp4", "mp3", "wav", "ogg", "m4a"],
//     public_id: "meeting_rec_" + Date.now() + "_" + Math.round(Math.random() * 1e9),
//   }),
// });

// const fileFilter = (req, file, cb) => {
//   const allowedTypes = [
//     "audio/webm",
//     "video/webm",
//     "audio/mp4",
//     "video/mp4",
//     "audio/mpeg",
//     "audio/wav",
//     "audio/ogg",
//     "audio/m4a",
//     "audio/x-m4a",
//   ];
//   if (allowedTypes.includes(file.mimetype)) cb(null, true);
//   else cb(new Error("Only audio/video files allowed ❌"), false);
// };

// module.exports = multer({
//   storage,
//   fileFilter,
//   limits: { fileSize: 50 * 1024 * 1024 }, // 50MB max
// }).single("meetingRecording");


const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("../config/cloudinary");

const storage = new CloudinaryStorage({
  cloudinary,
  params: async (req, file) => ({
    folder: "jan-sanwad/meeting-recordings",
    resource_type: "video",
    allowed_formats: ["webm", "mp4", "mp3", "wav", "ogg", "m4a"],
    public_id: "meeting_rec_" + Date.now() + "_" + Math.round(Math.random() * 1e9),
  }),
});

const fileFilter = (req, file, cb) => {
  const allowedTypes = [
    "audio/webm", "video/webm", "audio/mp4", "video/mp4",
    "audio/mpeg", "audio/wav", "audio/ogg", "audio/m4a", "audio/x-m4a",
  ];
  if (allowedTypes.includes(file.mimetype)) cb(null, true);
  else cb(new Error("Only audio/video files allowed ❌"), false);
};

// ✅ दोन्ही fields एकत्र handle — manual + blob
const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 50 * 1024 * 1024 },
}).fields([
  { name: "meetingRecording",     maxCount: 1 },  // manual upload
  { name: "meetingRecordingBlob", maxCount: 1 },  // auto recorder
]);

module.exports = upload;