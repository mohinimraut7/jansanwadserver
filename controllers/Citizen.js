// const Citizen            = require("../models/Citizen");
// const CitizenAppointment = require("../models/CitizenAppointment");
// const Availability       = require("../models/Availability");
// const bcrypt             = require("bcryptjs");
// const QRCode             = require("qrcode");

// // ── Helper: parse slotTime "10:00 - 11:00" → { start, end } ─────────────────
// function parseSlotTime(slotTime) {
//   const parts = slotTime.split(" - ");
//   return { start: parts[0]?.trim(), end: parts[1]?.trim() };
// }

// // ── Helper: check slot overlap (from addSlot pattern) ────────────────────────
// function slotsOverlap(start1, end1, start2, end2) {
//   const toMin = (t) => { const [h, m] = t.split(":").map(Number); return h * 60 + m; };
//   return toMin(start1) < toMin(end2) && toMin(end1) > toMin(start2);
// }

// // ══════════════════════════════════════════════════════════════════════════════
// // ✅ REGISTER CITIZEN
// // ══════════════════════════════════════════════════════════════════════════════
// exports.registerCitizen = async (req, res) => {
//   try {
//     let { fullName, mobileNumber, email, password } = req.body;

//     fullName     = fullName?.trim();
//     mobileNumber = mobileNumber?.trim();
//     email        = email?.trim().toLowerCase() || "";

//     if (!fullName || !mobileNumber || !password) {
//       return res.status(400).json({ success: false, message: "सर्व fields required ❌" });
//     }
//     if (!/^\d{10}$/.test(mobileNumber)) {
//       return res.status(400).json({ success: false, message: "Mobile number 10 digits असावा ❌" });
//     }

//     // Duplicate check (pattern from addInwardApplication: existingApplication check)
//     const existing = await Citizen.findOne({ mobileNumber });
//     if (existing) {
//       return res.status(409).json({ success: false, message: "हा mobile number already registered आहे ❌" });
//     }

//     const hashed  = await bcrypt.hash(password, 10);
//     const citizen = await Citizen.create({ fullName, mobileNumber, email, password: hashed });

//     return res.status(201).json({
//       success: true,
//       message: "Registration successful ✅",
//       citizen: {
//         _id:          citizen._id,
//         fullName:     citizen.fullName,
//         mobileNumber: citizen.mobileNumber,
//         email:        citizen.email,
//       },
//     });
//   } catch (error) {
//     console.error("Citizen Register Error:", error);
//     return res.status(500).json({ success: false, message: "Server Error ❌", error: error.message });
//   }
// };

// // ══════════════════════════════════════════════════════════════════════════════
// // ✅ LOGIN CITIZEN
// // ══════════════════════════════════════════════════════════════════════════════
// exports.loginCitizen = async (req, res) => {
//   try {
//     let { mobileNumber, password } = req.body;
//     mobileNumber = mobileNumber?.trim();

//     if (!mobileNumber || !password) {
//       return res.status(400).json({ success: false, message: "Mobile number आणि password द्या ❌" });
//     }

//     const citizen = await Citizen.findOne({ mobileNumber });
//     if (!citizen) {
//       return res.status(404).json({ success: false, message: "Account सापडले नाही ❌" });
//     }

//     const match = await bcrypt.compare(password, citizen.password);
//     if (!match) {
//       return res.status(401).json({ success: false, message: "Password चुकीचा आहे ❌" });
//     }

//     return res.status(200).json({
//       success: true,
//       message: "Login successful ✅",
//       citizen: {
//         _id:          citizen._id,
//         fullName:     citizen.fullName,
//         mobileNumber: citizen.mobileNumber,
//         email:        citizen.email,
//       },
//     });
//   } catch (error) {
//     console.error("Citizen Login Error:", error);
//     return res.status(500).json({ success: false, message: "Server Error ❌", error: error.message });
//   }
// };

// exports.citizenLoginByMobile = async (req, res) => {
//   try {
//     const { mobileNo } = req.body;

//     console.log("📱 loginByMobile called:", mobileNo);

//     if (!mobileNo) {
//       return res.status(400).json({ success: false, message: "Mobile number required ❌" });
//     }

//     const trimmed = mobileNo.toString().trim();

//     // mobileNumber OR mobileno — दोन्ही try करतो
//     let user = await User.findOne({
//       $or: [
//         { mobileNumber: trimmed },
//         { mobileno: trimmed },
//         { mobile: trimmed },
//         { phone: trimmed },
//       ]
//     });

//     console.log("🔍 User found:", user ? user.userName : "NOT FOUND");

//     // ✅ User नसला तर auto-register करतो
//     if (!user) {
//       console.log("🆕 User not found — auto registering:", trimmed);

//       user = await User.create({
//         mobileNumber: trimmed,
//         mobileno: trimmed,
//         mobile: trimmed,
//         userName: `user_${trimmed.slice(-4)}`,   // शेवटचे 4 digits username
//         fullName: `User ${trimmed.slice(-4)}`,
//         role: "User",
//         departmentName: "",
//         office: "",
//         departmentCategory: "",
//       });

//       console.log("✅ Auto-registered user:", user.userName);
//     }

//     const token = jwt.sign(
//       { id: user._id, userName: user.userName, role: user.role },
//       process.env.JWT_SECRET,
//       { expiresIn: "7d" }
//     );

//     return res.status(200).json({
//       success: true,
//       message: "OTP Login Success ✅",
//       token,
//       user: {
//         id:                 user._id,
//         fullName:           user.fullName,
//         userName:           user.userName,
//         role:               user.role,
//         departmentName:     user.departmentName,
//         office:             user.office,
//         departmentCategory: user.departmentCategory,
//       },
//     });

//   } catch (error) {
//     console.log("LoginByMobile Error:", error);
//     return res.status(500).json({ success: false, message: "Server Error ❌" });
//   }
// };

// // ══════════════════════════════════════════════════════════════════════════════
// // ✅ BOOK APPOINTMENT
// // Pattern: addInwardApplication (duplicate check, req.file.path)
// //        + addSlot (slot overlap check, date-based lookup)
// // ══════════════════════════════════════════════════════════════════════════════
// exports.bookAppointment = async (req, res) => {
//   try {
//     const {
//       citizenId,
//       fullName, mobileNumber, email, address, pincode,
//       preferredDate, slotTime,
//       purpose, numberOfVisitors, visitedBefore, ward,
//       submittedById, submittedByName,
//     } = req.body;

//     // ── Basic validation ──────────────────────────────────────────────────
//     if (!fullName || !mobileNumber || !preferredDate || !slotTime || !purpose) {
//       return res.status(400).json({ success: false, message: "Required fields missing ❌" });
//     }

//     // ── Parse slot (addSlot pattern: start + end separate) ───────────────
//     const { start: slotStart, end: slotEnd } = parseSlotTime(slotTime);
//     if (!slotStart || !slotEnd) {
//       return res.status(400).json({ success: false, message: "Invalid slot time format ❌" });
//     }

//     // ── Verify slot still exists in Availability (addSlot pattern) ────────
//     const availRecord = await Availability.findOne({ date: preferredDate });
//     if (!availRecord) {
//       return res.status(400).json({ success: false, message: "त्या date साठी availability नाही ❌" });
//     }
//     const slotExists = availRecord.timeSlots.find(
//       (s) => s.start === slotStart && s.end === slotEnd
//     );
//     if (!slotExists) {
//       return res.status(400).json({ success: false, message: "हा slot available नाही ❌" });
//     }

//     // ── Duplicate check (addInwardApplication pattern) ────────────────────
//     // Same mobile + same date + overlapping slot = duplicate
//     const existingBookings = await CitizenAppointment.find({
//       mobileNumber,
//       preferredDate,
//       status: { $nin: ["rejected", "expired"] },
//     });
//     const hasOverlap = existingBookings.some((b) =>
//       slotsOverlap(slotStart, slotEnd, b.slotStart, b.slotEnd)
//     );
//     if (hasOverlap) {
//       return res.status(409).json({
//         success: false,
//         message: "त्याच date आणि slot साठी आधीच booking आहे ❌",
//       });
//     }

//     // ── Photo path (addInwardApplication pattern: req.file.path) ─────────
//     const visitorPhoto = req.file ? req.file.path : "";

//     // ── Create appointment ────────────────────────────────────────────────
//     const appt = new CitizenAppointment({
//       citizenId:        citizenId || null,
//       fullName:         fullName.trim(),
//       mobileNumber:     mobileNumber.trim(),
//       email:            email?.trim().toLowerCase() || "",
//       address:          address?.trim()  || "",
//       pincode:          pincode?.trim()  || "",
//       preferredDate,
//       slotStart,
//       slotEnd,
//       slotTime,
//       purpose:          purpose.trim(),
//       numberOfVisitors: numberOfVisitors || "1",
//       visitedBefore:    visitedBefore === "true" || visitedBefore === true,
//       ward:             ward?.trim() || "",
//       visitorPhoto,
//       submittedById:    submittedById   || "",
//       submittedByName:  submittedByName || "",
//       status:           "pending",
//     });

//     await appt.save(); // tokenId auto-generated in pre("save")

//     // ── Generate QR code ──────────────────────────────────────────────────
//     const cardUrl = `${process.env.BACKEND_URL || "http://localhost:5000"}/api/citizen/appointment-card/${appt._id}`;
//     appt.qrCode   = await QRCode.toDataURL(cardUrl);
//     await appt.save();

//     return res.status(201).json({
//       success: true,
//       message: "Appointment booked successfully ✅",
//       data: {
//         _id:           appt._id,
//         tokenId:       appt.tokenId,
//         preferredDate: appt.preferredDate,
//         slotTime:      appt.slotTime,
//         status:        appt.status,
//         qrCode:        appt.qrCode,
//       },
//     });
//   } catch (error) {
//     console.error("Book Appointment Error:", error);
//     return res.status(500).json({ success: false, message: "Server Error ❌", error: error.message });
//   }
// };

// // ══════════════════════════════════════════════════════════════════════════════
// // ✅ GET MY APPOINTMENTS (citizen)
// // ══════════════════════════════════════════════════════════════════════════════
// exports.getMyAppointments = async (req, res) => {
//   try {
//     const { mobileNumber } = req.query;
//     if (!mobileNumber) {
//       return res.status(400).json({ success: false, message: "Mobile number required ❌" });
//     }

//     const appointments = await CitizenAppointment.find({ mobileNumber }).sort({ createdAt: -1 });

//     return res.status(200).json({
//       success:      true,
//       count:        appointments.length,
//       appointments,
//     });
//   } catch (error) {
//     console.error("Get My Appointments Error:", error);
//     return res.status(500).json({ success: false, message: "Server Error ❌", error: error.message });
//   }
// };

// // ══════════════════════════════════════════════════════════════════════════════
// // ✅ GET APPOINTMENT CARD (public - for QR scan)
// // ══════════════════════════════════════════════════════════════════════════════
// exports.getAppointmentCard = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const appt   = await CitizenAppointment.findById(id);
//     if (!appt) {
//       return res.status(404).json({ success: false, message: "Appointment Not Found ❌" });
//     }

//     // Auto-expire if date passed (addSlot pattern: date comparison)
//     const today = new Date().toISOString().split("T")[0];
//     if (appt.preferredDate < today && appt.status === "pending") {
//       appt.status = "expired";
//       await appt.save();
//     }

//     return res.status(200).json({ success: true, appointment: appt });
//   } catch (error) {
//     console.error("Get Appointment Card Error:", error);
//     return res.status(500).json({ success: false, message: "Server Error ❌", error: error.message });
//   }
// };

// // ══════════════════════════════════════════════════════════════════════════════
// // ✅ GET ALL APPOINTMENTS (Admin)
// // ══════════════════════════════════════════════════════════════════════════════
// exports.getAllAppointments = async (req, res) => {
//   try {
//     const { status, date } = req.query;
//     const filter = {};
//     if (status && status !== "all") filter.status = status;
//     if (date)                        filter.preferredDate = date;

//     const appointments = await CitizenAppointment.find(filter).sort({ preferredDate: 1, createdAt: -1 });

//     return res.status(200).json({
//       success:      true,
//       count:        appointments.length,
//       appointments,
//     });
//   } catch (error) {
//     console.error("Get All Appointments Error:", error);
//     return res.status(500).json({ success: false, message: "Server Error ❌", error: error.message });
//   }
// };

// // ══════════════════════════════════════════════════════════════════════════════
// // ✅ UPDATE APPOINTMENT STATUS (Admin)
// // ══════════════════════════════════════════════════════════════════════════════
// exports.updateAppointmentStatus = async (req, res) => {
//   try {
//     const { id }                = req.params;
//     const { status, adminNote } = req.body;

//     if (!["pending", "approved", "rejected", "expired"].includes(status)) {
//       return res.status(400).json({ success: false, message: "Invalid status ❌" });
//     }

//     const appt = await CitizenAppointment.findByIdAndUpdate(
//       id,
//       { status, adminNote: adminNote || "" },
//       { new: true }
//     );
//     if (!appt) {
//       return res.status(404).json({ success: false, message: "Appointment Not Found ❌" });
//     }

//     return res.status(200).json({
//       success: true,
//       message: "Status Updated ✅",
//       appointment: appt,
//     });
//   } catch (error) {
//     console.error("Update Status Error:", error);
//     return res.status(500).json({ success: false, message: "Server Error ❌", error: error.message });
//   }
// };


// ===========================
const Citizen            = require("../models/Citizen");
const CitizenAppointment = require("../models/CitizenAppointment");
const Availability       = require("../models/Availability");
const bcrypt             = require("bcryptjs");
const QRCode             = require("qrcode");
const jwt                = require("jsonwebtoken");

// ── Helper: parse slotTime "10:00 - 11:00" → { start, end } ─────────────────
function parseSlotTime(slotTime) {
  const parts = slotTime.split(" - ");
  return { start: parts[0]?.trim(), end: parts[1]?.trim() };
}

// ── Helper: check slot overlap ────────────────────────────────────────────────
function slotsOverlap(start1, end1, start2, end2) {
  const toMin = (t) => { const [h, m] = t.split(":").map(Number); return h * 60 + m; };
  return toMin(start1) < toMin(end2) && toMin(end1) > toMin(start2);
}

// ══════════════════════════════════════════════════════════════════════════════
// ✅ REGISTER CITIZEN
// ══════════════════════════════════════════════════════════════════════════════
// exports.registerCitizen = async (req, res) => {
//   try {
//     let { fullName, mobileNumber, email, password } = req.body;

//     fullName     = fullName?.trim();
//     mobileNumber = mobileNumber?.trim();
//     email        = email?.trim().toLowerCase() || "";

//     if (!fullName || !mobileNumber || !password) {
//       return res.status(400).json({ success: false, message: "सर्व fields required ❌" });
//     }
//     if (!/^\d{10}$/.test(mobileNumber)) {
//       return res.status(400).json({ success: false, message: "Mobile number 10 digits असावा ❌" });
//     }

//     const existing = await Citizen.findOne({ mobileNumber });
//     if (existing) {
//       return res.status(409).json({ success: false, message: "हा mobile number already registered आहे ❌" });
//     }

//     const hashed  = await bcrypt.hash(password, 10);
//     const citizen = await Citizen.create({ fullName, mobileNumber, email, password: hashed });

//     return res.status(201).json({
//       success: true,
//       message: "Registration successful ✅",
//       citizen: {
//         _id:          citizen._id,
//         fullName:     citizen.fullName,
//         mobileNumber: citizen.mobileNumber,
//         email:        citizen.email,
//       },
//     });
//   } catch (error) {
//     console.error("Citizen Register Error:", error);
//     return res.status(500).json({ success: false, message: "Server Error ❌", error: error.message });
//   }
// };

exports.registerCitizen = async (req, res) => {
  try {
    let { fullName, userName, mobileNumber, email, password } = req.body; // ✅ userName add केला

    fullName     = fullName?.trim();
    userName     = userName?.trim() || null;               // ✅ trim
    mobileNumber = mobileNumber?.trim();
    email        = email?.trim().toLowerCase() || "";

    if (!fullName || !mobileNumber || !password) {
      return res.status(400).json({ success: false, message: "सर्व fields required ❌" });
    }
    if (!/^\d{10}$/.test(mobileNumber)) {
      return res.status(400).json({ success: false, message: "Mobile number 10 digits असावा ❌" });
    }

    const existing = await Citizen.findOne({ mobileNumber });
    if (existing) {
      return res.status(409).json({ success: false, message: "हा mobile number already registered आहे ❌" });
    }

    // const hashed  = await bcrypt.hash(password, 10);
    const citizen = await Citizen.create({
      fullName,
      username: userName, // ✅ frontend userName → backend username
      mobileNumber,
      email,
      // password: hashed,
      password
    });

    return res.status(201).json({
      success: true,
      message: "Registration successful ✅",
      citizen: {
        _id:          citizen._id,
        fullName:     citizen.fullName,
        username:     citizen.username, // ✅ return पण करा
        mobileNumber: citizen.mobileNumber,
        email:        citizen.email,
      },
    });
  } catch (error) {
    console.error("Citizen Register Error:", error);
    return res.status(500).json({ success: false, message: "Server Error ❌", error: error.message });
  }
};

// ══════════════════════════════════════════════════════════════════════════════
// ✅ LOGIN CITIZEN (password)
// ══════════════════════════════════════════════════════════════════════════════
// exports.loginCitizen = async (req, res) => {
//   try {
//     let { username, password } = req.body;
//     mobileNumber = mobileNumber?.trim();

//     if (!mobileNumber || !password) {
//       return res.status(400).json({ success: false, message: "Mobile number आणि password द्या ❌" });
//     }

//     const citizen = await Citizen.findOne({ mobileNumber });
//     if (!citizen) {
//       return res.status(404).json({ success: false, message: "Account सापडले नाही ❌" });
//     }

//     const match = await bcrypt.compare(password, citizen.password);
//     if (!match) {
//       return res.status(401).json({ success: false, message: "Password चुकीचा आहे ❌" });
//     }

//     const token = jwt.sign(
//       { id: citizen._id, mobileNumber: citizen.mobileNumber },
//       process.env.JWT_SECRET,
//       { expiresIn: "7d" }
//     );

//     return res.status(200).json({
//       success: true,
//       message: "Login successful ✅",
//       token,
//       citizen: {
//         _id:          citizen._id,
//         fullName:     citizen.fullName,
//         mobileNumber: citizen.mobileNumber,
//         email:        citizen.email,
//       },
//     });
//   } catch (error) {
//     console.error("Citizen Login Error:", error);
//     return res.status(500).json({ success: false, message: "Server Error ❌", error: error.message });
//   }
// };

// exports.loginCitizen = async (req, res) => {
//   try {
//     let { username, password } = req.body;
//     username = username?.trim();

//     if (!username || !password) {
//       return res.status(400).json({ success: false, message: "Username आणि Password required ❌" });
//     }

//     // ✅ users collection मध्ये userName ने शोध
//     const user = await Citizen.findOne({ username: username });
//     if (!user) {
//       return res.status(404).json({ success: false, message: "Account सापडले नाही ❌" });
//     }

//     const match = await bcrypt.compare(password, user.password);
//     if (!match) {
//       return res.status(401).json({ success: false, message: "Password चुकीचा आहे ❌" });
//     }

//     const token = jwt.sign(
//       { id: user._id, userName: user.username },
//       process.env.JWT_SECRET,
//       { expiresIn: "7d" }
//     );

//     return res.status(200).json({
//       success: true,
//       token,
//       citizen: {
//         _id:      user._id,
//         fullName: user.fullName,
//         username: user.username,
//       },
//     });
//   } catch (error) {
//     return res.status(500).json({ success: false, message: "Server Error ❌" });
//   }
// };

exports.loginCitizen = async (req, res) => {
  try {
    let { username, password } = req.body;
    username = username?.trim();

    if (!username || !password) {
      return res.status(400).json({ success: false, message: "Username आणि Password required ❌" });
    }

    const user = await Citizen.findOne({ username: username });
    if (!user) {
      return res.status(404).json({ success: false, message: "Account सापडले नाही ❌" });
    }

    // ✅ plain text compare (bcrypt नाही)
    if (password !== user.password) {
      return res.status(401).json({ success: false, message: "Password चुकीचा आहे ❌" });
    }

    const token = jwt.sign(
      { id: user._id, userName: user.username },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    return res.status(200).json({
      success: true,
      token,
      citizen: {
        _id:      user._id,
        fullName: user.fullName,
        username: user.username,
      },
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: "Server Error ❌" });
  }
};

// ══════════════════════════════════════════════════════════════════════════════
// ✅ LOGIN BY MOBILE (OTP style) — Citizen model vaprto, auto-register karto
// ══════════════════════════════════════════════════════════════════════════════
exports.citizenLoginByMobile = async (req, res) => {
  try {
    const { mobileNo } = req.body;

    console.log("📱 citizenLoginByMobile called:", mobileNo);

    if (!mobileNo) {
      return res.status(400).json({ success: false, message: "Mobile number required ❌" });
    }

    const trimmed = mobileNo.toString().trim();

    if (!/^\d{10}$/.test(trimmed)) {
      return res.status(400).json({ success: false, message: "Valid 10 digit mobile number द्या ❌" });
    }

    // Citizen शोधा
    let citizen = await Citizen.findOne({ mobileNumber: trimmed });

    console.log("🔍 Citizen found:", citizen ? citizen.fullName : "NOT FOUND");

    // नसेल तर auto-register
    if (!citizen) {
      console.log("🆕 Auto registering citizen:", trimmed);

      citizen = await Citizen.create({
        fullName:     `नागरिक ${trimmed.slice(-4)}`,
        mobileNumber: trimmed,
        email:        "",
        password:     trimmed,   // ← bcrypt नाही, plain — User model सारखाच
      });

      console.log("✅ Auto-registered:", citizen.fullName);
    }

    const token = jwt.sign(
      { id: citizen._id, mobileNumber: citizen.mobileNumber },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    return res.status(200).json({
      success: true,
      message: "OTP Login Success ✅",
      token,
      citizen: {
        _id:          citizen._id,
        fullName:     citizen.fullName,
        mobileNumber: citizen.mobileNumber,
        email:        citizen.email,
      },
    });

  } catch (error) {
    console.error("CitizenLoginByMobile Error:", error);
    return res.status(500).json({ success: false, message: "Server Error ❌", error: error.message });
  }
};

// ══════════════════════════════════════════════════════════════════════════════
// ✅ BOOK APPOINTMENT
// ══════════════════════════════════════════════════════════════════════════════
exports.bookAppointment = async (req, res) => {
  try {
    const {
      citizenId,
      fullName, mobileNumber, email, address, pincode,
      preferredDate, slotTime,
      purpose, numberOfVisitors, visitedBefore, ward,
      submittedById, submittedByName,
    } = req.body;

    if (!fullName || !mobileNumber || !preferredDate || !slotTime || !purpose) {
      return res.status(400).json({ success: false, message: "Required fields missing ❌" });
    }

    const { start: slotStart, end: slotEnd } = parseSlotTime(slotTime);
    if (!slotStart || !slotEnd) {
      return res.status(400).json({ success: false, message: "Invalid slot time format ❌" });
    }

    const availRecord = await Availability.findOne({ date: preferredDate });
    if (!availRecord) {
      return res.status(400).json({ success: false, message: "त्या date साठी availability नाही ❌" });
    }
    const slotExists = availRecord.timeSlots.find(
      (s) => s.start === slotStart && s.end === slotEnd
    );
    if (!slotExists) {
      return res.status(400).json({ success: false, message: "हा slot available नाही ❌" });
    }

    const existingBookings = await CitizenAppointment.find({
      mobileNumber,
      preferredDate,
      status: { $nin: ["rejected", "expired"] },
    });
    const hasOverlap = existingBookings.some((b) =>
      slotsOverlap(slotStart, slotEnd, b.slotStart, b.slotEnd)
    );
    if (hasOverlap) {
      return res.status(409).json({
        success: false,
        message: "त्याच date आणि slot साठी आधीच booking आहे ❌",
      });
    }

    const visitorPhoto = req.file ? req.file.path : "";

    const appt = new CitizenAppointment({
      citizenId:        citizenId || null,
      fullName:         fullName.trim(),
      mobileNumber:     mobileNumber.trim(),
      email:            email?.trim().toLowerCase() || "",
      address:          address?.trim()  || "",
      pincode:          pincode?.trim()  || "",
      preferredDate,
      slotStart,
      slotEnd,
      slotTime,
      purpose:          purpose.trim(),
      numberOfVisitors: numberOfVisitors || "1",
      visitedBefore:    visitedBefore === "true" || visitedBefore === true,
      ward:             ward?.trim() || "",
      visitorPhoto,
      submittedById:    submittedById   || "",
      submittedByName:  submittedByName || "",
      status:           "pending",
    });

    await appt.save();

    const cardUrl = `${process.env.BACKEND_URL || "http://localhost:5000"}/api/citizen/appointment-card/${appt._id}`;
    appt.qrCode   = await QRCode.toDataURL(cardUrl);
    await appt.save();

    return res.status(201).json({
      success: true,
      message: "Appointment booked successfully ✅",
      data: {
        _id:           appt._id,
        tokenId:       appt.tokenId,
        preferredDate: appt.preferredDate,
        slotTime:      appt.slotTime,
        status:        appt.status,
        qrCode:        appt.qrCode,
      },
    });
  } catch (error) {
    console.error("Book Appointment Error:", error);
    return res.status(500).json({ success: false, message: "Server Error ❌", error: error.message });
  }
};

// ══════════════════════════════════════════════════════════════════════════════
// ✅ GET MY APPOINTMENTS
// ══════════════════════════════════════════════════════════════════════════════

// exports.getMyAppointments = async (req, res) => {
//   try {
//     const { mobileNumber } = req.query;
//     // if (!mobileNumber) {
//     //   return res.status(400).json({ success: false, message: "Mobile number required ❌" });
//     // }
//     const appointments = await CitizenAppointment.find({ mobileNumber }).sort({ createdAt: -1 });
//     return res.status(200).json({ success: true, count: appointments.length, appointments });
//   } catch (error) {
//     console.error("Get My Appointments Error:", error);
//     return res.status(500).json({ success: false, message: "Server Error ❌", error: error.message });
//   }
// };


exports.getMyAppointments = async (req, res) => {
  try {
    const { mobileNumber, citizenId } = req.query;

    // ✅ citizenId ने शोध — सर्वात reliable
    let appointments = [];

    if (citizenId) {
      appointments = await CitizenAppointment.find({ citizenId }).sort({ createdAt: -1 });
    } else if (mobileNumber) {
      appointments = await CitizenAppointment.find({ mobileNumber }).sort({ createdAt: -1 });
    }

    return res.status(200).json({ success: true, count: appointments.length, appointments });
  } catch (error) {
    console.error("Get My Appointments Error:", error);
    return res.status(500).json({ success: false, message: "Server Error ❌", error: error.message });
  }
};

// ══════════════════════════════════════════════════════════════════════════════
// ✅ GET APPOINTMENT CARD (QR scan)
// ══════════════════════════════════════════════════════════════════════════════
exports.getAppointmentCard = async (req, res) => {
  try {
    const { id } = req.params;
    const appt   = await CitizenAppointment.findById(id);
    if (!appt) {
      return res.status(404).json({ success: false, message: "Appointment Not Found ❌" });
    }
    const today = new Date().toISOString().split("T")[0];
    if (appt.preferredDate < today && appt.status === "pending") {
      appt.status = "expired";
      await appt.save();
    }
    return res.status(200).json({ success: true, appointment: appt });
  } catch (error) {
    console.error("Get Appointment Card Error:", error);
    return res.status(500).json({ success: false, message: "Server Error ❌", error: error.message });
  }
};

// ══════════════════════════════════════════════════════════════════════════════
// ✅ GET ALL APPOINTMENTS (Admin)
// ══════════════════════════════════════════════════════════════════════════════
exports.getAllAppointments = async (req, res) => {
  try {
    const { status, date } = req.query;
    const filter = {};
    if (status && status !== "all") filter.status = status;
    if (date)                        filter.preferredDate = date;
    const appointments = await CitizenAppointment.find(filter).sort({ preferredDate: 1, createdAt: -1 });
    return res.status(200).json({ success: true, count: appointments.length, appointments });
  } catch (error) {
    console.error("Get All Appointments Error:", error);
    return res.status(500).json({ success: false, message: "Server Error ❌", error: error.message });
  }
};

// ══════════════════════════════════════════════════════════════════════════════
// ✅ UPDATE APPOINTMENT STATUS (Admin)
// ══════════════════════════════════════════════════════════════════════════════
exports.updateAppointmentStatus = async (req, res) => {
  try {
    const { id }                = req.params;
    const { status, adminNote } = req.body;

    if (!["pending", "approved", "rejected", "expired"].includes(status)) {
      return res.status(400).json({ success: false, message: "Invalid status ❌" });
    }

    const appt = await CitizenAppointment.findByIdAndUpdate(
      id,
      { status, adminNote: adminNote || "" },
      { new: true }
    );
    if (!appt) {
      return res.status(404).json({ success: false, message: "Appointment Not Found ❌" });
    }

    return res.status(200).json({ success: true, message: "Status Updated ✅", appointment: appt });
  } catch (error) {
    console.error("Update Status Error:", error);
    return res.status(500).json({ success: false, message: "Server Error ❌", error: error.message });
  }
};