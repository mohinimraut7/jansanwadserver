// // // const User = require("../models/user");
// // // const jwt = require("jsonwebtoken");



// // // const fetch = (...args) => import('node-fetch').then(({default: f}) => f(...args));

// // // // ── WhatsApp OTP Send ────────────────────────────
// // // const WA_API_URL   = "https://wafortius.in.net/V23.0/1091751790690187/messages";
// // // const WA_API_TOKEN = "633744b1-4b58-484c-abf0-a46d878e413d";

// // // const sendWhatsAppOtp = async (mobile, otp) => {
// // //   const payload = {
// // //     messaging_product: "whatsapp",
// // //     recipient_type:    "individual",
// // //     to:                `91${mobile}`,
// // //     type:              "template",
// // //     template: {
// // //       name:     "citizen_otp",
// // //       language: { code: "en" },
// // //       components: [
// // //         {
// // //           type:       "body",
// // //           parameters: [{ type: "text", text: String(otp) }],
// // //         },
// // //         {
// // //           type:       "button",
// // //           sub_type:   "url",
// // //           index:      "0",
// // //           parameters: [{ type: "text", text: String(otp) }],
// // //         },
// // //       ],
// // //     },
// // //   };

// // //   const res = await fetch(WA_API_URL, {
// // //     method:  "POST",
// // //     headers: {
// // //       "Content-Type": "application/json",
// // //       Authorization:  `Bearer ${WA_API_TOKEN}`,
// // //     },
// // //     body: JSON.stringify(payload),
// // //   });

// // //   const data = await res.json();
// // //   console.log("✅ WhatsApp OTP:", data);
// // //   return data;
// // // };
// // // // ─────────────────────────────────────────────────



// // // // ✅ SEND OTP — OTP generate करा + WhatsApp वर पाठवा
// // // exports.sendOtp = async (req, res) => {
// // //   try {
// // //     const { mobileNo } = req.body;

// // //     if (!mobileNo || !/^\d{10}$/.test(mobileNo.trim())) {
// // //       return res.status(400).json({
// // //         success: false,
// // //         message: "Valid 10 digit mobile number required ❌",
// // //       });
// // //     }

// // //     const mobile = mobileNo.trim();

// // //     // OTP generate करा
// // //     const otp = Math.floor(100000 + Math.random() * 900000).toString();

// // //     // WhatsApp वर पाठवा
// // //     await sendWhatsAppOtp(mobile, otp);

// // //     // OTP return करा frontend ला (verify साठी)
// // //     return res.status(200).json({
// // //       success: true,
// // //       message: "OTP पाठवला ✅",
// // //       otp,          // frontend ला verify साठी
// // //     });

// // //   } catch (error) {
// // //     console.log("SendOTP Error:", error);
// // //     return res.status(500).json({
// // //       success: false,
// // //       message: "OTP पाठवण्यात error ❌",
// // //     });
// // //   }
// // // };


// // // // // ✅ REGISTER USER
// // // // exports.registerUser = async (req, res) => {
// // // //   try {
// // // //     let { fullName, userName, password, role, departmentName, office, departmentCategory } = req.body;

// // // //     userName = userName?.trim().toLowerCase();
// // // //     fullName = fullName?.trim();
// // // //     departmentName = departmentName?.trim();

// // // //     if (!fullName || !userName || !password || !role) {
// // // //       return res.status(400).json({ success: false, message: "All fields required ❌" });
// // // //     }

// // // //     const existingUser = await User.findOne({ userName });
// // // //     if (existingUser) {
// // // //       return res.status(409).json({ success: false, message: "Username already exists ❌" });
// // // //     }

// // // //     const newUser = await User.create({
// // // //       fullName, userName, password, role, departmentName, office, departmentCategory
// // // //     });

// // // //     return res.status(201).json({
// // // //       success: true,
// // // //       message: "User Registered Successfully ✅",
// // // //       user: {
// // // //         id: newUser._id,
// // // //         fullName: newUser.fullName,
// // // //         userName: newUser.userName,
// // // //         role: newUser.role,
// // // //         departmentName: newUser.departmentName,
// // // //         office: newUser.office,
// // // //         departmentCategory: newUser.departmentCategory,
// // // //       },
// // // //     });

// // // //   } catch (error) {
// // // //     console.log("Register Error:", error);
// // // //     return res.status(500).json({ success: false, message: "Server Error ❌" });
// // // //   }
// // // // };


// // // // ✅ REGISTER USER
// // // exports.registerUser = async (req, res) => {
// // //   try {
// // //     let { fullName, userName, mobileNumber, email, password,departmentName} = req.body;

// // //     // Trim & normalize
// // //     fullName     = fullName?.trim();
// // //     userName     = userName?.trim().toLowerCase();
// // //     mobileNumber = mobileNumber?.trim();
// // //     email = email?.trim().toLowerCase();
// // //     departmentName = departmentName?.trim();  // <-- use departmentName, not email

// // //     // Validation
// // //     if (!fullName || !userName || !mobileNumber || !password) {
// // //       return res.status(400).json({
// // //         success: false,
// // //         message: "All fields required ❌",
// // //       });
// // //     }

// // //     // Mobile number format check (10 digits)
// // //     if (!/^\d{10}$/.test(mobileNumber)) {
// // //       return res.status(400).json({
// // //         success: false,
// // //         message: "Invalid mobile number ❌ (10 digits required)",
// // //       });
// // //     }

// // //     // Email format check
// // //     if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
// // //       return res.status(400).json({
// // //         success: false,
// // //         message: "Invalid email address ❌",
// // //       });
// // //     }

// // //     // Check duplicate userName
// // //     const existingUserName = await User.findOne({ userName });
// // //     if (existingUserName) {
// // //       return res.status(409).json({
// // //         success: false,
// // //         message: "Username already exists ❌",
// // //       });
// // //     }

// // //     // Check duplicate email
// // //     const existingEmail = await User.findOne({ email });
// // //     if (existingEmail) {
// // //       return res.status(409).json({
// // //         success: false,
// // //         message: "Email already registered ❌",
// // //       });
// // //     }

// // //     // Check duplicate mobile
// // //     const existingMobile = await User.findOne({ mobileNumber });
// // //     if (existingMobile) {
// // //       return res.status(409).json({
// // //         success: false,
// // //         message: "Mobile number already registered ❌",
// // //       });
// // //     }

// // //     // Create user
// // //     const newUser = await User.create({
// // //       fullName,
// // //       userName,
// // //       mobileNumber,
// // //       email,
// // //       password,
// // //       departmentName
// // //     });

// // //     return res.status(201).json({
// // //       success: true,
// // //       message: "User Registered Successfully ✅",
// // //       user: {
// // //         id:           newUser._id,
// // //         fullName:     newUser.fullName,
// // //         userName:     newUser.userName,
// // //         mobileNumber: newUser.mobileNumber,
// // //         email:        newUser.email,
// // //         departmentName:newUser.departmentName
// // //       },
// // //     });

// // //   } catch (error) {
// // //     console.log("Register Error:", error);
// // //     return res.status(500).json({
// // //       success: false,
// // //       message: "Server Error ❌",
// // //     });
// // //   }
// // // };


// // // // ✅ LOGIN USER
// // // exports.loginUser = async (req, res) => {
// // //   try {
// // //     const { userName, password } = req.body;

// // //     if (!userName || !password) {
// // //       return res.status(400).json({ success: false, message: "Username आणि Password required आहे ❌" });
// // //     }

// // //     const user = await User.findOne({ userName });
// // //     if (!user) {
// // //       return res.status(404).json({ success: false, message: "User Not Found ❌" });
// // //     }

// // //     if (user.password !== password) {
// // //       return res.status(401).json({ success: false, message: "Invalid Password ❌" });
// // //     }

// // //     const token = jwt.sign(
// // //       { id: user._id, userName: user.userName, role: user.role },
// // //       process.env.JWT_SECRET,
// // //       { expiresIn: "7d" }
// // //     );

// // //     // ── office आणि departmentCategory पण return करा ──
// // //     return res.status(200).json({
// // //       success: true,
// // //       message: "Login Success ✅",
// // //       token,
// // //       user: {
// // //         id: user._id,
// // //         fullName: user.fullName,
// // //         userName: user.userName,
// // //         role: user.role,
// // //         departmentName: user.departmentName,
// // //         office: user.office,                         // ← ADD
// // //         departmentCategory: user.departmentCategory, // ← ADD
// // //       },
// // //     });

// // //   } catch (error) {
// // //     console.log("Login Error:", error);
// // //     return res.status(500).json({ success: false, message: "Server Error ❌" });
// // //   }
// // // };



// // // exports.loginByMobile = async (req, res) => {
// // //   try {
// // //     const { mobileNo } = req.body;

// // //     if (!mobileNo) {
// // //       return res.status(400).json({ 
// // //         success: false, 
// // //         message: "Mobile number required ❌" 
// // //       });
// // //     }

// // //     const trimmed = mobileNo.toString().trim();

// // //     // फक्त mobileNumber field check करा
// // //     const user = await User.findOne({ mobileNumber: trimmed });

// // //     if (!user) {
// // //       return res.status(404).json({
// // //         success: false,
// // //         message: "हे mobile number नोंदणीकृत नाही ❌",
// // //       });
// // //     }

// // //     const token = jwt.sign(
// // //       { id: user._id, userName: user.userName, role: user.role },
// // //       process.env.JWT_SECRET,
// // //       { expiresIn: "7d" }
// // //     );

// // //     return res.status(200).json({
// // //       success: true,
// // //       message: "OTP Login Success ✅",
// // //       token,
// // //       user: {
// // //         id:                 user._id,
// // //         fullName:           user.fullName,
// // //         userName:           user.userName,
// // //         role:               user.role,
// // //         departmentName:     user.departmentName,
// // //         office:             user.office,
// // //         departmentCategory: user.departmentCategory,
// // //       },
// // //     });

// // //   } catch (error) {
// // //     console.log("LoginByMobile Error:", error);
// // //     return res.status(500).json({ 
// // //       success: false, 
// // //       message: "Server Error ❌" 
// // //     });
// // //   }
// // // };


// // // // ✅ CHECK MOBILE — OTP पाठवण्यापूर्वी mobile registered आहे का check करा
// // // exports.checkMobile = async (req, res) => {
// // //   try {
// // //     const { mobileNo } = req.body;

// // //     if (!mobileNo) {
// // //       return res.status(400).json({ 
// // //         success: false, 
// // //         message: "Mobile number required ❌" 
// // //       });
// // //     }

// // //     const trimmed = mobileNo.toString().trim();

// // //     if (!/^\d{10}$/.test(trimmed)) {
// // //       return res.status(400).json({ 
// // //         success: false, 
// // //         message: "Invalid mobile number ❌" 
// // //       });
// // //     }

// // //     const user = await User.findOne({ mobileNumber: trimmed });

// // //     return res.status(200).json({
// // //       success: true,
// // //       exists: !!user,
// // //       message: user 
// // //         ? "Mobile number registered आहे ✅" 
// // //         : "Mobile number registered नाही ❌",
// // //     });

// // //   } catch (error) {
// // //     console.log("CheckMobile Error:", error);
// // //     return res.status(500).json({ 
// // //       success: false, 
// // //       message: "Server Error ❌" 
// // //     });
// // //   }
// // // };

// // // // ✅ UPDATE USER
// // // exports.updateUser = async (req, res) => {
// // //   try {
// // //     const { id } = req.params;
// // //     const updatePayload = req.body;

// // //     if (!updatePayload || Object.keys(updatePayload).length === 0) {
// // //       return res.status(400).json({ success: false, message: "Update data required ❌" });
// // //     }

// // //     // Never allow password update from this route
// // //     delete updatePayload.password;

// // //     // Trim & normalize
// // //     if (updatePayload.fullName)     updatePayload.fullName     = updatePayload.fullName.trim();
// // //     if (updatePayload.userName)     updatePayload.userName     = updatePayload.userName.trim().toLowerCase();
// // //     if (updatePayload.mobileNumber) updatePayload.mobileNumber = updatePayload.mobileNumber.trim();
// // //     if (updatePayload.email)        updatePayload.email        = updatePayload.email.trim().toLowerCase();

// // //     // Mobile format check
// // //     if (updatePayload.mobileNumber && !/^\d{10}$/.test(updatePayload.mobileNumber)) {
// // //       return res.status(400).json({ success: false, message: "Invalid mobile number ❌ (10 digits required)" });
// // //     }

// // //     // Email format check
// // //     if (updatePayload.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(updatePayload.email)) {
// // //       return res.status(400).json({ success: false, message: "Invalid email address ❌" });
// // //     }

// // //     // Check duplicate userName
// // //     if (updatePayload.userName) {
// // //       const existing = await User.findOne({ userName: updatePayload.userName, _id: { $ne: id } });
// // //       if (existing) {
// // //         return res.status(409).json({ success: false, message: "Username already taken ❌" });
// // //       }
// // //     }

// // //     // Check duplicate email
// // //     if (updatePayload.email) {
// // //       const existing = await User.findOne({ email: updatePayload.email, _id: { $ne: id } });
// // //       if (existing) {
// // //         return res.status(409).json({ success: false, message: "Email already registered ❌" });
// // //       }
// // //     }

// // //     // Check duplicate mobileNumber
// // //     if (updatePayload.mobileNumber) {
// // //       const existing = await User.findOne({ mobileNumber: updatePayload.mobileNumber, _id: { $ne: id } });
// // //       if (existing) {
// // //         return res.status(409).json({ success: false, message: "Mobile number already registered ❌" });
// // //       }
// // //     }

// // //     const user = await User.findByIdAndUpdate(id, updatePayload, {
// // //       new: true, runValidators: true,
// // //     }).select("-password");

// // //     if (!user) {
// // //       return res.status(404).json({ success: false, message: "User Not Found ❌" });
// // //     }

// // //     return res.status(200).json({
// // //       success: true,
// // //       message: "User Updated Successfully ✅",
// // //       user,
// // //     });

// // //   } catch (error) {
// // //     console.log("Update Error:", error);
// // //     return res.status(500).json({ success: false, message: "Server Error ❌" });
// // //   }
// // // };


// // // // ✅ GET ALL USERS
// // // exports.getUsers = async (req, res) => {
// // //   try {
// // //     const users = await User.find({})
// // //       .select("-password")
// // //       .sort({ createdAt: -1 });

// // //     return res.status(200).json({
// // //       success: true,
// // //       message: "Users fetched successfully ✅",
// // //       count: users.length,
// // //       users,
// // //     });
// // //   } catch (error) {
// // //     console.log("Get Users Error:", error);
// // //     return res.status(500).json({ success: false, message: "Server Error ❌" });
// // //   }
// // // };


// // // // ✅ DELETE USER
// // // exports.deleteUser = async (req, res) => {
// // //   try {
// // //     const { id } = req.params;
// // //     const user = await User.findByIdAndDelete(id);

// // //     if (!user) {
// // //       return res.status(404).json({ success: false, message: "User Not Found ❌" });
// // //     }

// // //     return res.status(200).json({
// // //       success: true,
// // //       message: "User Deleted Successfully ✅",
// // //       deletedUser: {
// // //         id:           user._id,
// // //         fullName:     user.fullName,
// // //         userName:     user.userName,
// // //         mobileNumber: user.mobileNumber,
// // //         email:        user.email,
// // //       },
// // //     });

// // //   } catch (error) {
// // //     console.log("Delete Error:", error);
// // //     return res.status(500).json({ success: false, message: "Server Error ❌" });
// // //   }
// // // };





// // const User = require("../models/user");
// // const jwt = require("jsonwebtoken");



// // const fetch = (...args) => import('node-fetch').then(({default: f}) => f(...args));

// // // ── WhatsApp OTP Send ────────────────────────────
// // const WA_API_URL   = "https://wafortius.in.net/V23.0/1091751790690187/messages";
// // const WA_API_TOKEN = "633744b1-4b58-484c-abf0-a46d878e413d";

// // const sendWhatsAppOtp = async (mobile, otp) => {
// //   const payload = {
// //     messaging_product: "whatsapp",
// //     recipient_type:    "individual",
// //     to:                `91${mobile}`,
// //     type:              "template",
// //     template: {
// //       name:     "citizen_otp",
// //       language: { code: "en" },
// //       components: [
// //         {
// //           type:       "body",
// //           parameters: [{ type: "text", text: String(otp) }],
// //         },
// //         {
// //           type:       "button",
// //           sub_type:   "url",
// //           index:      "0",
// //           parameters: [{ type: "text", text: String(otp) }],
// //         },
// //       ],
// //     },
// //   };

// //   const res = await fetch(WA_API_URL, {
// //     method:  "POST",
// //     headers: {
// //       "Content-Type": "application/json",
// //       Authorization:  `Bearer ${WA_API_TOKEN}`,
// //     },
// //     body: JSON.stringify(payload),
// //   });

// //   const data = await res.json();
// //   console.log("✅ WhatsApp OTP:", data);
// //   return data;
// // };
// // // ─────────────────────────────────────────────────



// // // ✅ SEND OTP — OTP generate करा + WhatsApp वर पाठवा
// // exports.sendOtp = async (req, res) => {
// //   try {
// //     const { mobileNo } = req.body;

// //     if (!mobileNo || !/^\d{10}$/.test(mobileNo.trim())) {
// //       return res.status(400).json({
// //         success: false,
// //         message: "Valid 10 digit mobile number required ❌",
// //       });
// //     }

// //     const mobile = mobileNo.trim();

// //     // OTP generate करा
// //     const otp = Math.floor(100000 + Math.random() * 900000).toString();

// //     // WhatsApp वर पाठवा
// //     await sendWhatsAppOtp(mobile, otp);

// //     // OTP return करा frontend ला (verify साठी)
// //     return res.status(200).json({
// //       success: true,
// //       message: "OTP पाठवला ✅",
// //       otp,          // frontend ला verify साठी
// //     });

// //   } catch (error) {
// //     console.log("SendOTP Error:", error);
// //     return res.status(500).json({
// //       success: false,
// //       message: "OTP पाठवण्यात error ❌",
// //     });
// //   }
// // };


// // // // ✅ REGISTER USER
// // // exports.registerUser = async (req, res) => {
// // //   try {
// // //     let { fullName, userName, password, role, departmentName, office, departmentCategory } = req.body;

// // //     userName = userName?.trim().toLowerCase();
// // //     fullName = fullName?.trim();
// // //     departmentName = departmentName?.trim();

// // //     if (!fullName || !userName || !password || !role) {
// // //       return res.status(400).json({ success: false, message: "All fields required ❌" });
// // //     }

// // //     const existingUser = await User.findOne({ userName });
// // //     if (existingUser) {
// // //       return res.status(409).json({ success: false, message: "Username already exists ❌" });
// // //     }

// // //     const newUser = await User.create({
// // //       fullName, userName, password, role, departmentName, office, departmentCategory
// // //     });

// // //     return res.status(201).json({
// // //       success: true,
// // //       message: "User Registered Successfully ✅",
// // //       user: {
// // //         id: newUser._id,
// // //         fullName: newUser.fullName,
// // //         userName: newUser.userName,
// // //         role: newUser.role,
// // //         departmentName: newUser.departmentName,
// // //         office: newUser.office,
// // //         departmentCategory: newUser.departmentCategory,
// // //       },
// // //     });

// // //   } catch (error) {
// // //     console.log("Register Error:", error);
// // //     return res.status(500).json({ success: false, message: "Server Error ❌" });
// // //   }
// // // };


// // // ✅ REGISTER USER
// // // ── Predefined roles (Users page dropdown शी same ठेवा) ──────────────────────
// // const PREDEFINED_ROLES = ["Super Admin", "Admin", "Mayor", "Guardian Minister", "Ward Councillor", "Department User"];
// // const PREDEFINED_DESIGNATIONS = ["Corporator", "Mayor", "Deputy Mayor", "Standing Committee Chairman", "Leader of House", "Leader of Opposition"];
// // const toBool = (v) => v === true || v === "true" || v === "Yes";
// // const ROLE_MANAGER_ROLES = ["Super Admin", "Admin"];

// // // Role फक्त Super Admin / Admin च set करू शकतात (public /register वरून नाही)
// // const getRequesterRole = (req) => {
// //   try {
// //     const token = req.headers.authorization?.split(" ")[1];
// //     if (!token) return null;
// //     return jwt.verify(token, process.env.JWT_SECRET)?.role || null;
// //   } catch { return null; }
// // };

// // exports.registerUser = async (req, res) => {
// //   try {
// //     let { fullName, userName, mobileNumber, email, password,departmentName} = req.body;
// //     let { role, isStandingCommitteeMember, isGeneralBodyMember, wardNo, designation } = req.body;

// //     const canSetRole = ROLE_MANAGER_ROLES.includes(getRequesterRole(req));
// //     role = canSetRole && PREDEFINED_ROLES.includes(role) ? role : "";
// //     const isCouncillor = role === "Ward Councillor";

// //     // Trim & normalize
// //     fullName     = fullName?.trim();
// //     userName     = userName?.trim().toLowerCase();
// //     mobileNumber = mobileNumber?.trim();
// //     email = email?.trim().toLowerCase();
// //     departmentName = departmentName?.trim();  // <-- use departmentName, not email

// //     // Validation
// //     if (!fullName || !userName || !mobileNumber || !password) {
// //       return res.status(400).json({
// //         success: false,
// //         message: "All fields required ❌",
// //       });
// //     }

// //     // Mobile number format check (10 digits)
// //     if (!/^\d{10}$/.test(mobileNumber)) {
// //       return res.status(400).json({
// //         success: false,
// //         message: "Invalid mobile number ❌ (10 digits required)",
// //       });
// //     }

// //     // Email format check
// //     if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
// //       return res.status(400).json({
// //         success: false,
// //         message: "Invalid email address ❌",
// //       });
// //     }

// //     // Check duplicate userName
// //     const existingUserName = await User.findOne({ userName });
// //     if (existingUserName) {
// //       return res.status(409).json({
// //         success: false,
// //         message: "Username already exists ❌",
// //       });
// //     }

// //     // Check duplicate email
// //     const existingEmail = await User.findOne({ email });
// //     if (existingEmail) {
// //       return res.status(409).json({
// //         success: false,
// //         message: "Email already registered ❌",
// //       });
// //     }

// //     // Check duplicate mobile
// //     const existingMobile = await User.findOne({ mobileNumber });
// //     if (existingMobile) {
// //       return res.status(409).json({
// //         success: false,
// //         message: "Mobile number already registered ❌",
// //       });
// //     }

// //     // Create user
// //     const newUser = await User.create({
// //       fullName,
// //       userName,
// //       mobileNumber,
// //       email,
// //       password,
// //       departmentName: isCouncillor ? "" : departmentName,
// //       role,
// //       // नगरसेवक → category "All" (सर्व विभागांचे विषय दिसतात)
// //       ...(isCouncillor ? { departmentCategory: "All" } : {}),
// //       isStandingCommitteeMember: isCouncillor ? toBool(isStandingCommitteeMember) : false,
// //       ...(isCouncillor ? {
// //         wardNo:              (wardNo || "").toString().trim(),
// //         designation:         PREDEFINED_DESIGNATIONS.includes(designation) ? designation : "Corporator",
// //         isGeneralBodyMember: isGeneralBodyMember === undefined ? true : toBool(isGeneralBodyMember),
// //       } : {}),
// //     });

// //     return res.status(201).json({
// //       success: true,
// //       message: "User Registered Successfully ✅",
// //       user: {
// //         id:           newUser._id,
// //         fullName:     newUser.fullName,
// //         userName:     newUser.userName,
// //         mobileNumber: newUser.mobileNumber,
// //         email:        newUser.email,
// //         departmentName:newUser.departmentName,
// //         role:         newUser.role,
// //         isStandingCommitteeMember: newUser.isStandingCommitteeMember,
// //         isGeneralBodyMember: newUser.isGeneralBodyMember,
// //         wardNo:       newUser.wardNo,
// //         designation:  newUser.designation,
// //       },
// //     });

// //   } catch (error) {
// //     console.log("Register Error:", error);
// //     return res.status(500).json({
// //       success: false,
// //       message: "Server Error ❌",
// //     });
// //   }
// // };


// // // ✅ LOGIN USER
// // exports.loginUser = async (req, res) => {
// //   try {
// //     const { userName, password } = req.body;

// //     if (!userName || !password) {
// //       return res.status(400).json({ success: false, message: "Username आणि Password required आहे ❌" });
// //     }

// //     const user = await User.findOne({ userName });
// //     if (!user) {
// //       return res.status(404).json({ success: false, message: "User Not Found ❌" });
// //     }

// //     if (user.password !== password) {
// //       return res.status(401).json({ success: false, message: "Invalid Password ❌" });
// //     }

// //     const token = jwt.sign(
// //       { id: user._id, userName: user.userName, role: user.role },
// //       process.env.JWT_SECRET,
// //       { expiresIn: "7d" }
// //     );

// //     // ── office आणि departmentCategory पण return करा ──
// //     return res.status(200).json({
// //       success: true,
// //       message: "Login Success ✅",
// //       token,
// //       user: {
// //         id: user._id,
// //         fullName: user.fullName,
// //         userName: user.userName,
// //         role: user.role,
// //         departmentName: user.departmentName,
// //         office: user.office,                         // ← ADD
// //         departmentCategory: user.departmentCategory, // ← ADD
// //         isStandingCommitteeMember: !!user.isStandingCommitteeMember,
// //         isGeneralBodyMember: user.isGeneralBodyMember !== false,
// //         wardNo:       user.wardNo,
// //         designation:  user.designation,
// //       },
// //     });

// //   } catch (error) {
// //     console.log("Login Error:", error);
// //     return res.status(500).json({ success: false, message: "Server Error ❌" });
// //   }
// // };



// // exports.loginByMobile = async (req, res) => {
// //   try {
// //     const { mobileNo } = req.body;

// //     if (!mobileNo) {
// //       return res.status(400).json({ 
// //         success: false, 
// //         message: "Mobile number required ❌" 
// //       });
// //     }

// //     const trimmed = mobileNo.toString().trim();

// //     // फक्त mobileNumber field check करा
// //     const user = await User.findOne({ mobileNumber: trimmed });

// //     if (!user) {
// //       return res.status(404).json({
// //         success: false,
// //         message: "हे mobile number नोंदणीकृत नाही ❌",
// //       });
// //     }

// //     const token = jwt.sign(
// //       { id: user._id, userName: user.userName, role: user.role },
// //       process.env.JWT_SECRET,
// //       { expiresIn: "7d" }
// //     );

// //     return res.status(200).json({
// //       success: true,
// //       message: "OTP Login Success ✅",
// //       token,
// //       user: {
// //         id:                 user._id,
// //         fullName:           user.fullName,
// //         userName:           user.userName,
// //         role:               user.role,
// //         departmentName:     user.departmentName,
// //         office:             user.office,
// //         departmentCategory: user.departmentCategory,
// //         isStandingCommitteeMember: !!user.isStandingCommitteeMember,
// //         isGeneralBodyMember: user.isGeneralBodyMember !== false,
// //         wardNo:       user.wardNo,
// //         designation:  user.designation,
// //       },
// //     });

// //   } catch (error) {
// //     console.log("LoginByMobile Error:", error);
// //     return res.status(500).json({ 
// //       success: false, 
// //       message: "Server Error ❌" 
// //     });
// //   }
// // };


// // // ✅ CHECK MOBILE — OTP पाठवण्यापूर्वी mobile registered आहे का check करा
// // exports.checkMobile = async (req, res) => {
// //   try {
// //     const { mobileNo } = req.body;

// //     if (!mobileNo) {
// //       return res.status(400).json({ 
// //         success: false, 
// //         message: "Mobile number required ❌" 
// //       });
// //     }

// //     const trimmed = mobileNo.toString().trim();

// //     if (!/^\d{10}$/.test(trimmed)) {
// //       return res.status(400).json({ 
// //         success: false, 
// //         message: "Invalid mobile number ❌" 
// //       });
// //     }

// //     const user = await User.findOne({ mobileNumber: trimmed });

// //     return res.status(200).json({
// //       success: true,
// //       exists: !!user,
// //       message: user 
// //         ? "Mobile number registered आहे ✅" 
// //         : "Mobile number registered नाही ❌",
// //     });

// //   } catch (error) {
// //     console.log("CheckMobile Error:", error);
// //     return res.status(500).json({ 
// //       success: false, 
// //       message: "Server Error ❌" 
// //     });
// //   }
// // };

// // // ✅ UPDATE USER
// // exports.updateUser = async (req, res) => {
// //   try {
// //     const { id } = req.params;
// //     const updatePayload = req.body;

// //     if (!updatePayload || Object.keys(updatePayload).length === 0) {
// //       return res.status(400).json({ success: false, message: "Update data required ❌" });
// //     }

// //     // Never allow password update from this route
// //     delete updatePayload.password;

// //     // Trim & normalize
// //     if (updatePayload.fullName)     updatePayload.fullName     = updatePayload.fullName.trim();
// //     if (updatePayload.userName)     updatePayload.userName     = updatePayload.userName.trim().toLowerCase();
// //     if (updatePayload.mobileNumber) updatePayload.mobileNumber = updatePayload.mobileNumber.trim();
// //     if (updatePayload.email)        updatePayload.email        = updatePayload.email.trim().toLowerCase();

// //     // Role / Standing Committee — फक्त Super Admin / Admin बदलू शकतात
// //     const COUNCILLOR_FIELDS = ["role", "isStandingCommitteeMember", "isGeneralBodyMember", "wardNo", "designation"];
// //     if (COUNCILLOR_FIELDS.some(k => k in updatePayload)) {
// //       if (!ROLE_MANAGER_ROLES.includes(getRequesterRole(req))) {
// //         COUNCILLOR_FIELDS.forEach(k => delete updatePayload[k]);
// //       } else {
// //         if ("role" in updatePayload && !PREDEFINED_ROLES.includes(updatePayload.role)) updatePayload.role = "";
// //         if (updatePayload.role === "Ward Councillor") {
// //           updatePayload.departmentCategory = "All";
// //           updatePayload.departmentName     = "";
// //           updatePayload.isStandingCommitteeMember = toBool(updatePayload.isStandingCommitteeMember);
// //           updatePayload.isGeneralBodyMember = updatePayload.isGeneralBodyMember === undefined ? true : toBool(updatePayload.isGeneralBodyMember);
// //           updatePayload.wardNo      = (updatePayload.wardNo || "").toString().trim();
// //           updatePayload.designation = PREDEFINED_DESIGNATIONS.includes(updatePayload.designation) ? updatePayload.designation : "Corporator";
// //         } else if ("role" in updatePayload) {
// //           updatePayload.isStandingCommitteeMember = false;
// //           updatePayload.isGeneralBodyMember = true;
// //           updatePayload.wardNo = "";
// //           updatePayload.designation = "";
// //         }
// //       }
// //     }

// //     // Mobile format check
// //     if (updatePayload.mobileNumber && !/^\d{10}$/.test(updatePayload.mobileNumber)) {
// //       return res.status(400).json({ success: false, message: "Invalid mobile number ❌ (10 digits required)" });
// //     }

// //     // Email format check
// //     if (updatePayload.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(updatePayload.email)) {
// //       return res.status(400).json({ success: false, message: "Invalid email address ❌" });
// //     }

// //     // Check duplicate userName
// //     if (updatePayload.userName) {
// //       const existing = await User.findOne({ userName: updatePayload.userName, _id: { $ne: id } });
// //       if (existing) {
// //         return res.status(409).json({ success: false, message: "Username already taken ❌" });
// //       }
// //     }

// //     // Check duplicate email
// //     if (updatePayload.email) {
// //       const existing = await User.findOne({ email: updatePayload.email, _id: { $ne: id } });
// //       if (existing) {
// //         return res.status(409).json({ success: false, message: "Email already registered ❌" });
// //       }
// //     }

// //     // Check duplicate mobileNumber
// //     if (updatePayload.mobileNumber) {
// //       const existing = await User.findOne({ mobileNumber: updatePayload.mobileNumber, _id: { $ne: id } });
// //       if (existing) {
// //         return res.status(409).json({ success: false, message: "Mobile number already registered ❌" });
// //       }
// //     }

// //     const user = await User.findByIdAndUpdate(id, updatePayload, {
// //       new: true, runValidators: true,
// //     }).select("-password");

// //     if (!user) {
// //       return res.status(404).json({ success: false, message: "User Not Found ❌" });
// //     }

// //     return res.status(200).json({
// //       success: true,
// //       message: "User Updated Successfully ✅",
// //       user,
// //     });

// //   } catch (error) {
// //     console.log("Update Error:", error);
// //     return res.status(500).json({ success: false, message: "Server Error ❌" });
// //   }
// // };


// // // ✅ GET ALL USERS
// // exports.getUsers = async (req, res) => {
// //   try {
// //     const users = await User.find({})
// //       .select("-password")
// //       .sort({ createdAt: -1 });

// //     return res.status(200).json({
// //       success: true,
// //       message: "Users fetched successfully ✅",
// //       count: users.length,
// //       users,
// //     });
// //   } catch (error) {
// //     console.log("Get Users Error:", error);
// //     return res.status(500).json({ success: false, message: "Server Error ❌" });
// //   }
// // };


// // // ✅ DELETE USER
// // exports.deleteUser = async (req, res) => {
// //   try {
// //     const { id } = req.params;
// //     const user = await User.findByIdAndDelete(id);

// //     if (!user) {
// //       return res.status(404).json({ success: false, message: "User Not Found ❌" });
// //     }

// //     return res.status(200).json({
// //       success: true,
// //       message: "User Deleted Successfully ✅",
// //       deletedUser: {
// //         id:           user._id,
// //         fullName:     user.fullName,
// //         userName:     user.userName,
// //         mobileNumber: user.mobileNumber,
// //         email:        user.email,
// //       },
// //     });

// //   } catch (error) {
// //     console.log("Delete Error:", error);
// //     return res.status(500).json({ success: false, message: "Server Error ❌" });
// //   }
// // };





// const User = require("../models/user");
// const jwt = require("jsonwebtoken");



// const fetch = (...args) => import('node-fetch').then(({default: f}) => f(...args));

// // ── WhatsApp OTP Send ────────────────────────────
// const WA_API_URL   = "https://wafortius.in.net/V23.0/1091751790690187/messages";
// const WA_API_TOKEN = "633744b1-4b58-484c-abf0-a46d878e413d";

// const sendWhatsAppOtp = async (mobile, otp) => {
//   const payload = {
//     messaging_product: "whatsapp",
//     recipient_type:    "individual",
//     to:                `91${mobile}`,
//     type:              "template",
//     template: {
//       name:     "citizen_otp",
//       language: { code: "en" },
//       components: [
//         {
//           type:       "body",
//           parameters: [{ type: "text", text: String(otp) }],
//         },
//         {
//           type:       "button",
//           sub_type:   "url",
//           index:      "0",
//           parameters: [{ type: "text", text: String(otp) }],
//         },
//       ],
//     },
//   };

//   const res = await fetch(WA_API_URL, {
//     method:  "POST",
//     headers: {
//       "Content-Type": "application/json",
//       Authorization:  `Bearer ${WA_API_TOKEN}`,
//     },
//     body: JSON.stringify(payload),
//   });

//   const data = await res.json();
//   console.log("✅ WhatsApp OTP:", data);
//   return data;
// };
// // ─────────────────────────────────────────────────



// // ✅ SEND OTP — OTP generate करा + WhatsApp वर पाठवा
// exports.sendOtp = async (req, res) => {
//   try {
//     const { mobileNo } = req.body;

//     if (!mobileNo || !/^\d{10}$/.test(mobileNo.trim())) {
//       return res.status(400).json({
//         success: false,
//         message: "Valid 10 digit mobile number required ❌",
//       });
//     }

//     const mobile = mobileNo.trim();

//     // OTP generate करा
//     const otp = Math.floor(100000 + Math.random() * 900000).toString();

//     // WhatsApp वर पाठवा
//     await sendWhatsAppOtp(mobile, otp);

//     // OTP return करा frontend ला (verify साठी)
//     return res.status(200).json({
//       success: true,
//       message: "OTP पाठवला ✅",
//       otp,          // frontend ला verify साठी
//     });

//   } catch (error) {
//     console.log("SendOTP Error:", error);
//     return res.status(500).json({
//       success: false,
//       message: "OTP पाठवण्यात error ❌",
//     });
//   }
// };


// // // ✅ REGISTER USER
// // exports.registerUser = async (req, res) => {
// //   try {
// //     let { fullName, userName, password, role, departmentName, office, departmentCategory } = req.body;

// //     userName = userName?.trim().toLowerCase();
// //     fullName = fullName?.trim();
// //     departmentName = departmentName?.trim();

// //     if (!fullName || !userName || !password || !role) {
// //       return res.status(400).json({ success: false, message: "All fields required ❌" });
// //     }

// //     const existingUser = await User.findOne({ userName });
// //     if (existingUser) {
// //       return res.status(409).json({ success: false, message: "Username already exists ❌" });
// //     }

// //     const newUser = await User.create({
// //       fullName, userName, password, role, departmentName, office, departmentCategory
// //     });

// //     return res.status(201).json({
// //       success: true,
// //       message: "User Registered Successfully ✅",
// //       user: {
// //         id: newUser._id,
// //         fullName: newUser.fullName,
// //         userName: newUser.userName,
// //         role: newUser.role,
// //         departmentName: newUser.departmentName,
// //         office: newUser.office,
// //         departmentCategory: newUser.departmentCategory,
// //       },
// //     });

// //   } catch (error) {
// //     console.log("Register Error:", error);
// //     return res.status(500).json({ success: false, message: "Server Error ❌" });
// //   }
// // };


// // ✅ REGISTER USER
// // ── Predefined roles (Users page dropdown शी same ठेवा) ──────────────────────
// const { CORPORATOR, isCorporatorRole, normalizeRole, normalizeDesignation } = require("../utils/roles");
// const PREDEFINED_ROLES = ["Super Admin", "Admin", "Mayor", "Guardian Minister", CORPORATOR, "Department User"];
// const PREDEFINED_DESIGNATIONS = [CORPORATOR, "Mayor", "Deputy Mayor", "Standing Committee Chairman", "Leader of House", "Leader of Opposition"];
// const toBool = (v) => v === true || v === "true" || v === "Yes";
// const ROLE_MANAGER_ROLES = ["Super Admin", "Admin"];

// // Role फक्त Super Admin / Admin च set करू शकतात (public /register वरून नाही)
// const getRequesterRole = (req) => {
//   try {
//     const token = req.headers.authorization?.split(" ")[1];
//     if (!token) return null;
//     return jwt.verify(token, process.env.JWT_SECRET)?.role || null;
//   } catch { return null; }
// };

// exports.registerUser = async (req, res) => {
//   try {
//     let { fullName, userName, mobileNumber, email, password,departmentName} = req.body;
//     let { role, isStandingCommitteeMember, isGeneralBodyMember, wardNo, designation } = req.body;

//     const canSetRole = ROLE_MANAGER_ROLES.includes(getRequesterRole(req));
//     role = normalizeRole(role);                       // "Corporator" → "corporator"
//     designation = normalizeDesignation(designation);  // "Corporator" → "corporator"
//     role = canSetRole && PREDEFINED_ROLES.includes(role) ? role : "";
//     const isCouncillor = isCorporatorRole(role);

//     // Trim & normalize
//     fullName     = fullName?.trim();
//     userName     = userName?.trim().toLowerCase();
//     mobileNumber = mobileNumber?.trim();
//     email = email?.trim().toLowerCase();
//     departmentName = departmentName?.trim();  // <-- use departmentName, not email

//     // Validation
//     if (!fullName || !userName || !mobileNumber || !password) {
//       return res.status(400).json({
//         success: false,
//         message: "All fields required ❌",
//       });
//     }

//     // Mobile number format check (10 digits)
//     if (!/^\d{10}$/.test(mobileNumber)) {
//       return res.status(400).json({
//         success: false,
//         message: "Invalid mobile number ❌ (10 digits required)",
//       });
//     }

//     // Email format check
//     if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
//       return res.status(400).json({
//         success: false,
//         message: "Invalid email address ❌",
//       });
//     }

//     // Check duplicate userName
//     const existingUserName = await User.findOne({ userName });
//     if (existingUserName) {
//       return res.status(409).json({
//         success: false,
//         message: "Username already exists ❌",
//       });
//     }

//     // Check duplicate email
//     const existingEmail = await User.findOne({ email });
//     if (existingEmail) {
//       return res.status(409).json({
//         success: false,
//         message: "Email already registered ❌",
//       });
//     }

//     // Check duplicate mobile
//     const existingMobile = await User.findOne({ mobileNumber });
//     if (existingMobile) {
//       return res.status(409).json({
//         success: false,
//         message: "Mobile number already registered ❌",
//       });
//     }

//     // Create user
//     const newUser = await User.create({
//       fullName,
//       userName,
//       mobileNumber,
//       email,
//       password,
//       departmentName: isCouncillor ? "" : departmentName,
//       role,
//       // नगरसेवक → category "All" (सर्व विभागांचे विषय दिसतात)
//       ...(isCouncillor ? { departmentCategory: "All" } : {}),
//       isStandingCommitteeMember: isCouncillor ? toBool(isStandingCommitteeMember) : false,
//       ...(isCouncillor ? {
//         wardNo:              (wardNo || "").toString().trim(),
//         designation:         PREDEFINED_DESIGNATIONS.includes(designation) ? designation : CORPORATOR,
//         isGeneralBodyMember: isGeneralBodyMember === undefined ? true : toBool(isGeneralBodyMember),
//       } : {}),
//     });

//     return res.status(201).json({
//       success: true,
//       message: "User Registered Successfully ✅",
//       user: {
//         id:           newUser._id,
//         fullName:     newUser.fullName,
//         userName:     newUser.userName,
//         mobileNumber: newUser.mobileNumber,
//         email:        newUser.email,
//         departmentName:newUser.departmentName,
//         role:         newUser.role,
//         isStandingCommitteeMember: newUser.isStandingCommitteeMember,
//         isGeneralBodyMember: newUser.isGeneralBodyMember,
//         wardNo:       newUser.wardNo,
//         designation:  newUser.designation,
//       },
//     });

//   } catch (error) {
//     console.log("Register Error:", error);
//     return res.status(500).json({
//       success: false,
//       message: "Server Error ❌",
//     });
//   }
// };


// // ✅ LOGIN USER
// exports.loginUser = async (req, res) => {
//   try {
//     const { userName, password } = req.body;

//     if (!userName || !password) {
//       return res.status(400).json({ success: false, message: "Username आणि Password required आहे ❌" });
//     }

//     const user = await User.findOne({ userName });
//     if (!user) {
//       return res.status(404).json({ success: false, message: "User Not Found ❌" });
//     }

//     if (user.password !== password) {
//       return res.status(401).json({ success: false, message: "Invalid Password ❌" });
//     }

//     const token = jwt.sign(
//       { id: user._id, userName: user.userName, role: normalizeRole(user.role) },
//       process.env.JWT_SECRET,
//       { expiresIn: "7d" }
//     );

//     // ── office आणि departmentCategory पण return करा ──
//     return res.status(200).json({
//       success: true,
//       message: "Login Success ✅",
//       token,
//       user: {
//         id: user._id,
//         fullName: user.fullName,
//         userName: user.userName,
//         role: normalizeRole(user.role),
//         departmentName: user.departmentName,
//         office: user.office,                         // ← ADD
//         departmentCategory: user.departmentCategory, // ← ADD
//         isStandingCommitteeMember: !!user.isStandingCommitteeMember,
//         isGeneralBodyMember: user.isGeneralBodyMember !== false,
//         wardNo:       user.wardNo,
//         designation:  normalizeDesignation(user.designation),
//       },
//     });

//   } catch (error) {
//     console.log("Login Error:", error);
//     return res.status(500).json({ success: false, message: "Server Error ❌" });
//   }
// };



// exports.loginByMobile = async (req, res) => {
//   try {
//     const { mobileNo } = req.body;

//     if (!mobileNo) {
//       return res.status(400).json({ 
//         success: false, 
//         message: "Mobile number required ❌" 
//       });
//     }

//     const trimmed = mobileNo.toString().trim();

//     // फक्त mobileNumber field check करा
//     const user = await User.findOne({ mobileNumber: trimmed });

//     if (!user) {
//       return res.status(404).json({
//         success: false,
//         message: "हे mobile number नोंदणीकृत नाही ❌",
//       });
//     }

//     const token = jwt.sign(
//       { id: user._id, userName: user.userName, role: normalizeRole(user.role) },
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
//         role:               normalizeRole(user.role),
//         departmentName:     user.departmentName,
//         office:             user.office,
//         departmentCategory: user.departmentCategory,
//         isStandingCommitteeMember: !!user.isStandingCommitteeMember,
//         isGeneralBodyMember: user.isGeneralBodyMember !== false,
//         wardNo:       user.wardNo,
//         designation:  normalizeDesignation(user.designation),
//       },
//     });

//   } catch (error) {
//     console.log("LoginByMobile Error:", error);
//     return res.status(500).json({ 
//       success: false, 
//       message: "Server Error ❌" 
//     });
//   }
// };


// // ✅ CHECK MOBILE — OTP पाठवण्यापूर्वी mobile registered आहे का check करा
// exports.checkMobile = async (req, res) => {
//   try {
//     const { mobileNo } = req.body;

//     if (!mobileNo) {
//       return res.status(400).json({ 
//         success: false, 
//         message: "Mobile number required ❌" 
//       });
//     }

//     const trimmed = mobileNo.toString().trim();

//     if (!/^\d{10}$/.test(trimmed)) {
//       return res.status(400).json({ 
//         success: false, 
//         message: "Invalid mobile number ❌" 
//       });
//     }

//     const user = await User.findOne({ mobileNumber: trimmed });

//     return res.status(200).json({
//       success: true,
//       exists: !!user,
//       message: user 
//         ? "Mobile number registered आहे ✅" 
//         : "Mobile number registered नाही ❌",
//     });

//   } catch (error) {
//     console.log("CheckMobile Error:", error);
//     return res.status(500).json({ 
//       success: false, 
//       message: "Server Error ❌" 
//     });
//   }
// };

// // ✅ UPDATE USER
// exports.updateUser = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const updatePayload = req.body;

//     if (!updatePayload || Object.keys(updatePayload).length === 0) {
//       return res.status(400).json({ success: false, message: "Update data required ❌" });
//     }

//     // Never allow password update from this route
//     delete updatePayload.password;

//     // Trim & normalize
//     if (updatePayload.fullName)     updatePayload.fullName     = updatePayload.fullName.trim();
//     if (updatePayload.userName)     updatePayload.userName     = updatePayload.userName.trim().toLowerCase();
//     if (updatePayload.mobileNumber) updatePayload.mobileNumber = updatePayload.mobileNumber.trim();
//     if (updatePayload.email)        updatePayload.email        = updatePayload.email.trim().toLowerCase();

//     // Role / Standing Committee — फक्त Super Admin / Admin बदलू शकतात
//     const COUNCILLOR_FIELDS = ["role", "isStandingCommitteeMember", "isGeneralBodyMember", "wardNo", "designation"];
//     if (COUNCILLOR_FIELDS.some(k => k in updatePayload)) {
//       if (!ROLE_MANAGER_ROLES.includes(getRequesterRole(req))) {
//         COUNCILLOR_FIELDS.forEach(k => delete updatePayload[k]);
//       } else {
//         if ("role" in updatePayload) updatePayload.role = normalizeRole(updatePayload.role);
//         if ("designation" in updatePayload) updatePayload.designation = normalizeDesignation(updatePayload.designation);
//         if ("role" in updatePayload && !PREDEFINED_ROLES.includes(updatePayload.role)) updatePayload.role = "";
//         if (isCorporatorRole(updatePayload.role)) {
//           updatePayload.departmentCategory = "All";
//           updatePayload.departmentName     = "";
//           updatePayload.isStandingCommitteeMember = toBool(updatePayload.isStandingCommitteeMember);
//           updatePayload.isGeneralBodyMember = updatePayload.isGeneralBodyMember === undefined ? true : toBool(updatePayload.isGeneralBodyMember);
//           updatePayload.wardNo      = (updatePayload.wardNo || "").toString().trim();
//           updatePayload.designation = PREDEFINED_DESIGNATIONS.includes(updatePayload.designation) ? updatePayload.designation : CORPORATOR;
//         } else if ("role" in updatePayload) {
//           updatePayload.isStandingCommitteeMember = false;
//           updatePayload.isGeneralBodyMember = true;
//           updatePayload.wardNo = "";
//           updatePayload.designation = "";
//         }
//       }
//     }

//     // Mobile format check
//     if (updatePayload.mobileNumber && !/^\d{10}$/.test(updatePayload.mobileNumber)) {
//       return res.status(400).json({ success: false, message: "Invalid mobile number ❌ (10 digits required)" });
//     }

//     // Email format check
//     if (updatePayload.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(updatePayload.email)) {
//       return res.status(400).json({ success: false, message: "Invalid email address ❌" });
//     }

//     // Check duplicate userName
//     if (updatePayload.userName) {
//       const existing = await User.findOne({ userName: updatePayload.userName, _id: { $ne: id } });
//       if (existing) {
//         return res.status(409).json({ success: false, message: "Username already taken ❌" });
//       }
//     }

//     // Check duplicate email
//     if (updatePayload.email) {
//       const existing = await User.findOne({ email: updatePayload.email, _id: { $ne: id } });
//       if (existing) {
//         return res.status(409).json({ success: false, message: "Email already registered ❌" });
//       }
//     }

//     // Check duplicate mobileNumber
//     if (updatePayload.mobileNumber) {
//       const existing = await User.findOne({ mobileNumber: updatePayload.mobileNumber, _id: { $ne: id } });
//       if (existing) {
//         return res.status(409).json({ success: false, message: "Mobile number already registered ❌" });
//       }
//     }

//     const user = await User.findByIdAndUpdate(id, updatePayload, {
//       new: true, runValidators: true,
//     }).select("-password");

//     if (!user) {
//       return res.status(404).json({ success: false, message: "User Not Found ❌" });
//     }

//     return res.status(200).json({
//       success: true,
//       message: "User Updated Successfully ✅",
//       user,
//     });

//   } catch (error) {
//     console.log("Update Error:", error);
//     return res.status(500).json({ success: false, message: "Server Error ❌" });
//   }
// };


// // ✅ GET ALL USERS
// exports.getUsers = async (req, res) => {
//   try {
//     const users = await User.find({})
//       .select("-password")
//       .sort({ createdAt: -1 });

//     return res.status(200).json({
//       success: true,
//       message: "Users fetched successfully ✅",
//       count: users.length,
//       users,
//     });
//   } catch (error) {
//     console.log("Get Users Error:", error);
//     return res.status(500).json({ success: false, message: "Server Error ❌" });
//   }
// };


// // ✅ DELETE USER
// exports.deleteUser = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const user = await User.findByIdAndDelete(id);

//     if (!user) {
//       return res.status(404).json({ success: false, message: "User Not Found ❌" });
//     }

//     return res.status(200).json({
//       success: true,
//       message: "User Deleted Successfully ✅",
//       deletedUser: {
//         id:           user._id,
//         fullName:     user.fullName,
//         userName:     user.userName,
//         mobileNumber: user.mobileNumber,
//         email:        user.email,
//       },
//     });

//   } catch (error) {
//     console.log("Delete Error:", error);
//     return res.status(500).json({ success: false, message: "Server Error ❌" });
//   }
// };





// const User = require("../models/user");
// const jwt = require("jsonwebtoken");



// const fetch = (...args) => import('node-fetch').then(({default: f}) => f(...args));

// // ── WhatsApp OTP Send ────────────────────────────
// const WA_API_URL   = "https://wafortius.in.net/V23.0/1091751790690187/messages";
// const WA_API_TOKEN = "633744b1-4b58-484c-abf0-a46d878e413d";

// const sendWhatsAppOtp = async (mobile, otp) => {
//   const payload = {
//     messaging_product: "whatsapp",
//     recipient_type:    "individual",
//     to:                `91${mobile}`,
//     type:              "template",
//     template: {
//       name:     "citizen_otp",
//       language: { code: "en" },
//       components: [
//         {
//           type:       "body",
//           parameters: [{ type: "text", text: String(otp) }],
//         },
//         {
//           type:       "button",
//           sub_type:   "url",
//           index:      "0",
//           parameters: [{ type: "text", text: String(otp) }],
//         },
//       ],
//     },
//   };

//   const res = await fetch(WA_API_URL, {
//     method:  "POST",
//     headers: {
//       "Content-Type": "application/json",
//       Authorization:  `Bearer ${WA_API_TOKEN}`,
//     },
//     body: JSON.stringify(payload),
//   });

//   const data = await res.json();
//   console.log("✅ WhatsApp OTP:", data);
//   return data;
// };
// // ─────────────────────────────────────────────────



// // ✅ SEND OTP — OTP generate करा + WhatsApp वर पाठवा
// exports.sendOtp = async (req, res) => {
//   try {
//     const { mobileNo } = req.body;

//     if (!mobileNo || !/^\d{10}$/.test(mobileNo.trim())) {
//       return res.status(400).json({
//         success: false,
//         message: "Valid 10 digit mobile number required ❌",
//       });
//     }

//     const mobile = mobileNo.trim();

//     // OTP generate करा
//     const otp = Math.floor(100000 + Math.random() * 900000).toString();

//     // WhatsApp वर पाठवा
//     await sendWhatsAppOtp(mobile, otp);

//     // OTP return करा frontend ला (verify साठी)
//     return res.status(200).json({
//       success: true,
//       message: "OTP पाठवला ✅",
//       otp,          // frontend ला verify साठी
//     });

//   } catch (error) {
//     console.log("SendOTP Error:", error);
//     return res.status(500).json({
//       success: false,
//       message: "OTP पाठवण्यात error ❌",
//     });
//   }
// };


// // // ✅ REGISTER USER
// // exports.registerUser = async (req, res) => {
// //   try {
// //     let { fullName, userName, password, role, departmentName, office, departmentCategory } = req.body;

// //     userName = userName?.trim().toLowerCase();
// //     fullName = fullName?.trim();
// //     departmentName = departmentName?.trim();

// //     if (!fullName || !userName || !password || !role) {
// //       return res.status(400).json({ success: false, message: "All fields required ❌" });
// //     }

// //     const existingUser = await User.findOne({ userName });
// //     if (existingUser) {
// //       return res.status(409).json({ success: false, message: "Username already exists ❌" });
// //     }

// //     const newUser = await User.create({
// //       fullName, userName, password, role, departmentName, office, departmentCategory
// //     });

// //     return res.status(201).json({
// //       success: true,
// //       message: "User Registered Successfully ✅",
// //       user: {
// //         id: newUser._id,
// //         fullName: newUser.fullName,
// //         userName: newUser.userName,
// //         role: newUser.role,
// //         departmentName: newUser.departmentName,
// //         office: newUser.office,
// //         departmentCategory: newUser.departmentCategory,
// //       },
// //     });

// //   } catch (error) {
// //     console.log("Register Error:", error);
// //     return res.status(500).json({ success: false, message: "Server Error ❌" });
// //   }
// // };


// // ✅ REGISTER USER
// // ── Predefined roles (Users page dropdown शी same ठेवा) ──────────────────────
// const { CORPORATOR, isCorporatorRole, normalizeRole, normalizeDesignation } = require("../utils/roles");
// const PREDEFINED_ROLES = ["Super Admin", "Admin", "Mayor", "Guardian Minister", CORPORATOR, "Department User"];
// const PREDEFINED_DESIGNATIONS = [CORPORATOR, "Mayor", "Deputy Mayor", "Standing Committee Chairman", "Leader of House", "Leader of Opposition"];
// const toBool = (v) => v === true || v === "true" || v === "Yes";
// const ROLE_MANAGER_ROLES = ["Super Admin", "Admin"];

// // Role फक्त Super Admin / Admin च set करू शकतात (public /register वरून नाही)
// const getRequesterRole = (req) => {
//   try {
//     const token = req.headers.authorization?.split(" ")[1];
//     if (!token) return null;
//     return jwt.verify(token, process.env.JWT_SECRET)?.role || null;
//   } catch { return null; }
// };

// exports.registerUser = async (req, res) => {
//   try {
//     let { fullName, userName, mobileNumber, email, password,departmentName} = req.body;
//     let { role, isStandingCommitteeMember, isGeneralBodyMember, wardNo, designation } = req.body;

//     const canSetRole = ROLE_MANAGER_ROLES.includes(getRequesterRole(req));
//     role = normalizeRole(role);                       // "Corporator" → "corporator"
//     designation = normalizeDesignation(designation);  // "Corporator" → "corporator"
//     role = canSetRole && PREDEFINED_ROLES.includes(role) ? role : "";
//     const isCouncillor = isCorporatorRole(role);

//     // Trim & normalize
//     fullName     = fullName?.trim();
//     userName     = userName?.trim().toLowerCase();
//     mobileNumber = mobileNumber?.trim();
//     email = email?.trim().toLowerCase();
//     departmentName = departmentName?.trim();  // <-- use departmentName, not email

//     // नगरसेवक (corporator) → username दिला नसेल तर mobile number हाच username
//     if (isCouncillor && !userName && mobileNumber) userName = mobileNumber;

//     // Validation
//     if (!fullName || !userName || !mobileNumber || !password) {
//       return res.status(400).json({
//         success: false,
//         message: "All fields required ❌",
//       });
//     }

//     // Mobile number format check (10 digits)
//     if (!/^\d{10}$/.test(mobileNumber)) {
//       return res.status(400).json({
//         success: false,
//         message: "Invalid mobile number ❌ (10 digits required)",
//       });
//     }

//     // Email format check (email compulsory नाही — दिला असेल तरच check)
//     if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
//       return res.status(400).json({
//         success: false,
//         message: "Invalid email address ❌",
//       });
//     }

//     // Check duplicate userName
//     const existingUserName = await User.findOne({ userName });
//     if (existingUserName) {
//       return res.status(409).json({
//         success: false,
//         message: "Username already exists ❌",
//       });
//     }

//     // Check duplicate email (email दिला असेल तरच)
//     const existingEmail = email ? await User.findOne({ email }) : null;
//     if (existingEmail) {
//       return res.status(409).json({
//         success: false,
//         message: "Email already registered ❌",
//       });
//     }

//     // Check duplicate mobile
//     const existingMobile = await User.findOne({ mobileNumber });
//     if (existingMobile) {
//       return res.status(409).json({
//         success: false,
//         message: "Mobile number already registered ❌",
//       });
//     }

//     // Create user
//     const newUser = await User.create({
//       fullName,
//       userName,
//       mobileNumber,
//       email: email || undefined,
//       password,
//       departmentName: isCouncillor ? "" : departmentName,
//       role,
//       // नगरसेवक → category "All" (सर्व विभागांचे विषय दिसतात)
//       ...(isCouncillor ? { departmentCategory: "All" } : {}),
//       isStandingCommitteeMember: isCouncillor ? toBool(isStandingCommitteeMember) : false,
//       ...(isCouncillor ? {
//         wardNo:              (wardNo || "").toString().trim(),
//         designation:         PREDEFINED_DESIGNATIONS.includes(designation) ? designation : CORPORATOR,
//         isGeneralBodyMember: isGeneralBodyMember === undefined ? true : toBool(isGeneralBodyMember),
//       } : {}),
//     });

//     return res.status(201).json({
//       success: true,
//       message: "User Registered Successfully ✅",
//       user: {
//         id:           newUser._id,
//         fullName:     newUser.fullName,
//         userName:     newUser.userName,
//         mobileNumber: newUser.mobileNumber,
//         email:        newUser.email,
//         departmentName:newUser.departmentName,
//         role:         newUser.role,
//         isStandingCommitteeMember: newUser.isStandingCommitteeMember,
//         isGeneralBodyMember: newUser.isGeneralBodyMember,
//         wardNo:       newUser.wardNo,
//         designation:  newUser.designation,
//       },
//     });

//   } catch (error) {
//     console.log("Register Error:", error);
//     return res.status(500).json({
//       success: false,
//       message: "Server Error ❌",
//     });
//   }
// };


// // ✅ LOGIN USER
// exports.loginUser = async (req, res) => {
//   try {
//     const { userName, password } = req.body;

//     if (!userName || !password) {
//       return res.status(400).json({ success: false, message: "Username आणि Password required आहे ❌" });
//     }

//     const user = await User.findOne({ userName });
//     if (!user) {
//       return res.status(404).json({ success: false, message: "User Not Found ❌" });
//     }

//     if (user.password !== password) {
//       return res.status(401).json({ success: false, message: "Invalid Password ❌" });
//     }

//     const token = jwt.sign(
//       { id: user._id, userName: user.userName, role: normalizeRole(user.role) },
//       process.env.JWT_SECRET,
//       { expiresIn: "7d" }
//     );

//     // ── office आणि departmentCategory पण return करा ──
//     return res.status(200).json({
//       success: true,
//       message: "Login Success ✅",
//       token,
//       user: {
//         id: user._id,
//         fullName: user.fullName,
//         userName: user.userName,
//         role: normalizeRole(user.role),
//         departmentName: user.departmentName,
//         office: user.office,                         // ← ADD
//         departmentCategory: user.departmentCategory, // ← ADD
//         isStandingCommitteeMember: !!user.isStandingCommitteeMember,
//         isGeneralBodyMember: user.isGeneralBodyMember !== false,
//         wardNo:       user.wardNo,
//         designation:  normalizeDesignation(user.designation),
//       },
//     });

//   } catch (error) {
//     console.log("Login Error:", error);
//     return res.status(500).json({ success: false, message: "Server Error ❌" });
//   }
// };



// exports.loginByMobile = async (req, res) => {
//   try {
//     const { mobileNo } = req.body;

//     if (!mobileNo) {
//       return res.status(400).json({ 
//         success: false, 
//         message: "Mobile number required ❌" 
//       });
//     }

//     const trimmed = mobileNo.toString().trim();

//     // फक्त mobileNumber field check करा
//     const user = await User.findOne({ mobileNumber: trimmed });

//     if (!user) {
//       return res.status(404).json({
//         success: false,
//         message: "हे mobile number नोंदणीकृत नाही ❌",
//       });
//     }

//     const token = jwt.sign(
//       { id: user._id, userName: user.userName, role: normalizeRole(user.role) },
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
//         role:               normalizeRole(user.role),
//         departmentName:     user.departmentName,
//         office:             user.office,
//         departmentCategory: user.departmentCategory,
//         isStandingCommitteeMember: !!user.isStandingCommitteeMember,
//         isGeneralBodyMember: user.isGeneralBodyMember !== false,
//         wardNo:       user.wardNo,
//         designation:  normalizeDesignation(user.designation),
//       },
//     });

//   } catch (error) {
//     console.log("LoginByMobile Error:", error);
//     return res.status(500).json({ 
//       success: false, 
//       message: "Server Error ❌" 
//     });
//   }
// };


// // ✅ CHECK MOBILE — OTP पाठवण्यापूर्वी mobile registered आहे का check करा
// exports.checkMobile = async (req, res) => {
//   try {
//     const { mobileNo } = req.body;

//     if (!mobileNo) {
//       return res.status(400).json({ 
//         success: false, 
//         message: "Mobile number required ❌" 
//       });
//     }

//     const trimmed = mobileNo.toString().trim();

//     if (!/^\d{10}$/.test(trimmed)) {
//       return res.status(400).json({ 
//         success: false, 
//         message: "Invalid mobile number ❌" 
//       });
//     }

//     const user = await User.findOne({ mobileNumber: trimmed });

//     return res.status(200).json({
//       success: true,
//       exists: !!user,
//       message: user 
//         ? "Mobile number registered आहे ✅" 
//         : "Mobile number registered नाही ❌",
//     });

//   } catch (error) {
//     console.log("CheckMobile Error:", error);
//     return res.status(500).json({ 
//       success: false, 
//       message: "Server Error ❌" 
//     });
//   }
// };

// // ✅ UPDATE USER
// exports.updateUser = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const updatePayload = req.body;

//     if (!updatePayload || Object.keys(updatePayload).length === 0) {
//       return res.status(400).json({ success: false, message: "Update data required ❌" });
//     }

//     // Never allow password update from this route
//     delete updatePayload.password;

//     // Trim & normalize
//     if (updatePayload.fullName)     updatePayload.fullName     = updatePayload.fullName.trim();
//     if (updatePayload.userName)     updatePayload.userName     = updatePayload.userName.trim().toLowerCase();
//     if (updatePayload.mobileNumber) updatePayload.mobileNumber = updatePayload.mobileNumber.trim();
//     if (updatePayload.email)        updatePayload.email        = updatePayload.email.trim().toLowerCase();

//     // Role / Standing Committee — फक्त Super Admin / Admin बदलू शकतात
//     const COUNCILLOR_FIELDS = ["role", "isStandingCommitteeMember", "isGeneralBodyMember", "wardNo", "designation"];
//     if (COUNCILLOR_FIELDS.some(k => k in updatePayload)) {
//       if (!ROLE_MANAGER_ROLES.includes(getRequesterRole(req))) {
//         COUNCILLOR_FIELDS.forEach(k => delete updatePayload[k]);
//       } else {
//         if ("role" in updatePayload) updatePayload.role = normalizeRole(updatePayload.role);
//         if ("designation" in updatePayload) updatePayload.designation = normalizeDesignation(updatePayload.designation);
//         if ("role" in updatePayload && !PREDEFINED_ROLES.includes(updatePayload.role)) updatePayload.role = "";
//         if (isCorporatorRole(updatePayload.role)) {
//           updatePayload.departmentCategory = "All";
//           updatePayload.departmentName     = "";
//           updatePayload.isStandingCommitteeMember = toBool(updatePayload.isStandingCommitteeMember);
//           updatePayload.isGeneralBodyMember = updatePayload.isGeneralBodyMember === undefined ? true : toBool(updatePayload.isGeneralBodyMember);
//           updatePayload.wardNo      = (updatePayload.wardNo || "").toString().trim();
//           updatePayload.designation = PREDEFINED_DESIGNATIONS.includes(updatePayload.designation) ? updatePayload.designation : CORPORATOR;
//         } else if ("role" in updatePayload) {
//           updatePayload.isStandingCommitteeMember = false;
//           updatePayload.isGeneralBodyMember = true;
//           updatePayload.wardNo = "";
//           updatePayload.designation = "";
//         }
//       }
//     }

//     // Mobile format check
//     if (updatePayload.mobileNumber && !/^\d{10}$/.test(updatePayload.mobileNumber)) {
//       return res.status(400).json({ success: false, message: "Invalid mobile number ❌ (10 digits required)" });
//     }

//     // Email format check
//     if (updatePayload.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(updatePayload.email)) {
//       return res.status(400).json({ success: false, message: "Invalid email address ❌" });
//     }

//     // Check duplicate userName
//     if (updatePayload.userName) {
//       const existing = await User.findOne({ userName: updatePayload.userName, _id: { $ne: id } });
//       if (existing) {
//         return res.status(409).json({ success: false, message: "Username already taken ❌" });
//       }
//     }

//     // Check duplicate email
//     if (updatePayload.email) {
//       const existing = await User.findOne({ email: updatePayload.email, _id: { $ne: id } });
//       if (existing) {
//         return res.status(409).json({ success: false, message: "Email already registered ❌" });
//       }
//     }

//     // Check duplicate mobileNumber
//     if (updatePayload.mobileNumber) {
//       const existing = await User.findOne({ mobileNumber: updatePayload.mobileNumber, _id: { $ne: id } });
//       if (existing) {
//         return res.status(409).json({ success: false, message: "Mobile number already registered ❌" });
//       }
//     }

//     const user = await User.findByIdAndUpdate(id, updatePayload, {
//       new: true, runValidators: true,
//     }).select("-password");

//     if (!user) {
//       return res.status(404).json({ success: false, message: "User Not Found ❌" });
//     }

//     return res.status(200).json({
//       success: true,
//       message: "User Updated Successfully ✅",
//       user,
//     });

//   } catch (error) {
//     console.log("Update Error:", error);
//     return res.status(500).json({ success: false, message: "Server Error ❌" });
//   }
// };


// // ✅ GET ALL USERS
// exports.getUsers = async (req, res) => {
//   try {
//     const users = await User.find({})
//       .select("-password")
//       .sort({ createdAt: -1 });

//     return res.status(200).json({
//       success: true,
//       message: "Users fetched successfully ✅",
//       count: users.length,
//       users,
//     });
//   } catch (error) {
//     console.log("Get Users Error:", error);
//     return res.status(500).json({ success: false, message: "Server Error ❌" });
//   }
// };


// // ✅ DELETE USER
// exports.deleteUser = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const user = await User.findByIdAndDelete(id);

//     if (!user) {
//       return res.status(404).json({ success: false, message: "User Not Found ❌" });
//     }

//     return res.status(200).json({
//       success: true,
//       message: "User Deleted Successfully ✅",
//       deletedUser: {
//         id:           user._id,
//         fullName:     user.fullName,
//         userName:     user.userName,
//         mobileNumber: user.mobileNumber,
//         email:        user.email,
//       },
//     });

//   } catch (error) {
//     console.log("Delete Error:", error);
//     return res.status(500).json({ success: false, message: "Server Error ❌" });
//   }
// };


const User = require("../models/user");
const jwt = require("jsonwebtoken");



const fetch = (...args) => import('node-fetch').then(({default: f}) => f(...args));

// ── WhatsApp OTP Send ────────────────────────────
const WA_API_URL   = "https://wafortius.in.net/V23.0/1091751790690187/messages";
const WA_API_TOKEN = "633744b1-4b58-484c-abf0-a46d878e413d";

const sendWhatsAppOtp = async (mobile, otp) => {
  const payload = {
    messaging_product: "whatsapp",
    recipient_type:    "individual",
    to:                `91${mobile}`,
    type:              "template",
    template: {
      name:     "citizen_otp",
      language: { code: "en" },
      components: [
        {
          type:       "body",
          parameters: [{ type: "text", text: String(otp) }],
        },
        {
          type:       "button",
          sub_type:   "url",
          index:      "0",
          parameters: [{ type: "text", text: String(otp) }],
        },
      ],
    },
  };

  const res = await fetch(WA_API_URL, {
    method:  "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization:  `Bearer ${WA_API_TOKEN}`,
    },
    body: JSON.stringify(payload),
  });

  const data = await res.json();
  console.log("✅ WhatsApp OTP:", data);
  return data;
};
// ─────────────────────────────────────────────────



// ✅ SEND OTP — OTP generate करा + WhatsApp वर पाठवा
exports.sendOtp = async (req, res) => {
  try {
    const { mobileNo } = req.body;

    if (!mobileNo || !/^\d{10}$/.test(mobileNo.trim())) {
      return res.status(400).json({
        success: false,
        message: "Valid 10 digit mobile number required ❌",
      });
    }

    const mobile = mobileNo.trim();

    // OTP generate करा
    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    // WhatsApp वर पाठवा
    await sendWhatsAppOtp(mobile, otp);

    // OTP return करा frontend ला (verify साठी)
    return res.status(200).json({
      success: true,
      message: "OTP पाठवला ✅",
      otp,          // frontend ला verify साठी
    });

  } catch (error) {
    console.log("SendOTP Error:", error);
    return res.status(500).json({
      success: false,
      message: "OTP पाठवण्यात error ❌",
    });
  }
};


// // ✅ REGISTER USER
// exports.registerUser = async (req, res) => {
//   try {
//     let { fullName, userName, password, role, departmentName, office, departmentCategory } = req.body;

//     userName = userName?.trim().toLowerCase();
//     fullName = fullName?.trim();
//     departmentName = departmentName?.trim();

//     if (!fullName || !userName || !password || !role) {
//       return res.status(400).json({ success: false, message: "All fields required ❌" });
//     }

//     const existingUser = await User.findOne({ userName });
//     if (existingUser) {
//       return res.status(409).json({ success: false, message: "Username already exists ❌" });
//     }

//     const newUser = await User.create({
//       fullName, userName, password, role, departmentName, office, departmentCategory
//     });

//     return res.status(201).json({
//       success: true,
//       message: "User Registered Successfully ✅",
//       user: {
//         id: newUser._id,
//         fullName: newUser.fullName,
//         userName: newUser.userName,
//         role: newUser.role,
//         departmentName: newUser.departmentName,
//         office: newUser.office,
//         departmentCategory: newUser.departmentCategory,
//       },
//     });

//   } catch (error) {
//     console.log("Register Error:", error);
//     return res.status(500).json({ success: false, message: "Server Error ❌" });
//   }
// };


// ✅ REGISTER USER
// ── Predefined roles (Users page dropdown शी same ठेवा) ──────────────────────
const { CORPORATOR, isCorporatorRole, normalizeRole, normalizeDesignation } = require("../utils/roles");
const PREDEFINED_ROLES = ["Super Admin", "Admin", "Mayor", "Guardian Minister", CORPORATOR, "Department User"];
const PREDEFINED_DESIGNATIONS = [CORPORATOR, "Mayor", "Deputy Mayor", "Standing Committee Chairman", "Leader of House", "Leader of Opposition"];
const toBool = (v) => v === true || v === "true" || v === "Yes";
const ROLE_MANAGER_ROLES = ["Super Admin", "Admin"];

// Role फक्त Super Admin / Admin च set करू शकतात (public /register वरून नाही)
const getRequesterRole = (req) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) return null;
    return jwt.verify(token, process.env.JWT_SECRET)?.role || null;
  } catch { return null; }
};

exports.registerUser = async (req, res) => {
  try {
    let { fullName, userName, mobileNumber, email, password,departmentName} = req.body;
    let { role, isStandingCommitteeMember, isGeneralBodyMember, wardNo, designation } = req.body;

    const canSetRole = ROLE_MANAGER_ROLES.includes(getRequesterRole(req));
    role = normalizeRole(role);                       // "Corporator" → "corporator"
    designation = normalizeDesignation(designation);  // "Corporator" → "corporator"
    role = canSetRole && PREDEFINED_ROLES.includes(role) ? role : "";
    const isCouncillor = isCorporatorRole(role);

    // Trim & normalize
    fullName     = fullName?.trim();
    userName     = userName?.trim().toLowerCase();
    mobileNumber = mobileNumber?.trim();
    email = email?.trim().toLowerCase();
    departmentName = departmentName?.trim();  // <-- use departmentName, not email

    // नगरसेवक (corporator) → username दिला नसेल तर mobile number हाच username
    if (isCouncillor && !userName && mobileNumber) userName = mobileNumber;

    // Validation
    if (!fullName || !userName || !mobileNumber || !password) {
      return res.status(400).json({
        success: false,
        message: "All fields required ❌",
      });
    }

    // Mobile number format check (10 digits)
    if (!/^\d{10}$/.test(mobileNumber)) {
      return res.status(400).json({
        success: false,
        message: "Invalid mobile number ❌ (10 digits required)",
      });
    }

    // Email format check (email compulsory नाही — दिला असेल तरच check)
    if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return res.status(400).json({
        success: false,
        message: "Invalid email address ❌",
      });
    }

    // Check duplicate userName
    const existingUserName = await User.findOne({ userName });
    if (existingUserName) {
      return res.status(409).json({
        success: false,
        message: "Username already exists ❌",
      });
    }

    // Check duplicate email (email दिला असेल तरच)
    const existingEmail = email ? await User.findOne({ email }) : null;
    if (existingEmail) {
      return res.status(409).json({
        success: false,
        message: "Email already registered ❌",
      });
    }

    // Check duplicate mobile
    const existingMobile = await User.findOne({ mobileNumber });
    if (existingMobile) {
      return res.status(409).json({
        success: false,
        message: "Mobile number already registered ❌",
      });
    }

    // Create user
    const newUser = await User.create({
      fullName,
      userName,
      mobileNumber,
      email: email || undefined,
      password,
      departmentName: isCouncillor ? "" : departmentName,
      role,
      // नगरसेवक → category "All" (सर्व विभागांचे विषय दिसतात)
      ...(isCouncillor ? { departmentCategory: "All" } : {}),
      isStandingCommitteeMember: isCouncillor ? toBool(isStandingCommitteeMember) : false,
      ...(isCouncillor ? {
        wardNo:              (wardNo || "").toString().trim(),
        designation:         PREDEFINED_DESIGNATIONS.includes(designation) ? designation : CORPORATOR,
        isGeneralBodyMember: isGeneralBodyMember === undefined ? true : toBool(isGeneralBodyMember),
      } : {}),
    });

    return res.status(201).json({
      success: true,
      message: "User Registered Successfully ✅",
      user: {
        id:           newUser._id,
        fullName:     newUser.fullName,
        userName:     newUser.userName,
        mobileNumber: newUser.mobileNumber,
        email:        newUser.email,
        departmentName:newUser.departmentName,
        role:         newUser.role,
        isStandingCommitteeMember: newUser.isStandingCommitteeMember,
        isGeneralBodyMember: newUser.isGeneralBodyMember,
        wardNo:       newUser.wardNo,
        designation:  newUser.designation,
      },
    });

  } catch (error) {
    console.log("Register Error:", error);
    return res.status(500).json({
      success: false,
      message: "Server Error ❌",
    });
  }
};


// ✅ LOGIN USER
exports.loginUser = async (req, res) => {
  try {
    const { userName, password } = req.body;

    if (!userName || !password) {
      return res.status(400).json({ success: false, message: "Username आणि Password required आहे ❌" });
    }

    const user = await User.findOne({ userName });
    if (!user) {
      return res.status(404).json({ success: false, message: "User Not Found ❌" });
    }

    if (user.password !== password) {
      return res.status(401).json({ success: false, message: "Invalid Password ❌" });
    }

    const token = jwt.sign(
      { id: user._id, userName: user.userName, role: normalizeRole(user.role) },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    // ── office आणि departmentCategory पण return करा ──
    return res.status(200).json({
      success: true,
      message: "Login Success ✅",
      token,
      user: {
        id: user._id,
        fullName: user.fullName,
        userName: user.userName,
        role: normalizeRole(user.role),
        departmentName: user.departmentName,
        office: user.office,                         // ← ADD
        departmentCategory: user.departmentCategory, // ← ADD
        isStandingCommitteeMember: !!user.isStandingCommitteeMember,
        isGeneralBodyMember: user.isGeneralBodyMember !== false,
        wardNo:       user.wardNo,
        designation:  normalizeDesignation(user.designation),
      },
    });

  } catch (error) {
    console.log("Login Error:", error);
    return res.status(500).json({ success: false, message: "Server Error ❌" });
  }
};



exports.loginByMobile = async (req, res) => {
  try {
    const { mobileNo } = req.body;

    if (!mobileNo) {
      return res.status(400).json({ 
        success: false, 
        message: "Mobile number required ❌" 
      });
    }

    const trimmed = mobileNo.toString().trim();

    // फक्त mobileNumber field check करा
    const user = await User.findOne({ mobileNumber: trimmed });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "हे mobile number नोंदणीकृत नाही ❌",
      });
    }

    const token = jwt.sign(
      { id: user._id, userName: user.userName, role: normalizeRole(user.role) },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    return res.status(200).json({
      success: true,
      message: "OTP Login Success ✅",
      token,
      user: {
        id:                 user._id,
        fullName:           user.fullName,
        userName:           user.userName,
        role:               normalizeRole(user.role),
        departmentName:     user.departmentName,
        office:             user.office,
        departmentCategory: user.departmentCategory,
        isStandingCommitteeMember: !!user.isStandingCommitteeMember,
        isGeneralBodyMember: user.isGeneralBodyMember !== false,
        wardNo:       user.wardNo,
        designation:  normalizeDesignation(user.designation),
      },
    });

  } catch (error) {
    console.log("LoginByMobile Error:", error);
    return res.status(500).json({ 
      success: false, 
      message: "Server Error ❌" 
    });
  }
};


// ✅ CHECK MOBILE — OTP पाठवण्यापूर्वी mobile registered आहे का check करा
exports.checkMobile = async (req, res) => {
  try {
    const { mobileNo } = req.body;

    if (!mobileNo) {
      return res.status(400).json({ 
        success: false, 
        message: "Mobile number required ❌" 
      });
    }

    const trimmed = mobileNo.toString().trim();

    if (!/^\d{10}$/.test(trimmed)) {
      return res.status(400).json({ 
        success: false, 
        message: "Invalid mobile number ❌" 
      });
    }

    const user = await User.findOne({ mobileNumber: trimmed });

    return res.status(200).json({
      success: true,
      exists: !!user,
      message: user 
        ? "Mobile number registered आहे ✅" 
        : "Mobile number registered नाही ❌",
    });

  } catch (error) {
    console.log("CheckMobile Error:", error);
    return res.status(500).json({ 
      success: false, 
      message: "Server Error ❌" 
    });
  }
};

// ✅ UPDATE USER
exports.updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const updatePayload = req.body;

    if (!updatePayload || Object.keys(updatePayload).length === 0) {
      return res.status(400).json({ success: false, message: "Update data required ❌" });
    }

    // Never allow password update from this route
    delete updatePayload.password;

    // Trim & normalize
    if (updatePayload.fullName)     updatePayload.fullName     = updatePayload.fullName.trim();
    if (updatePayload.userName)     updatePayload.userName     = updatePayload.userName.trim().toLowerCase();
    if (updatePayload.mobileNumber) updatePayload.mobileNumber = updatePayload.mobileNumber.trim();
    if (updatePayload.email)        updatePayload.email        = updatePayload.email.trim().toLowerCase();

    // Role / Standing Committee — फक्त Super Admin / Admin बदलू शकतात
    const COUNCILLOR_FIELDS = ["role", "isStandingCommitteeMember", "isGeneralBodyMember", "wardNo", "designation"];
    if (COUNCILLOR_FIELDS.some(k => k in updatePayload)) {
      if (!ROLE_MANAGER_ROLES.includes(getRequesterRole(req))) {
        COUNCILLOR_FIELDS.forEach(k => delete updatePayload[k]);
      } else {
        if ("role" in updatePayload) updatePayload.role = normalizeRole(updatePayload.role);
        if ("designation" in updatePayload) updatePayload.designation = normalizeDesignation(updatePayload.designation);
        if ("role" in updatePayload && !PREDEFINED_ROLES.includes(updatePayload.role)) updatePayload.role = "";
        if (isCorporatorRole(updatePayload.role)) {
          updatePayload.departmentCategory = "All";
          updatePayload.departmentName     = "";
          updatePayload.isStandingCommitteeMember = toBool(updatePayload.isStandingCommitteeMember);
          updatePayload.isGeneralBodyMember = updatePayload.isGeneralBodyMember === undefined ? true : toBool(updatePayload.isGeneralBodyMember);
          updatePayload.wardNo      = (updatePayload.wardNo || "").toString().trim();
          updatePayload.designation = PREDEFINED_DESIGNATIONS.includes(updatePayload.designation) ? updatePayload.designation : CORPORATOR;
        } else if ("role" in updatePayload) {
          updatePayload.isStandingCommitteeMember = false;
          updatePayload.isGeneralBodyMember = true;
          updatePayload.wardNo = "";
          updatePayload.designation = "";
        }
      }
    }

    // Mobile format check
    if (updatePayload.mobileNumber && !/^\d{10}$/.test(updatePayload.mobileNumber)) {
      return res.status(400).json({ success: false, message: "Invalid mobile number ❌ (10 digits required)" });
    }

    // Email format check
    if (updatePayload.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(updatePayload.email)) {
      return res.status(400).json({ success: false, message: "Invalid email address ❌" });
    }

    // Check duplicate userName
    if (updatePayload.userName) {
      const existing = await User.findOne({ userName: updatePayload.userName, _id: { $ne: id } });
      if (existing) {
        return res.status(409).json({ success: false, message: "Username already taken ❌" });
      }
    }

    // Check duplicate email
    if (updatePayload.email) {
      const existing = await User.findOne({ email: updatePayload.email, _id: { $ne: id } });
      if (existing) {
        return res.status(409).json({ success: false, message: "Email already registered ❌" });
      }
    }

    // Check duplicate mobileNumber
    if (updatePayload.mobileNumber) {
      const existing = await User.findOne({ mobileNumber: updatePayload.mobileNumber, _id: { $ne: id } });
      if (existing) {
        return res.status(409).json({ success: false, message: "Mobile number already registered ❌" });
      }
    }

    const user = await User.findByIdAndUpdate(id, updatePayload, {
      new: true, runValidators: true,
    }).select("-password");

    if (!user) {
      return res.status(404).json({ success: false, message: "User Not Found ❌" });
    }

    return res.status(200).json({
      success: true,
      message: "User Updated Successfully ✅",
      user,
    });

  } catch (error) {
    console.log("Update Error:", error);
    return res.status(500).json({ success: false, message: "Server Error ❌" });
  }
};


// ✅ GET ALL USERS
exports.getUsers = async (req, res) => {
  try {
    const users = await User.find({})
      .select("-password")
      .sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      message: "Users fetched successfully ✅",
      count: users.length,
      users,
    });
  } catch (error) {
    console.log("Get Users Error:", error);
    return res.status(500).json({ success: false, message: "Server Error ❌" });
  }
};


// ✅ DELETE USER
exports.deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findByIdAndDelete(id);

    if (!user) {
      return res.status(404).json({ success: false, message: "User Not Found ❌" });
    }

    return res.status(200).json({
      success: true,
      message: "User Deleted Successfully ✅",
      deletedUser: {
        id:           user._id,
        fullName:     user.fullName,
        userName:     user.userName,
        mobileNumber: user.mobileNumber,
        email:        user.email,
      },
    });

  } catch (error) {
    console.log("Delete Error:", error);
    return res.status(500).json({ success: false, message: "Server Error ❌" });
  }
};


