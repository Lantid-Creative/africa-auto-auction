import { Link, useNavigate, Outlet, useLocation } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/hooks/useAuth';
import KYCStatusBanner from '@/components/kyc/KYCStatusBanner';
import { 
  LayoutDashboard, Car, Gavel, Heart, Settings, User,
  ChevronRight, Plus, Shield, TrendingUp, DollarSign, Bell
} from 'lucide-react';

const Dashboard = () => {
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  // Demo KYC status — change to 'not_started' to see the prompt
  const kycStatus = 'approved' as const;

  if (!isAuthenticated) {
    navigate('/auth');
    return null;
  }

  const navigation = [
    { name: 'Overview', href: '/dashboard', icon: LayoutDashboard },
    { name: 'My Listings', href: '/dashboard/my-listings', icon: Car, badge: '2' },
    { name: 'My Bids', href: '/dashboard/my-bids', icon: Gavel, badge: '2' },
    { name: 'Watchlist', href: '/dashboard/watchlist', icon: Heart, badge: '4' },
    { name: 'Settings', href: '/dashboard/settings', icon: Settings },
  ];

  const isActive = (path: string) => {
    if (path === '/dashboard') return location.pathname === path;
    return location.pathname.startsWith(path);
  };

  const stats = [
    { label: 'Active Listings', value: '2', icon: Car, color: 'text-primary', href: '/dashboard/my-listings' },
    { label: 'Active Bids', value: '2', icon: Gavel, color: 'text-success', href: '/dashboard/my-bids' },
    { label: 'Won Auctions', value: '1', icon: TrendingUp, color: 'text-gold', href: '/dashboard/my-bids' },
    { label: 'Watchlist', value: '4', icon: Heart, color: 'text-accent', href: '/dashboard/watchlist' },
  ];

  const recentActivity = [
    { icon: Gavel, bg: 'bg-success/20', iconColor: 'text-success', label: 'Bid placed on 2023 BMW X7', sub: '2 hours ago', value: '$148,000' },
    { icon: Car, bg: 'bg-warning/20', iconColor: 'text-warning', label: 'Listing under review', sub: 'Yesterday', badge: 'Pending' },
    { icon: Shield, bg: 'bg-primary/20', iconColor: 'text-primary', label: 'KYC verification approved', sub: '3 days ago', value: '✓ Verified' },
    { icon: Heart, bg: 'bg-accent/20', iconColor: 'text-accent', label: 'Added Porsche Cayenne to watchlist', sub: '4 days ago' },
    { icon: Bell, bg: 'bg-destructive/20', iconColor: 'text-destructive', label: 'You were outbid on Mercedes G63', sub: '5 days ago', badge: 'Outbid' },
  ];

  const DashboardOverview = () => (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-display font-bold mb-1">
            Welcome back, {user?.name?.split(' ')[0]}! 👋
          </h1>
          <p className="text-muted-foreground">Here's what's happening with your account</p>
        </div>
        <Link to="/sell">
          <Button className="btn-premium gap-2">
            <Plus className="w-4 h-4" /> Sell a Car
          </Button>
        </Link>
      </div>

      <KYCStatusBanner status={kycStatus} />

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, i) => (
          <Link key={i} to={stat.href}>
            <div className="card-premium p-5 hover:border-primary/30 transition-all cursor-pointer">
              <stat.icon className={`w-5 h-5 ${stat.color} mb-2`} />
              <p className="text-3xl font-display font-bold text-gold-gradient mb-0.5">{stat.value}</p>
              <p className="text-xs text-muted-foreground">{stat.label}</p>
            </div>
          </Link>
        ))}
      </div>

      {/* Quick links */}
      <div className="grid sm:grid-cols-3 gap-3">
        <Link to="/auctions">
          <div className="card-premium p-4 hover:border-primary/30 transition-all flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
              <Gavel className="w-5 h-5 text-primary" />
            </div>
            <div>
              <p className="font-medium text-sm">Browse Auctions</p>
              <p className="text-xs text-muted-foreground">Find your next car</p>
            </div>
            <ChevronRight className="w-4 h-4 text-muted-foreground ml-auto" />
          </div>
        </Link>
        <Link to="/sell">
          <div className="card-premium p-4 hover:border-primary/30 transition-all flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-lg bg-success/10 flex items-center justify-center group-hover:bg-success/20 transition-colors">
              <Car className="w-5 h-5 text-success" />
            </div>
            <div>
              <p className="font-medium text-sm">List a Vehicle</p>
              <p className="text-xs text-muted-foreground">Start an auction</p>
            </div>
            <ChevronRight className="w-4 h-4 text-muted-foreground ml-auto" />
          </div>
        </Link>
        <Link to="/kyc">
          <div className="card-premium p-4 hover:border-primary/30 transition-all flex items-center gap-3 group">
            <div className={`w-10 h-10 rounded-lg flex items-center justify-center transition-colors ${kycStatus === 'approved' ? 'bg-success/10 group-hover:bg-success/20' : 'bg-warning/10 group-hover:bg-warning/20'}`}>
              <Shield className={`w-5 h-5 ${kycStatus === 'approved' ? 'text-success' : 'text-warning'}`} />
            </div>
            <div>
              <p className="font-medium text-sm">KYC Status</p>
              <p className={`text-xs font-medium ${kycStatus === 'approved' ? 'text-success' : 'text-warning'}`}>
                {kycStatus === 'approved' ? '✓ Verified' : 'Not Verified'}
              </p>
            </div>
            <ChevronRight className="w-4 h-4 text-muted-foreground ml-auto" />
          </div>
        </Link>
      </div>

      {/* Recent Activity */}
      <div className="card-premium p-6">
        <h2 className="font-display font-semibold text-lg mb-4">Recent Activity</h2>
        <div className="space-y-3">
          {recentActivity.map((item, i) => (
            <div key={i} className="flex items-center gap-4 p-3 rounded-xl bg-muted/30 hover:bg-muted/50 transition-colors">
              <div className={`w-10 h-10 rounded-full ${item.bg} flex items-center justify-center shrink-0`}>
                <item.icon className={`w-5 h-5 ${item.iconColor}`} />
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-medium text-sm truncate">{item.label}</p>
                <p className="text-xs text-muted-foreground">{item.sub}</p>
              </div>
              {item.value && <span className="text-sm font-semibold shrink-0">{item.value}</span>}
              {item.badge && (
                <Badge variant="secondary" className="text-xs shrink-0">{item.badge}</Badge>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          <aside className="lg:w-64 shrink-0">
            <div className="card-premium p-4 lg:sticky lg:top-24">
              <div className="flex items-center gap-3 p-3 mb-4 rounded-xl bg-muted/30">
                <div className="w-12 h-12 rounded-full bg-gradient-gold flex items-center justify-center shrink-0">
                  {user?.avatar ? (
                    <img src={user.avatar} alt={user.name} className="w-12 h-12 rounded-full" />
                  ) : (
                    <User className="w-6 h-6 text-primary-foreground" />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-semibold truncate text-sm">{user?.name}</p>
                  <p className="text-xs text-muted-foreground truncate">{user?.email}</p>
                  {kycStatus === 'approved' && (
                    <span className="text-xs text-success flex items-center gap-1 mt-0.5">
                      <Shield className="w-3 h-3" /> Verified
                    </span>
                  )}
                </div>
              </div>
              <nav className="space-y-1">
                {navigation.map((item) => (
                  <Link key={item.name} to={item.href}
                    className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                      isActive(item.href) ? 'bg-primary/10 text-primary' : 'text-muted-foreground hover:bg-muted/50 hover:text-foreground'
                    }`}>
                    <item.icon className="w-5 h-5" />
                    <span className="flex-1">{item.name}</span>
                    {item.badge && (
                      <Badge className="bg-primary/20 text-primary border-primary/20 text-xs px-1.5 h-5">{item.badge}</Badge>
                    )}
                    {isActive(item.href) && !item.badge && <ChevronRight className="w-4 h-4 ml-auto" />}
                  </Link>
                ))}
              </nav>
            </div>
          </aside>
          <main className="flex-1 min-w-0">
            {location.pathname === '/dashboard' ? <DashboardOverview /> : <Outlet />}
          </main>
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;
