import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut as fbSignOut,
  type User,
} from "firebase/auth";
import { doc, getDoc, setDoc, serverTimestamp } from "firebase/firestore";
import { auth, db, isFirebaseConfigured } from "@/lib/firebase";
import { ADMIN_EMAIL } from "@/config";
import { generateAnonymousName } from "@/lib/randomName";

interface AuthState {
  user: User | null;
  displayName: string | null;
  isAdmin: boolean;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthState | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [displayName, setDisplayName] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isFirebaseConfigured) {
      setLoading(false);
      return;
    }
    const unsub = onAuthStateChanged(auth, async (u) => {
      setUser(u);
      if (u) {
        const ref = doc(db, "users", u.uid);
        const snap = await getDoc(ref);
        if (snap.exists()) {
          setDisplayName((snap.data().displayName as string) ?? null);
        } else {
          // First time we see this user — create their profile with a
          // random anonymous name that will be used in chats.
          const name = generateAnonymousName();
          await setDoc(ref, {
            email: u.email,
            displayName: name,
            createdAt: serverTimestamp(),
          });
          setDisplayName(name);
        }
      } else {
        setDisplayName(null);
      }
      setLoading(false);
    });
    return () => unsub();
  }, []);

  const isAdmin =
    !!user?.email &&
    user.email.toLowerCase() === ADMIN_EMAIL.toLowerCase();

  const value: AuthState = {
    user,
    displayName,
    isAdmin,
    loading,
    async signIn(email, password) {
      await signInWithEmailAndPassword(auth, email, password);
    },
    async signUp(email, password) {
      await createUserWithEmailAndPassword(auth, email, password);
    },
    async signOut() {
      await fbSignOut(auth);
    },
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside <AuthProvider>");
  return ctx;
}
