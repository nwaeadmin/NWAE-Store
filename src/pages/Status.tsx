const SERVICES = [
  { name: "Storefront", status: "Operational", uptime: "99.99%" },
  { name: "Checkout & Payments", status: "Operational", uptime: "99.98%" },
  { name: "License Delivery", status: "Operational", uptime: "100.00%" },
  { name: "Customer Dashboard", status: "Operational", uptime: "99.97%" },
  { name: "Discord Bot", status: "Operational", uptime: "99.95%" },
];

const HISTORY = [
  { date: "Today", note: "All systems running smoothly." },
  { date: "Yesterday", note: "Routine maintenance completed without downtime." },
  { date: "3 days ago", note: "Restocked the Starter Bundle." },
  { date: "1 week ago", note: "Faster license delivery rolled out." },
];

export default function Status() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-16">
      <div className="text-center mb-10">
        <h1 className="text-4xl sm:text-5xl font-bold hero-gradient">System Status</h1>
        <p className="mt-3 text-muted-foreground">
          Live status of every part of the storefront.
        </p>
        <div className="mt-6 inline-flex items-center gap-2 px-4 py-2 rounded-full glass-soft">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-sm">All Systems Operational</span>
        </div>
      </div>

      <div className="glass-card rounded-2xl divide-y divide-white/5">
        {SERVICES.map((s) => (
          <div
            key={s.name}
            className="flex items-center justify-between p-5"
          >
            <div className="flex items-center gap-3">
              <span className="w-2 h-2 rounded-full bg-emerald-400" />
              <span className="font-medium">{s.name}</span>
            </div>
            <div className="flex items-center gap-6 text-sm">
              <span className="text-muted-foreground">{s.uptime}</span>
              <span className="text-emerald-400">{s.status}</span>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-10">
        <h2 className="text-xl font-semibold mb-4">Recent Updates</h2>
        <div className="glass-card rounded-2xl divide-y divide-white/5">
          {HISTORY.map((h, i) => (
            <div key={i} className="p-5 flex items-start gap-4">
              <span className="text-xs uppercase tracking-widest text-muted-foreground w-24 shrink-0">
                {h.date}
              </span>
              <span className="text-sm">{h.note}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
