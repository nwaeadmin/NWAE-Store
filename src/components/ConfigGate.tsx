import { Snowflake, AlertTriangle } from "lucide-react";

export default function ConfigGate() {
  return (
    <div className="min-h-screen bg-grid relative flex items-center justify-center p-6">
      <div className="glass-card rounded-2xl max-w-2xl w-full p-8">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-full glass-soft flex items-center justify-center">
            <Snowflake className="w-5 h-5" />
          </div>
          <div>
            <h1 className="text-xl font-bold">NWAE Store — setup needed</h1>
            <p className="text-xs text-muted-foreground uppercase tracking-widest">
              Firebase is not configured yet
            </p>
          </div>
        </div>

        <div className="flex items-start gap-3 bg-amber-500/10 border border-amber-400/30 text-amber-100 rounded-xl px-4 py-3 mb-6 text-sm">
          <AlertTriangle className="w-4 h-4 mt-0.5 shrink-0" />
          <span>
            The values in <code className="font-mono">src/firebase-config.ts</code>{" "}
            are still placeholders. Until they're filled in, accounts, products,
            orders and chat won't work.
          </span>
        </div>

        <ol className="space-y-3 text-sm text-foreground/85 list-decimal pl-5">
          <li>
            Create a free Firebase project at{" "}
            <a
              href="https://console.firebase.google.com"
              target="_blank"
              rel="noreferrer"
              className="underline text-white"
            >
              console.firebase.google.com
            </a>
            .
          </li>
          <li>
            Enable <strong>Authentication → Email/Password</strong> sign-in.
          </li>
          <li>
            Create a <strong>Firestore Database</strong> in production mode.
          </li>
          <li>
            Add a <strong>Web app</strong> (the {`</>`} icon) and copy the
            config object.
          </li>
          <li>
            Paste the config into{" "}
            <code className="font-mono">src/firebase-config.ts</code> and your
            admin email into <code className="font-mono">src/config.ts</code>.
          </li>
          <li>
            Open <strong>Firestore → Rules</strong>, paste the contents of{" "}
            <code className="font-mono">firestore.rules</code> from this
            project, and publish.
          </li>
          <li>Commit and push — the GitHub Action redeploys automatically.</li>
        </ol>

        <p className="text-xs text-muted-foreground mt-6">
          Full step-by-step instructions are in{" "}
          <code className="font-mono">README.md</code>.
        </p>
      </div>
    </div>
  );
}
