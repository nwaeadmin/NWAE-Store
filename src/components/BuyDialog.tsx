import { useEffect, useState } from "react";
import { useLocation } from "wouter";
import { X, ExternalLink, Copy, Check, AlertCircle } from "lucide-react";
import {
  addDoc,
  collection,
  doc,
  getDoc,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "@/lib/firebase";
import { useAuth } from "@/contexts/AuthContext";
import { useAuthModal } from "@/contexts/AuthModalContext";
import type { Product, StoreSettings } from "@/lib/types";

interface Props {
  product: Product;
  open: boolean;
  onClose: () => void;
}

export default function BuyDialog({ product, open, onClose }: Props) {
  const { user, displayName, isAdmin } = useAuth();
  const { requireAuth } = useAuthModal();
  const [, navigate] = useLocation();

  const hasPaypal = product.paypalPriceUsd != null;
  const hasRobux = product.robuxPrice != null && product.gamepassUrl;
  const defaultMethod: "paypal" | "robux" | null = hasPaypal
    ? "paypal"
    : hasRobux
    ? "robux"
    : null;

  const [method, setMethod] = useState<"paypal" | "robux" | null>(defaultMethod);
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState<string | null>(null);
  const [paypalEmail, setPaypalEmail] = useState<string>("");
  const [paypalLink, setPaypalLink] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!open) {
      setBusy(false);
      setErr(null);
      setPaypalLink(null);
      setCopied(false);
      setMethod(defaultMethod);
    }
  }, [open, defaultMethod]);

  // Fetch the admin's PayPal email when the modal opens for a paypal-eligible product.
  useEffect(() => {
    if (!open || !hasPaypal) return;
    (async () => {
      try {
        const snap = await getDoc(doc(db, "settings", "store"));
        const data = (snap.exists() ? snap.data() : {}) as StoreSettings;
        setPaypalEmail(data.paypalEmail ?? "");
      } catch {
        setPaypalEmail("");
      }
    })();
  }, [open, hasPaypal]);

  if (!open) return null;

  async function handleBuy() {
    if (!method) return;
    setErr(null);

    // Admins shouldn't be placing orders against their own store.
    if (isAdmin) {
      setErr(
        "You're signed in as the admin — sign out and use a different account to test purchases.",
      );
      return;
    }

    // Auth gate
    let buyerUid = user?.uid;
    let buyerName = displayName;
    if (!buyerUid) {
      const ok = await requireAuth();
      if (!ok) return;
      // After auth, the AuthContext effect populates user/displayName.
      // Bail out and let the user click Buy again — by then state has updated.
      return;
    }

    setBusy(true);
    try {
      let amount = 0;
      let currency: "USD" | "ROBUX" = "USD";
      let paymentLink = "";

      if (method === "paypal") {
        if (!paypalEmail) {
          setBusy(false);
          setErr(
            "PayPal isn't set up yet — the store admin needs to add their PayPal email in the admin panel.",
          );
          return;
        }
        amount = product.paypalPriceUsd ?? 0;
        currency = "USD";
        const handle = paypalEmail.split("@")[0];
        // paypal.me works with the full email or a handle. Prefer handle which is
        // the standard paypal.me format. If the email is generic, just use it.
        paymentLink = `https://www.paypal.me/${encodeURIComponent(handle)}/${amount}`;
      } else {
        if (!product.gamepassUrl) {
          setBusy(false);
          setErr("This product is missing a gamepass link.");
          return;
        }
        amount = product.robuxPrice ?? 0;
        currency = "ROBUX";
        paymentLink = product.gamepassUrl;
      }

      // Create the order
      const orderRef = await addDoc(collection(db, "orders"), {
        productId: product.id,
        productName: product.name,
        productImage: product.imageUrl ?? null,
        buyerUid,
        buyerName: buyerName ?? "Anonymous",
        method,
        amount,
        currency,
        paymentLink,
        status: "awaiting_payment",
        createdAt: serverTimestamp(),
      });

      // Seed the chat with a system-style message from the buyer
      await addDoc(collection(db, "chats", orderRef.id, "messages"), {
        text: `Hi! I just placed an order for "${product.name}".`,
        fromUid: buyerUid,
        fromName: buyerName ?? "Anonymous",
        fromAdmin: false,
        createdAt: serverTimestamp(),
      });

      if (method === "robux") {
        // Open the gamepass in a new tab and send the buyer to their orders page.
        window.open(paymentLink, "_blank", "noopener,noreferrer");
        onClose();
        navigate("/orders");
      } else {
        // Show the PayPal link inline so the buyer can copy or open it.
        setPaypalLink(paymentLink);
      }
    } catch (e: any) {
      setErr(e?.message ?? "Something went wrong placing your order.");
    } finally {
      setBusy(false);
    }
  }

  function copyLink() {
    if (!paypalLink) return;
    navigator.clipboard.writeText(paypalLink).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    });
  }

  return (
    <div
      className="fixed inset-0 z-[100] bg-black/70 backdrop-blur-sm flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div
        className="glass-card rounded-2xl w-full max-w-md p-6 relative"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          aria-label="Close"
          onClick={onClose}
          className="absolute top-3 right-3 w-8 h-8 rounded-full glass-soft flex items-center justify-center hover:bg-white/10"
        >
          <X className="w-4 h-4" />
        </button>

        <h2 className="text-xl font-bold">{product.name}</h2>
        <p className="text-sm text-muted-foreground mt-1">
          Choose how you want to pay.
        </p>

        {paypalLink ? (
          <div className="mt-6 space-y-4">
            <div className="glass-soft rounded-xl p-4 text-sm">
              <p className="text-muted-foreground text-xs uppercase tracking-widest mb-2">
                Send your payment to
              </p>
              <p className="font-mono break-all">{paypalEmail}</p>
              <p className="mt-2 text-foreground/85">
                Amount:{" "}
                <span className="font-semibold">
                  ${product.paypalPriceUsd?.toFixed(2)} USD
                </span>
              </p>
            </div>
            <div className="flex items-center gap-2">
              <a
                href={paypalLink}
                target="_blank"
                rel="noreferrer"
                className="flex-1 inline-flex items-center justify-center gap-2 py-3 rounded-xl bg-white text-black font-medium hover:bg-white/90"
              >
                Open PayPal <ExternalLink className="w-4 h-4" />
              </a>
              <button
                type="button"
                onClick={copyLink}
                className="px-4 py-3 rounded-xl glass-soft hover:bg-white/10"
                title="Copy link"
              >
                {copied ? (
                  <Check className="w-4 h-4" />
                ) : (
                  <Copy className="w-4 h-4" />
                )}
              </button>
            </div>
            <p className="text-xs text-muted-foreground">
              A chat with the seller has been opened. Once you've paid, head to{" "}
              <button
                type="button"
                onClick={() => {
                  onClose();
                  navigate("/orders");
                }}
                className="underline text-white"
              >
                My Orders
              </button>{" "}
              to confirm and chat.
            </p>
          </div>
        ) : (
          <>
            <div className="mt-6 space-y-2">
              {hasPaypal && (
                <button
                  type="button"
                  onClick={() => setMethod("paypal")}
                  className={`w-full text-left p-4 rounded-xl border transition ${
                    method === "paypal"
                      ? "border-white bg-white/5"
                      : "border-white/10 hover:border-white/20"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-semibold">Pay with PayPal</div>
                      <div className="text-xs text-muted-foreground">
                        We'll show you the seller's PayPal link.
                      </div>
                    </div>
                    <div className="text-base font-semibold">
                      ${product.paypalPriceUsd?.toFixed(2)}
                    </div>
                  </div>
                </button>
              )}

              {hasRobux && (
                <button
                  type="button"
                  onClick={() => setMethod("robux")}
                  className={`w-full text-left p-4 rounded-xl border transition ${
                    method === "robux"
                      ? "border-white bg-white/5"
                      : "border-white/10 hover:border-white/20"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-semibold">Pay with Robux</div>
                      <div className="text-xs text-muted-foreground">
                        Opens the Roblox gamepass to complete the purchase.
                      </div>
                    </div>
                    <div className="text-base font-semibold">
                      R$ {product.robuxPrice?.toLocaleString()}
                    </div>
                  </div>
                </button>
              )}

              {!hasPaypal && !hasRobux && (
                <div className="text-sm text-muted-foreground p-4 glass-soft rounded-xl">
                  This product has no payment method configured yet.
                </div>
              )}
            </div>

            {err && (
              <div className="mt-4 text-sm text-red-400 bg-red-500/10 border border-red-500/20 rounded-lg px-3 py-2 flex items-start gap-2">
                <AlertCircle className="w-4 h-4 mt-0.5 shrink-0" />
                <span>{err}</span>
              </div>
            )}

            <button
              type="button"
              disabled={!method || busy}
              onClick={handleBuy}
              className="w-full mt-5 py-3 rounded-xl bg-white text-black font-medium hover:bg-white/90 transition disabled:opacity-50"
            >
              {busy ? "Placing order..." : user ? "Continue" : "Sign in & Buy"}
            </button>

            {!user && (
              <p className="text-xs text-center text-muted-foreground mt-3">
                You'll be asked to sign in or create an account first.
              </p>
            )}
          </>
        )}
      </div>
    </div>
  );
}
