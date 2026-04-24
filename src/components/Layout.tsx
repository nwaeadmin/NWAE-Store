import { ReactNode } from "react";
import PromoBanner from "./PromoBanner";
import Header from "./Header";
import Footer from "./Footer";
import Snow from "./Snow";
import AuthModal from "./AuthModal";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-grid relative">
      <Snow />
      <PromoBanner />
      <Header />
      <main className="relative z-10">{children}</main>
      <Footer />
      <AuthModal />
    </div>
  );
}
