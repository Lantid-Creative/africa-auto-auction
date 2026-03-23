import { useState } from 'react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  Legend,
} from 'recharts';
import { TrendingUp, TrendingDown, DollarSign, Car, Users, Gavel } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const revenueData = [
  { month: 'Jan', revenue: 420000, auctions: 34 },
  { month: 'Feb', revenue: 380000, auctions: 29 },
  { month: 'Mar', revenue: 510000, auctions: 41 },
  { month: 'Apr', revenue: 640000, auctions: 52 },
  { month: 'May', revenue: 590000, auctions: 47 },
  { month: 'Jun', revenue: 720000, auctions: 58 },
  { month: 'Jul', revenue: 810000, auctions: 65 },
  { month: 'Aug', revenue: 760000, auctions: 61 },
  { month: 'Sep', revenue: 920000, auctions: 74 },
  { month: 'Oct', revenue: 1050000, auctions: 84 },
  { month: 'Nov', revenue: 1180000, auctions: 95 },
  { month: 'Dec', revenue: 1350000, auctions: 108 },
];

const userGrowthData = [
  { month: 'Jan', users: 1200, kyc: 840 },
  { month: 'Feb', users: 1580, kyc: 1100 },
  { month: 'Mar', users: 2100, kyc: 1500 },
  { month: 'Apr', users: 2700, kyc: 1950 },
  { month: 'May', users: 3300, kyc: 2400 },
  { month: 'Jun', users: 3900, kyc: 2900 },
  { month: 'Jul', users: 4500, kyc: 3380 },
  { month: 'Aug', users: 5100, kyc: 3850 },
  { month: 'Sep', users: 5700, kyc: 4300 },
  { month: 'Oct', users: 6400, kyc: 4850 },
  { month: 'Nov', users: 7100, kyc: 5400 },
  { month: 'Dec', users: 7800, kyc: 5950 },
];

const categoryData = [
  { name: 'SUV', value: 38, color: 'hsl(var(--primary))' },
  { name: 'Sedan', value: 24, color: 'hsl(var(--accent))' },
  { name: 'Truck', value: 18, color: '#22c55e' },
  { name: 'Coupe', value: 12, color: '#f59e0b' },
  { name: 'Other', value: 8, color: '#8b5cf6' },
];

const topCountries = [
  { country: 'Nigeria', flag: '🇳🇬', sales: 412, revenue: '$4.2M' },
  { country: 'South Africa', flag: '🇿🇦', sales: 287, revenue: '$3.1M' },
  { country: 'Kenya', flag: '🇰🇪', sales: 198, revenue: '$1.9M' },
  { country: 'Ghana', flag: '🇬🇭', sales: 156, revenue: '$1.4M' },
  { country: 'Egypt', flag: '🇪🇬', sales: 124, revenue: '$1.1M' },
];

const kpiCards = [
  { label: 'Total Revenue', value: '$11.3M', change: '+22.4%', up: true, icon: DollarSign },
  { label: 'Auctions Run', value: '748', change: '+18.7%', up: true, icon: Gavel },
  { label: 'Active Users', value: '7,800', change: '+31.2%', up: true, icon: Users },
  { label: 'Avg. Sale Price', value: '$68,400', change: '-3.1%', up: false, icon: Car },
];

const AdminAnalytics = () => {
  const [period, setPeriod] = useState('year');

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-display font-bold mb-1">Analytics</h1>
          <p className="text-muted-foreground">Platform performance overview</p>
        </div>
        <Select value={period} onValueChange={setPeriod}>
          <SelectTrigger className="w-[140px]"><SelectValue /></SelectTrigger>
          <SelectContent>
            <SelectItem value="week">This Week</SelectItem>
            <SelectItem value="month">This Month</SelectItem>
            <SelectItem value="quarter">This Quarter</SelectItem>
            <SelectItem value="year">This Year</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {kpiCards.map((kpi, i) => (
          <div key={i} className="card-premium p-5">
            <div className="flex items-center justify-between mb-3">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                <kpi.icon className="w-5 h-5 text-primary" />
              </div>
              <span className={`flex items-center gap-1 text-xs font-medium ${kpi.up ? 'text-success' : 'text-destructive'}`}>
                {kpi.up ? <TrendingUp className="w-3.5 h-3.5" /> : <TrendingDown className="w-3.5 h-3.5" />}
                {kpi.change}
              </span>
            </div>
            <p className="text-2xl font-display font-bold">{kpi.value}</p>
            <p className="text-xs text-muted-foreground mt-0.5">{kpi.label}</p>
          </div>
        ))}
      </div>

      {/* Revenue Chart */}
      <div className="card-premium p-6">
        <h2 className="font-display font-semibold mb-4">Revenue & Auctions</h2>
        <ResponsiveContainer width="100%" height={280}>
          <AreaChart data={revenueData} margin={{ top: 5, right: 10, left: 0, bottom: 5 }}>
            <defs>
              <linearGradient id="revenueGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.3} />
                <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" opacity={0.3} />
            <XAxis dataKey="month" tick={{ fontSize: 12, fill: 'hsl(var(--muted-foreground))' }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fontSize: 11, fill: 'hsl(var(--muted-foreground))' }} axisLine={false} tickLine={false}
              tickFormatter={v => `$${(v / 1000).toFixed(0)}k`} />
            <Tooltip
              contentStyle={{ background: 'hsl(var(--card))', border: '1px solid hsl(var(--border))', borderRadius: 8, fontSize: 12 }}
              formatter={(v: number, name: string) => [name === 'revenue' ? `$${v.toLocaleString()}` : v, name === 'revenue' ? 'Revenue' : 'Auctions']}
            />
            <Area type="monotone" dataKey="revenue" stroke="hsl(var(--primary))" fill="url(#revenueGrad)" strokeWidth={2} />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* User Growth */}
        <div className="card-premium p-6">
          <h2 className="font-display font-semibold mb-4">User Growth vs KYC Completions</h2>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={userGrowthData} margin={{ top: 5, right: 10, left: 0, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" opacity={0.3} />
              <XAxis dataKey="month" tick={{ fontSize: 11, fill: 'hsl(var(--muted-foreground))' }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11, fill: 'hsl(var(--muted-foreground))' }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={{ background: 'hsl(var(--card))', border: '1px solid hsl(var(--border))', borderRadius: 8, fontSize: 12 }} />
              <Legend wrapperStyle={{ fontSize: 12 }} />
              <Bar dataKey="users" name="Total Users" fill="hsl(var(--primary))" opacity={0.8} radius={[3, 3, 0, 0]} />
              <Bar dataKey="kyc" name="KYC Verified" fill="hsl(var(--accent))" opacity={0.8} radius={[3, 3, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Vehicle Category Distribution */}
        <div className="card-premium p-6">
          <h2 className="font-display font-semibold mb-4">Vehicle Categories</h2>
          <ResponsiveContainer width="100%" height={220}>
            <PieChart>
              <Pie data={categoryData} cx="50%" cy="50%" innerRadius={55} outerRadius={90}
                dataKey="value" paddingAngle={3}>
                {categoryData.map((entry, index) => (
                  <Cell key={index} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip contentStyle={{ background: 'hsl(var(--card))', border: '1px solid hsl(var(--border))', borderRadius: 8, fontSize: 12 }}
                formatter={(v: number) => [`${v}%`, 'Share']} />
              <Legend wrapperStyle={{ fontSize: 12 }} formatter={(value, entry: any) => `${value} (${entry.payload.value}%)`} />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Top Countries */}
      <div className="card-premium p-6">
        <h2 className="font-display font-semibold mb-4">Sales by Country</h2>
        <div className="space-y-3">
          {topCountries.map((country, i) => {
            const maxSales = topCountries[0].sales;
            const pct = (country.sales / maxSales) * 100;
            return (
              <div key={i} className="flex items-center gap-4">
                <span className="text-xl w-8 shrink-0">{country.flag}</span>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm font-medium">{country.country}</span>
                    <span className="text-xs text-muted-foreground">{country.sales} sales · {country.revenue}</span>
                  </div>
                  <div className="h-2 rounded-full bg-muted/50">
                    <div className="h-full rounded-full bg-gradient-to-r from-primary to-accent" style={{ width: `${pct}%` }} />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default AdminAnalytics;
