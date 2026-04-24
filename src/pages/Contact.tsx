import { ExternalLink, MessageCircle, Mail } from "lucide-react";

export default function Contact() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-20">
      <div className="text-center mb-12">
        <h1 className="text-4xl sm:text-5xl font-bold hero-gradient">Contact Us</h1>
        <p className="mt-3 text-muted-foreground">
          The fastest way to reach us is through our community.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <a
          href="https://discord.gg/"
          target="_blank"
          rel="noreferrer"
          className="glass-card rounded-2xl p-6 hover:border-white/20 transition group"
        >
          <div className="w-10 h-10 rounded-xl glass-soft flex items-center justify-center mb-4">
            <MessageCircle className="w-5 h-5" />
          </div>
          <h2 className="font-semibold mb-2 flex items-center gap-2">
            Discord <ExternalLink className="w-4 h-4 opacity-60" />
          </h2>
          <p className="text-sm text-muted-foreground">
            Join the community and get a reply from a real human, often within
            minutes.
          </p>
        </a>

        <a
          href="mailto:support@example.com"
          className="glass-card rounded-2xl p-6 hover:border-white/20 transition group"
        >
          <div className="w-10 h-10 rounded-xl glass-soft flex items-center justify-center mb-4">
            <Mail className="w-5 h-5" />
          </div>
          <h2 className="font-semibold mb-2">Email</h2>
          <p className="text-sm text-muted-foreground">
            Prefer email? Drop us a message at{" "}
            <span className="text-white">support@example.com</span> and we will
            get back to you.
          </p>
        </a>
      </div>
    </div>
  );
}
