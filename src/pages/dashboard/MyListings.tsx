import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Car, 
  Plus, 
  Eye, 
  Edit, 
  MoreVertical,
  Clock,
  CheckCircle2,
  XCircle
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

const mockListings = [
  {
    id: '1',
    title: '2023 Mercedes-Benz G63 AMG',
    status: 'live',
    currentBid: 215000,
    bidsCount: 24,
    endTime: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString(),
    image: 'https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=400',
  },
  {
    id: '2',
    title: '2022 Range Rover Sport',
    status: 'pending',
    currentBid: 0,
    bidsCount: 0,
    image: 'https://images.unsplash.com/photo-1606664666892-95c3e7ad0a3c?w=400',
  },
  {
    id: '3',
    title: '2021 Porsche Cayenne',
    status: 'rejected',
    rejectionReason: 'Additional photos required',
    currentBid: 0,
    bidsCount: 0,
    image: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=400',
  },
];

const MyListings = () => {
  const [listings] = useState(mockListings);

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'live':
        return <Badge className="status-approved gap-1"><CheckCircle2 className="w-3 h-3" /> Live</Badge>;
      case 'pending':
        return <Badge className="status-pending gap-1"><Clock className="w-3 h-3" /> Pending Review</Badge>;
      case 'rejected':
        return <Badge className="status-rejected gap-1"><XCircle className="w-3 h-3" /> Needs Attention</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0,
    }).format(price);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-display font-bold mb-1">My Listings</h1>
          <p className="text-muted-foreground">Manage your vehicle listings</p>
        </div>
        <Link to="/sell">
          <Button className="btn-premium gap-2">
            <Plus className="w-4 h-4" />
            New Listing
          </Button>
        </Link>
      </div>

      {listings.length > 0 ? (
        <div className="space-y-4">
          {listings.map((listing) => (
            <div key={listing.id} className="card-premium p-4 flex gap-4">
              <div className="w-32 h-24 rounded-lg overflow-hidden shrink-0">
                <img 
                  src={listing.image} 
                  alt={listing.title} 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h3 className="font-semibold mb-1 truncate">{listing.title}</h3>
                    {getStatusBadge(listing.status)}
                  </div>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <MoreVertical className="w-4 h-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>
                        <Eye className="w-4 h-4 mr-2" />
                        View
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Edit className="w-4 h-4 mr-2" />
                        Edit
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
                {listing.status === 'live' && (
                  <div className="flex items-center gap-6 mt-3 text-sm">
                    <div>
                      <p className="text-muted-foreground">Current Bid</p>
                      <p className="font-semibold text-gold-gradient">
                        {formatPrice(listing.currentBid)}
                      </p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Total Bids</p>
                      <p className="font-semibold">{listing.bidsCount}</p>
                    </div>
                  </div>
                )}
                {listing.status === 'rejected' && listing.rejectionReason && (
                  <p className="mt-3 text-sm text-destructive">
                    {listing.rejectionReason}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="card-premium p-12 text-center">
          <Car className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
          <h3 className="font-semibold text-lg mb-2">No listings yet</h3>
          <p className="text-muted-foreground mb-4">
            Start selling by listing your first vehicle
          </p>
          <Link to="/sell">
            <Button className="btn-premium gap-2">
              <Plus className="w-4 h-4" />
              Create Listing
            </Button>
          </Link>
        </div>
      )}
    </div>
  );
};

export default MyListings;
