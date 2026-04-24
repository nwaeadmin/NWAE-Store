import { Link } from "wouter";

export default function NotFound() {
  return (
    <div className="max-w-xl mx-auto px-4 py-32 text-center">
      <h1 className="text-7xl font-bold hero-gradient">404</h1>
      <p className="text-muted-foreground mt-4">
        We couldn't find the page you're looking for.
      </p>
      <Link
        href="/"
        className="inline-block mt-6 px-6 py-3 rounded-full bg-white text-black text-sm font-medium hover:bg-white/90 transition"
      >
        Back to home
      </Link>
    </div>
  );
}
