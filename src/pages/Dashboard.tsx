import { useState } from 'react';
import { Link, useNavigate, Outlet, useLocation } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/hooks/useAuth';
import { 
  LayoutDashboard, 
  Car, 
  Gavel, 
  Heart, 
  Settings, 
  User,
  ChevronRight,
  Plus
} from 'lucide-react';

const Dashboard = () => {
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  if (!isAuthenticated) {
    navigate('/auth');
    return null;
  }

  const navigation = [
    { name: 'Overview', href: '/dashboard', icon: LayoutDashboard },
    { name: 'My Listings', href: '/dashboard/my-listings', icon: Car },
    { name: 'My Bids', href: '/dashboard/my-bids', icon: Gavel },
    { name: 'Watchlist', href: '/dashboard/watchlist', icon: Heart },
    { name: 'Settings', href: '/dashboard/settings', icon: Settings },
  ];

  const isActive = (path: string) => {
    if (path === '/dashboard') {
      return location.pathname === path;
    }
    return location.pathname.startsWith(path);
  };

  // Mock stats
  const stats = [
    { label: 'Active Listings', value: '2' },
    { label: 'Active Bids', value: '5' },
    { label: 'Won Auctions', value: '3' },
    { label: 'Watchlist', value: '12' },
  ];

  // Dashboard overview content
  const DashboardOverview = () => (
    <div className="space-y-8">
      {/* Welcome */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-display font-bold mb-1">
            Welcome back, {user?.name?.split(' ')[0]}!
          </h1>
          <p className="text-muted-foreground">
            Here's what's happening with your account
          </p>
        </div>
        <Link to="/sell">
          <Button className="btn-premium gap-2">
            <Plus className="w-4 h-4" />
            Sell a Car
          </Button>
        </Link>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <div key={index} className="card-premium p-6">
            <p className="text-3xl font-display font-bold text-gold-gradient mb-1">
              {stat.value}
            </p>
            <p className="text-sm text-muted-foreground">{stat.label}</p>
          </div>
        ))}
      </div>

      {/* Recent Activity */}
      <div className="card-premium p-6">
        <h2 className="font-display font-semibold text-lg mb-4">Recent Activity</h2>
        <div className="space-y-4">
          <div className="flex items-center gap-4 p-3 rounded-lg bg-muted/30">
            <div className="w-10 h-10 rounded-full bg-success/20 flex items-center justify-center">
              <Gavel className="w-5 h-5 text-success" />
            </div>
            <div className="flex-1">
              <p className="font-medium">Bid placed on 2023 BMW X7</p>
              <p className="text-sm text-muted-foreground">2 hours ago</p>
            </div>
            <span className="text-sm font-semibold">$148,000</span>
          </div>
          <div className="flex items-center gap-4 p-3 rounded-lg bg-muted/30">
            <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
              <Car className="w-5 h-5 text-primary" />
            </div>
            <div className="flex-1">
              <p className="font-medium">Listing submitted for review</p>
              <p className="text-sm text-muted-foreground">Yesterday</p>
            </div>
            <span className="text-xs px-2 py-1 rounded-full status-pending">Pending</span>
          </div>
          <div className="flex items-center gap-4 p-3 rounded-lg bg-muted/30">
            <div className="w-10 h-10 rounded-full bg-accent/20 flex items-center justify-center">
              <Heart className="w-5 h-5 text-accent" />
            </div>
            <div className="flex-1">
              <p className="font-medium">Added to watchlist</p>
              <p className="text-sm text-muted-foreground">3 days ago</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar */}
          <aside className="lg:w-64 shrink-0">
            <div className="card-premium p-4 lg:sticky lg:top-24">
              {/* Profile Summary */}
              <div className="flex items-center gap-3 p-3 mb-4 rounded-lg bg-muted/30">
                <div className="w-12 h-12 rounded-full bg-gradient-gold flex items-center justify-center">
                  {user?.avatar ? (
                    <img src={user.avatar} alt={user.name} className="w-12 h-12 rounded-full" />
                  ) : (
                    <User className="w-6 h-6 text-primary-foreground" />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-semibold truncate">{user?.name}</p>
                  <p className="text-xs text-muted-foreground truncate">{user?.email}</p>
                </div>
              </div>

              {/* Navigation */}
              <nav className="space-y-1">
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    to={item.href}
                    className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                      isActive(item.href)
                        ? 'bg-primary/10 text-primary'
                        : 'text-muted-foreground hover:bg-muted/50 hover:text-foreground'
                    }`}
                  >
                    <item.icon className="w-5 h-5" />
                    {item.name}
                    {isActive(item.href) && (
                      <ChevronRight className="w-4 h-4 ml-auto" />
                    )}
                  </Link>
                ))}
              </nav>
            </div>
          </aside>

          {/* Main Content */}
          <main className="flex-1 min-w-0">
            {location.pathname === '/dashboard' ? <DashboardOverview /> : <Outlet />}
          </main>
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;
