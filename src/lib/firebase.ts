import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { firebaseConfig, isFirebaseConfigured } from "@/firebase-config";

// Only initialize when actually configured — otherwise the placeholder
// values cause Firebase to throw before our friendly setup screen can
// render.
const app = isFirebaseConfigured ? initializeApp(firebaseConfig) : null;

export const auth = app ? getAuth(app) : (null as never);
export const db = app ? getFirestore(app) : (null as never);
export { isFirebaseConfigured };
