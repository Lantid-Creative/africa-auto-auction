import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { AlertCircle, CheckCircle2, Clock, XCircle } from 'lucide-react';

export type KYCStatus = 'not_started' | 'pending' | 'approved' | 'rejected';

interface KYCStatusBannerProps {
  status: KYCStatus;
  rejectionReason?: string;
}

const KYCStatusBanner = ({ status, rejectionReason }: KYCStatusBannerProps) => {
  if (status === 'approved') return null;

  const configs = {
    not_started: {
      bg: 'bg-warning/10 border-warning/30',
      icon: AlertCircle,
      iconColor: 'text-warning',
      title: 'Complete Identity Verification',
      desc: 'Verify your identity to bid on vehicles and list cars for auction. This is required by Nigerian regulations.',
      action: { label: 'Start KYC', href: '/kyc' },
    },
    pending: {
      bg: 'bg-primary/10 border-primary/30',
      icon: Clock,
      iconColor: 'text-primary',
      title: 'Verification Under Review',
      desc: 'Your documents are being reviewed by our compliance team. This typically takes 24–48 hours.',
      action: null,
    },
    rejected: {
      bg: 'bg-destructive/10 border-destructive/30',
      icon: XCircle,
      iconColor: 'text-destructive',
      title: 'Verification Rejected',
      desc: rejectionReason || 'Your KYC verification was rejected. Please resubmit with clearer documents.',
      action: { label: 'Resubmit KYC', href: '/kyc' },
    },
  };

  const config = configs[status];
  const Icon = config.icon;

  return (
    <div className={`rounded-xl border p-4 flex items-start gap-4 ${config.bg}`}>
      <Icon className={`w-5 h-5 shrink-0 mt-0.5 ${config.iconColor}`} />
      <div className="flex-1 min-w-0">
        <p className="font-medium text-sm">{config.title}</p>
        <p className="text-xs text-muted-foreground mt-0.5">{config.desc}</p>
      </div>
      {config.action && (
        <Link to={config.action.href}>
          <Button size="sm" className="shrink-0 btn-premium text-xs">{config.action.label}</Button>
        </Link>
      )}
    </div>
  );
};

export default KYCStatusBanner;
