// // const mongoose = require("mongoose");

// // const userSchema = new mongoose.Schema(
// //   {
// //     fullName: {
// //       type: String,
// //       trim: true,
// //     },

// //     userName: {
// //       type: String,
// //       trim: true,
// //       lowercase: true,
// //     },

// //     mobileNumber: {
// //       type: String,
// //       trim: true,
// //     },

// //     email: {
// //       type: String,
// //       trim: true,
// //       lowercase: true,
// //     },

// //     password: {
// //       type: String,
    
// //     },

// //     role: {
// //       type: String,
// //       default: "",
// //     },

// //     departmentName: {
// //       type: String,
// //     },

// //     office: {
// //       type: String,
// //     },

// //     departmentCategory: {
// //       type: String,
// //     },
// //   },
// //   { timestamps: true }
// // );

// // module.exports = mongoose.model("User", userSchema);




// const mongoose = require("mongoose");

// const userSchema = new mongoose.Schema(
//   {
//     fullName: {
//       type: String,
//       trim: true,
//     },

//     userName: {
//       type: String,
//       trim: true,
//       lowercase: true,
//     },

//     mobileNumber: {
//       type: String,
//       trim: true,
//     },

//     email: {
//       type: String,
//       trim: true,
//       lowercase: true,
//     },

//     password: {
//       type: String,
    
//     },

//     role: {
//       type: String,
//       default: "",
//     },

//     departmentName: {
//       type: String,
//     },

//     office: {
//       type: String,
//     },

//     departmentCategory: {
//       type: String,
//     },

//     // Ward Councillor (नगरसेवक) — सर्व नगरसेवक General Body चे सदस्य असतात,
//     // पण Standing Committee चे सदस्य फक्त काहीच असतात.
//     isStandingCommitteeMember: {
//       type: Boolean,
//       default: false,
//     },

//     // ── Corporator (नगरसेवक) details ──
//     wardNo: {
//       type: String,
//       trim: true,
//     },
//     designation: {
//       type: String,
//       trim: true,
//     },
//     isGeneralBodyMember: {
//       type: Boolean,
//       default: true,
//     },
//   },
//   { timestamps: true }
// );

// module.exports = mongoose.model("User", userSchema);




const mongoose = require("mongoose");
const { normalizeRole, normalizeDesignation } = require("../utils/roles");

const userSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      trim: true,
    },

    userName: {
      type: String,
      trim: true,
      lowercase: true,
    },

    mobileNumber: {
      type: String,
      trim: true,
    },

    email: {
      type: String,
      trim: true,
      lowercase: true,
    },

    password: {
      type: String,
    
    },

    role: {
      type: String,
      default: "",
      set: normalizeRole, // "Corporator" / "Ward Councillor" → "corporator"
    },

    departmentName: {
      type: String,
    },

    office: {
      type: String,
    },

    departmentCategory: {
      type: String,
    },

    // Ward Councillor (नगरसेवक) — सर्व नगरसेवक General Body चे सदस्य असतात,
    // पण Standing Committee चे सदस्य फक्त काहीच असतात.
    isStandingCommitteeMember: {
      type: Boolean,
      default: false,
    },

    // ── Corporator (नगरसेवक) details ──
    wardNo: {
      type: String,
      trim: true,
    },
    designation: {
      type: String,
      trim: true,
      set: normalizeDesignation, // "Corporator" → "corporator"
    },
    isGeneralBodyMember: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);