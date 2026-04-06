import { Switch, Route, Router as WouterRouter } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AuthProvider } from "@/context/AuthContext";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FloatingScrollButton from "@/components/FloatingScrollButton";
import Home from "@/pages/Home";
import About from "@/pages/About";
import Pillars from "@/pages/Pillars";
import Programs from "@/pages/Programs";
import Research from "@/pages/Research";
import Events from "@/pages/Events";
import Contact from "@/pages/Contact";
import Login from "@/pages/Login";
import Profile from "@/pages/Profile";

const queryClient = new QueryClient();

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
      <Route path="/" component={Home} />
      <Route path="/about" component={About} />
      <Route path="/pillars" component={Pillars} />
      <Route path="/programs" component={Programs} />
      <Route path="/research" component={Research} />
      <Route path="/events" component={Events} />
      <Route path="/contact" component={Contact} />
      <Route path="/login" component={Login} />
      <Route path="/profile" component={Profile} />
      <Route path="/donate">{() => <ComingSoon title="Donate" />}</Route>
      <Route path="/join">{() => <ComingSoon title="Join EJF" />}</Route>
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
          <Navbar />
          <main>
            <Router />
          </main>
          <Footer />
          <FloatingScrollButton />
        </WouterRouter>
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;
