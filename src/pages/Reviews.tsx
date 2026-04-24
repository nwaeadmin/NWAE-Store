import { Star } from "lucide-react";

const REVIEWS = [
  {
    name: "Lucas M.",
    product: "Premium · 1 Month",
    rating: 5,
    text:
      "Order was delivered in seconds. Honestly didn't expect it to be this fast. Will buy again.",
    date: "2 days ago",
  },
  {
    name: "Anna K.",
    product: "Premium · Lifetime",
    rating: 5,
    text:
      "Support team was super helpful in their Discord. Setup took five minutes and it just works.",
    date: "5 days ago",
  },
  {
    name: "Tobias R.",
    product: "Custom Configuration",
    rating: 5,
    text:
      "Walkthrough was actually useful. Fair price for the time it saved me. Recommended.",
    date: "1 week ago",
  },
  {
    name: "Sophie B.",
    product: "Premium · 3 Day Trial",
    rating: 5,
    text:
      "Tried the trial first, upgraded the next day. Worth every euro.",
    date: "1 week ago",
  },
  {
    name: "Daniel V.",
    product: "Priority Support Add-on",
    rating: 5,
    text:
      "Got a reply in under a minute on a Sunday. That alone is worth the upgrade.",
    date: "2 weeks ago",
  },
  {
    name: "Mila T.",
    product: "Premium · 1 Month",
    rating: 5,
    text:
      "Clean dashboard, clear instructions, no nonsense. Exactly what I wanted.",
    date: "3 weeks ago",
  },
];

export default function Reviews() {
  const avg =
    REVIEWS.reduce((acc, r) => acc + r.rating, 0) / REVIEWS.length;

  return (
    <div className="max-w-6xl mx-auto px-4 py-16">
      <div className="text-center mb-12">
        <h1 className="text-4xl sm:text-5xl font-bold hero-gradient">
          What Customers Say
        </h1>
        <p className="mt-3 text-muted-foreground max-w-xl mx-auto">
          Real reviews from real customers. We don't filter.
        </p>
        <div className="mt-6 inline-flex items-center gap-2 px-4 py-2 rounded-full glass-soft">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star
              key={i}
              className={`w-4 h-4 ${
                i < Math.round(avg) ? "fill-white text-white" : "text-muted-foreground"
              }`}
            />
          ))}
          <span className="ml-2 text-sm">
            {avg.toFixed(1)} average · {REVIEWS.length} reviews
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {REVIEWS.map((r, i) => (
          <div key={i} className="glass-card rounded-2xl p-6">
            <div className="flex items-center gap-1 mb-3">
              {Array.from({ length: 5 }).map((_, j) => (
                <Star
                  key={j}
                  className={`w-4 h-4 ${
                    j < r.rating ? "fill-white text-white" : "text-muted-foreground"
                  }`}
                />
              ))}
            </div>
            <p className="text-sm text-foreground/90 leading-relaxed">"{r.text}"</p>
            <div className="mt-5 flex items-center justify-between text-xs text-muted-foreground">
              <div>
                <div className="font-semibold text-foreground">{r.name}</div>
                <div>{r.product}</div>
              </div>
              <span>{r.date}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
