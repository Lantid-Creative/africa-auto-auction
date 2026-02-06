import { Link, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Home, Search, ArrowLeft, Car, HelpCircle } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  const suggestions = [
    { icon: Car, label: "Browse Auctions", href: "/auctions", desc: "Find your next vehicle" },
    { icon: Search, label: "How It Works", href: "/how-it-works", desc: "Learn about our platform" },
    { icon: HelpCircle, label: "Help Center", href: "/help", desc: "Get answers to your questions" },
  ];

  return (
    <div className="min-h-screen bg-background pattern-african flex flex-col">
      {/* Header */}
      <header className="py-6 px-4">
        <div className="container mx-auto">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-xl bg-gradient-gold flex items-center justify-center">
              <span className="text-xl font-bold text-primary-foreground">A</span>
            </div>
            <span className="text-xl font-display font-bold">AfriAuto</span>
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex items-center justify-center px-4 py-16">
        <div className="max-w-2xl mx-auto text-center">
          {/* 404 Illustration */}
          <div className="mb-8">
            <div className="relative inline-block">
              <span className="text-[150px] md:text-[200px] font-display font-bold text-gold-gradient opacity-20">
                404
              </span>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-24 h-24 md:w-32 md:h-32 rounded-2xl bg-gradient-gold flex items-center justify-center animate-pulse">
                  <Car className="w-12 h-12 md:w-16 md:h-16 text-primary-foreground" />
                </div>
              </div>
            </div>
          </div>

          {/* Message */}
          <h1 className="text-3xl md:text-4xl font-display font-bold mb-4">
            Oops! Road Not Found
          </h1>
          <p className="text-lg text-muted-foreground mb-8 max-w-md mx-auto">
            The page you're looking for has taken a wrong turn or doesn't exist. 
            Let's get you back on track.
          </p>

          {/* Primary Actions */}
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            <Link to="/">
              <Button className="btn-premium gap-2">
                <Home className="w-4 h-4" />
                Back to Home
              </Button>
            </Link>
            <Button variant="outline" onClick={() => window.history.back()} className="gap-2">
              <ArrowLeft className="w-4 h-4" />
              Go Back
            </Button>
          </div>

          {/* Suggestions */}
          <div className="card-premium p-6 md:p-8">
            <h2 className="text-lg font-display font-semibold mb-6">
              You might be looking for:
            </h2>
            <div className="grid md:grid-cols-3 gap-4">
              {suggestions.map((item) => (
                <Link
                  key={item.href}
                  to={item.href}
                  className="group p-4 rounded-xl bg-background/50 hover:bg-primary/10 transition-colors text-left"
                >
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mb-3 group-hover:bg-primary/20 transition-colors">
                    <item.icon className="w-5 h-5 text-primary" />
                  </div>
                  <p className="font-semibold text-sm mb-1">{item.label}</p>
                  <p className="text-xs text-muted-foreground">{item.desc}</p>
                </Link>
              ))}
            </div>
          </div>

          {/* Help Text */}
          <p className="text-sm text-muted-foreground mt-8">
            If you believe this is an error, please{" "}
            <Link to="/contact" className="text-primary hover:underline">
              contact our support team
            </Link>
            .
          </p>
        </div>
      </main>

      {/* Footer */}
      <footer className="py-6 px-4 border-t border-border/30">
        <div className="container mx-auto text-center text-sm text-muted-foreground">
          © {new Date().getFullYear()} AfriAuto. All rights reserved. Founded by Damilola Yinusa.
        </div>
      </footer>
    </div>
  );
};

export default NotFound;
