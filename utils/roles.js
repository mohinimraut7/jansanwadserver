// ── Corporator (नगरसेवक) role helpers ──
// Role आणि Designation नेहमी small letters मध्ये "corporator" save होतात.
// "Corporator" / "CORPORATOR" / जुना "Ward Councillor" आला तरी → "corporator".

const CORPORATOR = "corporator";
const CORPORATOR_ALIASES = ["corporator", "ward councillor"];

const isCorporatorRole = (role) =>
  CORPORATOR_ALIASES.includes(String(role || "").trim().toLowerCase());

// Corporator असेल तर "corporator", नाहीतर role जसा आहे तसाच
const normalizeRole = (role) =>
  isCorporatorRole(role) ? CORPORATOR : role;

// Designation "Corporator" (कोणत्याही case मध्ये) → "corporator"; बाकी designations तसेच
const normalizeDesignation = (d) =>
  String(d || "").trim().toLowerCase() === CORPORATOR ? CORPORATOR : d;

module.exports = { CORPORATOR, isCorporatorRole, normalizeRole, normalizeDesignation };
