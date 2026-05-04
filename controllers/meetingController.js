const Meeting = require("../models/Meeting");

// @desc    Get all meetings (with optional search by meetingNumber)
// @route   GET /api/meetings
const getAllMeetings = async (req, res) => {
  try {
    const { search } = req.query;

    const filter = search
      ? { meetingNumber: { $regex: search, $options: "i" } }
      : {};

    const meetings = await Meeting.find(filter).sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: meetings.length,
      data: meetings,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Get single meeting by ID
// @route   GET /api/meetings/:id
const getMeetingById = async (req, res) => {
  try {
    const meeting = await Meeting.findById(req.params.id);

    if (!meeting) {
      return res.status(404).json({ success: false, message: "Meeting not found" });
    }

    res.status(200).json({ success: true, data: meeting });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Create new meeting
// @route   POST /api/meetings
// const createMeeting = async (req, res) => {
//   try {
//     const { meetingNumber, meetingType, subjectId, subjectType, subjectName } = req.body;

//     // Validation
//     if (!meetingNumber || !meetingType) {
//       return res.status(400).json({
//         success: false,
//         message: "meetingNumber and meetingType are required",
//       });
//     }

//     const meeting = await Meeting.create({
//       meetingNumber,
//       meetingType,
//       subjectId,
//       subjectType,
//       subjectName,
//     });

//     res.status(201).json({
//       success: true,
//       message: "Meeting created successfully",
//       data: meeting,
//     });
//   } catch (error) {
//     // Duplicate meetingNumber error
//     if (error.code === 11000) {
//       return res.status(409).json({
//         success: false,
//         message: `Meeting number '${req.body.meetingNumber}' already exists`,
//       });
//     }
//     res.status(500).json({ success: false, message: error.message });
//   }
// };

const createMeeting = async (req, res) => {
  try {
    const { meetingNumber, meetingType, meetingDate, meetingTime,meetingAmpm,subjectId, subjectType, subjectName } = req.body;

    // Validation
    if (!meetingNumber || !meetingType) {
      return res.status(400).json({
        success: false,
        message: "meetingNumber and meetingType are required",
      });
    }

    const meeting = await Meeting.create({
      meetingNumber,
      meetingType,
      meetingDate,
      meetingTime,
      meetingAmpm,
      subjectId,
      subjectType,
      subjectName,
    });

    res.status(201).json({
      success: true,
      message: "Meeting created successfully",
      data: meeting,
    });
  } catch (error) {
    // Duplicate meetingNumber error
    if (error.code === 11000) {
      return res.status(409).json({
        success: false,
        message: `Meeting number '${req.body.meetingNumber}' already exists`,
      });
    }
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Update meeting by ID
// @route   PUT /api/meetings/:id
// const updateMeeting = async (req, res) => {
//   try {
//     const meeting = await Meeting.findByIdAndUpdate(
//       req.params.id,
//       req.body,
//       { new: true, runValidators: true }
//     );

//     if (!meeting) {
//       return res.status(404).json({ success: false, message: "Meeting not found" });
//     }

//     res.status(200).json({
//       success: true,
//       message: "Meeting updated successfully",
//       data: meeting,
//     });
//   } catch (error) {
//     res.status(500).json({ success: false, message: error.message });
//   }
// };



const updateMeeting = async (req, res) => {
  try {
    const {
      meetingNumber, meetingType, meetingDate,
      meetingTime, meetingAmpm,          // ← include this
      subjectId, subjectType, subjectName,
    } = req.body;

    const meeting = await Meeting.findByIdAndUpdate(
      req.params.id,
      {
        meetingNumber, meetingType, meetingDate,
        meetingTime, meetingAmpm,        // ← update this
        subjectId, subjectType, subjectName,
      },
      { new: true, runValidators: true }
    );

    if (!meeting) return res.status(404).json({ success: false, message: "Meeting not found" });
    res.json({ success: true, data: meeting });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

// @desc    Delete meeting by ID
// @route   DELETE /api/meetings/:id
const deleteMeeting = async (req, res) => {
  try {
    const meeting = await Meeting.findByIdAndDelete(req.params.id);

    if (!meeting) {
      return res.status(404).json({ success: false, message: "Meeting not found" });
    }

    res.status(200).json({
      success: true,
      message: "Meeting deleted successfully",
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = {
  getAllMeetings,
  getMeetingById,
  createMeeting,
  updateMeeting,
  deleteMeeting,
};