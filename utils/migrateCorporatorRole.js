// एकदाच चालवा (server folder मधून):  node utils/migrateCorporatorRole.js
// जुने users: role "Ward Councillor" / "Corporator" → "corporator"
//             designation "Corporator"               → "corporator"
// बाकी कोणताही data बदलत नाही.
require("dotenv").config();
const mongoose = require("mongoose");

(async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    const users = mongoose.connection.collection("users");

    const r1 = await users.updateMany(
      { role: { $regex: /^\s*(ward councillor|corporator)\s*$/i, $ne: "corporator" } },
      { $set: { role: "corporator" } }
    );
    const r2 = await users.updateMany(
      { designation: { $regex: /^\s*corporator\s*$/i, $ne: "corporator" } },
      { $set: { designation: "corporator" } }
    );

    console.log(`✅ role updated: ${r1.modifiedCount}, designation updated: ${r2.modifiedCount}`);
  } catch (err) {
    console.error("❌ Migration failed:", err.message);
  } finally {
    await mongoose.disconnect();
  }
})();
