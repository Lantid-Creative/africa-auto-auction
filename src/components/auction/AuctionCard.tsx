import { Link } from 'react-router-dom';
import { Auction } from '@/types';
import { useCountdown } from '@/hooks/useCountdown';
import { MapPin, Clock, Eye, Gavel } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

interface AuctionCardProps {
  auction: Auction;
}

const AuctionCard = ({ auction }: AuctionCardProps) => {
  const { days, hours, minutes, seconds, isExpired } = useCountdown(auction.endTime);
  const car = auction.carListing!;

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0,
    }).format(price);
  };

  const getStatusBadge = () => {
    if (auction.status === 'live' && !isExpired) {
      if (days === 0 && hours < 1) {
        return <span className="badge-ending-soon">Ending Soon</span>;
      }
      return <span className="badge-live">● Live</span>;
    }
    if (auction.status === 'scheduled') {
      return <Badge variant="secondary">Upcoming</Badge>;
    }
    return <Badge variant="outline">Ended</Badge>;
  };

  return (
    <Link to={`/auction/${auction.id}`} className="group block">
      <div className="card-premium overflow-hidden transition-all duration-300 group-hover:scale-[1.02] group-hover:shadow-elevated">
        {/* Image Container */}
        <div className="relative aspect-[4/3] overflow-hidden">
          <img
            src={car.images[0] || '/placeholder.svg'}
            alt={car.title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-transparent to-transparent" />
          
          {/* Status Badge */}
          <div className="absolute top-4 left-4">
            {getStatusBadge()}
          </div>

          {/* Watchers */}
          <div className="absolute top-4 right-4 flex items-center gap-1.5 px-2 py-1 rounded-full bg-background/80 backdrop-blur-sm text-xs">
            <Eye className="w-3.5 h-3.5" />
            <span>{auction.watchersCount}</span>
          </div>

          {/* Countdown Timer */}
          {auction.status === 'live' && !isExpired && (
            <div className="absolute bottom-4 left-4 right-4">
              <div className="flex items-center gap-2 text-xs">
                <Clock className="w-3.5 h-3.5 text-primary" />
                <span className="text-foreground/80">
                  {days > 0 ? `${days}d ` : ''}{hours}h {minutes}m {seconds}s
                </span>
              </div>
            </div>
          )}
        </div>

        {/* Content */}
        <div className="p-5">
          {/* Year, Make, Model */}
          <h3 className="font-display text-lg font-semibold text-foreground mb-1 line-clamp-1 group-hover:text-primary transition-colors">
            {car.year} {car.make} {car.model}
          </h3>

          {/* Specs */}
          <div className="flex items-center gap-3 text-xs text-muted-foreground mb-4">
            <span>{car.mileage.toLocaleString()} km</span>
            <span className="w-1 h-1 rounded-full bg-muted-foreground/50" />
            <span className="capitalize">{car.transmission}</span>
            <span className="w-1 h-1 rounded-full bg-muted-foreground/50" />
            <span className="capitalize">{car.fuelType}</span>
          </div>

          {/* Location */}
          <div className="flex items-center gap-1.5 text-xs text-muted-foreground mb-4">
            <MapPin className="w-3.5 h-3.5" />
            <span>{car.location.city}, {car.location.country}</span>
          </div>

          {/* Bid Info */}
          <div className="flex items-center justify-between pt-4 border-t border-border/50">
            <div>
              <p className="text-xs text-muted-foreground mb-1">
                {auction.currentBid ? 'Current Bid' : 'Starting Bid'}
              </p>
              <p className="text-xl font-display font-bold text-gold-gradient">
                {formatPrice(auction.currentBid || auction.startingPrice)}
              </p>
            </div>
            <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
              <Gavel className="w-3.5 h-3.5" />
              <span>{auction.bidsCount} bids</span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default AuctionCard;
