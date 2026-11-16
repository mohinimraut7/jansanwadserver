// const mongoose = require("mongoose");

// const citizenSchema = new mongoose.Schema(
//   {
//     username: {
//       type:    String,
//       unique:  true,
//       trim:    true,
//       default: "",
//     },
//     fullName: {
//       type:    String,
//       trim:    true,
//       default: "",
//     },
//     mobileNumber: {
//       type:     String,
//       // required: true,
//       // unique:   true,
//       // trim:     true,
//     },
//     email: {
//       type:      String,
//       trim:      true,
//       lowercase: true,
//       default:   "",
//     },
//     password: {
//       type:    String,
//       default: "",
//     },
//     // ✅ ADDED
//     pincode: {
//       type:    String,
//       trim:    true,
//       default: "",
//     },
//     // ✅ ADDED
//     address: {
//       type:    String,
//       trim:    true,
//       default: "",
//     },
//   },
//   { timestamps: true }
// );

// module.exports = mongoose.model("Citizen", citizenSchema);





const mongoose = require("mongoose");

const citizenSchema = new mongoose.Schema(
  {
    username: {
      type:    String,
      unique:  true,
      trim:    true,
      default: "",
    },
    fullName: {
      type:    String,
      trim:    true,
      default: "",
    },
    mobileNumber: {
      type:     String,
      // required: true,
      // unique:   true,
      // trim:     true,
    },
    email: {
      type:      String,
      trim:      true,
      lowercase: true,
      default:   "",
    },
    password: {
      type:    String,
      default: "",
    },
    // ✅ ADDED
    pincode: {
      type:    String,
      trim:    true,
      default: "",
    },
    // ✅ ADDED
    address: {
      type:    String,
      trim:    true,
      default: "",
    },
  },
  { timestamps: true }
);

// ⚡ Index — mobile login / check-mobile fast करण्यासाठी (unique नाही)
citizenSchema.index({ mobileNumber: 1 });

module.exports = mongoose.model("Citizen", citizenSchema);