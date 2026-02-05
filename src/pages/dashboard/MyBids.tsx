import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Gavel, ArrowRight, Trophy, Clock } from 'lucide-react';

const mockBids = [
  {
    id: '1',
    auctionId: 'auction-1',
    title: '2023 BMW X7 M50i',
    myBid: 148000,
    currentBid: 152000,
    status: 'outbid',
    endTime: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000).toISOString(),
    image: 'https://images.unsplash.com/photo-1555215695-3004980ad54e?w=400',
  },
  {
    id: '2',
    auctionId: 'auction-2',
    title: '2022 Toyota Land Cruiser',
    myBid: 95000,
    currentBid: 95000,
    status: 'winning',
    endTime: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString(),
    image: 'https://images.unsplash.com/photo-1594502184342-2e12f877aa73?w=400',
  },
  {
    id: '3',
    auctionId: 'auction-3',
    title: '2021 Lexus LX 570',
    myBid: 82000,
    currentBid: 88000,
    status: 'won',
    image: 'https://images.unsplash.com/photo-1619682817481-e994891cd1f5?w=400',
  },
];

const MyBids = () => {
  const [bids] = useState(mockBids);

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'winning':
        return <Badge className="status-approved gap-1"><Trophy className="w-3 h-3" /> Winning</Badge>;
      case 'outbid':
        return <Badge className="status-pending gap-1"><Clock className="w-3 h-3" /> Outbid</Badge>;
      case 'won':
        return <Badge className="status-approved gap-1"><Trophy className="w-3 h-3" /> Won!</Badge>;
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
      <div>
        <h1 className="text-2xl font-display font-bold mb-1">My Bids</h1>
        <p className="text-muted-foreground">Track your auction activity</p>
      </div>

      {bids.length > 0 ? (
        <div className="space-y-4">
          {bids.map((bid) => (
            <div key={bid.id} className="card-premium p-4 flex gap-4">
              <div className="w-32 h-24 rounded-lg overflow-hidden shrink-0">
                <img 
                  src={bid.image} 
                  alt={bid.title} 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h3 className="font-semibold mb-1 truncate">{bid.title}</h3>
                    {getStatusBadge(bid.status)}
                  </div>
                  <Link to={`/auction/${bid.auctionId}`}>
                    <Button variant="outline" size="sm" className="gap-1">
                      View
                      <ArrowRight className="w-4 h-4" />
                    </Button>
                  </Link>
                </div>
                <div className="flex items-center gap-6 mt-3 text-sm">
                  <div>
                    <p className="text-muted-foreground">Your Bid</p>
                    <p className="font-semibold">{formatPrice(bid.myBid)}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Current Bid</p>
                    <p className={`font-semibold ${bid.status === 'winning' ? 'text-success' : bid.status === 'outbid' ? 'text-warning' : ''}`}>
                      {formatPrice(bid.currentBid)}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="card-premium p-12 text-center">
          <Gavel className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
          <h3 className="font-semibold text-lg mb-2">No bids yet</h3>
          <p className="text-muted-foreground mb-4">
            Start bidding on your favorite vehicles
          </p>
          <Link to="/auctions">
            <Button className="btn-premium gap-2">
              Browse Auctions
              <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>
        </div>
      )}
    </div>
  );
};

export default MyBids;
