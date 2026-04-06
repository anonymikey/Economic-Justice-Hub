import { Switch, Route, Router as WouterRouter } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FloatingScrollButton from "@/components/FloatingScrollButton";
import Home from "@/pages/Home";
import About from "@/pages/About";

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
      <Route path="/pillars">{() => <ComingSoon title="Our Strategic Pillars" />}</Route>
      <Route path="/programs">{() => <ComingSoon title="Programs" />}</Route>
      <Route path="/research">{() => <ComingSoon title="Research" />}</Route>
      <Route path="/events">{() => <ComingSoon title="Events" />}</Route>
      <Route path="/contact">{() => <ComingSoon title="Contact Us" />}</Route>
      <Route path="/profile">{() => <ComingSoon title="Profile" />}</Route>
      <Route path="/donate">{() => <ComingSoon title="Donate" />}</Route>
      <Route path="/login">{() => <ComingSoon title="Login" />}</Route>
      <Route path="/join">{() => <ComingSoon title="Join EJF" />}</Route>
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
        <Navbar />
        <main>
          <Router />
        </main>
        <Footer />
        <FloatingScrollButton />
      </WouterRouter>
    </QueryClientProvider>
  );
}

export default App;
