import { Link, useLocation } from "wouter";
import { Snowflake, LogOut, ShieldCheck, Receipt } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { useAuthModal } from "@/contexts/AuthModalContext";
import { STORE_NAME } from "@/config";

const NAV = [
  { label: "Home", href: "/" },
  { label: "Products", href: "/products" },
  { label: "Reviews", href: "/reviews" },
  { label: "Status", href: "/status" },
  { label: "Blog", href: "/blog" },
];

export default function Header() {
  const [location] = useLocation();
  const { user, displayName, isAdmin, signOut } = useAuth();
  const { requireAuth } = useAuthModal();

  return (
    <header className="w-full sticky top-0 z-40 px-4 pt-4">
      <div className="max-w-6xl mx-auto glass-pill rounded-full flex items-center justify-between p-2 pl-4">
        <div className="flex items-center gap-2 sm:gap-6">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-full glass-soft flex items-center justify-center">
              <Snowflake className="w-5 h-5 text-white" />
            </div>
            <span className="hidden sm:inline font-semibold tracking-wide">
              {STORE_NAME}
            </span>
          </Link>

          <nav className="hidden md:flex items-center gap-1">
            {NAV.map((item) => {
              const active = location === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`px-4 py-2 rounded-full text-sm transition-colors ${
                    active
                      ? "bg-white text-black"
                      : "text-foreground/80 hover:text-white hover:bg-white/5"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>
        </div>

        <div className="flex items-center gap-2">
          {isAdmin && (
            <Link
              href="/admin"
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-2 rounded-full glass-soft text-sm hover:bg-white/10 transition"
            >
              <ShieldCheck className="w-4 h-4" />
              Admin
            </Link>
          )}
          {user ? (
            <>
              <Link
                href="/orders"
                className="hidden sm:inline-flex items-center gap-1.5 px-3 py-2 rounded-full glass-soft text-sm hover:bg-white/10 transition"
                title="My orders & chats"
              >
                <Receipt className="w-4 h-4" />
                <span className="hidden md:inline">{displayName ?? "My Orders"}</span>
              </Link>
              <button
                type="button"
                onClick={() => signOut()}
                aria-label="Sign out"
                className="w-10 h-10 rounded-full glass-soft flex items-center justify-center hover:bg-white/10 transition"
                title="Sign out"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </>
          ) : (
            <button
              type="button"
              onClick={() => requireAuth()}
              className="inline-flex items-center px-4 py-2 rounded-full bg-white text-black text-sm font-medium hover:bg-white/90 transition"
            >
              Sign In
            </button>
          )}
        </div>
      </div>

      {/* Mobile nav */}
      <div className="md:hidden max-w-6xl mx-auto mt-3 flex flex-wrap gap-1 justify-center">
        {NAV.map((item) => {
          const active = location === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`px-3 py-1.5 rounded-full text-xs transition-colors ${
                active
                  ? "bg-white text-black"
                  : "glass-soft text-foreground/80 hover:bg-white/10"
              }`}
            >
              {item.label}
            </Link>
          );
        })}
        {isAdmin && (
          <Link
            href="/admin"
            className="px-3 py-1.5 rounded-full text-xs glass-soft hover:bg-white/10 inline-flex items-center gap-1"
          >
            <ShieldCheck className="w-3 h-3" /> Admin
          </Link>
        )}
        {user && (
          <Link
            href="/orders"
            className="px-3 py-1.5 rounded-full text-xs glass-soft hover:bg-white/10 inline-flex items-center gap-1"
          >
            <Receipt className="w-3 h-3" /> Orders
          </Link>
        )}
      </div>
    </header>
  );
}
