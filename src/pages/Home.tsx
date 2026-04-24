import { useEffect, useState } from "react";
import { Link } from "wouter";
import { Search, Star, ShoppingBag, Users, Zap, ShieldCheck, Headphones, Clock } from "lucide-react";
import { collection, getDocs, orderBy, query } from "firebase/firestore";
import { db } from "@/lib/firebase";
import type { Product } from "@/lib/types";
import ProductCard from "@/components/ProductCard";
import { STORE_TAGLINE } from "@/config";

export default function Home() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const snap = await getDocs(
          query(collection(db, "products"), orderBy("createdAt", "desc")),
        );
        setProducts(
          snap.docs.map((d) => ({ id: d.id, ...(d.data() as Omit<Product, "id">) })),
        );
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const featured = products.slice(0, 3);

  return (
    <div className="relative">
      {/* Hero */}
      <section className="relative bg-vignette pt-20 pb-24">
        <div className="max-w-6xl mx-auto px-4 text-center fade-in">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-soft text-xs uppercase tracking-widest text-foreground/80">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            Instant Delivery Added!
          </span>

          <h1 className="mt-6 text-5xl sm:text-6xl md:text-7xl font-bold tracking-tight hero-gradient">
            {STORE_TAGLINE}
          </h1>

          <p className="mt-5 text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto">
            Great products don't have to be expensive, and we prove it by
            delivering high quality with fair, honest prices.
          </p>

          <div className="mt-8 max-w-xl mx-auto">
            <Link href="/products" className="block">
              <div className="glass-pill rounded-full flex items-center px-5 py-3 hover:bg-white/5 cursor-pointer transition">
                <Search className="w-4 h-4 text-muted-foreground mr-3" />
                <span className="bg-transparent flex-1 outline-none text-sm text-muted-foreground text-left">
                  Search for products...
                </span>
              </div>
            </Link>
          </div>

          <div className="mt-6 flex items-center justify-center gap-3">
            <Link
              href="/products"
              className="px-6 py-3 rounded-full bg-white text-black text-sm font-medium hover:bg-white/90 transition"
            >
              Explore Products
            </Link>
            <a
              href="#why"
              className="px-6 py-3 rounded-full glass-soft text-sm font-medium hover:bg-white/10 transition"
            >
              Learn More
            </a>
          </div>

          {/* Stats */}
          <div className="mt-14 grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-4xl mx-auto">
            <StatCard icon={<Star className="w-5 h-5" />} value="5" label="Feedback Rating" />
            <StatCard
              icon={<ShoppingBag className="w-5 h-5" />}
              value={products.length.toString()}
              label="Products Available"
            />
            <StatCard icon={<Users className="w-5 h-5" />} value="∞" label="Happy Customers" />
          </div>
        </div>
      </section>

      {/* Why we're different */}
      <section id="why" className="py-24">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <span className="inline-flex items-center px-4 py-1.5 rounded-full glass-soft text-xs uppercase tracking-widest">
            Real Service, Real People
          </span>
          <h2 className="mt-6 text-4xl sm:text-5xl font-bold">Why We're Different</h2>
          <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">
            Everything we do is designed around the customer. Here's what sets us apart.
          </p>

          <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Feature
              icon={<Zap className="w-5 h-5" />}
              title="Fast Service"
              text="Orders open a chat with the seller right away so you're never left waiting."
            />
            <Feature
              icon={<ShieldCheck className="w-5 h-5" />}
              title="Secure Checkout"
              text="Pay through PayPal or a Roblox gamepass — your details stay yours."
            />
            <Feature
              icon={<Headphones className="w-5 h-5" />}
              title="Real Support"
              text="A real human ready to help with any question, any time."
            />
            <Feature
              icon={<Clock className="w-5 h-5" />}
              title="Always Online"
              text="Browse and order around the clock — we'll get back to you fast."
            />
          </div>
        </div>
      </section>

      {/* Featured products */}
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex items-end justify-between mb-8">
            <div>
              <h2 className="text-3xl sm:text-4xl font-bold">Featured Products</h2>
              <p className="text-muted-foreground mt-2">Handpicked for new customers.</p>
            </div>
            <Link
              href="/products"
              className="hidden sm:inline-flex px-4 py-2 rounded-full glass-soft text-sm hover:bg-white/10"
            >
              View all
            </Link>
          </div>

          {loading ? (
            <div className="text-center text-muted-foreground py-16">Loading...</div>
          ) : featured.length === 0 ? (
            <div className="text-center text-muted-foreground py-16 glass-card rounded-2xl">
              No products listed yet.
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {featured.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* CTA */}
      <section className="py-24">
        <div className="max-w-4xl mx-auto px-4 text-center glass-card rounded-3xl p-12">
          <h2 className="text-3xl sm:text-4xl font-bold hero-gradient">
            Ready when you are.
          </h2>
          <p className="mt-3 text-muted-foreground">
            Join the community and get instant access today.
          </p>
          <div className="mt-6 flex items-center justify-center gap-3">
            <Link
              href="/products"
              className="px-6 py-3 rounded-full bg-white text-black text-sm font-medium hover:bg-white/90 transition"
            >
              Start Shopping
            </Link>
            <a
              href="https://discord.gg/"
              target="_blank"
              rel="noreferrer"
              className="px-6 py-3 rounded-full glass-soft text-sm font-medium hover:bg-white/10 transition"
            >
              Join Discord
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}

function StatCard({
  icon,
  value,
  label,
}: {
  icon: React.ReactNode;
  value: string;
  label: string;
}) {
  return (
    <div className="glass-card rounded-2xl p-5 flex items-center gap-4 text-left">
      <div className="w-12 h-12 rounded-xl glass-soft flex items-center justify-center shrink-0">
        {icon}
      </div>
      <div>
        <div className="text-2xl font-bold">{value}</div>
        <div className="text-[11px] uppercase tracking-widest text-muted-foreground">
          {label}
        </div>
      </div>
    </div>
  );
}

function Feature({
  icon,
  title,
  text,
}: {
  icon: React.ReactNode;
  title: string;
  text: string;
}) {
  return (
    <div className="glass-card rounded-2xl p-6 text-left">
      <div className="w-10 h-10 rounded-xl glass-soft flex items-center justify-center mb-4">
        {icon}
      </div>
      <h3 className="font-semibold mb-2">{title}</h3>
      <p className="text-sm text-muted-foreground leading-relaxed">{text}</p>
    </div>
  );
}
