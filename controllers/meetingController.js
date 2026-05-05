// const Meeting = require("../models/Meeting");

// // @desc    Get all meetings (with optional search by meetingNumber)
// // @route   GET /api/meetings
// const getAllMeetings = async (req, res) => {
//   try {
//     const { search } = req.query;

//     const filter = search
//       ? { meetingNumber: { $regex: search, $options: "i" } }
//       : {};

//     const meetings = await Meeting.find(filter).sort({ createdAt: -1 });

//     res.status(200).json({
//       success: true,
//       count: meetings.length,
//       data: meetings,
//     });
//   } catch (error) {
//     res.status(500).json({ success: false, message: error.message });
//   }
// };

// // @desc    Get single meeting by ID
// // @route   GET /api/meetings/:id
// const getMeetingById = async (req, res) => {
//   try {
//     const meeting = await Meeting.findById(req.params.id);

//     if (!meeting) {
//       return res.status(404).json({ success: false, message: "Meeting not found" });
//     }

//     res.status(200).json({ success: true, data: meeting });
//   } catch (error) {
//     res.status(500).json({ success: false, message: error.message });
//   }
// };

// // @desc    Create new meeting
// // @route   POST /api/meetings
// // const createMeeting = async (req, res) => {
// //   try {
// //     const { meetingNumber, meetingType, subjectId, subjectType, subjectName } = req.body;

// //     // Validation
// //     if (!meetingNumber || !meetingType) {
// //       return res.status(400).json({
// //         success: false,
// //         message: "meetingNumber and meetingType are required",
// //       });
// //     }

// //     const meeting = await Meeting.create({
// //       meetingNumber,
// //       meetingType,
// //       subjectId,
// //       subjectType,
// //       subjectName,
// //     });

// //     res.status(201).json({
// //       success: true,
// //       message: "Meeting created successfully",
// //       data: meeting,
// //     });
// //   } catch (error) {
// //     // Duplicate meetingNumber error
// //     if (error.code === 11000) {
// //       return res.status(409).json({
// //         success: false,
// //         message: `Meeting number '${req.body.meetingNumber}' already exists`,
// //       });
// //     }
// //     res.status(500).json({ success: false, message: error.message });
// //   }
// // };

// const createMeeting = async (req, res) => {
//   try {
//     const { meetingNumber, meetingType, meetingDate, meetingTime,meetingAmpm,subjectId, subjectType, subjectName } = req.body;

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
//       meetingDate,
//       meetingTime,
//       meetingAmpm,
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

// // @desc    Update meeting by ID
// // @route   PUT /api/meetings/:id
// // const updateMeeting = async (req, res) => {
// //   try {
// //     const meeting = await Meeting.findByIdAndUpdate(
// //       req.params.id,
// //       req.body,
// //       { new: true, runValidators: true }
// //     );

// //     if (!meeting) {
// //       return res.status(404).json({ success: false, message: "Meeting not found" });
// //     }

// //     res.status(200).json({
// //       success: true,
// //       message: "Meeting updated successfully",
// //       data: meeting,
// //     });
// //   } catch (error) {
// //     res.status(500).json({ success: false, message: error.message });
// //   }
// // };



// const updateMeeting = async (req, res) => {
//   try {
//     const {
//       meetingNumber, meetingType, meetingDate,
//       meetingTime, meetingAmpm,          // ← include this
//       subjectId, subjectType, subjectName,
//     } = req.body;

//     const meeting = await Meeting.findByIdAndUpdate(
//       req.params.id,
//       {
//         meetingNumber, meetingType, meetingDate,
//         meetingTime, meetingAmpm,        // ← update this
//         subjectId, subjectType, subjectName,
//       },
//       { new: true, runValidators: true }
//     );

//     if (!meeting) return res.status(404).json({ success: false, message: "Meeting not found" });
//     res.json({ success: true, data: meeting });
//   } catch (err) {
//     res.status(400).json({ success: false, message: err.message });
//   }
// };

// // @desc    Delete meeting by ID
// // @route   DELETE /api/meetings/:id
// const deleteMeeting = async (req, res) => {
//   try {
//     const meeting = await Meeting.findByIdAndDelete(req.params.id);

//     if (!meeting) {
//       return res.status(404).json({ success: false, message: "Meeting not found" });
//     }

//     res.status(200).json({
//       success: true,
//       message: "Meeting deleted successfully",
//     });
//   } catch (error) {
//     res.status(500).json({ success: false, message: error.message });
//   }
// };

// module.exports = {
//   getAllMeetings,
//   getMeetingById,
//   createMeeting,
//   updateMeeting,
//   deleteMeeting,
// };







// const Meeting = require("../models/Meeting");

// // @desc    Get all meetings (with optional search by meetingNumber)
// // @route   GET /api/meetings
// const getAllMeetings = async (req, res) => {
//   try {
//     const { search } = req.query;

//     const filter = search
//       ? { meetingNumber: { $regex: search, $options: "i" } }
//       : {};

//     const meetings = await Meeting.find(filter).sort({ createdAt: -1 });

//     res.status(200).json({
//       success: true,
//       count: meetings.length,
//       data: meetings,
//     });
//   } catch (error) {
//     res.status(500).json({ success: false, message: error.message });
//   }
// };

// // @desc    Get single meeting by ID
// // @route   GET /api/meetings/:id
// const getMeetingById = async (req, res) => {
//   try {
//     const meeting = await Meeting.findById(req.params.id);

//     if (!meeting) {
//       return res.status(404).json({ success: false, message: "Meeting not found" });
//     }

//     res.status(200).json({ success: true, data: meeting });
//   } catch (error) {
//     res.status(500).json({ success: false, message: error.message });
//   }
// };

// // @desc    Create new meeting
// // @route   POST /api/meetings
// const createMeeting = async (req, res) => {
//   try {
//     const {
//       meetingNumber,
//       meetingType,
//       meetingDate,
//       meetingTime,
//       meetingAmpm,
//       subjectId,
//       subjectType,
//       subjectName,
//       // 3 new fields
//       decisionInMeeting,
//       aiExtractedDecision,
//       meetingRecording,
//     } = req.body;

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
//       meetingDate,
//       meetingTime,
//       meetingAmpm,
//       subjectId,
//       subjectType,
//       subjectName,
//       // 3 new fields
//       decisionInMeeting:    decisionInMeeting    || null,
//       aiExtractedDecision:  aiExtractedDecision  || null,
//       meetingRecording:     meetingRecording      || null,
//     });

//     res.status(201).json({
//       success: true,
//       message: "Meeting created successfully",
//       data: meeting,
//     });
//   } catch (error) {
//     if (error.code === 11000) {
//       return res.status(409).json({
//         success: false,
//         message: `Meeting number '${req.body.meetingNumber}' already exists`,
//       });
//     }
//     res.status(500).json({ success: false, message: error.message });
//   }
// };

// // @desc    Update meeting by ID
// // @route   PUT /api/meetings/:id
// const updateMeeting = async (req, res) => {
//   try {
//     const {
//       meetingNumber,
//       meetingType,
//       meetingDate,
//       meetingTime,
//       meetingAmpm,
//       subjectId,
//       subjectType,
//       subjectName,
//       // 3 new fields
//       decisionInMeeting,
//       aiExtractedDecision,
//       meetingRecording,
//     } = req.body;

//     const meeting = await Meeting.findByIdAndUpdate(
//       req.params.id,
//       {
//         meetingNumber,
//         meetingType,
//         meetingDate,
//         meetingTime,
//         meetingAmpm,
//         subjectId,
//         subjectType,
//         subjectName,
//         // 3 new fields
//         decisionInMeeting:   decisionInMeeting   || null,
//         aiExtractedDecision: aiExtractedDecision  || null,
//         meetingRecording:    meetingRecording      || null,
//       },
//       { new: true, runValidators: true }
//     );

//     if (!meeting) {
//       return res.status(404).json({ success: false, message: "Meeting not found" });
//     }

//     res.json({ success: true, message: "Meeting updated successfully", data: meeting });
//   } catch (err) {
//     res.status(400).json({ success: false, message: err.message });
//   }
// };

// // @desc    Delete meeting by ID
// // @route   DELETE /api/meetings/:id
// const deleteMeeting = async (req, res) => {
//   try {
//     const meeting = await Meeting.findByIdAndDelete(req.params.id);

//     if (!meeting) {
//       return res.status(404).json({ success: false, message: "Meeting not found" });
//     }

//     res.status(200).json({
//       success: true,
//       message: "Meeting deleted successfully",
//     });
//   } catch (error) {
//     res.status(500).json({ success: false, message: error.message });
//   }
// };

// module.exports = {
//   getAllMeetings,
//   getMeetingById,
//   createMeeting,
//   updateMeeting,
//   deleteMeeting,
// };



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

// @desc    Create new meeting
// @route   POST /api/createMeeting
// Note: uses uploadMeetingRecording middleware — sends multipart/form-data
const createMeeting = async (req, res) => {
  try {
    const {
      meetingNumber, meetingType, meetingDate, meetingTime, meetingAmpm,
      subjectId, subjectType, subjectName,
      decisionInMeeting, aiExtractedDecision,
    } = req.body;

    if (!meetingNumber || !meetingType) {
      return res.status(400).json({
        success: false,
        message: "meetingNumber and meetingType are required",
      });
    }

    // If file was uploaded via multer → Cloudinary URL; else null
    const meetingRecording = req.file ? req.file.path : null;

    const meeting = await Meeting.create({
      meetingNumber,
      meetingType,
      meetingDate:          meetingDate    || null,
      meetingTime:          meetingTime    || null,
      meetingAmpm:          meetingAmpm    || null,
      subjectId:            subjectId      || null,
      subjectType:          subjectType    || null,
      subjectName:          subjectName    || null,
      decisionInMeeting:    decisionInMeeting   || null,
      aiExtractedDecision:  aiExtractedDecision  || null,
      meetingRecording:     meetingRecording,
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

// @desc    Update meeting by ID
// @route   PUT /api/updateMeeting/:id
// Note: uses uploadMeetingRecording middleware — sends multipart/form-data
const updateMeeting = async (req, res) => {
  try {
    const {
      meetingNumber, meetingType, meetingDate, meetingTime, meetingAmpm,
      subjectId, subjectType, subjectName,
      decisionInMeeting, aiExtractedDecision,
    } = req.body;

    // Build update object
    const updateData = {
      meetingNumber, meetingType,
      meetingDate:         meetingDate    || null,
      meetingTime:         meetingTime    || null,
      meetingAmpm:         meetingAmpm    || null,
      subjectId:           subjectId      || null,
      subjectType:         subjectType    || null,
      subjectName:         subjectName    || null,
      decisionInMeeting:   decisionInMeeting  || null,
      aiExtractedDecision: aiExtractedDecision || null,
    };

    // Only update meetingRecording if a new file was uploaded
    if (req.file) {
      updateData.meetingRecording = req.file.path; // Cloudinary URL
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

module.exports = {
  getAllMeetings,
  getMeetingById,
  createMeeting,
  updateMeeting,
  deleteMeeting,
};