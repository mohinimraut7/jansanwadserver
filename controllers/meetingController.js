



const Meeting = require("../models/Meeting");

// @desc    Get all meetings (with optional search by meetingNumber)
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

    // ✅ subjects array parse from FormData (decisionInMeeting & tagTo now live inside each subject)
    let subjects = [];
    try {
      subjects = JSON.parse(req.body.subjects || "[]");
    } catch { subjects = []; }

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
      aiExtractedDecision:  aiExtractedDecision  || null,
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

    // ✅ subjects array parse from FormData (decisionInMeeting & tagTo now live inside each subject)
    let subjects = [];
    try {
      subjects = JSON.parse(req.body.subjects || "[]");
    } catch { subjects = []; }

    const updateData = {
      meetingNumber, meetingType,
      meetingDate:         meetingDate         || null,
      meetingTime:         meetingTime         || null,
      meetingAmpm:         meetingAmpm         || null,
      subjects:            subjects,
      aiExtractedDecision: aiExtractedDecision || null,
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






const getNextMeetingId = async (req, res) => {
  try {
    const now     = new Date();
    const year    = now.getFullYear();
    const month   = now.toLocaleString("en-US", { month: "short" }).toUpperCase();
    const day     = String(now.getDate()).padStart(2, "0");
    const prefix  = `MTG-${year}-${month}-${day}-`;

    // त्याच दिवशीच्या meetings count कर
    const startOfDay = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 0, 0, 0);
    const endOfDay   = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 23, 59, 59);

    const count = await Meeting.countDocuments({
      meetingNumber: { $regex: `^${prefix}` },
      createdAt: { $gte: startOfDay, $lte: endOfDay }
    });

    const seq       = String(count + 1).padStart(4, "0");
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
      // Form fields come as strings in FormData
      subjectData = {
        subjectName:       req.body.subjectName       || null,
        subjectType:       req.body.subjectType       || null,
        decisionInMeeting: req.body.decisionInMeeting || null,
        tagTo:             JSON.parse(req.body.tagTo  || "[]"),
      };
    } catch { return res.status(400).json({ success: false, message: "Invalid tagTo format" }); }

    // Use positional operator $ to update only the matched subject
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
  extractDecisions, // ✅ हे add करा
  getNextMeetingId,
  updateSubject
};





