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


// const multer = require("multer");
// const { CloudinaryStorage } = require("multer-storage-cloudinary");
// const cloudinary = require("../config/cloudinary");

// const storage = new CloudinaryStorage({
//   cloudinary,
//   params: async (req, file) => ({
//     folder: "jan-sanwad/meeting-recordings",
//     resource_type: "video",
//     allowed_formats: ["webm", "mp4", "mp3", "wav", "ogg", "m4a"],
//     public_id: "meeting_rec_" + Date.now() + "_" + Math.round(Math.random() * 1e9),
//   }),
// });

// const fileFilter = (req, file, cb) => {
//   const allowedTypes = [
//     "audio/webm", "video/webm", "audio/mp4", "video/mp4",
//     "audio/mpeg", "audio/wav", "audio/ogg", "audio/m4a", "audio/x-m4a",
//   ];
//   if (allowedTypes.includes(file.mimetype)) cb(null, true);
//   else cb(new Error("Only audio/video files allowed ❌"), false);
// };

// // ✅ दोन्ही fields एकत्र handle — manual + blob
// const upload = multer({
//   storage,
//   fileFilter,
//   limits: { fileSize: 50 * 1024 * 1024 },
// }).fields([
//   { name: "meetingRecording",     maxCount: 1 },  // manual upload
//   { name: "meetingRecordingBlob", maxCount: 1 },  // auto recorder
// ]);

// module.exports = upload;



// const multer = require("multer");
// const { CloudinaryStorage } = require("multer-storage-cloudinary");
// const cloudinary = require("../config/cloudinary");

// const storage = new CloudinaryStorage({
//   cloudinary,
//   params: async (req, file) => {
//     const isImage = file.mimetype.startsWith("image/");
//     const isRaw = [
//       "application/pdf",
//       "application/msword",
//       "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
//     ].includes(file.mimetype);

//     return {
//       folder: isImage || isRaw
//         ? "jan-sanwad/agenda-files"
//         : "jan-sanwad/meeting-recordings",        // ✅ existing folder as it is
//       resource_type: isImage ? "image" : isRaw ? "raw" : "video",  // ✅ existing "video" as it is
//       allowed_formats: isImage
//         ? ["png", "jpg", "jpeg"]
//         : isRaw
//         ? ["pdf", "doc", "docx"]
//         : ["webm", "mp4", "mp3", "wav", "ogg", "m4a"],             // ✅ existing formats as it is
//       public_id: (isImage || isRaw ? "agenda_file_" : "meeting_rec_")  // ✅ existing prefix as it is
//         + Date.now() + "_" + Math.round(Math.random() * 1e9),
//     };
//   },
// });

// const fileFilter = (req, file, cb) => {
//   const allowedTypes = [
//     // 🎵 Audio/Video — existing as it is
//     "audio/webm", "video/webm", "audio/mp4", "video/mp4",
//     "audio/mpeg", "audio/wav", "audio/ogg", "audio/m4a", "audio/x-m4a",
//     // 📄 PDF — नवीन
//     "application/pdf",
//     // 📝 Word — नवीन
//     "application/msword",
//     "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
//     // 🖼️ Images — नवीन
//     "image/png", "image/jpg", "image/jpeg",
//   ];
//   if (allowedTypes.includes(file.mimetype)) cb(null, true);
//   else cb(new Error("Only audio/video, PDF, Word, PNG/JPG files allowed ❌"), false);
// };

// // ✅ दोन्ही fields एकत्र handle — manual + blob (existing as it is) + agendaFiles (नवीन)
// const upload = multer({
//   storage,
//   fileFilter,
//   limits: { fileSize: 50 * 1024 * 1024 },  // ✅ existing as it is
// }).fields([
//   { name: "meetingRecording",     maxCount: 1  },  // ✅ existing as it is
//   { name: "meetingRecordingBlob", maxCount: 1  },  // ✅ existing as it is
//   { name: "agendaFiles",          maxCount: 12 },  // ✅ नवीन
// ]);

// module.exports = upload;



// const multer = require("multer");
// const { CloudinaryStorage } = require("multer-storage-cloudinary");
// const cloudinary = require("../config/cloudinary");

// const storage = new CloudinaryStorage({
//   cloudinary,
//   params: async (req, file) => {
//     const isImage = file.mimetype.startsWith("image/");
//     const isPdf   = file.mimetype === "application/pdf";
//     const isWord  = [
//       "application/msword",
//       "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
//     ].includes(file.mimetype);
//     const isRaw = isPdf || isWord;

//     // ✅ format explicitly set करा — हेच fix आहे
//     let format;
//     if (isPdf)                                                                              format = "pdf";
//     else if (file.mimetype === "application/msword")                                       format = "doc";
//     else if (file.mimetype === "application/vnd.openxmlformats-officedocument.wordprocessingml.document") format = "docx";
//     else if (file.mimetype === "image/png")                                                format = "png";
//     else if (file.mimetype === "image/jpg" || file.mimetype === "image/jpeg")              format = "jpg";
//     else format = undefined; // audio/video साठी cloudinary स्वतः ठरवतो

//     return {
//       folder: isImage || isRaw
//         ? "jan-sanwad/agenda-files"
//         : "jan-sanwad/meeting-recordings",
//       resource_type: isImage ? "image" : isRaw ? "raw" : "video",
//       ...(format ? { format } : {}), // ✅ format असेल तरच pass करा
//       public_id: (isImage || isRaw ? "agenda_file_" : "meeting_rec_")
//         + Date.now() + "_" + Math.round(Math.random() * 1e9),
//     };
//   },
// });

// const fileFilter = (req, file, cb) => {
//   const allowedTypes = [
//     "audio/webm", "video/webm", "audio/mp4", "video/mp4",
//     "audio/mpeg", "audio/wav", "audio/ogg", "audio/m4a", "audio/x-m4a",
//     "application/pdf",
//     "application/msword",
//     "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
//     "image/png", "image/jpg", "image/jpeg",
//   ];
//   if (allowedTypes.includes(file.mimetype)) cb(null, true);
//   else cb(new Error("Only audio/video, PDF, Word, PNG/JPG files allowed ❌"), false);
// };

// const upload = multer({
//   storage,
//   fileFilter,
//   limits: { fileSize: 50 * 1024 * 1024 },
// }).fields([
//   { name: "meetingRecording",     maxCount: 1  },
//   { name: "meetingRecordingBlob", maxCount: 1  },
//   { name: "agendaFiles",          maxCount: 12 },
// ]);

// module.exports = upload;

// =========================

// const multer = require("multer");
// const { CloudinaryStorage } = require("multer-storage-cloudinary");
// const cloudinary = require("../config/cloudinary");

// const storage = new CloudinaryStorage({
//   cloudinary,
//   params: async (req, file) => {
//     const isImage = file.mimetype.startsWith("image/");
//     const isPdf   = file.mimetype === "application/pdf";
//     const isWord  = [
//       "application/msword",
//       "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
//     ].includes(file.mimetype);

//     let resource_type;
    
//     if (isImage)          resource_type = "image";
//     else if (isPdf)       resource_type = "image";   // ✅ PDF → raw
//     else if (isWord)      resource_type = "raw";   // ✅ Word → raw
//     else                  resource_type = "video";

//     let format;
//     if (isPdf)                                                                                            format = "pdf";
//     else if (file.mimetype === "application/msword")                                                      format = "doc";
//     else if (file.mimetype === "application/vnd.openxmlformats-officedocument.wordprocessingml.document") format = "docx";
//     else if (file.mimetype === "image/png")                                                               format = "png";
//     else if (file.mimetype === "image/jpg" || file.mimetype === "image/jpeg")                             format = "jpg";
//     else format = undefined;

//     return {
//       folder: (isImage || isPdf || isWord)
//         ? "jan-sanwad/agenda-files"
//         : "jan-sanwad/meeting-recordings",
//       resource_type,
//       type: "upload",        // ← इथे असायला हवे
//       ...(format ? { format } : {}),
//       public_id: (isImage || isPdf || isWord ? "agenda_file_" : "meeting_rec_")
//         + Date.now() + "_" + Math.round(Math.random() * 1e9),
//     };
//   },
// });

// const fileFilter = (req, file, cb) => {
//   const allowedTypes = [
//     "audio/webm", "video/webm", "audio/mp4", "video/mp4",
//     "audio/mpeg", "audio/wav", "audio/ogg", "audio/m4a", "audio/x-m4a",
//     "application/pdf",
//     "application/msword",
//     "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
//     "image/png", "image/jpg", "image/jpeg",
//   ];
//   if (allowedTypes.includes(file.mimetype)) cb(null, true);
//   else cb(new Error("Only audio/video, PDF, Word, PNG/JPG files allowed ❌"), false);
// };

// const upload = multer({
//   storage,
//   fileFilter,
//   limits: { fileSize: 50 * 1024 * 1024 },
// }).fields([
//   { name: "meetingRecording",     maxCount: 1  },
//   { name: "meetingRecordingBlob", maxCount: 1  },
//   { name: "agendaFiles",          maxCount: 12 },
// ]);

// module.exports = upload;




// const multer = require("multer");
// const { CloudinaryStorage } = require("multer-storage-cloudinary");
// const cloudinary = require("../config/cloudinary");

// const storage = new CloudinaryStorage({
//   cloudinary,
//   params: async (req, file) => {
//     const isImage = file.mimetype.startsWith("image/");
//     const isPdf   = file.mimetype === "application/pdf";
//     const isWord  = [
//       "application/msword",
//       "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
//     ].includes(file.mimetype);
//     const isExcel = [
//       "application/vnd.ms-excel",
//       "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
//     ].includes(file.mimetype);

//     // ✅ PDF, Word, Excel → raw  |  Images → image  |  Audio/Video → video
//     let resource_type;
//     if (isImage)                          resource_type = "image";
//     else if (isPdf || isWord || isExcel)  resource_type = "raw";   // ✅ PDF fix: was "image" now "raw"
//     else                                  resource_type = "video";

//     let format;
//     if (isPdf)                                                                                             format = "pdf";
//     else if (file.mimetype === "application/msword")                                                       format = "doc";
//     else if (file.mimetype === "application/vnd.openxmlformats-officedocument.wordprocessingml.document")  format = "docx";
//     else if (file.mimetype === "application/vnd.ms-excel")                                                 format = "xls";
//     else if (file.mimetype === "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet")        format = "xlsx";
//     else if (file.mimetype === "image/png")                                                                format = "png";
//     else if (file.mimetype === "image/jpg" || file.mimetype === "image/jpeg")                              format = "jpg";
//     else                                                                                                   format = undefined;

//     const isAgendaFile = isImage || isPdf || isWord || isExcel;

//     return {
//       folder:        isAgendaFile ? "jan-sanwad/agenda-files" : "jan-sanwad/meeting-recordings",
//       resource_type,
//       type:          "upload",
//       ...(format ? { format } : {}),
//       public_id:     (isAgendaFile ? "agenda_file_" : "meeting_rec_")
//                      + Date.now() + "_" + Math.round(Math.random() * 1e9),
//     };
//   },
// });

// const fileFilter = (req, file, cb) => {
//   const allowedTypes = [
//     // Audio / Video (meeting recordings)
//     "audio/webm", "video/webm", "audio/mp4", "video/mp4",
//     "audio/mpeg", "audio/wav", "audio/ogg", "audio/m4a", "audio/x-m4a",
//     // Documents
//     "application/pdf",
//     "application/msword",
//     "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
//     // Excel ✅ नवीन
//     "application/vnd.ms-excel",
//     "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
//     // Images
//     "image/png", "image/jpg", "image/jpeg",
//   ];
//   if (allowedTypes.includes(file.mimetype)) cb(null, true);
//   else cb(new Error("Only audio/video, PDF, Word, Excel, PNG/JPG files allowed ❌"), false);
// };

// const upload = multer({
//   storage,
//   fileFilter,
//   limits: { fileSize: 50 * 1024 * 1024 }, // 50 MB
// }).fields([
//   { name: "meetingRecording",     maxCount: 1  },
//   { name: "meetingRecordingBlob", maxCount: 1  },
//   { name: "agendaFiles",          maxCount: 12 },
// ]);

// module.exports = upload;




const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("../config/cloudinary");

const storage = new CloudinaryStorage({
  cloudinary,
  params: async (req, file) => {
    const isImage = file.mimetype.startsWith("image/");
    const isPdf   = file.mimetype === "application/pdf";
    const isWord  = [
      "application/msword",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    ].includes(file.mimetype);
    const isExcel = [
      "application/vnd.ms-excel",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    ].includes(file.mimetype);

    // ✅ PDF, Word, Excel → raw  |  Images → image  |  Audio/Video → video
    let resource_type;
    if (isImage)                          resource_type = "image";
    else if (isPdf || isWord || isExcel)  resource_type = "raw";   // ✅ PDF fix: was "image" now "raw"
    else                                  resource_type = "video";

    let format;
    if (isPdf)                                                                                             format = "pdf";
    else if (file.mimetype === "application/msword")                                                       format = "doc";
    else if (file.mimetype === "application/vnd.openxmlformats-officedocument.wordprocessingml.document")  format = "docx";
    else if (file.mimetype === "application/vnd.ms-excel")                                                 format = "xls";
    else if (file.mimetype === "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet")        format = "xlsx";
    else if (file.mimetype === "image/png")                                                                format = "png";
    else if (file.mimetype === "image/jpg" || file.mimetype === "image/jpeg")                              format = "jpg";
    else                                                                                                   format = undefined;

    const isAgendaFile = isImage || isPdf || isWord || isExcel;

    return {
      folder:        isAgendaFile ? "jan-sanwad/agenda-files" : "jan-sanwad/meeting-recordings",
      resource_type,
      type:          "upload",
      access_mode:   "public",   // ← हे add करा
      ...(format ? { format } : {}),
      public_id:     (isAgendaFile ? "agenda_file_" : "meeting_rec_")
                     + Date.now() + "_" + Math.round(Math.random() * 1e9),
    };
  },
});

const fileFilter = (req, file, cb) => {
  const allowedTypes = [
    // Audio / Video (meeting recordings)
    "audio/webm", "video/webm", "audio/mp4", "video/mp4",
    "audio/mpeg", "audio/wav", "audio/ogg", "audio/m4a", "audio/x-m4a",
    // Documents
    "application/pdf",
    "application/msword",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    // Excel ✅ नवीन
    "application/vnd.ms-excel",
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    // Images
    "image/png", "image/jpg", "image/jpeg",
  ];
  if (allowedTypes.includes(file.mimetype)) cb(null, true);
  else cb(new Error("Only audio/video, PDF, Word, Excel, PNG/JPG files allowed ❌"), false);
};

const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 50 * 1024 * 1024 }, // 50 MB
}).fields([
  { name: "meetingRecording",     maxCount: 1  },
  { name: "meetingRecordingBlob", maxCount: 1  },
  { name: "agendaFiles",          maxCount: 12 },
]);

module.exports = upload;