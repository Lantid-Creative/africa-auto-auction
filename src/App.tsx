import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/hooks/useAuth";
import { LanguageProvider } from "@/hooks/useLanguage";
import { ThemeProvider } from "@/hooks/useTheme";
import Index from "./pages/Index";
import Auth from "./pages/Auth";
import Browse from "./pages/Browse";
import AuctionDetail from "./pages/AuctionDetail";
import Sell from "./pages/Sell";
import About from "./pages/About";
import HowItWorks from "./pages/HowItWorks";
import Membership from "./pages/Membership";
import BuyerGuide from "./pages/BuyerGuide";
import Help from "./pages/Help";
import Contact from "./pages/Contact";
import Careers from "./pages/Careers";
import Press from "./pages/Press";
import Financing from "./pages/Financing";
import Shipping from "./pages/Shipping";
import SellerGuide from "./pages/SellerGuide";
import Pricing from "./pages/Pricing";
import SuccessStories from "./pages/SuccessStories";
import Terms from "./pages/Terms";
import Privacy from "./pages/Privacy";
import Dashboard from "./pages/Dashboard";
import MyListings from "./pages/dashboard/MyListings";
import MyBids from "./pages/dashboard/MyBids";
import Watchlist from "./pages/dashboard/Watchlist";
import UserSettings from "./pages/dashboard/Settings";
import AdminDashboard from "./pages/admin/AdminDashboard";
import PendingReviews from "./pages/admin/PendingReviews";
import AllListings from "./pages/admin/AllListings";
import Users from "./pages/admin/Users";
import ReviewListing from "./pages/admin/ReviewListing";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider>
      <AuthProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <LanguageProvider>
            <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="/auctions" element={<Browse />} />
            <Route path="/auction/:id" element={<AuctionDetail />} />
            <Route path="/sell" element={<Sell />} />
            <Route path="/about" element={<About />} />
            <Route path="/how-it-works" element={<HowItWorks />} />
            <Route path="/membership" element={<Membership />} />
            <Route path="/buyer-guide" element={<BuyerGuide />} />
            <Route path="/help" element={<Help />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/terms" element={<Terms />} />
            <Route path="/privacy" element={<Privacy />} />
            <Route path="/careers" element={<Careers />} />
            <Route path="/press" element={<Press />} />
            <Route path="/financing" element={<Financing />} />
            <Route path="/shipping" element={<Shipping />} />
            <Route path="/seller-guide" element={<SellerGuide />} />
            <Route path="/pricing" element={<Pricing />} />
            <Route path="/success-stories" element={<SuccessStories />} />
            
            {/* User Dashboard */}
            <Route path="/dashboard" element={<Dashboard />}>
              <Route path="my-listings" element={<MyListings />} />
              <Route path="my-bids" element={<MyBids />} />
              <Route path="watchlist" element={<Watchlist />} />
              <Route path="settings" element={<UserSettings />} />
            </Route>
            
            {/* Admin Dashboard */}
            <Route path="/admin" element={<AdminDashboard />}>
              <Route path="pending" element={<PendingReviews />} />
              <Route path="listings" element={<AllListings />} />
              <Route path="users" element={<Users />} />
              <Route path="review/:id" element={<ReviewListing />} />
            </Route>
            
            <Route path="*" element={<NotFound />} />
          </Routes>
          </LanguageProvider>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
