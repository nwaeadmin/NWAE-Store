import { Link } from "wouter";
import { ShoppingCart } from "lucide-react";

export default function Cart() {
  return (
    <div className="max-w-2xl mx-auto px-4 py-24 text-center">
      <div className="w-20 h-20 mx-auto rounded-full glass-soft flex items-center justify-center mb-6">
        <ShoppingCart className="w-8 h-8" />
      </div>
      <h1 className="text-3xl font-bold">Your cart is empty</h1>
      <p className="text-muted-foreground mt-2">
        Browse our catalog and add a product to get started.
      </p>
      <Link
        href="/products"
        className="inline-block mt-6 px-6 py-3 rounded-full bg-white text-black text-sm font-medium hover:bg-white/90 transition"
      >
        Explore Products
      </Link>
    </div>
  );
}
