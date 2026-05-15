const Meeting = require("../models/Meeting");
const cloudinary = require("../config/cloudinary"); // ← हे add करा

// @desc    Get all meetings
// @route   GET /api/getMeetings
const getAllMeetings = async (req, res) => {
  try {
    const { search } = req.query;
    const filter = search
      ? { meetingNumber: { $regex: search, $options: "i" } }
      : {};
    const meetings = await Meeting.find(filter).sort({ createdAt: -1 });
    res.status(200).json({ success: true, count: meetings.length, data: meetings });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Get single meeting by ID
// @route   GET /api/getMeeting/:id
const getMeetingById = async (req, res) => {
  try {
    const meeting = await Meeting.findById(req.params.id);
    if (!meeting)
      return res.status(404).json({ success: false, message: "Meeting not found" });
    res.status(200).json({ success: true, data: meeting });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const extractDecisions = async (req, res) => {
  try {
    const { transcript } = req.body;
    if (!transcript?.trim()) {
      return res.status(400).json({ success: false, message: "Transcript is empty" });
    }
    const response = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": process.env.ANTHROPIC_API_KEY,
        "anthropic-version": "2023-06-01",
      },
      body: JSON.stringify({
        model: "claude-sonnet-4-20250514",
        max_tokens: 1000,
        messages: [{
          role: "user",
          content: `You are a meeting minutes expert. Extract only the key decisions from the transcript below.

Rules:
- Write each decision on a new line with a number (1. 2. 3.)
- Decisions only, nothing else
- Reply in the same language as the transcript

Transcript:
${transcript}`
        }]
      }),
    });
    const data = await response.json();
    const decision = data.content?.map(b => b.text || "").join("") || "No decisions found.";
    res.json({ success: true, decision });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};


// @desc    Generate signed URL for private Cloudinary files
// @route   POST /api/getSignedFileUrl
// const getSignedFileUrl = async (req, res) => {
//   try {
//     const { fileUrl } = req.body;
//     if (!fileUrl) return res.status(400).json({ success: false, message: "fileUrl required" });

//     const resourceType = fileUrl.includes("/raw/upload/") ? "raw"
//       : fileUrl.includes("/image/upload/") ? "image"
//       : "raw";

//     // "/upload/" नंतरचं सगळं घ्या
//     const uploadIndex = fileUrl.indexOf("/upload/");
//     if (uploadIndex === -1) return res.status(400).json({ success: false, message: "Invalid URL" });

//     let afterUpload = fileUrl.slice(uploadIndex + 8);

//     // version strip (v1234567/)
//     afterUpload = afterUpload.replace(/^v\d+\//, "");

//     // extension detect करा original URL मधून
//     const extMatch = fileUrl.match(/\.(pdf|doc|docx|xls|xlsx|png|jpg|jpeg|gif|webp)(\?|$)/i);
//     const ext = extMatch ? extMatch[1].toLowerCase() : null;

//     // publicId: raw साठी — extension नसेल तर manual add करा
//     let publicId = afterUpload;
//     if (resourceType === "image" && ext) {
//       // image: extension काढा
//       publicId = afterUpload.replace(/\.[^/.]+$/, "");
//     }
//     // raw: afterUpload मध्ये extension आहे का check करा
//     if (resourceType === "raw" && ext && !afterUpload.endsWith(`.${ext}`)) {
//       publicId = `${afterUpload}.${ext}`;
//     }

//     console.log("🔍 resourceType:", resourceType);
//     console.log("🔍 publicId:", publicId);
//     console.log("🔍 ext:", ext);

//     const signedUrl = cloudinary.url(publicId, {
//       resource_type: resourceType,
//       type:          "upload",
//       sign_url:      true,
//       expires_at:    Math.floor(Date.now() / 1000) + 3600,
//       // format:        ext || undefined,  // ← format explicitly set करा
//     });

//     console.log("✅ signedUrl:", signedUrl);
//     res.json({ success: true, url: signedUrl });
//   } catch (err) {
//     res.status(500).json({ success: false, message: err.message });
//   }
// };




// const getSignedFileUrl = async (req, res) => {
//   try {
//     const { fileUrl } = req.body;
//     if (!fileUrl) return res.status(400).json({ success: false, message: "fileUrl required" });

//     const resourceType = fileUrl.includes("/raw/upload/") ? "raw"
//       : fileUrl.includes("/image/upload/") ? "image"
//       : "raw";

//     const uploadIndex = fileUrl.indexOf("/upload/");
//     if (uploadIndex === -1) return res.status(400).json({ success: false, message: "Invalid URL" });

//     let afterUpload = fileUrl.slice(uploadIndex + 8);
//     // version strip (v1234567/)
//     afterUpload = afterUpload.replace(/^v\d+\//, "");

//     // extension detect
//     const extMatch = fileUrl.match(/\.(pdf|doc|docx|xls|xlsx|png|jpg|jpeg|gif|webp)(\?|$)/i);
//     const ext = extMatch ? extMatch[1].toLowerCase() : null;

//     // ✅ publicId — सर्व cases मध्ये extension काढा
//     // Cloudinary.url() format parameter द्वारे extension add करतो
//     let publicId = afterUpload.replace(/\.(pdf|doc|docx|xls|xlsx|png|jpg|jpeg|gif|webp)$/i, "");

//     console.log("🔍 resourceType:", resourceType);
//     console.log("🔍 publicId:", publicId);
//     console.log("🔍 ext:", ext);

//     const signedUrl = cloudinary.url(publicId, {
//       resource_type: resourceType,
//       type:          "upload",
//       sign_url:      true,
//       expires_at:    Math.floor(Date.now() / 1000) + 3600,
//       format:        ext,   // ✅ Cloudinary एकदाच extension add करेल
//     });

//     console.log("✅ signedUrl:", signedUrl);
//     res.json({ success: true, url: signedUrl });
//   } catch (err) {
//     res.status(500).json({ success: false, message: err.message });
//   }
// };

// const getSignedFileUrl = async (req, res) => {
//   try {
//     const { fileUrl } = req.body;
//     if (!fileUrl) return res.status(400).json({ success: false, message: "fileUrl required" });

//     const apiKey    = process.env.CLOUDINARY_API_KEY;
//     const apiSecret = process.env.CLOUDINARY_API_SECRET;
//     const auth      = Buffer.from(`${apiKey}:${apiSecret}`).toString("base64");

//     console.log("🔁 Proxying:", fileUrl);

//     const cloudRes = await fetch(fileUrl, {
//       headers: { "Authorization": `Basic ${auth}` },
//     });

//     console.log("☁️ Cloudinary status:", cloudRes.status);

//     if (!cloudRes.ok) {
//       return res.status(cloudRes.status).json({
//         success: false,
//         message: `Cloudinary error: ${cloudRes.status}`,
//       });
//     }

//     const contentType = cloudRes.headers.get("content-type") || "application/octet-stream";
//     const buffer      = await cloudRes.arrayBuffer();
//     const fname       = fileUrl.split("/").pop()?.split("?")[0] || "document";

//     res.setHeader("Content-Type", contentType);
//     res.setHeader("Content-Disposition", `inline; filename="${fname}"`);
//     res.setHeader("Cache-Control", "no-cache");
//     res.send(Buffer.from(buffer));

//   } catch (err) {
//     console.error("❌ Proxy error:", err.message);
//     res.status(500).json({ success: false, message: err.message });
//   }
// };


const getSignedFileUrl = async (req, res) => {
  try {
    const { fileUrl } = req.body;
    if (!fileUrl) return res.status(400).json({ success: false, message: "fileUrl required" });

    // publicId आणि resourceType काढा
    const resourceType = fileUrl.includes("/raw/upload/") ? "raw"
      : fileUrl.includes("/image/upload/") ? "image" : "raw";

    const uploadIndex = fileUrl.indexOf("/upload/");
    let afterUpload = fileUrl.slice(uploadIndex + 8).replace(/^v\d+\//, "");
    // extension काढा publicId साठी
    const publicId = afterUpload.replace(/\.(pdf|doc|docx|xls|xlsx|png|jpg|jpeg|gif|webp)$/i, "");
    const extMatch = fileUrl.match(/\.(pdf|doc|docx|xls|xlsx|png|jpg|jpeg|gif|webp)(\?|$)/i);
    const ext = extMatch ? extMatch[1].toLowerCase() : "pdf";

    // ✅ Cloudinary Admin API — Download URL generate करा
    const timestamp  = Math.round(Date.now() / 1000);
    const apiSecret  = process.env.CLOUDINARY_API_SECRET;
    const apiKey     = process.env.CLOUDINARY_API_KEY;
    const cloudName  = process.env.CLOUDINARY_CLOUD_NAME;

    // Signature बनवा
    const crypto     = require("crypto");
    const sigString  = `expires_at=${timestamp + 3600}&public_id=${publicId}&resource_type=${resourceType}&type=upload${apiSecret}`;
    const signature  = crypto.createHash("sha256").update(sigString).digest("hex");

    const signedUrl  = `https://res.cloudinary.com/${cloudName}/${resourceType}/upload/s--${signature.slice(0,8)}--/v1/${publicId}.${ext}`;

    // ✅ Cloudinary API ने direct download URL
    const dlUrl = `https://api.cloudinary.com/v1_1/${cloudName}/${resourceType}/download?public_id=${publicId}&api_key=${apiKey}&timestamp=${timestamp}&signature=${signature}&resource_type=${resourceType}&type=upload`;

    console.log("🔁 Trying download URL:", dlUrl);

    const cloudRes = await fetch(dlUrl);
    console.log("☁️ Status:", cloudRes.status);

    if (!cloudRes.ok) {
      return res.status(cloudRes.status).json({ success: false, message: `Failed: ${cloudRes.status}` });
    }

    const contentType = cloudRes.headers.get("content-type") || "application/octet-stream";
    const buffer      = await cloudRes.arrayBuffer();
    const fname       = `${publicId.split("/").pop()}.${ext}`;

    res.setHeader("Content-Type", contentType);
    res.setHeader("Content-Disposition", `inline; filename="${fname}"`);
    res.setHeader("Cache-Control", "no-cache");
    res.send(Buffer.from(buffer));

  } catch (err) {
    console.error("❌ Error:", err.message);
    res.status(500).json({ success: false, message: err.message });
  }
};

const createMeeting = async (req, res) => {
  try {
    const {
      meetingNumber, meetingType, meetingDate, meetingTime, meetingAmpm,
      aiExtractedDecision,
    } = req.body;

    console.log("📥 req.body →", req.body);
    console.log("📁 req.files →", req.files);

    if (!meetingNumber || !meetingType) {
      return res.status(400).json({
        success: false,
        message: "meetingNumber and meetingType are required",
      });
    }

    // subjects parse
    let subjects = [];
    try { subjects = JSON.parse(req.body.subjects || "[]"); } catch { subjects = []; }

    // ✅ agendaFiles — Cloudinary URLs
    const agendaFiles = (req.files?.agendaFiles || []).map(f => f.path);

    const manualFile = req.files?.meetingRecording?.[0];
    const blobFile   = req.files?.meetingRecordingBlob?.[0];

    const meetingRecording     = manualFile ? manualFile.path : null;
    const meetingRecordingBlob = blobFile   ? blobFile.path   : null;

    const meeting = await Meeting.create({
      meetingNumber,
      meetingType,
      meetingDate:          meetingDate          || null,
      meetingTime:          meetingTime          || null,
      meetingAmpm:          meetingAmpm          || null,
      subjects:             subjects,
      agendaFiles:          agendaFiles,           // ✅ नवीन
      aiExtractedDecision:  aiExtractedDecision   || null,
      meetingRecording:     meetingRecording,
      meetingRecordingBlob: meetingRecordingBlob,
    });

    res.status(201).json({
      success: true,
      message: "Meeting created successfully",
      data: meeting,
    });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(409).json({
        success: false,
        message: `Meeting number '${req.body.meetingNumber}' already exists`,
      });
    }
    res.status(500).json({ success: false, message: error.message });
  }
};

const updateMeeting = async (req, res) => {
  try {
    const {
      meetingNumber, meetingType, meetingDate, meetingTime, meetingAmpm,
      aiExtractedDecision,
      existingRecordingUrl,
    } = req.body;

    console.log("📥 req.body →", req.body);
    console.log("📁 req.files →", req.files);

    // subjects parse
    let subjects = [];
    try { subjects = JSON.parse(req.body.subjects || "[]"); } catch { subjects = []; }

    // ✅ agendaFiles — existing + new merge, max 12
    let existingAgendaFiles = [];
    try { existingAgendaFiles = JSON.parse(req.body.existingAgendaFiles || "[]"); } catch { existingAgendaFiles = []; }
    const newAgendaFiles = (req.files?.agendaFiles || []).map(f => f.path);
    const agendaFiles = [...existingAgendaFiles, ...newAgendaFiles].slice(0, 12);

    const updateData = {
      meetingNumber, meetingType,
      meetingDate:         meetingDate         || null,
      meetingTime:         meetingTime         || null,
      meetingAmpm:         meetingAmpm         || null,
      subjects:            subjects,
      agendaFiles:         agendaFiles,          // ✅ नवीन
      aiExtractedDecision: aiExtractedDecision  || null,
    };

    const manualFile = req.files?.meetingRecording?.[0];
    const blobFile   = req.files?.meetingRecordingBlob?.[0];

    if (manualFile) {
      updateData.meetingRecording = manualFile.path;
    } else if (blobFile) {
      updateData.meetingRecordingBlob = blobFile.path;
    } else if (existingRecordingUrl) {
      updateData.meetingRecording = existingRecordingUrl;
    }

    const meeting = await Meeting.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true, runValidators: true }
    );

    if (!meeting)
      return res.status(404).json({ success: false, message: "Meeting not found" });

    res.json({ success: true, message: "Meeting updated successfully", data: meeting });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

// @desc    Delete meeting by ID
// @route   DELETE /api/deleteMeeting/:id
const deleteMeeting = async (req, res) => {
  try {
    const meeting = await Meeting.findByIdAndDelete(req.params.id);
    if (!meeting)
      return res.status(404).json({ success: false, message: "Meeting not found" });
    res.status(200).json({ success: true, message: "Meeting deleted successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// const getNextMeetingId = async (req, res) => {
//   try {
//     const now     = new Date();
//     const year    = now.getFullYear();
//     const month   = now.toLocaleString("en-US", { month: "short" }).toUpperCase();
//     const day     = String(now.getDate()).padStart(2, "0");
//     const prefix  = `MTG-${year}-${month}-${day}-`;

//     const startOfDay = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 0, 0, 0);
//     const endOfDay   = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 23, 59, 59);

//     const count = await Meeting.countDocuments({
//       meetingNumber: { $regex: `^${prefix}` },
//       createdAt: { $gte: startOfDay, $lte: endOfDay }
//     });

//     const seq       = String(count + 1).padStart(4, "0");
//     const meetingId = `${prefix}${seq}`;

//     res.json({ success: true, meetingId });
//   } catch (err) {
//     res.status(500).json({ success: false, message: err.message });
//   }
// };


const getNextMeetingId = async (req, res) => {
  try {
    const now    = new Date();
    const year   = now.getFullYear();
    const month  = now.toLocaleString("en-US", { month: "short" }).toUpperCase();
    const day    = String(now.getDate()).padStart(2, "0");
    const prefix = `MTG-${year}-${month}-${day}-`;

    // ✅ count नाही — existing max sequence शोधा
    const meetings = await Meeting.find(
      { meetingNumber: { $regex: `^MTG-${year}-${month}-` } },
      { meetingNumber: 1 }
    );

    let maxSeq = 0;
    meetings.forEach(m => {
      const parts = m.meetingNumber?.split("-");
      const seq   = parseInt(parts?.[parts.length - 1], 10);
      if (!isNaN(seq) && seq > maxSeq) maxSeq = seq;
    });

    const seq       = String(maxSeq + 1).padStart(4, "0");
    const meetingId = `${prefix}${seq}`;

    res.json({ success: true, meetingId });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

const updateSubject = async (req, res) => {
  try {
    const { subject_id } = req.params;

    let subjectData = {};
    try {
      subjectData = {
        subjectName:       req.body.subjectName       || null,
        subjectType:       req.body.subjectType       || null,
        decisionInMeeting: req.body.decisionInMeeting || null,
        tagTo:             JSON.parse(req.body.tagTo  || "[]"),
      };
    } catch { return res.status(400).json({ success: false, message: "Invalid tagTo format" }); }

    const meeting = await Meeting.findOneAndUpdate(
      { "subjects.subjectId": subject_id },
      {
        $set: {
          "subjects.$.subjectName":       subjectData.subjectName,
          "subjects.$.subjectType":       subjectData.subjectType,
          "subjects.$.decisionInMeeting": subjectData.decisionInMeeting,
          "subjects.$.tagTo":             subjectData.tagTo,
        },
      },
      { new: true, runValidators: true }
    );

    if (!meeting)
      return res.status(404).json({ success: false, message: "Subject not found" });

    const updatedSubject = meeting.subjects.find(s => s.subjectId === subject_id);
    res.json({ success: true, message: "Subject updated successfully", data: updatedSubject });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};





module.exports = {
  getAllMeetings,
  getMeetingById,
  createMeeting,
  updateMeeting,
  deleteMeeting,
  extractDecisions,
  getNextMeetingId,
  updateSubject,
  getSignedFileUrl,  // ← हे add करा
};