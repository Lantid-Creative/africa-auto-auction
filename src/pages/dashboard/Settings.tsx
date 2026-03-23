import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useAuth } from '@/hooks/useAuth';
import { Link } from 'react-router-dom';
import { 
  User, Bell, Shield, LogOut, CheckCircle2, Clock, XCircle, 
  AlertCircle, CreditCard, Camera, ChevronRight, Phone, MapPin
} from 'lucide-react';
import { toast } from 'sonner';

type KYCStatus = 'not_started' | 'pending' | 'approved' | 'rejected';

const UserSettings = () => {
  const { user, logout } = useAuth();
  const kycStatus: KYCStatus = 'approved'; // Demo value
  
  const [profileForm, setProfileForm] = useState({
    firstName: user?.name?.split(' ')[0] || '',
    lastName: user?.name?.split(' ')[1] || '',
    phone: '+234 800 123 4567',
    state: 'Lagos',
    lga: 'Ikeja',
  });

  const [notifications, setNotifications] = useState({
    bidUpdates: true,
    auctionEnding: true,
    outbidAlerts: true,
    winNotifications: true,
    listingApproval: true,
    newListings: false,
    marketing: false,
    weeklyDigest: true,
  });

  const [currency, setCurrency] = useState('USD');
  const [language, setLanguage] = useState('en');

  const handleSave = () => toast.success('Settings saved successfully');

  const kycConfig = {
    not_started: {
      icon: AlertCircle, color: 'text-warning', bg: 'bg-warning/10 border-warning/30',
      label: 'Not Started', desc: 'Complete KYC to unlock bidding and listing features.',
      action: <Link to="/kyc"><Button size="sm" className="btn-premium text-xs">Start KYC</Button></Link>,
    },
    pending: {
      icon: Clock, color: 'text-primary', bg: 'bg-primary/10 border-primary/30',
      label: 'Under Review', desc: 'Your documents are being reviewed. Typically 24–48 hours.',
      action: null,
    },
    approved: {
      icon: CheckCircle2, color: 'text-success', bg: 'bg-success/10 border-success/30',
      label: 'Verified', desc: 'Your identity has been verified. All features are unlocked.',
      action: null,
    },
    rejected: {
      icon: XCircle, color: 'text-destructive', bg: 'bg-destructive/10 border-destructive/30',
      label: 'Rejected', desc: 'Your verification was rejected. Please resubmit with clearer documents.',
      action: <Link to="/kyc"><Button size="sm" variant="destructive" className="text-xs">Resubmit</Button></Link>,
    },
  };

  const kyc = kycConfig[kycStatus];
  const KYCIcon = kyc.icon;

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-display font-bold mb-1">Settings</h1>
        <p className="text-muted-foreground">Manage your account preferences and security</p>
      </div>

      {/* Profile Card */}
      <div className="card-premium p-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
            <User className="w-5 h-5 text-primary" />
          </div>
          <h2 className="font-display font-semibold">Profile Information</h2>
        </div>

        {/* Avatar */}
        <div className="flex items-center gap-4 mb-6">
          <div className="relative">
            <div className="w-20 h-20 rounded-full bg-gradient-gold flex items-center justify-center text-primary-foreground text-2xl font-bold">
              {user?.name?.[0] || 'U'}
            </div>
            <button className="absolute -bottom-1 -right-1 w-7 h-7 rounded-full bg-primary flex items-center justify-center shadow-md">
              <Camera className="w-3.5 h-3.5 text-primary-foreground" />
            </button>
          </div>
          <div>
            <p className="font-semibold">{user?.name}</p>
            <p className="text-sm text-muted-foreground">{user?.email}</p>
            <p className="text-xs text-muted-foreground mt-0.5">Signed in with {user?.provider === 'google' ? 'Google' : 'Apple'}</p>
          </div>
        </div>

        <div className="space-y-4">
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>First Name</Label>
              <Input value={profileForm.firstName} onChange={e => setProfileForm(p => ({ ...p, firstName: e.target.value }))} className="input-premium" />
            </div>
            <div className="space-y-2">
              <Label>Last Name</Label>
              <Input value={profileForm.lastName} onChange={e => setProfileForm(p => ({ ...p, lastName: e.target.value }))} className="input-premium" />
            </div>
          </div>
          <div className="space-y-2">
            <Label>Email</Label>
            <Input value={user?.email} disabled className="input-premium opacity-60" />
            <p className="text-xs text-muted-foreground">Email is managed by your {user?.provider === 'google' ? 'Google' : 'Apple'} account</p>
          </div>
          <div className="space-y-2">
            <Label>Phone Number</Label>
            <div className="flex gap-2">
              <div className="flex items-center px-3 rounded-md border border-input bg-muted/30 text-sm text-muted-foreground shrink-0">
                🇳🇬 +234
              </div>
              <Input value={profileForm.phone.replace('+234 ', '')} onChange={e => setProfileForm(p => ({ ...p, phone: e.target.value }))} className="input-premium flex-1" />
            </div>
          </div>
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>State</Label>
              <Input value={profileForm.state} onChange={e => setProfileForm(p => ({ ...p, state: e.target.value }))} className="input-premium" placeholder="e.g., Lagos" />
            </div>
            <div className="space-y-2">
              <Label>LGA</Label>
              <Input value={profileForm.lga} onChange={e => setProfileForm(p => ({ ...p, lga: e.target.value }))} className="input-premium" placeholder="e.g., Ikeja" />
            </div>
          </div>
          <Button onClick={handleSave} className="btn-premium">Save Changes</Button>
        </div>
      </div>

      {/* KYC Status */}
      <div className="card-premium p-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
            <Shield className="w-5 h-5 text-primary" />
          </div>
          <h2 className="font-display font-semibold">Identity Verification (KYC)</h2>
        </div>
        <div className={`flex items-start gap-3 p-4 rounded-xl border ${kyc.bg}`}>
          <KYCIcon className={`w-5 h-5 shrink-0 mt-0.5 ${kyc.color}`} />
          <div className="flex-1">
            <p className={`font-medium text-sm ${kyc.color}`}>{kyc.label}</p>
            <p className="text-xs text-muted-foreground mt-0.5">{kyc.desc}</p>
          </div>
          {kyc.action}
        </div>
      </div>

      {/* Preferences */}
      <div className="card-premium p-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
            <CreditCard className="w-5 h-5 text-primary" />
          </div>
          <h2 className="font-display font-semibold">Preferences</h2>
        </div>
        <div className="grid sm:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label>Display Currency</Label>
            <Select value={currency} onValueChange={setCurrency}>
              <SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="USD">USD — US Dollar</SelectItem>
                <SelectItem value="NGN">NGN — Nigerian Naira</SelectItem>
                <SelectItem value="KES">KES — Kenyan Shilling</SelectItem>
                <SelectItem value="GHS">GHS — Ghanaian Cedi</SelectItem>
                <SelectItem value="ZAR">ZAR — South African Rand</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label>Language</Label>
            <Select value={language} onValueChange={setLanguage}>
              <SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="en">English</SelectItem>
                <SelectItem value="fr">Français</SelectItem>
                <SelectItem value="sw">Kiswahili</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      {/* Notifications */}
      <div className="card-premium p-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
            <Bell className="w-5 h-5 text-primary" />
          </div>
          <h2 className="font-display font-semibold">Notifications</h2>
        </div>
        <div className="space-y-4">
          {[
            { key: 'bidUpdates', label: 'Bid Updates', desc: 'When someone bids on your listings' },
            { key: 'auctionEnding', label: 'Auction Ending Alerts', desc: 'Reminders when watched auctions are closing soon' },
            { key: 'outbidAlerts', label: 'Outbid Alerts', desc: 'Instantly notified when you\'ve been outbid' },
            { key: 'winNotifications', label: 'Win Notifications', desc: 'When you win an auction' },
            { key: 'listingApproval', label: 'Listing Status', desc: 'When your listing is approved or rejected' },
            { key: 'newListings', label: 'New Matching Listings', desc: 'New vehicles matching your search criteria' },
            { key: 'weeklyDigest', label: 'Weekly Digest', desc: 'Weekly summary of platform activity' },
            { key: 'marketing', label: 'Promotions & Offers', desc: 'Special deals, promotions and platform news' },
          ].map(item => (
            <div key={item.key} className="flex items-center justify-between py-1">
              <div>
                <p className="font-medium text-sm">{item.label}</p>
                <p className="text-xs text-muted-foreground">{item.desc}</p>
              </div>
              <Switch
                checked={notifications[item.key as keyof typeof notifications]}
                onCheckedChange={checked => setNotifications(prev => ({ ...prev, [item.key]: checked }))}
              />
            </div>
          ))}
        </div>
        <Button onClick={handleSave} className="btn-premium mt-4">Save Preferences</Button>
      </div>

      {/* Security */}
      <div className="card-premium p-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
            <Shield className="w-5 h-5 text-primary" />
          </div>
          <h2 className="font-display font-semibold">Security</h2>
        </div>
        <div className="space-y-3">
          <div className="flex items-center justify-between p-4 rounded-xl bg-muted/30 border border-border/50">
            <div>
              <p className="font-medium text-sm">Authentication Method</p>
              <p className="text-xs text-muted-foreground mt-0.5">
                Signed in with {user?.provider === 'google' ? '🔵 Google' : '⚫ Apple'}
              </p>
            </div>
            <Badge variant="secondary" className="text-xs">Active</Badge>
          </div>
          <div className="flex items-center justify-between p-4 rounded-xl bg-muted/30 border border-border/50">
            <div>
              <p className="font-medium text-sm">Two-Factor Authentication</p>
              <p className="text-xs text-muted-foreground mt-0.5">Add an extra layer of security</p>
            </div>
            <Button variant="outline" size="sm" className="text-xs">Enable</Button>
          </div>
          <div className="flex items-center justify-between p-4 rounded-xl bg-muted/30 border border-border/50">
            <div>
              <p className="font-medium text-sm">Active Sessions</p>
              <p className="text-xs text-muted-foreground mt-0.5">1 active session</p>
            </div>
            <Button variant="outline" size="sm" className="text-xs">Manage</Button>
          </div>
        </div>
      </div>

      {/* Danger Zone */}
      <div className="card-premium p-6 border-destructive/20">
        <h2 className="font-display font-semibold text-destructive mb-4">Danger Zone</h2>
        <div className="space-y-3">
          <div className="flex items-center justify-between p-4 rounded-xl bg-muted/20">
            <div>
              <p className="font-medium text-sm">Sign Out</p>
              <p className="text-xs text-muted-foreground">Sign out of this device</p>
            </div>
            <Button variant="outline" onClick={logout} className="gap-1.5 text-sm">
              <LogOut className="w-4 h-4" /> Sign Out
            </Button>
          </div>
          <div className="flex items-center justify-between p-4 rounded-xl bg-destructive/5 border border-destructive/20">
            <div>
              <p className="font-medium text-sm text-destructive">Delete Account</p>
              <p className="text-xs text-muted-foreground">Permanently delete your account and all data</p>
            </div>
            <Button variant="destructive" size="sm" className="text-xs">Delete</Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserSettings;
