import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Eye, CheckCircle2, XCircle, Clock } from 'lucide-react';

const mockPending = [
  { id: '1', title: '2022 Range Rover Sport', user: 'John Doe', email: 'john@example.com', submittedAt: '2 hours ago', image: 'https://images.unsplash.com/photo-1606664666892-95c3e7ad0a3c?w=400', location: 'Lagos, Nigeria' },
  { id: '2', title: '2023 Toyota Hilux', user: 'Sarah M.', email: 'sarah@example.com', submittedAt: '5 hours ago', image: 'https://images.unsplash.com/photo-1594502184342-2e12f877aa73?w=400', location: 'Nairobi, Kenya' },
  { id: '3', title: '2021 BMW X5', user: 'Michael K.', email: 'michael@example.com', submittedAt: '1 day ago', image: 'https://images.unsplash.com/photo-1555215695-3004980ad54e?w=400', location: 'Accra, Ghana' },
];

const PendingReviews = () => {
  const [listings] = useState(mockPending);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-display font-bold mb-1">Pending Reviews</h1>
        <p className="text-muted-foreground">{listings.length} listings awaiting approval</p>
      </div>

      <div className="space-y-4">
        {listings.map((listing) => (
          <div key={listing.id} className="card-premium p-4 flex gap-4">
            <img src={listing.image} alt="" className="w-32 h-24 rounded-lg object-cover shrink-0" />
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h3 className="font-semibold mb-1">{listing.title}</h3>
                  <p className="text-sm text-muted-foreground">{listing.location}</p>
                  <p className="text-xs text-muted-foreground mt-1">
                    by {listing.user} ({listing.email}) • {listing.submittedAt}
                  </p>
                </div>
                <Badge className="status-pending gap-1"><Clock className="w-3 h-3" /> Pending</Badge>
              </div>
              <div className="flex gap-2 mt-4">
                <Link to={`/admin/review/${listing.id}`}>
                  <Button size="sm" variant="outline" className="gap-1"><Eye className="w-4 h-4" /> Review</Button>
                </Link>
                <Button size="sm" className="bg-success hover:bg-success/90 gap-1"><CheckCircle2 className="w-4 h-4" /> Approve</Button>
                <Button size="sm" variant="destructive" className="gap-1"><XCircle className="w-4 h-4" /> Reject</Button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PendingReviews;
