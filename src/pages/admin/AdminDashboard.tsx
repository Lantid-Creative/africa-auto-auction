import { useState } from 'react';
import { Link, useNavigate, Outlet, useLocation } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/hooks/useAuth';
import { 
  LayoutDashboard, 
  Car, 
  Users, 
  Settings,
  CheckCircle2,
  XCircle,
  Clock,
  Eye,
  ChevronRight
} from 'lucide-react';

const mockPendingListings = [
  { id: '1', title: '2022 Range Rover Sport', user: 'John Doe', submittedAt: '2 hours ago', image: 'https://images.unsplash.com/photo-1606664666892-95c3e7ad0a3c?w=400' },
  { id: '2', title: '2023 Toyota Hilux', user: 'Sarah M.', submittedAt: '5 hours ago', image: 'https://images.unsplash.com/photo-1594502184342-2e12f877aa73?w=400' },
  { id: '3', title: '2021 BMW X5', user: 'Michael K.', submittedAt: '1 day ago', image: 'https://images.unsplash.com/photo-1555215695-3004980ad54e?w=400' },
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
    { name: 'Pending Reviews', href: '/admin/pending', icon: Clock },
    { name: 'All Listings', href: '/admin/listings', icon: Car },
    { name: 'Users', href: '/admin/users', icon: Users },
  ];

  const isActive = (path: string) => path === '/admin' ? location.pathname === path : location.pathname.startsWith(path);

  const stats = [
    { label: 'Pending Reviews', value: '12', icon: Clock, color: 'text-warning' },
    { label: 'Live Auctions', value: '45', icon: Car, color: 'text-success' },
    { label: 'Total Users', value: '2,847', icon: Users, color: 'text-primary' },
    { label: 'This Month Sales', value: '$1.2M', icon: CheckCircle2, color: 'text-gold' },
  ];

  const AdminOverview = () => (
    <div className="space-y-8">
      <h1 className="text-2xl font-display font-bold">Admin Dashboard</h1>
      
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, i) => (
          <div key={i} className="card-premium p-6">
            <stat.icon className={`w-6 h-6 ${stat.color} mb-2`} />
            <p className="text-3xl font-display font-bold">{stat.value}</p>
            <p className="text-sm text-muted-foreground">{stat.label}</p>
          </div>
        ))}
      </div>

      <div className="card-premium p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-display font-semibold text-lg">Pending Reviews</h2>
          <Link to="/admin/pending"><Button variant="outline" size="sm">View All</Button></Link>
        </div>
        <div className="space-y-3">
          {mockPendingListings.map((listing) => (
            <div key={listing.id} className="flex items-center gap-4 p-3 rounded-lg bg-muted/30">
              <img src={listing.image} alt="" className="w-16 h-12 rounded object-cover" />
              <div className="flex-1 min-w-0">
                <p className="font-medium truncate">{listing.title}</p>
                <p className="text-xs text-muted-foreground">by {listing.user} • {listing.submittedAt}</p>
              </div>
              <Link to={`/admin/review/${listing.id}`}>
                <Button size="sm" className="btn-premium">Review</Button>
              </Link>
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
              <div className="p-3 mb-4 rounded-lg bg-primary/10 text-center">
                <p className="font-semibold text-primary">Admin Panel</p>
              </div>
              <nav className="space-y-1">
                {navigation.map((item) => (
                  <Link key={item.name} to={item.href}
                    className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                      isActive(item.href) ? 'bg-primary/10 text-primary' : 'text-muted-foreground hover:bg-muted/50'
                    }`}>
                    <item.icon className="w-5 h-5" />
                    {item.name}
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
