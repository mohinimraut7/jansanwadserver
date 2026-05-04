// const mongoose = require("mongoose");

// const meetingSchema = new mongoose.Schema(
//   {
//     meetingNumber: {
//       type: String,
//       required: [true, "Meeting Number is required"],
//       trim: true,
//       unique: true,
//     },
//     meetingType: {
//       type: String,
//       required: [true, "Meeting Type is required"],
//       enum: ["General Body", "Standing Committee"],
//     },
//     subjectId: {
//       type: String,
//       trim: true,
//       default: null,
//     },
//     subjectType: {
//       type: String,
//       enum: ["General", "Administrative and Financial Approval", "Contract Approval", null],
//       default: null,
//     },
//     subjectName: {
//       type: String,
//       trim: true,
//       default: null,
//     },
//   },
//   {
//     timestamps: true, // createdAt, updatedAt auto
//   }
// );

// module.exports = mongoose.model("Meeting", meetingSchema);




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
     meetingAmpm: {           // ← ADD THIS
      type: String,
      enum: ["AM", "PM", null],
      default: null,
    },
    subjectId: {
      type: String,
      trim: true,
      default: null,
    },
    subjectType: {
      type: String,
      enum: ["General", "Administrative and Financial Approval", "Contract Approval", null],
      default: null,
    },
    subjectName: {
      type: String,
      trim: true,
      default: null,
    },
  },
  {
    timestamps: true, // createdAt, updatedAt auto
  }
);

module.exports = mongoose.model("Meeting", meetingSchema);