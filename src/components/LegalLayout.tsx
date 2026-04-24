import { ReactNode } from "react";

export default function LegalLayout({
  title,
  updated,
  children,
}: {
  title: string;
  updated: string;
  children: ReactNode;
}) {
  return (
    <div className="max-w-3xl mx-auto px-4 py-20">
      <div className="text-center mb-10">
        <h1 className="text-4xl sm:text-5xl font-bold hero-gradient">{title}</h1>
        <p className="text-xs uppercase tracking-widest text-muted-foreground mt-3">
          {updated}
        </p>
      </div>
      <article className="prose prose-invert prose-sm sm:prose-base max-w-none glass-card rounded-2xl p-8
        prose-headings:font-semibold prose-headings:text-white
        prose-h2:text-xl prose-h2:mt-8 prose-h2:mb-3
        prose-p:text-foreground/85 prose-li:text-foreground/85
        prose-a:text-white prose-a:underline">
        {children}
      </article>
    </div>
  );
}
