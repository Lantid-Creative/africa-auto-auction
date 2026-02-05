import { Bid } from '@/types';
import { formatDistanceToNow } from 'date-fns';
import { User } from 'lucide-react';

interface BidHistoryProps {
  bids: Bid[];
  maxDisplay?: number;
}

const BidHistory = ({ bids, maxDisplay = 10 }: BidHistoryProps) => {
  const displayedBids = bids.slice(0, maxDisplay);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0,
    }).format(price);
  };

  if (bids.length === 0) {
    return (
      <div className="text-center py-8 text-muted-foreground">
        <p>No bids yet. Be the first to bid!</p>
      </div>
    );
  }

  return (
    <div className="space-y-2">
      {displayedBids.map((bid, index) => (
        <div 
          key={bid.id}
          className={`flex items-center justify-between p-3 rounded-lg ${
            index === 0 
              ? 'bg-primary/10 border border-primary/20' 
              : 'bg-muted/30'
          }`}
        >
          <div className="flex items-center gap-3">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
              index === 0 ? 'bg-primary text-primary-foreground' : 'bg-muted'
            }`}>
              {bid.user?.avatar ? (
                <img src={bid.user.avatar} alt="" className="w-8 h-8 rounded-full" />
              ) : (
                <User className="w-4 h-4" />
              )}
            </div>
            <div>
              <p className={`text-sm font-medium ${index === 0 ? 'text-primary' : ''}`}>
                {bid.user?.name || 'Anonymous'}
              </p>
              <p className="text-xs text-muted-foreground">
                {formatDistanceToNow(new Date(bid.createdAt), { addSuffix: true })}
              </p>
            </div>
          </div>
          <div className="text-right">
            <p className={`font-display font-bold ${
              index === 0 ? 'text-lg text-gold-gradient' : 'text-foreground'
            }`}>
              {formatPrice(bid.amount)}
            </p>
            {index === 0 && (
              <span className="text-xs text-primary">Leading Bid</span>
            )}
          </div>
        </div>
      ))}
      
      {bids.length > maxDisplay && (
        <p className="text-center text-sm text-muted-foreground pt-2">
          +{bids.length - maxDisplay} more bids
        </p>
      )}
    </div>
  );
};

export default BidHistory;
