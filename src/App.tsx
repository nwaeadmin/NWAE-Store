import { Switch, Route, Router as WouterRouter } from "wouter";
import Layout from "@/components/Layout";
import ConfigGate from "@/components/ConfigGate";
import { AuthProvider } from "@/contexts/AuthContext";
import { AuthModalProvider } from "@/contexts/AuthModalContext";
import { isFirebaseConfigured } from "@/lib/firebase";

import Home from "@/pages/Home";
import Products from "@/pages/Products";
import MyOrders from "@/pages/MyOrders";
import Admin from "@/pages/Admin";
import Reviews from "@/pages/Reviews";
import Status from "@/pages/Status";
import Blog from "@/pages/Blog";
import Login from "@/pages/Login";
import Cart from "@/pages/Cart";
import Terms from "@/pages/Terms";
import Privacy from "@/pages/Privacy";
import Refund from "@/pages/Refund";
import Contact from "@/pages/Contact";
import NotFound from "@/pages/not-found";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/products" component={Products} />
      <Route path="/orders" component={MyOrders} />
      <Route path="/admin" component={Admin} />
      <Route path="/reviews" component={Reviews} />
      <Route path="/status" component={Status} />
      <Route path="/blog" component={Blog} />
      <Route path="/login" component={Login} />
      <Route path="/cart" component={Cart} />
      <Route path="/terms" component={Terms} />
      <Route path="/privacy" component={Privacy} />
      <Route path="/refund" component={Refund} />
      <Route path="/contact" component={Contact} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  if (!isFirebaseConfigured) {
    return <ConfigGate />;
  }
  return (
    <AuthProvider>
      <AuthModalProvider>
        <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
          <Layout>
            <Router />
          </Layout>
        </WouterRouter>
      </AuthModalProvider>
    </AuthProvider>
  );
}

export default App;
