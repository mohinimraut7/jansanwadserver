


const InwardApplication = require("../models/InwardApplication");

// ─────────────────────────────────────────────
//  ADD INWARD APPLICATION
// ─────────────────────────────────────────────

const generateToken = async () => {
  const today = new Date();
  const day   = String(today.getDate()).padStart(2, "0");
  const month = String(today.getMonth() + 1).padStart(2, "0");
  const year  = today.getFullYear();

  const startOfDay = new Date();
  startOfDay.setHours(0, 0, 0, 0);

  const count = await InwardApplication.countDocuments({
    createdAt: { $gte: startOfDay }
  });

  const serial = String(count + 1).padStart(3, "0");
  return `VVCMC${day}${month}${year}${serial}`;
};





// exports.addInwardApplication = async (req, res) => {
//   try {
//     const {
//       inwardNo, submissionDate, fullName, mobile, email, wardNo,ward,address,
//       pincode, category, identityType, identityNumber, taluka, district,
//       subject, description, office, mainDepartment, subDepartment, priority,
//       followUp, status,
//       submittedById, submittedByName, submittedByRole, submittedByUserName, submittedByDept,
//     } = req.body;

//     const existingApplication = await InwardApplication.findOne({ inwardNo });
//     if (existingApplication) {
//       return res.status(400).json({ success: false, message: "Inward Number already exists" });
//     }

//     let tagTo = req.body.tagTo || [];
//     if (typeof tagTo === "string") tagTo = [tagTo];

//     const documentPath = req.file ? req.file.path : null;

//     const newApplication = new InwardApplication({
//       inwardNo, submissionDate, fullName, mobile, email, wardNo,ward,address,
//       pincode, category, identityType, identityNumber, taluka, district,
//       subject, description, office, mainDepartment, subDepartment, priority,
//       tagTo, followUp, status, documents: documentPath,
//       submittedById:       submittedById       || "",
//       submittedByName:     submittedByName     || "",
//       submittedByRole:     submittedByRole     || "",
//       submittedByUserName: submittedByUserName || "",
//       submittedByDept:     submittedByDept     || "",
//     });

//     await newApplication.save();

//     res.status(201).json({
//       success: true,
//       message: "Inward Application Added Successfully",
//       data: newApplication,
//     });

//   } catch (error) {
//     console.error("Add Inward Error:", error);
//     res.status(500).json({ success: false, message: "Server Error", error: error.message });
//   }
// };



exports.addInwardApplication = async (req, res) => {
  try {
    const {
      inwardNo, submissionDate, fullName, mobile, email, wardNo, ward, address,
      pincode, category, identityType, identityNumber, taluka, district,
      subject, description, office, mainDepartment, subDepartment, priority,
      followUp, status,
      submittedById, submittedByName, submittedByRole, submittedByUserName, submittedByDept,
    } = req.body;

    const existingApplication = await InwardApplication.findOne({ inwardNo });
    if (existingApplication) {
      return res.status(400).json({ success: false, message: "Inward Number already exists" });
    }

    let tagTo = req.body.tagTo || [];
    if (typeof tagTo === "string") tagTo = [tagTo];

    const documentPath = req.file ? req.file.path : null;

    // ✅ Token generate करा
    const tokenNo = await generateToken();

    const newApplication = new InwardApplication({
      inwardNo, submissionDate, fullName, mobile, email, wardNo, ward, address,
      pincode, category, identityType, identityNumber, taluka, district,
      subject, description, office, mainDepartment, subDepartment, priority,
      tagTo, followUp, status, documents: documentPath,
      tokenNo, // ✅ add केला
      submittedById:       submittedById       || "",
      submittedByName:     submittedByName     || "",
      submittedByRole:     submittedByRole     || "",
      submittedByUserName: submittedByUserName || "",
      submittedByDept:     submittedByDept     || "",
    });

    await newApplication.save();

    res.status(201).json({
      success: true,
      message: "Inward Application Added Successfully",
      tokenNo, // ✅ frontend ला पाठवा
      data: newApplication,
    });

  } catch (error) {
    console.error("Add Inward Error:", error);
    res.status(500).json({ success: false, message: "Server Error", error: error.message });
  }
};



// ─────────────────────────────────────────────
//  HELPERS
// ─────────────────────────────────────────────

// DB: ["[\"CEO\",\"BDO\"]"] → flat array: ["CEO","BDO"]
const parseTagTo = (tagTo = []) => {
  try {
    const flat = [];
    for (const item of tagTo) {
      if (typeof item === "string" && item.trim().startsWith("[")) {
        const parsed = JSON.parse(item);
        if (Array.isArray(parsed)) flat.push(...parsed);
      } else if (item) {
        flat.push(item);
      }
    }
    return flat;
  } catch {
    return tagTo;
  }
};

const isRoleMatch = (userRole = "", tagToList = []) => {
  const normalizedUserRole = userRole.toLowerCase().trim();
  return tagToList.some((tag) => {
    const normalizedTag = tag.toLowerCase().trim();
    if (normalizedTag === normalizedUserRole)       return true;
    if (normalizedTag.includes(normalizedUserRole)) return true;
    if (normalizedUserRole.includes(normalizedTag)) return true;
    return false;
  });
};


// ─────────────────────────────────────────────
//  GET ALL APPLICATIONS
// ─────────────────────────────────────────────
exports.getAllApplications = async (req, res) => {
  try {
    const { role, userId, userOffice, userDepartmentCategory } = req.query;

    const fullAccessRoles = ["Super Admin", "Guardian Minister"];

    if (fullAccessRoles.includes(role)) {
      const applications = await InwardApplication.find({}).sort({ createdAt: -1 });
      return res.status(200).json({
        success: true,
        message: "Applications Fetched Successfully",
        data: applications,
      });
    }

    const allApps = await InwardApplication.find({}).sort({ createdAt: -1 });

    const filtered = allApps.filter((app) => {
      if (userId && app.submittedById === userId) return true;

      const parsedTagTo  = parseTagTo(app.tagTo);
      const roleMatch    = role                   ? isRoleMatch(role, parsedTagTo)                                                             : false;
      const officeMatch  = userOffice             ? app.office?.toLowerCase().trim() === userOffice.toLowerCase().trim()                       : false;
      const deptCatMatch = userDepartmentCategory ? app.mainDepartment?.toLowerCase().trim() === userDepartmentCategory.toLowerCase().trim()   : false;

      return roleMatch && officeMatch && deptCatMatch;
    });

    res.status(200).json({
      success: true,
      message: "Applications Fetched Successfully",
      data: filtered,
    });

  } catch (error) {
    console.error("Get All Applications Error:", error);
    res.status(500).json({ success: false, message: "Server Error", error: error.message });
  }
};


// ─────────────────────────────────────────────
//  REPLY APPLICATION  →  POST /api/replyApplication
// ─────────────────────────────────────────────
exports.replyApplication = async (req, res) => {
  try {
    const {
      applicationId,   // _id of InwardApplication
      replyMessage,    // reply text (required)
      status,          // new status
      priority,        // new priority
      repliedBy,       // userId of admin/minister
      repliedByName,   // display name
      repliedByRole,   // role
    } = req.body;

    // ── Validation ──
    if (!applicationId) {
      return res.status(400).json({ success: false, message: "applicationId is required" });
    }
    if (!replyMessage || !replyMessage.trim()) {
      return res.status(400).json({ success: false, message: "replyMessage is required" });
    }

    // ── Application शोधा ──
    const application = await InwardApplication.findById(applicationId);
    if (!application) {
      return res.status(404).json({ success: false, message: "Application not found" });
    }

    // ── नवीन reply push करा ──
    const newReply = {
      replyMessage: replyMessage.trim(),
      repliedBy:    repliedBy    || "",
      repliedByName:repliedByName|| "",
      repliedByRole:repliedByRole|| "",
      status:       status       || application.status,
      priority:     priority     || application.priority,
    };

    application.replies.push(newReply);

    // ── Status आणि Priority update करा ──
    if (status)   application.status   = status;
    if (priority) application.priority = priority;

    await application.save();

    res.status(200).json({
      success: true,
      message: "Reply Added Successfully",
      data: {
        applicationId: application._id,
        inwardNo:      application.inwardNo,
        status:        application.status,
        priority:      application.priority,
        latestReply:   application.replies[application.replies.length - 1],
        totalReplies:  application.replies.length,
      },
    });

  } catch (error) {
    console.error("Reply Application Error:", error);
    res.status(500).json({ success: false, message: "Server Error", error: error.message });
  }
};