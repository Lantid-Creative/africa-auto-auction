import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { useAuth } from '@/hooks/useAuth';
import { User, Bell, Shield, LogOut } from 'lucide-react';
import { toast } from 'sonner';

const UserSettings = () => {
  const { user, logout } = useAuth();
  const [notifications, setNotifications] = useState({
    bidUpdates: true,
    auctionEnding: true,
    newListings: false,
    marketing: false,
  });

  const handleSave = () => {
    toast.success('Settings saved successfully');
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-display font-bold mb-1">Settings</h1>
        <p className="text-muted-foreground">Manage your account preferences</p>
      </div>

      {/* Profile Section */}
      <div className="card-premium p-6">
        <div className="flex items-center gap-3 mb-6">
          <User className="w-5 h-5 text-primary" />
          <h2 className="font-display font-semibold">Profile Information</h2>
        </div>
        <div className="space-y-4">
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Full Name</Label>
              <Input defaultValue={user?.name} className="input-premium" />
            </div>
            <div className="space-y-2">
              <Label>Email</Label>
              <Input defaultValue={user?.email} disabled className="input-premium" />
            </div>
          </div>
          <div className="space-y-2">
            <Label>Phone Number</Label>
            <Input placeholder="+234 800 123 4567" className="input-premium" />
          </div>
          <Button onClick={handleSave} className="btn-premium">
            Save Changes
          </Button>
        </div>
      </div>

      {/* Notifications Section */}
      <div className="card-premium p-6">
        <div className="flex items-center gap-3 mb-6">
          <Bell className="w-5 h-5 text-primary" />
          <h2 className="font-display font-semibold">Notifications</h2>
        </div>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Bid Updates</p>
              <p className="text-sm text-muted-foreground">
                Get notified when you're outbid
              </p>
            </div>
            <Switch
              checked={notifications.bidUpdates}
              onCheckedChange={(checked) => setNotifications(prev => ({ ...prev, bidUpdates: checked }))}
            />
          </div>
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Auction Ending</p>
              <p className="text-sm text-muted-foreground">
                Alerts when watched auctions are ending
              </p>
            </div>
            <Switch
              checked={notifications.auctionEnding}
              onCheckedChange={(checked) => setNotifications(prev => ({ ...prev, auctionEnding: checked }))}
            />
          </div>
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">New Listings</p>
              <p className="text-sm text-muted-foreground">
                Notifications for new vehicles matching your interests
              </p>
            </div>
            <Switch
              checked={notifications.newListings}
              onCheckedChange={(checked) => setNotifications(prev => ({ ...prev, newListings: checked }))}
            />
          </div>
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Marketing</p>
              <p className="text-sm text-muted-foreground">
                Promotional emails and offers
              </p>
            </div>
            <Switch
              checked={notifications.marketing}
              onCheckedChange={(checked) => setNotifications(prev => ({ ...prev, marketing: checked }))}
            />
          </div>
        </div>
      </div>

      {/* Security Section */}
      <div className="card-premium p-6">
        <div className="flex items-center gap-3 mb-6">
          <Shield className="w-5 h-5 text-primary" />
          <h2 className="font-display font-semibold">Security</h2>
        </div>
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 rounded-lg bg-muted/30">
            <div>
              <p className="font-medium">Authentication</p>
              <p className="text-sm text-muted-foreground">
                Signed in with {user?.provider === 'google' ? 'Google' : 'Apple'}
              </p>
            </div>
            <Button variant="outline" size="sm">
              Manage
            </Button>
          </div>
        </div>
      </div>

      {/* Danger Zone */}
      <div className="card-premium p-6 border-destructive/30">
        <h2 className="font-display font-semibold text-destructive mb-4">Danger Zone</h2>
        <div className="flex items-center justify-between">
          <div>
            <p className="font-medium">Sign Out</p>
            <p className="text-sm text-muted-foreground">
              Sign out of your account on this device
            </p>
          </div>
          <Button variant="destructive" onClick={logout} className="gap-2">
            <LogOut className="w-4 h-4" />
            Sign Out
          </Button>
        </div>
      </div>
    </div>
  );
};

export default UserSettings;
