// =====================================================================
// Firebase configuration — paste your own values here.
// You get these from https://console.firebase.google.com after creating
// a project. The full step-by-step is in README.md.
//
// These values are SAFE to commit publicly — Firebase web config keys
// are designed to be exposed to the browser. Real security comes from
// the Firestore rules in firestore.rules.
// =====================================================================

export const firebaseConfig = {
  apiKey: "PASTE_YOUR_API_KEY",
  authDomain: "PASTE_YOUR_PROJECT.firebaseapp.com",
  projectId: "PASTE_YOUR_PROJECT_ID",
  storageBucket: "PASTE_YOUR_PROJECT.appspot.com",
  messagingSenderId: "PASTE_YOUR_SENDER_ID",
  appId: "PASTE_YOUR_APP_ID",
};

// Detects whether the file above has been filled in. While these are
// still placeholders, the site shows a friendly setup screen instead
// of trying to talk to Firebase (which would throw a scary error).
export const isFirebaseConfigured =
  !firebaseConfig.apiKey.startsWith("PASTE_") &&
  !firebaseConfig.projectId.startsWith("PASTE_");
