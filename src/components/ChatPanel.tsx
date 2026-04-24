import { useEffect, useRef, useState } from "react";
import { Send } from "lucide-react";
import {
  addDoc,
  collection,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "@/lib/firebase";
import { useAuth } from "@/contexts/AuthContext";
import type { ChatMessage } from "@/lib/types";

interface Props {
  orderId: string;
  className?: string;
}

export default function ChatPanel({ orderId, className }: Props) {
  const { user, displayName, isAdmin } = useAuth();
  const [msgs, setMsgs] = useState<ChatMessage[]>([]);
  const [text, setText] = useState("");
  const [sending, setSending] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const q = query(
      collection(db, "chats", orderId, "messages"),
      orderBy("createdAt", "asc"),
    );
    const unsub = onSnapshot(q, (snap) => {
      setMsgs(
        snap.docs.map((d) => ({ id: d.id, ...(d.data() as Omit<ChatMessage, "id">) })),
      );
      requestAnimationFrame(() => {
        if (scrollRef.current) {
          scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
      });
    });
    return () => unsub();
  }, [orderId]);

  async function send(e: React.FormEvent) {
    e.preventDefault();
    if (!text.trim() || !user) return;
    setSending(true);
    try {
      await addDoc(collection(db, "chats", orderId, "messages"), {
        text: text.trim(),
        fromUid: user.uid,
        fromName: isAdmin ? "Seller" : displayName ?? "Anonymous",
        fromAdmin: isAdmin,
        createdAt: serverTimestamp(),
      });
      setText("");
    } finally {
      setSending(false);
    }
  }

  return (
    <div className={`glass-soft rounded-xl flex flex-col ${className ?? ""}`}>
      <div
        ref={scrollRef}
        className="flex-1 overflow-y-auto p-4 space-y-3 max-h-[400px] min-h-[240px]"
      >
        {msgs.length === 0 && (
          <p className="text-xs text-muted-foreground text-center py-6">
            No messages yet — say hi!
          </p>
        )}
        {msgs.map((m) => {
          const mine = m.fromUid === user?.uid;
          return (
            <div
              key={m.id}
              className={`flex ${mine ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`max-w-[85%] rounded-2xl px-3 py-2 text-sm ${
                  mine
                    ? "bg-white text-black"
                    : m.fromAdmin
                    ? "bg-emerald-500/10 border border-emerald-400/30"
                    : "bg-white/5 border border-white/10"
                }`}
              >
                <div
                  className={`text-[10px] uppercase tracking-widest mb-0.5 ${
                    mine ? "text-black/60" : "text-muted-foreground"
                  }`}
                >
                  {m.fromAdmin ? "Seller" : m.fromName}
                </div>
                <div className="whitespace-pre-wrap break-words">{m.text}</div>
              </div>
            </div>
          );
        })}
      </div>
      <form
        onSubmit={send}
        className="border-t border-white/5 p-2 flex items-center gap-2"
      >
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Type a message..."
          className="flex-1 bg-transparent px-3 py-2 outline-none text-sm placeholder:text-muted-foreground"
        />
        <button
          type="submit"
          disabled={sending || !text.trim()}
          className="w-9 h-9 rounded-full bg-white text-black flex items-center justify-center disabled:opacity-40"
          aria-label="Send"
        >
          <Send className="w-4 h-4" />
        </button>
      </form>
    </div>
  );
}
