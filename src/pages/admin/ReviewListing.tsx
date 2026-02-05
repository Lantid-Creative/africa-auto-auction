import { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import {
  ArrowLeft,
  CheckCircle2,
  XCircle,
  MapPin,
  Calendar,
  Gauge,
  Fuel,
  Settings2,
  User,
  Mail,
} from 'lucide-react';
import { toast } from 'sonner';

const mockListing = {
  id: '1',
  title: '2022 Range Rover Sport',
  make: 'Range Rover',
  model: 'Sport',
  year: 2022,
  mileage: 12000,
  transmission: 'automatic',
  fuelType: 'petrol',
  bodyType: 'suv',
  color: 'Fuji White',
  description:
    'Immaculate Range Rover Sport in Fuji White. Full service history, one owner. All options including Meridian sound, panoramic roof, and adaptive dynamics.',
  location: { country: 'South Africa', city: 'Johannesburg' },
  condition: 'excellent',
  features: ['Leather Seats', 'Navigation', 'Sunroof', 'Backup Camera'],
  images: [
    'https://images.unsplash.com/photo-1606664666892-95c3e7ad0a3c?w=1200',
    'https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=1200',
    'https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=1200',
  ],
  user: 'John Doe',
  userEmail: 'john@example.com',
  submittedAt: '2 hours ago',
  status: 'pending',
};

const ReviewListing = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [rejectionReason, setRejectionReason] = useState('');
  const [showRejectInput, setShowRejectInput] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const listing = mockListing;

  const handleApprove = async () => {
    setIsSubmitting(true);
    try {
      // In production: API call to approve listing
      await new Promise((r) => setTimeout(r, 800));
      toast.success('Listing approved successfully');
      navigate('/admin/pending');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReject = async () => {
    if (!showRejectInput) {
      setShowRejectInput(true);
      return;
    }
    setIsSubmitting(true);
    try {
      // In production: API call to reject with rejectionReason
      await new Promise((r) => setTimeout(r, 800));
      toast.success('Listing rejected. Seller will be notified.');
      navigate('/admin/pending');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-6">
      <Link
          to="/admin/pending"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-6"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Pending Reviews
        </Link>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main content */}
          <div className="lg:col-span-2 space-y-6">
            <div className="card-premium p-6">
              <div className="flex items-start justify-between gap-4 mb-6">
                <div>
                  <Badge className="status-pending mb-2">Pending Review</Badge>
                  <h1 className="text-2xl font-display font-bold">
                    {listing.title}
                  </h1>
                  <p className="text-muted-foreground mt-1">
                    Submitted {listing.submittedAt}
                  </p>
                </div>
              </div>

              <div className="aspect-video rounded-lg overflow-hidden mb-6">
                <img
                  src={listing.images[0]}
                  alt={listing.title}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="flex items-center gap-2 text-sm">
                  <Calendar className="w-4 h-4 text-muted-foreground" />
                  <span>{listing.year}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Gauge className="w-4 h-4 text-muted-foreground" />
                  <span>{listing.mileage.toLocaleString()} km</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Settings2 className="w-4 h-4 text-muted-foreground" />
                  <span className="capitalize">{listing.transmission}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Fuel className="w-4 h-4 text-muted-foreground" />
                  <span className="capitalize">{listing.fuelType}</span>
                </div>
                <div className="flex items-center gap-2 text-sm col-span-2">
                  <MapPin className="w-4 h-4 text-muted-foreground" />
                  <span>
                    {listing.location.city}, {listing.location.country}
                  </span>
                </div>
              </div>

              <div>
                <h3 className="font-semibold mb-2">Description</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {listing.description}
                </p>
              </div>

              {listing.features && listing.features.length > 0 && (
                <div className="mt-4">
                  <h3 className="font-semibold mb-2">Features</h3>
                  <div className="flex flex-wrap gap-2">
                    {listing.features.map((f) => (
                      <Badge key={f} variant="secondary">
                        {f}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Sidebar: seller + actions */}
          <div className="space-y-6">
            <div className="card-premium p-6">
              <h3 className="font-display font-semibold mb-4">Seller</h3>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                  <User className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <p className="font-medium">{listing.user}</p>
                  <p className="text-sm text-muted-foreground flex items-center gap-1">
                    <Mail className="w-3 h-3" />
                    {listing.userEmail}
                  </p>
                </div>
              </div>
            </div>

            <div className="card-premium p-6">
              <h3 className="font-display font-semibold mb-4">Review</h3>
              {showRejectInput && (
                <div className="mb-4">
                  <Label htmlFor="rejection-reason">
                    Rejection reason (required)
                  </Label>
                  <Textarea
                    id="rejection-reason"
                    placeholder="e.g. Additional photos required, VIN unclear..."
                    value={rejectionReason}
                    onChange={(e) => setRejectionReason(e.target.value)}
                    className="mt-2 min-h-[100px]"
                  />
                </div>
              )}
              <div className="flex flex-col gap-2">
                <Button
                  className="w-full gap-2 bg-success hover:bg-success/90"
                  onClick={handleApprove}
                  disabled={isSubmitting}
                >
                  <CheckCircle2 className="w-4 h-4" />
                  Approve Listing
                </Button>
                <Button
                  variant="destructive"
                  className="w-full gap-2"
                  onClick={handleReject}
                  disabled={
                    isSubmitting ||
                    (showRejectInput && !rejectionReason.trim())
                  }
                >
                  <XCircle className="w-4 h-4" />
                  {showRejectInput ? 'Confirm Reject' : 'Reject Listing'}
                </Button>
                {showRejectInput && (
                  <Button
                    variant="ghost"
                    className="w-full"
                    onClick={() => {
                      setShowRejectInput(false);
                      setRejectionReason('');
                    }}
                  >
                    Cancel
                  </Button>
                )}
              </div>
            </div>
          </div>
        </div>
    </div>
  );
};

export default ReviewListing;
