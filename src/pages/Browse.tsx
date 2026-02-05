import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import AuctionCard from '@/components/auction/AuctionCard';
import FilterPanel from '@/components/auction/FilterPanel';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Auction, CarListing, FilterOptions } from '@/types';
import { Search, Grid3X3, List, SlidersHorizontal } from 'lucide-react';

// Mock data
const generateMockAuctions = (): Auction[] => {
  const cars = [
    { make: 'Mercedes-Benz', model: 'G63 AMG', year: 2023, price: 215000, location: { country: 'Nigeria', city: 'Lagos' }, image: 'https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=800' },
    { make: 'Range Rover', model: 'Sport', year: 2022, price: 142000, location: { country: 'South Africa', city: 'Johannesburg' }, image: 'https://images.unsplash.com/photo-1606664666892-95c3e7ad0a3c?w=800' },
    { make: 'Porsche', model: 'Cayenne Turbo', year: 2021, price: 112000, location: { country: 'Kenya', city: 'Nairobi' }, image: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=800' },
    { make: 'BMW', model: 'X7 M50i', year: 2023, price: 148000, location: { country: 'Ghana', city: 'Accra' }, image: 'https://images.unsplash.com/photo-1555215695-3004980ad54e?w=800' },
    { make: 'Toyota', model: 'Land Cruiser', year: 2022, price: 95000, location: { country: 'Nigeria', city: 'Abuja' }, image: 'https://images.unsplash.com/photo-1594502184342-2e12f877aa73?w=800' },
    { make: 'Lexus', model: 'LX 570', year: 2021, price: 88000, location: { country: 'Egypt', city: 'Cairo' }, image: 'https://images.unsplash.com/photo-1619682817481-e994891cd1f5?w=800' },
    { make: 'Audi', model: 'Q8', year: 2023, price: 125000, location: { country: 'Morocco', city: 'Casablanca' }, image: 'https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=800' },
    { make: 'Jeep', model: 'Grand Cherokee', year: 2022, price: 72000, location: { country: 'Tanzania', city: 'Dar es Salaam' }, image: 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?w=800' },
    { make: 'Ford', model: 'Mustang GT', year: 2023, price: 65000, location: { country: 'South Africa', city: 'Cape Town' }, image: 'https://images.unsplash.com/photo-1584345604476-8ec5e4f92ede?w=800' },
    { make: 'Volkswagen', model: 'Touareg', year: 2021, price: 58000, location: { country: 'Nigeria', city: 'Port Harcourt' }, image: 'https://images.unsplash.com/photo-1609521263047-f8f205293f24?w=800' },
    { make: 'Honda', model: 'Accord', year: 2022, price: 35000, location: { country: 'Ghana', city: 'Kumasi' }, image: 'https://images.unsplash.com/photo-1619682817481-e994891cd1f5?w=800' },
    { make: 'Hyundai', model: 'Palisade', year: 2023, price: 52000, location: { country: 'Kenya', city: 'Mombasa' }, image: 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=800' },
  ];

  return cars.map((car, index) => {
    const carListing: CarListing = {
      id: `car-${index + 1}`,
      userId: `user-${index + 1}`,
      title: `${car.year} ${car.make} ${car.model}`,
      make: car.make,
      model: car.model,
      year: car.year,
      mileage: Math.floor(Math.random() * 50000) + 5000,
      transmission: Math.random() > 0.3 ? 'automatic' : 'manual',
      fuelType: ['petrol', 'diesel', 'hybrid'][Math.floor(Math.random() * 3)] as any,
      bodyType: 'suv',
      color: ['Black', 'White', 'Silver', 'Blue'][Math.floor(Math.random() * 4)],
      description: 'Excellent condition, well maintained',
      images: [car.image],
      location: car.location,
      condition: 'excellent',
      features: ['Leather Seats', 'Navigation', 'Sunroof'],
      status: 'approved',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    return {
      id: `auction-${index + 1}`,
      carListingId: carListing.id,
      carListing,
      sellerId: `seller-${index + 1}`,
      startingPrice: car.price * 0.85,
      currentBid: car.price,
      startTime: new Date().toISOString(),
      endTime: new Date(Date.now() + (Math.random() * 7 + 1) * 24 * 60 * 60 * 1000).toISOString(),
      status: 'live' as const,
      bidsCount: Math.floor(Math.random() * 40) + 5,
      watchersCount: Math.floor(Math.random() * 200) + 20,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
  });
};

const mockAuctions = generateMockAuctions();

const Browse = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState<FilterOptions>({});
  const [sortBy, setSortBy] = useState('ending-soon');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  const filteredAuctions = useMemo(() => {
    let result = [...mockAuctions];

    // Search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(auction => {
        const car = auction.carListing!;
        return (
          car.make.toLowerCase().includes(query) ||
          car.model.toLowerCase().includes(query) ||
          car.title.toLowerCase().includes(query)
        );
      });
    }

    // Make filter
    if (filters.makes?.length) {
      result = result.filter(auction => 
        filters.makes!.includes(auction.carListing!.make)
      );
    }

    // Price filter
    if (filters.priceMin !== undefined) {
      result = result.filter(auction => 
        (auction.currentBid || auction.startingPrice) >= filters.priceMin!
      );
    }
    if (filters.priceMax !== undefined) {
      result = result.filter(auction => 
        (auction.currentBid || auction.startingPrice) <= filters.priceMax!
      );
    }

    // Year filter
    if (filters.yearMin !== undefined) {
      result = result.filter(auction => 
        auction.carListing!.year >= filters.yearMin!
      );
    }
    if (filters.yearMax !== undefined) {
      result = result.filter(auction => 
        auction.carListing!.year <= filters.yearMax!
      );
    }

    // Location filter
    if (filters.location?.length) {
      result = result.filter(auction =>
        filters.location!.includes(auction.carListing!.location.country)
      );
    }

    // Sort
    switch (sortBy) {
      case 'ending-soon':
        result.sort((a, b) => new Date(a.endTime).getTime() - new Date(b.endTime).getTime());
        break;
      case 'newly-listed':
        result.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
        break;
      case 'price-low':
        result.sort((a, b) => (a.currentBid || a.startingPrice) - (b.currentBid || b.startingPrice));
        break;
      case 'price-high':
        result.sort((a, b) => (b.currentBid || b.startingPrice) - (a.currentBid || a.startingPrice));
        break;
      case 'most-bids':
        result.sort((a, b) => b.bidsCount - a.bidsCount);
        break;
    }

    return result;
  }, [searchQuery, filters, sortBy]);

  const resetFilters = () => {
    setFilters({});
    setSearchQuery('');
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-display font-bold mb-2">
            Browse <span className="text-gold-gradient">Auctions</span>
          </h1>
          <p className="text-muted-foreground">
            Discover premium vehicles from across Africa
          </p>
        </div>

        {/* Search and Sort Bar */}
        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <Input
              placeholder="Search make, model, or keyword..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 input-premium"
            />
          </div>
          
          <div className="flex gap-2">
            <FilterPanel
              filters={filters}
              onFiltersChange={setFilters}
              onReset={resetFilters}
            />
            
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="ending-soon">Ending Soon</SelectItem>
                <SelectItem value="newly-listed">Newly Listed</SelectItem>
                <SelectItem value="price-low">Price: Low to High</SelectItem>
                <SelectItem value="price-high">Price: High to Low</SelectItem>
                <SelectItem value="most-bids">Most Bids</SelectItem>
              </SelectContent>
            </Select>

            <div className="hidden sm:flex border border-border/50 rounded-lg overflow-hidden">
              <Button
                variant="ghost"
                size="icon"
                className={viewMode === 'grid' ? 'bg-muted' : ''}
                onClick={() => setViewMode('grid')}
              >
                <Grid3X3 className="w-4 h-4" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className={viewMode === 'list' ? 'bg-muted' : ''}
                onClick={() => setViewMode('list')}
              >
                <List className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>

        <div className="flex gap-8">
          {/* Desktop Filter Panel */}
          <div className="hidden lg:block">
            <FilterPanel
              filters={filters}
              onFiltersChange={setFilters}
              onReset={resetFilters}
            />
          </div>

          {/* Results */}
          <div className="flex-1">
            {/* Results Count */}
            <div className="flex items-center justify-between mb-6">
              <p className="text-muted-foreground">
                Showing <span className="text-foreground font-medium">{filteredAuctions.length}</span> results
              </p>
            </div>

            {/* Auction Grid */}
            {filteredAuctions.length > 0 ? (
              <div className={`grid gap-6 ${
                viewMode === 'grid' 
                  ? 'sm:grid-cols-2 xl:grid-cols-3' 
                  : 'grid-cols-1'
              }`}>
                {filteredAuctions.map((auction) => (
                  <AuctionCard key={auction.id} auction={auction} />
                ))}
              </div>
            ) : (
              <div className="text-center py-16">
                <SlidersHorizontal className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">No auctions found</h3>
                <p className="text-muted-foreground mb-4">
                  Try adjusting your filters or search query
                </p>
                <Button onClick={resetFilters} variant="outline">
                  Reset Filters
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Browse;
