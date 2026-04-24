import { ExternalLink } from "lucide-react";

export default function PromoBanner() {
  return (
    <div className="w-full bg-secondary/60 border-b border-white/5 text-sm">
      <div className="max-w-7xl mx-auto px-4 py-2 text-center text-foreground/90">
        If you want to Pay With Tikkie Join The Discord{" "}
        <a
          href="https://discord.gg/"
          target="_blank"
          rel="noreferrer"
          className="underline underline-offset-2 hover:text-white inline-flex items-center gap-1"
        >
          Buy it Now! <ExternalLink className="w-3 h-3" />
        </a>
      </div>
    </div>
  );
}
