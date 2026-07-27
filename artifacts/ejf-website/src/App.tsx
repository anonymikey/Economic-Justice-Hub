import { Switch, Route, Router as WouterRouter, useLocation } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AuthProvider } from "@/context/AuthContext";
import { isSupabaseConfigured } from "@/lib/supabase";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FloatingScrollButton from "@/components/FloatingScrollButton";
import ScrollToTop from "@/components/ScrollToTop";
import CookieBanner from "@/components/CookieBanner";
import WelcomeAnimation from "@/components/WelcomeAnimation";
import ProtectedRoute from "@/components/ProtectedRoute";
import CookiePolicy from "@/pages/CookiePolicy";
import Home from "@/pages/Home";
import Research from "@/pages/Research";
import Events from "@/pages/Events";
import Contact from "@/pages/Contact";
import Login from "@/pages/Login";
import Profile from "@/pages/Profile";
import Donate from "@/pages/Donate";
import Admin from "@/pages/Admin";
import Philosophy from "@/pages/Philosophy";
import Insights from "@/pages/Insights";

const queryClient = new QueryClient();

/** Instant client-side redirect to home */
function RedirectHome() {
  useLocation(); // ensure hook context
  if (typeof window !== "undefined") window.location.replace("/");
  return null;
}

function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-[#0e1f3d] mb-4">404</h1>
        <p className="text-gray-600 mb-6">Page not found</p>
        <a href="/" className="bg-[#0e1f3d] text-white px-6 py-2.5 rounded hover:bg-[#1a2f5e] transition-colors">
          Back to Home
        </a>
      </div>
    </div>
  );
}

function ComingSoon({ title }: { title: string }) {
  return (
    <div className="min-h-[60vh] flex items-center justify-center bg-gray-50">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-[#0e1f3d] mb-3">{title}</h1>
        <p className="text-gray-600 mb-6">This page is coming soon.</p>
        <a href="/" className="bg-[#0e1f3d] text-white px-6 py-2.5 rounded hover:bg-[#1a2f5e] transition-colors">
          Back to Home
        </a>
      </div>
    </div>
  );
}

function Router() {
  return (
    <Switch>
      {/* ── Active routes ── */}
      <Route path="/" component={Home} />
      <Route path="/philosophy" component={Philosophy} />
      <Route path="/research" component={Research} />
      <Route path="/insights" component={Insights} />
      <Route path="/events" component={Events} />
      <Route path="/contact" component={Contact} />
      <Route path="/login" component={Login} />
      <Route path="/profile">
        {() => <ProtectedRoute><Profile /></ProtectedRoute>}
      </Route>
      <Route path="/donate">
        {() => <ProtectedRoute><Donate /></ProtectedRoute>}
      </Route>
      <Route path="/admin" component={Admin} />
      <Route path="/cookies" component={CookiePolicy} />
      <Route path="/join">{() => <ComingSoon title="Join EJF" />}</Route>

      {/* ── Legacy redirects → Home ── */}
      <Route path="/about" component={RedirectHome} />
      <Route path="/pillars" component={RedirectHome} />
      <Route path="/programs" component={RedirectHome} />

      <Route component={NotFound} />
    </Switch>
  );
}

function AppShell() {
  const [location] = useLocation();
  const isAdmin = location.startsWith("/admin");

  if (isAdmin) {
    return (
      <>
        <ScrollToTop />
        <main><Router /></main>
      </>
    );
  }

  return (
    <>
      <WelcomeAnimation />
      <ScrollToTop />
      {!isSupabaseConfigured && (
        <div style={{ background: "#fef3c7", borderBottom: "1px solid #f59e0b", padding: "10px 20px", textAlign: "center", fontSize: 13, color: "#92400e" }}>
          ⚠️ Supabase is not configured — add <strong>VITE_SUPABASE_URL</strong> and <strong>VITE_SUPABASE_ANON_KEY</strong> to your Vercel environment variables and redeploy.
        </div>
      )}
      <Navbar />
      <main><Router /></main>
      <Footer />
      <FloatingScrollButton />
      <CookieBanner />
    </>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
          <AppShell />
        </WouterRouter>
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;
