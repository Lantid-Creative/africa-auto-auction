import { Link, useNavigate, Outlet, useLocation } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/hooks/useAuth';
import { 
  LayoutDashboard, 
  Car, 
  Users, 
  CheckCircle2,
  Clock,
  Shield,
  BarChart3,
  DollarSign,
  Gavel,
} from 'lucide-react';

const mockPendingListings = [
  { id: '1', title: '2022 Range Rover Sport', user: 'John Doe', submittedAt: '2 hours ago', image: 'https://images.unsplash.com/photo-1606664666892-95c3e7ad0a3c?w=400' },
  { id: '2', title: '2023 Toyota Hilux', user: 'Sarah M.', submittedAt: '5 hours ago', image: 'https://images.unsplash.com/photo-1594502184342-2e12f877aa73?w=400' },
  { id: '3', title: '2021 BMW X5', user: 'Michael K.', submittedAt: '1 day ago', image: 'https://images.unsplash.com/photo-1555215695-3004980ad54e?w=400' },
];

const mockKYCPending = [
  { id: 'kyc-1', name: 'Adewale Okafor', state: 'Lagos', submittedAt: '2 hours ago', selfie: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80' },
  { id: 'kyc-2', name: 'Chidinma Obi', state: 'Rivers', submittedAt: '5 hours ago', selfie: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=80' },
  { id: 'kyc-5', name: 'Babatunde Fashola', state: 'Ogun', submittedAt: '3 days ago', selfie: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=80' },
];

const AdminDashboard = () => {
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  if (!isAuthenticated || user?.role !== 'admin') {
    navigate('/');
    return null;
  }

  const navigation = [
    { name: 'Overview', href: '/admin', icon: LayoutDashboard },
    { name: 'Pending Reviews', href: '/admin/pending', icon: Clock, badge: '12' },
    { name: 'KYC Reviews', href: '/admin/kyc', icon: Shield, badge: '3' },
    { name: 'Analytics', href: '/admin/analytics', icon: BarChart3 },
    { name: 'All Listings', href: '/admin/listings', icon: Car },
    { name: 'Users', href: '/admin/users', icon: Users },
  ];

  const isActive = (path: string) => path === '/admin' ? location.pathname === path : location.pathname.startsWith(path);

  const stats = [
    { label: 'Pending Reviews', value: '12', icon: Clock, color: 'text-warning', bg: 'bg-warning/10', href: '/admin/pending' },
    { label: 'KYC Pending', value: '3', icon: Shield, color: 'text-primary', bg: 'bg-primary/10', href: '/admin/kyc' },
    { label: 'Live Auctions', value: '45', icon: Gavel, color: 'text-success', bg: 'bg-success/10', href: '/admin/listings' },
    { label: 'Total Users', value: '7,800', icon: Users, color: 'text-accent', bg: 'bg-accent/10', href: '/admin/users' },
  ];

  const AdminOverview = () => (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-display font-bold mb-1">Admin Dashboard</h1>
        <p className="text-muted-foreground">Welcome back, {user?.name}</p>
      </div>
      
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, i) => (
          <Link key={i} to={stat.href}>
            <div className="card-premium p-5 hover:border-primary/30 transition-all cursor-pointer group">
              <div className={`w-10 h-10 rounded-lg ${stat.bg} flex items-center justify-center mb-3 group-hover:scale-110 transition-transform`}>
                <stat.icon className={`w-5 h-5 ${stat.color}`} />
              </div>
              <p className="text-3xl font-display font-bold">{stat.value}</p>
              <p className="text-sm text-muted-foreground">{stat.label}</p>
            </div>
          </Link>
        ))}
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <div className="card-premium p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-display font-semibold">Pending Car Reviews</h2>
            <Link to="/admin/pending"><Button variant="outline" size="sm">View All</Button></Link>
          </div>
          <div className="space-y-3">
            {mockPendingListings.map((listing) => (
              <div key={listing.id} className="flex items-center gap-3 p-3 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors">
                <img src={listing.image} alt="" className="w-14 h-10 rounded object-cover shrink-0" />
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-sm truncate">{listing.title}</p>
                  <p className="text-xs text-muted-foreground">by {listing.user} · {listing.submittedAt}</p>
                </div>
                <Link to={`/admin/review/${listing.id}`}>
                  <Button size="sm" className="btn-premium text-xs">Review</Button>
                </Link>
              </div>
            ))}
          </div>
        </div>

        <div className="card-premium p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-display font-semibold">KYC Applications</h2>
            <Link to="/admin/kyc"><Button variant="outline" size="sm">View All</Button></Link>
          </div>
          <div className="space-y-3">
            {mockKYCPending.map((app) => (
              <div key={app.id} className="flex items-center gap-3 p-3 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors">
                <img src={app.selfie} alt="" className="w-10 h-10 rounded-full object-cover shrink-0" />
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-sm">{app.name}</p>
                  <p className="text-xs text-muted-foreground">{app.state} · {app.submittedAt}</p>
                </div>
                <Link to="/admin/kyc">
                  <Button size="sm" variant="outline" className="text-xs gap-1">
                    <Shield className="w-3 h-3" /> Review
                  </Button>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid sm:grid-cols-3 gap-4">
        {[
          { label: 'Revenue This Month', value: '$1.35M', icon: DollarSign, change: '+12.4%', up: true },
          { label: 'Auctions This Month', value: '108', icon: Gavel, change: '+8.7%', up: true },
          { label: 'Avg. Bid Amount', value: '$68,400', icon: Car, change: '-2.1%', up: false },
        ].map((item, i) => (
          <div key={i} className="card-premium p-5">
            <div className="flex items-center justify-between mb-2">
              <item.icon className="w-5 h-5 text-primary" />
              <span className={`text-xs font-medium ${item.up ? 'text-success' : 'text-destructive'}`}>{item.change}</span>
            </div>
            <p className="text-2xl font-display font-bold">{item.value}</p>
            <p className="text-xs text-muted-foreground">{item.label}</p>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          <aside className="lg:w-64 shrink-0">
            <div className="card-premium p-4 lg:sticky lg:top-24">
              <div className="p-3 mb-4 rounded-lg bg-gradient-gold text-center">
                <p className="font-bold text-primary-foreground text-sm">Admin Panel</p>
              </div>
              <nav className="space-y-1">
                {navigation.map((item) => (
                  <Link key={item.name} to={item.href}
                    className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                      isActive(item.href) ? 'bg-primary/10 text-primary' : 'text-muted-foreground hover:bg-muted/50'
                    }`}>
                    <item.icon className="w-5 h-5" />
                    <span className="flex-1">{item.name}</span>
                    {item.badge && (
                      <Badge className="bg-warning/20 text-warning border-warning/30 text-xs px-1.5">{item.badge}</Badge>
                    )}
                  </Link>
                ))}
              </nav>
            </div>
          </aside>
          <main className="flex-1 min-w-0">
            {location.pathname === '/admin' ? <AdminOverview /> : <Outlet />}
          </main>
        </div>
      </div>
    </Layout>
  );
};

export default AdminDashboard;
