const mongoose = require("mongoose");

const meetingSchema = new mongoose.Schema(
  {
    meetingNumber: {
      type: String,
      required: [true, "Meeting Number is required"],
      trim: true,
      unique: true,
    },
    meetingType: {
      type: String,
      required: [true, "Meeting Type is required"],
      enum: ["General Body", "Standing Committee"],
    },
    meetingDate: {
      type: Date,
      default: null,
    },
    meetingTime: {
      type: String,
      trim: true,
      default: null,
    },
    meetingAmpm: {
      type: String,
      enum: ["AM", "PM", null],
      default: null,
    },
      agendaFiles: {
      type: [String],
      default: [],
      validate: {
        validator: (arr) => arr.length <= 12,
        message: "Maximum 12 files allowed for agenda",
      }
    },
    subjects: [
  {
    subjectId: { type: String, trim: true, default: null },
    subjectType: {
      type: String,
      enum: ["General", "Administrative and Financial Approval", "Contract Approval", null],
      default: null,
    },
    subjectName: { type: String, trim: true, default: null },
      // ── 3 new fields ──────────────────────────────────────────
    decisionInMeeting: {
      type: String,
      enum: ["Approved", "Rejected", "On-Hold", "Not Conducted", "Postponed", null],
      default: null,
    },
     tagTo: [String],
  }
],

  
    aiExtractedDecision: {
      type: String,
      trim: true,
      default: null,
    },
    meetingRecording: {
      type: String,   // store file path or URL of the recording
      trim: true,
      default: null,
    },
    meetingRecordingBlob: {
  type: String,
  trim: true,
  default: null,
},
    // ─────────────────────────────────────────────────────────
  },
  {
    timestamps: true, // createdAt, updatedAt auto
  }
);

module.exports = mongoose.model("Meeting", meetingSchema);