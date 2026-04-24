import { useState } from "react";

export default function Login() {
  const [email, setEmail] = useState("");
  const [pw, setPw] = useState("");

  return (
    <div className="max-w-md mx-auto px-4 py-20">
      <div className="glass-card rounded-2xl p-8">
        <h1 className="text-3xl font-bold text-center hero-gradient">Welcome back</h1>
        <p className="text-sm text-muted-foreground text-center mt-2">
          Sign in to access your dashboard and orders.
        </p>

        <form
          className="mt-8 space-y-4"
          onSubmit={(e) => {
            e.preventDefault();
            alert("Demo login — connect your auth provider to enable real sign-in.");
          }}
        >
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
            />
          </div>
          <div>
            <label className="text-xs uppercase tracking-widest text-muted-foreground">
              Password
            </label>
            <input
              type="password"
              required
              value={pw}
              onChange={(e) => setPw(e.target.value)}
              className="mt-1 w-full glass-soft rounded-xl px-4 py-3 outline-none focus:border-white/30"
              placeholder="••••••••"
            />
          </div>
          <button
            type="submit"
            className="w-full py-3 rounded-xl bg-white text-black font-medium hover:bg-white/90 transition"
          >
            Sign In
          </button>
        </form>

        <p className="text-xs text-center text-muted-foreground mt-6">
          By signing in you agree to our{" "}
          <a href="/terms" className="underline">
            Terms
          </a>{" "}
          and{" "}
          <a href="/privacy" className="underline">
            Privacy Policy
          </a>
          .
        </p>
      </div>
    </div>
  );
}
