import { useEffect, useMemo, useState } from "react";
import { Search } from "lucide-react";
import { collection, getDocs, orderBy, query } from "firebase/firestore";
import { db } from "@/lib/firebase";
import type { Product } from "@/lib/types";
import ProductCard from "@/components/ProductCard";

export default function Products() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [q, setQ] = useState("");

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

  const filtered = useMemo(() => {
    if (!q.trim()) return products;
    const needle = q.toLowerCase();
    return products.filter(
      (p) =>
        p.name.toLowerCase().includes(needle) ||
        p.description.toLowerCase().includes(needle),
    );
  }, [products, q]);

  return (
    <div className="max-w-6xl mx-auto px-4 py-16">
      <div className="text-center mb-10">
        <h1 className="text-4xl sm:text-5xl font-bold hero-gradient">All Products</h1>
        <p className="mt-3 text-muted-foreground max-w-xl mx-auto">
          Browse the full catalog. Click Buy on any product to start.
        </p>
      </div>

      <div className="max-w-xl mx-auto mb-10">
        <div className="glass-pill rounded-full flex items-center px-5 py-3">
          <Search className="w-4 h-4 text-muted-foreground mr-3" />
          <input
            type="search"
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search for products..."
            className="bg-transparent flex-1 outline-none text-sm placeholder:text-muted-foreground"
          />
        </div>
      </div>

      {loading ? (
        <div className="text-center text-muted-foreground py-16">Loading...</div>
      ) : filtered.length === 0 ? (
        <div className="text-center text-muted-foreground py-16 glass-card rounded-2xl">
          {products.length === 0
            ? "No products listed yet — the seller will add them soon."
            : "No products match your search."}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      )}
    </div>
  );
}
