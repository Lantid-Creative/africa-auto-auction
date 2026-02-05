import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import AuctionCard from '@/components/auction/AuctionCard';
import { Auction, CarListing } from '@/types';
import { Heart, ArrowRight } from 'lucide-react';

const mockWatchlist: Auction[] = [
  {
    id: 'watch-1',
    carListingId: 'car-1',
    carListing: {
      id: 'car-1',
      userId: 'user1',
      title: '2023 Porsche 911 Carrera',
      make: 'Porsche',
      model: '911 Carrera',
      year: 2023,
      mileage: 8000,
      transmission: 'automatic',
      fuelType: 'petrol',
      bodyType: 'coupe',
      color: 'Silver',
      description: 'Stunning 911',
      images: ['https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=800'],
      location: { country: 'South Africa', city: 'Cape Town' },
      condition: 'excellent',
      features: [],
      status: 'approved',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    } as CarListing,
    sellerId: 'seller1',
    startingPrice: 145000,
    currentBid: 158000,
    startTime: new Date().toISOString(),
    endTime: new Date(Date.now() + 4 * 24 * 60 * 60 * 1000).toISOString(),
    status: 'live',
    bidsCount: 18,
    watchersCount: 92,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 'watch-2',
    carListingId: 'car-2',
    carListing: {
      id: 'car-2',
      userId: 'user2',
      title: '2022 Audi RS6 Avant',
      make: 'Audi',
      model: 'RS6 Avant',
      year: 2022,
      mileage: 15000,
      transmission: 'automatic',
      fuelType: 'petrol',
      bodyType: 'sedan',
      color: 'Grey',
      description: 'Powerful wagon',
      images: ['https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=800'],
      location: { country: 'Nigeria', city: 'Lagos' },
      condition: 'excellent',
      features: [],
      status: 'approved',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    } as CarListing,
    sellerId: 'seller2',
    startingPrice: 98000,
    currentBid: 112000,
    startTime: new Date().toISOString(),
    endTime: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString(),
    status: 'live',
    bidsCount: 24,
    watchersCount: 145,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];

const Watchlist = () => {
  const [watchlist] = useState(mockWatchlist);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-display font-bold mb-1">Watchlist</h1>
        <p className="text-muted-foreground">Vehicles you're keeping an eye on</p>
      </div>

      {watchlist.length > 0 ? (
        <div className="grid sm:grid-cols-2 gap-6">
          {watchlist.map((auction) => (
            <AuctionCard key={auction.id} auction={auction} />
          ))}
        </div>
      ) : (
        <div className="card-premium p-12 text-center">
          <Heart className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
          <h3 className="font-semibold text-lg mb-2">Your watchlist is empty</h3>
          <p className="text-muted-foreground mb-4">
            Save vehicles you're interested in to track them easily
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

export default Watchlist;
