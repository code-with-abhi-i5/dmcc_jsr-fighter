import {
  collection,
  doc,
  runTransaction,
  query,
  where,
  getDocs,
  limit,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "../firebase/config";

const REGISTRATIONS_COLLECTION = "registrations";
const METADATA_COLLECTION = "metadata";
const COUNTER_DOC = "registrationCounter";

/**
 * Check if a phone number is already registered.
 */
export async function checkDuplicatePhone(phoneNumber) {
  try {
    const q = query(
      collection(db, REGISTRATIONS_COLLECTION),
      where("phoneNumber", "==", phoneNumber),
      limit(1)
    );
    const snapshot = await getDocs(q);
    if (!snapshot.empty) {
      return snapshot.docs[0].data().registrationId;
    }
    return null;
  } catch (error) {
    console.error("Duplicate phone check failed:", error);
    return null;
  }
}

/**
 * Check if a jersey number is already taken.
 */
export async function checkDuplicateJersey(jerseyNumber) {
  try {
    const q = query(
      collection(db, REGISTRATIONS_COLLECTION),
      where("jerseyNumber", "==", Number(jerseyNumber)),
      limit(1)
    );
    const snapshot = await getDocs(q);
    if (!snapshot.empty) {
      return snapshot.docs[0].data().playerName;
    }
    return null;
  } catch (error) {
    console.error("Duplicate jersey check failed:", error);
    return null;
  }
}

/**
 * Creates a new registration document in Firestore with a sequential ID (e.g. DMCC-01).
 */
export async function createRegistration(data) {
  const counterRef = doc(db, METADATA_COLLECTION, COUNTER_DOC);
  const newRegRef = doc(collection(db, REGISTRATIONS_COLLECTION));

  let finalRegistrationId = "";

  await runTransaction(db, async (transaction) => {
    const counterDoc = await transaction.get(counterRef);
    let currentCount = 0;
    
    if (counterDoc.exists()) {
      currentCount = counterDoc.data().count || 0;
    }

    const newCount = currentCount + 1;
    const formattedNumber = String(newCount).padStart(2, "0");
    finalRegistrationId = `DMCC-${formattedNumber}`;

    transaction.set(counterRef, { count: newCount }, { merge: true });

    const registrationData = {
      registrationId: finalRegistrationId,
      playerName: data.playerName.trim(),
      playerPhotoUrl: data.playerPhotoUrl,
      phoneNumber: data.phoneNumber.trim(),
      address: data.address.trim(),
      jerseySize: data.jerseySize,
      jerseyNumber: Number(data.jerseyNumber),
      utr: data.utr.trim(),
      status: "pending",
      adminMark: "",
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    };

    transaction.set(newRegRef, registrationData);
  });

  return finalRegistrationId;
}

/**
 * Track a registration by ID and optionally Name
 */
export async function trackRegistration(registrationId, playerName) {
  try {
    const q = query(
      collection(db, REGISTRATIONS_COLLECTION),
      where("registrationId", "==", registrationId.toUpperCase()),
      limit(1)
    );
    
    const snapshot = await getDocs(q);
    
    if (snapshot.empty) {
      return null;
    }

    const data = snapshot.docs[0].data();
    
    // Check if name matches (case insensitive)
    if (data.playerName.toLowerCase() !== playerName.toLowerCase().trim()) {
      throw new Error("Name does not match the registration ID");
    }

    return data;
  } catch (error) {
    console.error("Tracking failed:", error);
    throw error;
  }
}
