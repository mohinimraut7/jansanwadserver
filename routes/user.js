const express = require("express");
const router = express.Router();

const {
  registerUser,
  loginUser,
  loginByMobile,
  checkMobile,
    sendOtp,        // ← add करा
  updateUser,
  getUsers,
  deleteUser
} = require("../controllers/user");

// ✅ Register
router.post("/register", registerUser);

// ✅ Login
router.post("/login", loginUser);
router.post("/loginByMobile",loginByMobile);
router.post("/sendOtp",      sendOtp);       // ← add करा
router.post("/checkMobile", checkMobile);   // ← हे add करा


// ✅ Update user by id
router.patch("/users/:id", updateUser);

router.get("/getUsers", getUsers);

router.delete("/deleteUser/:id",deleteUser);

module.exports = router;
