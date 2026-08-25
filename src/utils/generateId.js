/**
 * Generates a unique registration ID in the format DMCC-XXXXXX
 * Uses a combination of timestamp and random characters for uniqueness
 */
export function generateRegistrationId() {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let result = "DMCC-";
  for (let i = 0; i < 6; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}
