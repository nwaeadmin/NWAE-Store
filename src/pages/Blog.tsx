const POSTS = [
  {
    title: "What's new this month",
    excerpt:
      "We rolled out instant delivery, faster license activation, and a redesigned dashboard.",
    date: "April 2026",
    minutes: 3,
  },
  {
    title: "How to choose the right plan",
    excerpt:
      "A short guide to help you pick between the trial, monthly, and lifetime plan.",
    date: "March 2026",
    minutes: 4,
  },
  {
    title: "Behind the scenes: how we keep prices fair",
    excerpt:
      "We share how we keep our pricing honest while still investing in better products.",
    date: "February 2026",
    minutes: 5,
  },
];

export default function Blog() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-16">
      <div className="text-center mb-12">
        <h1 className="text-4xl sm:text-5xl font-bold hero-gradient">Blog</h1>
        <p className="mt-3 text-muted-foreground">
          Updates, guides, and a little bit of behind the scenes.
        </p>
      </div>

      <div className="space-y-4">
        {POSTS.map((p, i) => (
          <article
            key={i}
            className="glass-card rounded-2xl p-6 hover:border-white/20 transition cursor-pointer"
          >
            <div className="flex items-center gap-3 text-xs text-muted-foreground uppercase tracking-widest mb-2">
              <span>{p.date}</span>
              <span>·</span>
              <span>{p.minutes} min read</span>
            </div>
            <h2 className="text-2xl font-semibold mb-2">{p.title}</h2>
            <p className="text-sm text-muted-foreground leading-relaxed">
              {p.excerpt}
            </p>
          </article>
        ))}
      </div>
    </div>
  );
}
