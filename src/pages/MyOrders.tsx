import { useEffect, useState } from "react";
import { Link } from "wouter";
import { ExternalLink, ShoppingBag } from "lucide-react";
import {
  collection,
  onSnapshot,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import { db } from "@/lib/firebase";
import { useAuth } from "@/contexts/AuthContext";
import { useAuthModal } from "@/contexts/AuthModalContext";
import type { Order } from "@/lib/types";
import ChatPanel from "@/components/ChatPanel";

export default function MyOrders() {
  const { user, loading } = useAuth();
  const { requireAuth } = useAuthModal();
  const [orders, setOrders] = useState<Order[]>([]);
  const [openId, setOpenId] = useState<string | null>(null);

  useEffect(() => {
    if (loading) return;
    if (!user) {
      requireAuth();
      return;
    }
    const q = query(
      collection(db, "orders"),
      where("buyerUid", "==", user.uid),
      orderBy("createdAt", "desc"),
    );
    const unsub = onSnapshot(q, (snap) => {
      setOrders(
        snap.docs.map((d) => ({ id: d.id, ...(d.data() as Omit<Order, "id">) })),
      );
    });
    return () => unsub();
  }, [user, loading, requireAuth]);

  if (!user) {
    return (
      <div className="max-w-xl mx-auto px-4 py-24 text-center">
        <h1 className="text-3xl font-bold hero-gradient">My Orders</h1>
        <p className="text-muted-foreground mt-3">
          Sign in to see your orders and chats.
        </p>
        <button
          type="button"
          onClick={() => requireAuth()}
          className="mt-6 px-6 py-3 rounded-full bg-white text-black text-sm font-medium hover:bg-white/90"
        >
          Sign In
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-16">
      <div className="text-center mb-10">
        <h1 className="text-4xl sm:text-5xl font-bold hero-gradient">My Orders</h1>
        <p className="mt-3 text-muted-foreground">
          Every order opens a private chat with the seller.
        </p>
      </div>

      {orders.length === 0 ? (
        <div className="glass-card rounded-2xl p-12 text-center">
          <div className="w-16 h-16 rounded-full glass-soft flex items-center justify-center mx-auto mb-4">
            <ShoppingBag className="w-7 h-7 text-muted-foreground" />
          </div>
          <p className="text-muted-foreground">You haven't placed any orders yet.</p>
          <Link
            href="/products"
            className="inline-block mt-6 px-6 py-3 rounded-full bg-white text-black text-sm font-medium hover:bg-white/90"
          >
            Browse products
          </Link>
        </div>
      ) : (
        <div className="space-y-3">
          {orders.map((o) => (
            <div key={o.id} className="glass-card rounded-2xl overflow-hidden">
              <button
                type="button"
                onClick={() => setOpenId(openId === o.id ? null : o.id)}
                className="w-full text-left p-5 flex items-center gap-4 hover:bg-white/5 transition"
              >
                <div className="w-14 h-14 rounded-xl bg-secondary/40 overflow-hidden shrink-0">
                  {o.productImage ? (
                    <img
                      src={o.productImage}
                      alt=""
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <ShoppingBag className="w-5 h-5 text-muted-foreground" />
                    </div>
                  )}
                </div>
                <div className="flex-1">
                  <div className="font-semibold">{o.productName}</div>
                  <div className="text-xs text-muted-foreground mt-0.5 flex items-center gap-2">
                    <span>
                      {o.method === "paypal"
                        ? `$${o.amount.toFixed(2)} via PayPal`
                        : `R$ ${o.amount.toLocaleString()} via Robux`}
                    </span>
                    <span>·</span>
                    <span className="capitalize">{o.status.replace("_", " ")}</span>
                  </div>
                </div>
                {o.paymentLink && (
                  <a
                    href={o.paymentLink}
                    target="_blank"
                    rel="noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    className="hidden sm:inline-flex items-center gap-1 px-3 py-1.5 rounded-full glass-soft text-xs hover:bg-white/10"
                  >
                    {o.method === "paypal" ? "PayPal" : "Gamepass"}{" "}
                    <ExternalLink className="w-3 h-3" />
                  </a>
                )}
                <span className="text-xs text-muted-foreground">
                  {openId === o.id ? "Hide chat" : "Open chat"}
                </span>
              </button>

              {openId === o.id && (
                <div className="border-t border-white/5 p-4">
                  <ChatPanel orderId={o.id} />
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
