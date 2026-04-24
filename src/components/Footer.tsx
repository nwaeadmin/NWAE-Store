import { Link } from "wouter";
import { Snowflake } from "lucide-react";
import { STORE_NAME } from "@/config";

export default function Footer() {
  return (
    <footer className="border-t border-white/5 mt-24">
      <div className="max-w-6xl mx-auto px-4 py-12 grid grid-cols-1 md:grid-cols-4 gap-10">
        <div>
          <div className="flex items-center gap-2 mb-3">
            <div className="w-9 h-9 rounded-full glass-soft flex items-center justify-center">
              <Snowflake className="w-5 h-5 text-white" />
            </div>
            <span className="font-semibold">{STORE_NAME}</span>
          </div>
          <p className="text-sm text-muted-foreground max-w-xs">
            Premium quality digital products at honest prices. Fast, secure, and
            backed by a real support team.
          </p>
        </div>

        <div>
          <h4 className="font-semibold text-sm uppercase tracking-wider text-foreground/70 mb-3">
            Shop
          </h4>
          <ul className="space-y-2 text-sm">
            <li>
              <Link href="/products" className="hover:text-white text-muted-foreground">
                All Products
              </Link>
            </li>
            <li>
              <Link href="/reviews" className="hover:text-white text-muted-foreground">
                Reviews
              </Link>
            </li>
            <li>
              <Link href="/status" className="hover:text-white text-muted-foreground">
                Status
              </Link>
            </li>
            <li>
              <Link href="/blog" className="hover:text-white text-muted-foreground">
                Blog
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="font-semibold text-sm uppercase tracking-wider text-foreground/70 mb-3">
            Legal
          </h4>
          <ul className="space-y-2 text-sm">
            <li>
              <Link href="/terms" className="hover:text-white text-muted-foreground">
                Terms of Service
              </Link>
            </li>
            <li>
              <Link href="/privacy" className="hover:text-white text-muted-foreground">
                Privacy Policy
              </Link>
            </li>
            <li>
              <Link href="/refund" className="hover:text-white text-muted-foreground">
                Refund Policy
              </Link>
            </li>
            <li>
              <Link href="/contact" className="hover:text-white text-muted-foreground">
                Contact
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="font-semibold text-sm uppercase tracking-wider text-foreground/70 mb-3">
            Community
          </h4>
          <ul className="space-y-2 text-sm">
            <li>
              <a
                href="https://discord.gg/"
                target="_blank"
                rel="noreferrer"
                className="hover:text-white text-muted-foreground"
              >
                Discord
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-white text-muted-foreground">
                Telegram
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-white text-muted-foreground">
                Email Support
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/5">
        <div className="max-w-6xl mx-auto px-4 py-6 text-xs text-muted-foreground flex flex-col md:flex-row gap-2 items-center justify-between">
          <p>© {new Date().getFullYear()} {STORE_NAME}. All rights reserved.</p>
          <p>Built with ❄ — Premium Quality, Smart Prices.</p>
        </div>
      </div>
    </footer>
  );
}
