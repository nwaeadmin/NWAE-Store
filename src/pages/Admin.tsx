import { useEffect, useState } from "react";
import {
  Plus, Trash2, Pencil, Save, X, ShoppingBag, MessagesSquare, Settings, ExternalLink,
} from "lucide-react";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  setDoc,
  updateDoc,
  getDoc,
} from "firebase/firestore";
import { db } from "@/lib/firebase";
import { useAuth } from "@/contexts/AuthContext";
import type { Product, Order, StoreSettings } from "@/lib/types";
import ChatPanel from "@/components/ChatPanel";

type Tab = "products" | "orders" | "settings";

export default function Admin() {
  const { isAdmin, loading } = useAuth();
  const [tab, setTab] = useState<Tab>("products");

  if (loading) {
    return (
      <div className="max-w-xl mx-auto px-4 py-24 text-center text-muted-foreground">
        Loading...
      </div>
    );
  }

  if (!isAdmin) {
    return (
      <div className="max-w-xl mx-auto px-4 py-24 text-center">
        <h1 className="text-3xl font-bold hero-gradient">Admin only</h1>
        <p className="text-muted-foreground mt-3">
          You need to be signed in with the admin email to view this page.
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-16">
      <div className="text-center mb-8">
        <h1 className="text-4xl sm:text-5xl font-bold hero-gradient">Admin</h1>
        <p className="mt-3 text-muted-foreground">
          Manage products, orders and chats.
        </p>
      </div>

      <div className="flex items-center justify-center gap-2 mb-8 flex-wrap">
        <TabButton active={tab === "products"} onClick={() => setTab("products")}>
          <ShoppingBag className="w-4 h-4" /> Products
        </TabButton>
        <TabButton active={tab === "orders"} onClick={() => setTab("orders")}>
          <MessagesSquare className="w-4 h-4" /> Orders & Chats
        </TabButton>
        <TabButton active={tab === "settings"} onClick={() => setTab("settings")}>
          <Settings className="w-4 h-4" /> Settings
        </TabButton>
      </div>

      {tab === "products" && <ProductsPanel />}
      {tab === "orders" && <OrdersPanel />}
      {tab === "settings" && <SettingsPanel />}
    </div>
  );
}

function TabButton({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`px-4 py-2 rounded-full text-sm transition inline-flex items-center gap-2 ${
        active ? "bg-white text-black" : "glass-soft hover:bg-white/10"
      }`}
    >
      {children}
    </button>
  );
}

/* -------------------------------- Products ------------------------------- */

interface ProductDraft {
  name: string;
  description: string;
  imageUrl: string;
  paypalPriceUsd: string;
  robuxPrice: string;
  gamepassUrl: string;
}

const EMPTY_DRAFT: ProductDraft = {
  name: "",
  description: "",
  imageUrl: "",
  paypalPriceUsd: "",
  robuxPrice: "",
  gamepassUrl: "",
};

function ProductsPanel() {
  const [products, setProducts] = useState<Product[]>([]);
  const [editing, setEditing] = useState<string | "new" | null>(null);
  const [draft, setDraft] = useState<ProductDraft>(EMPTY_DRAFT);
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  useEffect(() => {
    const q = query(collection(db, "products"), orderBy("createdAt", "desc"));
    const unsub = onSnapshot(q, (snap) => {
      setProducts(
        snap.docs.map((d) => ({ id: d.id, ...(d.data() as Omit<Product, "id">) })),
      );
    });
    return () => unsub();
  }, []);

  function startNew() {
    setDraft(EMPTY_DRAFT);
    setEditing("new");
    setErr(null);
  }

  function startEdit(p: Product) {
    setDraft({
      name: p.name ?? "",
      description: p.description ?? "",
      imageUrl: p.imageUrl ?? "",
      paypalPriceUsd: p.paypalPriceUsd != null ? String(p.paypalPriceUsd) : "",
      robuxPrice: p.robuxPrice != null ? String(p.robuxPrice) : "",
      gamepassUrl: p.gamepassUrl ?? "",
    });
    setEditing(p.id);
    setErr(null);
  }

  async function save() {
    setErr(null);
    if (!draft.name.trim()) return setErr("Name is required.");
    if (!draft.description.trim()) return setErr("Description is required.");

    const paypalPriceUsd = draft.paypalPriceUsd.trim()
      ? parseFloat(draft.paypalPriceUsd)
      : null;
    const robuxPrice = draft.robuxPrice.trim() ? parseInt(draft.robuxPrice, 10) : null;
    const gamepassUrl = draft.gamepassUrl.trim() || null;

    if (paypalPriceUsd == null && robuxPrice == null) {
      return setErr("Add at least one price (PayPal or Robux).");
    }
    if (robuxPrice != null && !gamepassUrl) {
      return setErr("Robux price needs a gamepass link.");
    }

    setBusy(true);
    try {
      const data = {
        name: draft.name.trim(),
        description: draft.description.trim(),
        imageUrl: draft.imageUrl.trim(),
        paypalPriceUsd,
        robuxPrice,
        gamepassUrl,
      };
      if (editing === "new") {
        await addDoc(collection(db, "products"), {
          ...data,
          createdAt: serverTimestamp(),
        });
      } else if (editing) {
        await updateDoc(doc(db, "products", editing), data);
      }
      setEditing(null);
      setDraft(EMPTY_DRAFT);
    } catch (e: any) {
      setErr(e?.message ?? "Couldn't save the product.");
    } finally {
      setBusy(false);
    }
  }

  async function remove(id: string) {
    if (!confirm("Delete this product? This cannot be undone.")) return;
    await deleteDoc(doc(db, "products", id));
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-5">
        <h2 className="text-xl font-semibold">Products</h2>
        {editing === null && (
          <button
            type="button"
            onClick={startNew}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white text-black text-sm font-medium hover:bg-white/90"
          >
            <Plus className="w-4 h-4" /> Add product
          </button>
        )}
      </div>

      {editing !== null && (
        <div className="glass-card rounded-2xl p-6 mb-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold">
              {editing === "new" ? "New product" : "Edit product"}
            </h3>
            <button
              type="button"
              onClick={() => {
                setEditing(null);
                setDraft(EMPTY_DRAFT);
              }}
              className="w-8 h-8 rounded-full glass-soft flex items-center justify-center hover:bg-white/10"
              aria-label="Cancel"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Field label="Name" value={draft.name} onChange={(v) => setDraft({ ...draft, name: v })} />
            <Field
              label="Image URL"
              value={draft.imageUrl}
              onChange={(v) => setDraft({ ...draft, imageUrl: v })}
              placeholder="https://..."
            />
            <Field
              label="PayPal price (USD)"
              value={draft.paypalPriceUsd}
              onChange={(v) => setDraft({ ...draft, paypalPriceUsd: v })}
              placeholder="9.99"
              type="number"
            />
            <Field
              label="Robux price"
              value={draft.robuxPrice}
              onChange={(v) => setDraft({ ...draft, robuxPrice: v })}
              placeholder="100"
              type="number"
            />
            <div className="md:col-span-2">
              <Field
                label="Gamepass link (required if Robux is set)"
                value={draft.gamepassUrl}
                onChange={(v) => setDraft({ ...draft, gamepassUrl: v })}
                placeholder="https://www.roblox.com/game-pass/..."
              />
            </div>
            <div className="md:col-span-2">
              <label className="text-xs uppercase tracking-widest text-muted-foreground">
                Description
              </label>
              <textarea
                value={draft.description}
                onChange={(e) => setDraft({ ...draft, description: e.target.value })}
                rows={4}
                className="mt-1 w-full glass-soft rounded-xl px-4 py-3 outline-none focus:border-white/30 resize-y"
              />
            </div>
          </div>

          {err && (
            <div className="mt-4 text-sm text-red-400 bg-red-500/10 border border-red-500/20 rounded-lg px-3 py-2">
              {err}
            </div>
          )}

          <div className="mt-5 flex items-center justify-end gap-2">
            <button
              type="button"
              onClick={() => {
                setEditing(null);
                setDraft(EMPTY_DRAFT);
              }}
              className="px-4 py-2 rounded-full glass-soft text-sm hover:bg-white/10"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={save}
              disabled={busy}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white text-black text-sm font-medium hover:bg-white/90 disabled:opacity-50"
            >
              <Save className="w-4 h-4" /> {busy ? "Saving..." : "Save"}
            </button>
          </div>
        </div>
      )}

      {products.length === 0 ? (
        <div className="glass-card rounded-2xl p-12 text-center text-muted-foreground">
          No products yet — click "Add product" to create your first one.
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {products.map((p) => (
            <div key={p.id} className="glass-card rounded-2xl overflow-hidden flex flex-col">
              <div className="aspect-[16/10] bg-secondary/40 overflow-hidden">
                {p.imageUrl ? (
                  <img
                    src={p.imageUrl}
                    alt={p.name}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      (e.currentTarget as HTMLImageElement).style.display = "none";
                    }}
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-muted-foreground">
                    <ShoppingBag className="w-8 h-8" />
                  </div>
                )}
              </div>
              <div className="p-4 flex-1 flex flex-col">
                <h4 className="font-semibold">{p.name}</h4>
                <p className="text-xs text-muted-foreground mt-1 line-clamp-2 flex-1">
                  {p.description}
                </p>
                <div className="text-xs text-muted-foreground mt-2 space-y-0.5">
                  {p.paypalPriceUsd != null && <div>PayPal: ${p.paypalPriceUsd.toFixed(2)}</div>}
                  {p.robuxPrice != null && <div>Robux: R$ {p.robuxPrice.toLocaleString()}</div>}
                </div>
                <div className="mt-4 flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => startEdit(p)}
                    className="flex-1 inline-flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-full glass-soft text-xs hover:bg-white/10"
                  >
                    <Pencil className="w-3 h-3" /> Edit
                  </button>
                  <button
                    type="button"
                    onClick={() => remove(p.id)}
                    className="inline-flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-full glass-soft text-xs hover:bg-red-500/20 hover:text-red-300"
                  >
                    <Trash2 className="w-3 h-3" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function Field({
  label,
  value,
  onChange,
  placeholder,
  type,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  type?: string;
}) {
  return (
    <div>
      <label className="text-xs uppercase tracking-widest text-muted-foreground">
        {label}
      </label>
      <input
        type={type ?? "text"}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="mt-1 w-full glass-soft rounded-xl px-4 py-3 outline-none focus:border-white/30"
      />
    </div>
  );
}

/* ---------------------------- Orders & Chats ---------------------------- */

function OrdersPanel() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [openId, setOpenId] = useState<string | null>(null);

  useEffect(() => {
    const q = query(collection(db, "orders"), orderBy("createdAt", "desc"));
    const unsub = onSnapshot(q, (snap) => {
      setOrders(
        snap.docs.map((d) => ({ id: d.id, ...(d.data() as Omit<Order, "id">) })),
      );
    });
    return () => unsub();
  }, []);

  async function setStatus(id: string, status: Order["status"]) {
    await updateDoc(doc(db, "orders", id), { status });
  }

  if (orders.length === 0) {
    return (
      <div className="glass-card rounded-2xl p-12 text-center text-muted-foreground">
        No orders yet. When a buyer clicks Buy, the order will show up here.
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {orders.map((o) => (
        <div key={o.id} className="glass-card rounded-2xl overflow-hidden">
          <button
            type="button"
            onClick={() => setOpenId(openId === o.id ? null : o.id)}
            className="w-full text-left p-5 flex items-center gap-4 hover:bg-white/5 transition"
          >
            <div className="w-12 h-12 rounded-xl bg-secondary/40 overflow-hidden shrink-0">
              {o.productImage ? (
                <img src={o.productImage} alt="" className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <ShoppingBag className="w-5 h-5 text-muted-foreground" />
                </div>
              )}
            </div>
            <div className="flex-1">
              <div className="font-semibold">{o.productName}</div>
              <div className="text-xs text-muted-foreground mt-0.5">
                <span className="text-foreground">{o.buyerName}</span> ·{" "}
                {o.method === "paypal"
                  ? `$${o.amount.toFixed(2)} PayPal`
                  : `R$ ${o.amount.toLocaleString()} Robux`}{" "}
                · <span className="capitalize">{o.status.replace("_", " ")}</span>
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
              {openId === o.id ? "Hide" : "Open"}
            </span>
          </button>

          {openId === o.id && (
            <div className="border-t border-white/5 p-4 space-y-3">
              <div className="flex items-center gap-2 flex-wrap text-xs">
                <span className="text-muted-foreground uppercase tracking-widest">
                  Mark as:
                </span>
                {(["awaiting_payment", "paid", "cancelled"] as Order["status"][]).map(
                  (s) => (
                    <button
                      key={s}
                      type="button"
                      onClick={() => setStatus(o.id, s)}
                      className={`px-3 py-1 rounded-full capitalize ${
                        o.status === s
                          ? "bg-white text-black"
                          : "glass-soft hover:bg-white/10"
                      }`}
                    >
                      {s.replace("_", " ")}
                    </button>
                  ),
                )}
              </div>
              <ChatPanel orderId={o.id} />
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

/* -------------------------------- Settings ------------------------------- */

function SettingsPanel() {
  const [paypalEmail, setPaypalEmail] = useState("");
  const [busy, setBusy] = useState(false);
  const [saved, setSaved] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      const snap = await getDoc(doc(db, "settings", "store"));
      const data = (snap.exists() ? snap.data() : {}) as StoreSettings;
      setPaypalEmail(data.paypalEmail ?? "");
      setLoading(false);
    })();
  }, []);

  async function save() {
    setBusy(true);
    setSaved(false);
    try {
      await setDoc(doc(db, "settings", "store"), {
        paypalEmail: paypalEmail.trim(),
      });
      setSaved(true);
      setTimeout(() => setSaved(false), 2000);
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="max-w-xl mx-auto">
      <div className="glass-card rounded-2xl p-6">
        <h2 className="text-xl font-semibold mb-1">Store settings</h2>
        <p className="text-sm text-muted-foreground mb-6">
          Buyers picking PayPal will be sent to this email's PayPal page.
        </p>
        <Field
          label="Your PayPal email"
          value={paypalEmail}
          onChange={setPaypalEmail}
          placeholder="you@example.com"
        />
        <div className="mt-5 flex items-center justify-end gap-3">
          {saved && (
            <span className="text-xs text-emerald-400">Saved</span>
          )}
          <button
            type="button"
            onClick={save}
            disabled={busy || loading}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white text-black text-sm font-medium hover:bg-white/90 disabled:opacity-50"
          >
            <Save className="w-4 h-4" /> {busy ? "Saving..." : "Save"}
          </button>
        </div>
      </div>
    </div>
  );
}
