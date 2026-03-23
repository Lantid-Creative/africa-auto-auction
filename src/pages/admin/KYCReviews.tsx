import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import {
  Search,
  Shield,
  CheckCircle2,
  XCircle,
  Clock,
  Eye,
  User,
  Phone,
  MapPin,
  CreditCard,
  FileText,
  Camera,
  AlertCircle,
} from 'lucide-react';
import { toast } from 'sonner';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

type KYCStatus = 'pending' | 'approved' | 'rejected';

interface KYCApplication {
  id: string;
  userId: string;
  name: string;
  email: string;
  phone: string;
  state: string;
  lga: string;
  address: string;
  nin: string;
  bvn: string;
  docType: string;
  submittedAt: string;
  status: KYCStatus;
  selfieUrl: string;
  docFrontUrl: string;
  docBackUrl: string;
  rejectionReason?: string;
}

const mockKYCApplications: KYCApplication[] = [
  {
    id: 'kyc-1', userId: 'u1', name: 'Adewale Okafor', email: 'adewale@gmail.com',
    phone: '+234 811 234 5678', state: 'Lagos', lga: 'Ikeja', address: '15 Allen Avenue, Ikeja',
    nin: '***45678901', bvn: '***12345678', docType: "Driver's License",
    submittedAt: '2 hours ago', status: 'pending',
    selfieUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300',
    docFrontUrl: 'https://images.unsplash.com/photo-1633177317976-3f9bc45e1d1d?w=400',
    docBackUrl: 'https://images.unsplash.com/photo-1633177317976-3f9bc45e1d1d?w=400',
  },
  {
    id: 'kyc-2', userId: 'u2', name: 'Chidinma Obi', email: 'chidinma@yahoo.com',
    phone: '+234 802 987 6543', state: 'Rivers', lga: 'Port Harcourt', address: '7 Rumuola Road',
    nin: '***23456789', bvn: '***87654321', docType: 'International Passport',
    submittedAt: '5 hours ago', status: 'pending',
    selfieUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=300',
    docFrontUrl: 'https://images.unsplash.com/photo-1633177317976-3f9bc45e1d1d?w=400',
    docBackUrl: 'https://images.unsplash.com/photo-1633177317976-3f9bc45e1d1d?w=400',
  },
  {
    id: 'kyc-3', userId: 'u3', name: 'Emeka Nwosu', email: 'emeka.nwosu@outlook.com',
    phone: '+234 703 456 7890', state: 'Anambra', lga: 'Onitsha', address: '22 Main Market Road',
    nin: '***34567890', bvn: '***56789012', docType: "Voter's Card (PVC)",
    submittedAt: '1 day ago', status: 'approved',
    selfieUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=300',
    docFrontUrl: 'https://images.unsplash.com/photo-1633177317976-3f9bc45e1d1d?w=400',
    docBackUrl: 'https://images.unsplash.com/photo-1633177317976-3f9bc45e1d1d?w=400',
  },
  {
    id: 'kyc-4', userId: 'u4', name: 'Fatima Al-Hassan', email: 'fatima.hassan@gmail.com',
    phone: '+234 704 321 0987', state: 'Kano', lga: 'Kano Municipal', address: '3 Kofar Mata',
    nin: '***45678012', bvn: '***34567891', docType: 'NIN Slip / e-ID Card',
    submittedAt: '2 days ago', status: 'rejected', rejectionReason: 'Document photo is blurry. Please resubmit with a clearer image of your NIN slip.',
    selfieUrl: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=300',
    docFrontUrl: 'https://images.unsplash.com/photo-1633177317976-3f9bc45e1d1d?w=400',
    docBackUrl: 'https://images.unsplash.com/photo-1633177317976-3f9bc45e1d1d?w=400',
  },
  {
    id: 'kyc-5', userId: 'u5', name: 'Babatunde Fashola', email: 'btunde@gmail.com',
    phone: '+234 816 543 2109', state: 'Ogun', lga: 'Sagamu', address: '44 Sagamu-Ibadan Expressway',
    nin: '***56789123', bvn: '***23456780', docType: "Driver's License",
    submittedAt: '3 days ago', status: 'pending',
    selfieUrl: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300',
    docFrontUrl: 'https://images.unsplash.com/photo-1633177317976-3f9bc45e1d1d?w=400',
    docBackUrl: 'https://images.unsplash.com/photo-1633177317976-3f9bc45e1d1d?w=400',
  },
];

const KYCReviews = () => {
  const [apps, setApps] = useState(mockKYCApplications);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [selected, setSelected] = useState<KYCApplication | null>(null);
  const [rejectionReason, setRejectionReason] = useState('');
  const [showRejectInput, setShowRejectInput] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  const filtered = apps.filter(app => {
    const matchSearch = app.name.toLowerCase().includes(search.toLowerCase()) || app.email.toLowerCase().includes(search.toLowerCase());
    const matchStatus = statusFilter === 'all' || app.status === statusFilter;
    return matchSearch && matchStatus;
  });

  const counts = {
    pending: apps.filter(a => a.status === 'pending').length,
    approved: apps.filter(a => a.status === 'approved').length,
    rejected: apps.filter(a => a.status === 'rejected').length,
  };

  const handleApprove = async (id: string) => {
    setIsProcessing(true);
    await new Promise(r => setTimeout(r, 800));
    setApps(prev => prev.map(a => a.id === id ? { ...a, status: 'approved' as KYCStatus } : a));
    setSelected(null);
    toast.success('KYC application approved. User has been notified.');
    setIsProcessing(false);
  };

  const handleReject = async (id: string) => {
    if (!showRejectInput) { setShowRejectInput(true); return; }
    if (!rejectionReason.trim()) return;
    setIsProcessing(true);
    await new Promise(r => setTimeout(r, 800));
    setApps(prev => prev.map(a => a.id === id ? { ...a, status: 'rejected' as KYCStatus, rejectionReason } : a));
    setSelected(null);
    setShowRejectInput(false);
    setRejectionReason('');
    toast.success('KYC application rejected. User will be notified with the reason.');
    setIsProcessing(false);
  };

  const statusBadge = (status: KYCStatus) => {
    const map = {
      pending: 'bg-warning/20 text-warning border-warning/30',
      approved: 'bg-success/20 text-success border-success/30',
      rejected: 'bg-destructive/20 text-destructive border-destructive/30',
    };
    return <Badge className={`border ${map[status]} capitalize`}>{status}</Badge>;
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-display font-bold mb-1">KYC Reviews</h1>
        <p className="text-muted-foreground">Review and approve identity verification applications</p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-3 gap-4">
        {[
          { label: 'Pending', count: counts.pending, color: 'text-warning', bg: 'bg-warning/10', icon: Clock },
          { label: 'Approved', count: counts.approved, color: 'text-success', bg: 'bg-success/10', icon: CheckCircle2 },
          { label: 'Rejected', count: counts.rejected, color: 'text-destructive', bg: 'bg-destructive/10', icon: XCircle },
        ].map(item => (
          <div key={item.label} className="card-premium p-4 flex items-center gap-3">
            <div className={`w-10 h-10 rounded-lg ${item.bg} flex items-center justify-center`}>
              <item.icon className={`w-5 h-5 ${item.color}`} />
            </div>
            <div>
              <p className="text-2xl font-display font-bold">{item.count}</p>
              <p className="text-xs text-muted-foreground">{item.label}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input placeholder="Search by name or email..." value={search} onChange={e => setSearch(e.target.value)} className="pl-9" />
        </div>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-[160px]"><SelectValue placeholder="Status" /></SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="pending">Pending</SelectItem>
            <SelectItem value="approved">Approved</SelectItem>
            <SelectItem value="rejected">Rejected</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Table */}
      <div className="card-premium overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border/50 text-left">
                <th className="px-4 py-3 text-muted-foreground font-medium">Applicant</th>
                <th className="px-4 py-3 text-muted-foreground font-medium">Location</th>
                <th className="px-4 py-3 text-muted-foreground font-medium">Document</th>
                <th className="px-4 py-3 text-muted-foreground font-medium">Submitted</th>
                <th className="px-4 py-3 text-muted-foreground font-medium">Status</th>
                <th className="px-4 py-3 text-muted-foreground font-medium">Action</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map(app => (
                <tr key={app.id} className="border-b border-border/30 hover:bg-muted/20 transition-colors">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <img src={app.selfieUrl} alt="" className="w-9 h-9 rounded-full object-cover" />
                      <div>
                        <p className="font-medium">{app.name}</p>
                        <p className="text-xs text-muted-foreground">{app.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-muted-foreground">{app.lga}, {app.state}</td>
                  <td className="px-4 py-3">
                    <Badge variant="secondary" className="text-xs">{app.docType}</Badge>
                  </td>
                  <td className="px-4 py-3 text-muted-foreground text-xs">{app.submittedAt}</td>
                  <td className="px-4 py-3">{statusBadge(app.status)}</td>
                  <td className="px-4 py-3">
                    <Button size="sm" variant="outline" className="gap-1.5 text-xs" onClick={() => { setSelected(app); setShowRejectInput(false); setRejectionReason(''); }}>
                      <Eye className="w-3.5 h-3.5" /> Review
                    </Button>
                  </td>
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr>
                  <td colSpan={6} className="text-center py-12 text-muted-foreground">
                    <Shield className="w-10 h-10 mx-auto mb-2 opacity-40" />
                    No applications found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Detail Modal */}
      <Dialog open={!!selected} onOpenChange={open => !open && setSelected(null)}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          {selected && (
            <>
              <DialogHeader>
                <DialogTitle className="flex items-center gap-3">
                  <img src={selected.selfieUrl} alt="" className="w-10 h-10 rounded-full object-cover" />
                  {selected.name} — KYC Review
                </DialogTitle>
              </DialogHeader>

              <div className="space-y-4 mt-2">
                {/* Personal */}
                <div className="p-4 rounded-xl bg-muted/30 space-y-2">
                  <h4 className="font-semibold text-sm flex items-center gap-2"><User className="w-4 h-4 text-primary" /> Personal Details</h4>
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div className="flex items-center gap-1.5 text-muted-foreground"><Phone className="w-3.5 h-3.5" /> {selected.phone}</div>
                    <div className="flex items-center gap-1.5 text-muted-foreground"><MapPin className="w-3.5 h-3.5" /> {selected.lga}, {selected.state}</div>
                    <div className="col-span-2 flex items-center gap-1.5 text-muted-foreground"><MapPin className="w-3.5 h-3.5" /> {selected.address}</div>
                  </div>
                </div>

                {/* NIN/BVN */}
                <div className="p-4 rounded-xl bg-muted/30 space-y-2">
                  <h4 className="font-semibold text-sm flex items-center gap-2"><CreditCard className="w-4 h-4 text-primary" /> Identity Numbers</h4>
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div><span className="text-muted-foreground">NIN:</span> <code className="ml-1">{selected.nin}</code></div>
                    <div><span className="text-muted-foreground">BVN:</span> <code className="ml-1">{selected.bvn}</code></div>
                  </div>
                </div>

                {/* Documents */}
                <div className="p-4 rounded-xl bg-muted/30 space-y-3">
                  <h4 className="font-semibold text-sm flex items-center gap-2"><FileText className="w-4 h-4 text-primary" /> {selected.docType}</h4>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <p className="text-xs text-muted-foreground mb-1.5">Front</p>
                      <img src={selected.docFrontUrl} alt="Front" className="rounded-lg w-full object-cover aspect-video" />
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground mb-1.5">Back</p>
                      <img src={selected.docBackUrl} alt="Back" className="rounded-lg w-full object-cover aspect-video" />
                    </div>
                  </div>
                </div>

                {/* Selfie */}
                <div className="p-4 rounded-xl bg-muted/30 space-y-3">
                  <h4 className="font-semibold text-sm flex items-center gap-2"><Camera className="w-4 h-4 text-primary" /> Selfie</h4>
                  <img src={selected.selfieUrl} alt="Selfie" className="w-32 h-32 rounded-full object-cover mx-auto" />
                </div>

                {/* Previous rejection reason */}
                {selected.status === 'rejected' && selected.rejectionReason && (
                  <div className="p-4 rounded-xl bg-destructive/10 border border-destructive/30">
                    <p className="text-sm font-medium text-destructive mb-1">Previous Rejection Reason:</p>
                    <p className="text-sm text-muted-foreground">{selected.rejectionReason}</p>
                  </div>
                )}

                {/* Rejection input */}
                {showRejectInput && (
                  <div className="space-y-2">
                    <Label>Rejection Reason *</Label>
                    <Textarea value={rejectionReason} onChange={e => setRejectionReason(e.target.value)}
                      placeholder="Explain clearly why this application is rejected so the user can resubmit correctly..."
                      className="min-h-[80px]" />
                  </div>
                )}

                {/* Actions */}
                {selected.status === 'pending' && (
                  <div className="flex gap-3 pt-2">
                    <Button className="flex-1 gap-2 bg-success hover:bg-success/90 text-success-foreground" onClick={() => handleApprove(selected.id)} disabled={isProcessing}>
                      <CheckCircle2 className="w-4 h-4" /> Approve
                    </Button>
                    <Button variant="destructive" className="flex-1 gap-2" onClick={() => handleReject(selected.id)}
                      disabled={isProcessing || (showRejectInput && !rejectionReason.trim())}>
                      <XCircle className="w-4 h-4" /> {showRejectInput ? 'Confirm Reject' : 'Reject'}
                    </Button>
                  </div>
                )}
                {selected.status !== 'pending' && (
                  <div className="pt-2 text-center">
                    <Badge className={`text-sm px-4 py-1 ${selected.status === 'approved' ? 'bg-success/20 text-success' : 'bg-destructive/20 text-destructive'}`}>
                      {selected.status === 'approved' ? 'Approved' : 'Rejected'}
                    </Badge>
                  </div>
                )}
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default KYCReviews;
