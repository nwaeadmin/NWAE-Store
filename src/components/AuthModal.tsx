import { useEffect, useState } from "react";
import { X } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { useAuthModal } from "@/contexts/AuthModalContext";

export default function AuthModal() {
  const { open, closeModal } = useAuthModal();
  const { signIn, signUp, user } = useAuth();
  const [mode, setMode] = useState<"signin" | "signup">("signin");
  const [email, setEmail] = useState("");
  const [pw, setPw] = useState("");
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  // If a user becomes signed-in while modal is open, close it as success.
  useEffect(() => {
    if (open && user) closeModal(true);
  }, [open, user, closeModal]);

  // Reset form when modal closes
  useEffect(() => {
    if (!open) {
      setEmail("");
      setPw("");
      setErr(null);
      setBusy(false);
    }
  }, [open]);

  if (!open) return null;

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setErr(null);
    setBusy(true);
    try {
      if (mode === "signin") {
        await signIn(email.trim(), pw);
      } else {
        await signUp(email.trim(), pw);
      }
      // onAuthStateChanged will fire, useEffect above will closeModal(true).
    } catch (e: any) {
      setErr(prettyError(e?.code ?? e?.message ?? "Something went wrong"));
      setBusy(false);
    }
  }

  return (
    <div
      className="fixed inset-0 z-[100] bg-black/70 backdrop-blur-sm flex items-center justify-center p-4"
      onClick={() => closeModal(false)}
    >
      <div
        className="glass-card rounded-2xl w-full max-w-md p-6 relative"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          aria-label="Close"
          onClick={() => closeModal(false)}
          className="absolute top-3 right-3 w-8 h-8 rounded-full glass-soft flex items-center justify-center hover:bg-white/10"
        >
          <X className="w-4 h-4" />
        </button>
        <h2 className="text-2xl font-bold hero-gradient text-center">
          {mode === "signin" ? "Sign In" : "Create an account"}
        </h2>
        <p className="text-sm text-muted-foreground text-center mt-2">
          {mode === "signin"
            ? "Welcome back. Sign in to continue."
            : "Just an email and password — that's it."}
        </p>

        <form onSubmit={submit} className="mt-6 space-y-3">
          <div>
            <label className="text-xs uppercase tracking-widest text-muted-foreground">
              Email
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 w-full glass-soft rounded-xl px-4 py-3 outline-none focus:border-white/30"
              placeholder="you@example.com"
              autoFocus
            />
          </div>
          <div>
            <label className="text-xs uppercase tracking-widest text-muted-foreground">
              Password
            </label>
            <input
              type="password"
              required
              minLength={6}
              value={pw}
              onChange={(e) => setPw(e.target.value)}
              className="mt-1 w-full glass-soft rounded-xl px-4 py-3 outline-none focus:border-white/30"
              placeholder="At least 6 characters"
            />
          </div>

          {err && (
            <div className="text-sm text-red-400 bg-red-500/10 border border-red-500/20 rounded-lg px-3 py-2">
              {err}
            </div>
          )}

          <button
            type="submit"
            disabled={busy}
            className="w-full py-3 rounded-xl bg-white text-black font-medium hover:bg-white/90 transition disabled:opacity-50"
          >
            {busy
              ? "Please wait..."
              : mode === "signin"
              ? "Sign In"
              : "Create Account"}
          </button>
        </form>

        <p className="text-xs text-center text-muted-foreground mt-4">
          {mode === "signin" ? (
            <>
              No account yet?{" "}
              <button
                type="button"
                className="underline text-white"
                onClick={() => setMode("signup")}
              >
                Sign up
              </button>
            </>
          ) : (
            <>
              Already have an account?{" "}
              <button
                type="button"
                className="underline text-white"
                onClick={() => setMode("signin")}
              >
                Sign in
              </button>
            </>
          )}
        </p>
      </div>
    </div>
  );
}

function prettyError(code: string): string {
  if (code.includes("auth/email-already-in-use"))
    return "An account with that email already exists. Try signing in.";
  if (code.includes("auth/invalid-email")) return "That email looks invalid.";
  if (code.includes("auth/weak-password"))
    return "Password is too weak — use at least 6 characters.";
  if (
    code.includes("auth/wrong-password") ||
    code.includes("auth/invalid-credential")
  )
    return "Wrong email or password.";
  if (code.includes("auth/user-not-found"))
    return "No account with that email. Try signing up.";
  if (code.includes("auth/network-request-failed"))
    return "Network error — check your internet connection.";
  return code.replace("auth/", "").replace(/-/g, " ");
}
