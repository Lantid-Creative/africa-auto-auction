import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import ImageGallery from '@/components/auction/ImageGallery';
import CountdownTimer from '@/components/auction/CountdownTimer';
import BidForm from '@/components/auction/BidForm';
import BidHistory from '@/components/auction/BidHistory';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/hooks/useAuth';
import { Auction, CarListing, Bid } from '@/types';
import { 
  MapPin, 
  Calendar, 
  Gauge, 
  Fuel, 
  Settings2, 
  Car as CarIcon,
  Heart,
  Share2,
  Shield,
  AlertTriangle,
  CheckCircle2,
  User,
  MessageCircle
} from 'lucide-react';
import { toast } from 'sonner';

// Mock data
const mockCarListing: CarListing = {
  id: '1',
  userId: 'user1',
  title: '2023 Mercedes-Benz G63 AMG',
  make: 'Mercedes-Benz',
  model: 'G63 AMG',
  year: 2023,
  mileage: 5200,
  transmission: 'automatic',
  fuelType: 'petrol',
  bodyType: 'suv',
  color: 'Obsidian Black',
  vin: 'WDCYC3HF7NX123456',
  description: `This stunning 2023 Mercedes-Benz G63 AMG is a true masterpiece of automotive engineering. Finished in the timeless Obsidian Black Metallic paint, this G-Wagon commands attention wherever it goes.

The interior is appointed with the finest Nappa leather in a contrasting designo Macchiato Beige, creating an atmosphere of unparalleled luxury. Every surface has been crafted with meticulous attention to detail.

Under the hood, the handcrafted 4.0L V8 biturbo engine delivers an exhilarating 577 horsepower, paired with the AMG SPEEDSHIFT TCT 9-speed transmission for seamless power delivery.

This particular example has been meticulously maintained and comes with full service history. It features the AMG Night Package, 22" AMG cross-spoke wheels, and the Premium Package with Burmester 3D High-End Surround Sound System.`,
  images: [
    'https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=1200',
    'https://images.unsplash.com/photo-1606664666892-95c3e7ad0a3c?w=1200',
    'https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=1200',
    'https://images.unsplash.com/photo-1555215695-3004980ad54e?w=1200',
    'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=1200',
  ],
  location: { country: 'Nigeria', city: 'Lagos', state: 'Lagos State' },
  condition: 'excellent',
  features: [
    'AMG Night Package',
    'Burmester 3D Sound System',
    '22" AMG Wheels',
    'Nappa Leather Interior',
    'Heated & Ventilated Seats',
    'Panoramic Sunroof',
    '360° Camera System',
    'Active Parking Assist',
    'Adaptive Damping System',
    'Apple CarPlay/Android Auto'
  ],
  status: 'approved',
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
};

const mockAuction: Auction = {
  id: '1',
  carListingId: '1',
  carListing: mockCarListing,
  sellerId: 'seller1',
  seller: {
    id: 'seller1',
    email: 'seller@example.com',
    name: 'Premium Motors Lagos',
    provider: 'google',
    role: 'user',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  startingPrice: 185000,
  currentBid: 215000,
  reservePrice: 200000,
  buyNowPrice: 280000,
  startTime: new Date().toISOString(),
  endTime: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString(),
  status: 'live',
  bidsCount: 24,
  watchersCount: 156,
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
};

const mockBids: Bid[] = [
  { id: '1', auctionId: '1', userId: 'u1', user: { id: 'u1', name: 'John D.', email: '', provider: 'google', role: 'user', createdAt: '', updatedAt: '' }, amount: 215000, createdAt: new Date(Date.now() - 1 * 60 * 60 * 1000).toISOString() },
  { id: '2', auctionId: '1', userId: 'u2', user: { id: 'u2', name: 'Sarah M.', email: '', provider: 'google', role: 'user', createdAt: '', updatedAt: '' }, amount: 212000, createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString() },
  { id: '3', auctionId: '1', userId: 'u3', user: { id: 'u3', name: 'Michael K.', email: '', provider: 'google', role: 'user', createdAt: '', updatedAt: '' }, amount: 208000, createdAt: new Date(Date.now() - 4 * 60 * 60 * 1000).toISOString() },
  { id: '4', auctionId: '1', userId: 'u4', user: { id: 'u4', name: 'Amara O.', email: '', provider: 'google', role: 'user', createdAt: '', updatedAt: '' }, amount: 205000, createdAt: new Date(Date.now() - 6 * 60 * 60 * 1000).toISOString() },
  { id: '5', auctionId: '1', userId: 'u5', user: { id: 'u5', name: 'David T.', email: '', provider: 'google', role: 'user', createdAt: '', updatedAt: '' }, amount: 200000, createdAt: new Date(Date.now() - 8 * 60 * 60 * 1000).toISOString() },
];

const AuctionDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const [isWatching, setIsWatching] = useState(false);

  const auction = mockAuction;
  const car = auction.carListing!;
  const bids = mockBids;

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0,
    }).format(price);
  };

  const handlePlaceBid = async (amount: number) => {
    // In production, this would call the Azure backend
    console.log('Placing bid:', amount);
    await new Promise(resolve => setTimeout(resolve, 1000));
  };

  const handleAuthRequired = () => {
    navigate('/auth');
  };

  const handleWatch = () => {
    if (!isAuthenticated) {
      handleAuthRequired();
      return;
    }
    setIsWatching(!isWatching);
    toast.success(isWatching ? 'Removed from watchlist' : 'Added to watchlist');
  };

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    toast.success('Link copied to clipboard');
  };

  const specs = [
    { icon: Calendar, label: 'Year', value: car.year },
    { icon: Gauge, label: 'Mileage', value: `${car.mileage.toLocaleString()} km` },
    { icon: Settings2, label: 'Transmission', value: car.transmission },
    { icon: Fuel, label: 'Fuel Type', value: car.fuelType },
    { icon: CarIcon, label: 'Body Type', value: car.bodyType },
    { icon: MapPin, label: 'Location', value: `${car.location.city}, ${car.location.country}` },
  ];

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Image Gallery */}
            <ImageGallery images={car.images} title={car.title} />

            {/* Title and Basic Info - Mobile */}
            <div className="lg:hidden">
              <div className="flex items-start justify-between gap-4 mb-4">
                <div>
                  <span className="badge-live mb-2">● Live Auction</span>
                  <h1 className="text-2xl font-display font-bold">
                    {car.year} {car.make} {car.model}
                  </h1>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="icon" onClick={handleWatch}>
                    <Heart className={`w-4 h-4 ${isWatching ? 'fill-destructive text-destructive' : ''}`} />
                  </Button>
                  <Button variant="outline" size="icon" onClick={handleShare}>
                    <Share2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>

            {/* Tabs */}
            <Tabs defaultValue="details" className="w-full">
              <TabsList className="w-full justify-start bg-muted/30 p-1">
                <TabsTrigger value="details">Details</TabsTrigger>
                <TabsTrigger value="features">Features</TabsTrigger>
                <TabsTrigger value="bids">Bid History ({bids.length})</TabsTrigger>
              </TabsList>

              <TabsContent value="details" className="space-y-6 mt-6">
                {/* Specs Grid */}
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {specs.map((spec, index) => (
                    <div key={index} className="card-premium p-4">
                      <spec.icon className="w-5 h-5 text-primary mb-2" />
                      <p className="text-xs text-muted-foreground">{spec.label}</p>
                      <p className="font-medium capitalize">{spec.value}</p>
                    </div>
                  ))}
                </div>

                {/* Description */}
                <div className="card-premium p-6">
                  <h3 className="font-display font-semibold text-lg mb-4">Description</h3>
                  <div className="prose prose-sm prose-invert max-w-none">
                    {car.description.split('\n\n').map((paragraph, index) => (
                      <p key={index} className="text-muted-foreground mb-4">
                        {paragraph}
                      </p>
                    ))}
                  </div>
                </div>

                {/* VIN */}
                {car.vin && (
                  <div className="card-premium p-6">
                    <h3 className="font-display font-semibold text-lg mb-4">Vehicle Identification</h3>
                    <div className="flex items-center gap-3">
                      <Shield className="w-5 h-5 text-primary" />
                      <div>
                        <p className="text-sm text-muted-foreground">VIN</p>
                        <p className="font-mono">{car.vin}</p>
                      </div>
                    </div>
                  </div>
                )}
              </TabsContent>

              <TabsContent value="features" className="mt-6">
                <div className="card-premium p-6">
                  <h3 className="font-display font-semibold text-lg mb-4">Features & Equipment</h3>
                  <div className="grid grid-cols-2 gap-3">
                    {car.features.map((feature, index) => (
                      <div key={index} className="flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-primary shrink-0" />
                        <span className="text-sm">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="bids" className="mt-6">
                <div className="card-premium p-6">
                  <h3 className="font-display font-semibold text-lg mb-4">Bid History</h3>
                  <BidHistory bids={bids} />
                </div>
              </TabsContent>
            </Tabs>

            {/* Seller Info */}
            <div className="card-premium p-6">
              <h3 className="font-display font-semibold text-lg mb-4">Seller Information</h3>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-gold flex items-center justify-center">
                    <User className="w-6 h-6 text-primary-foreground" />
                  </div>
                  <div>
                    <p className="font-semibold">{auction.seller?.name}</p>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <CheckCircle2 className="w-4 h-4 text-success" />
                      Verified Seller
                    </div>
                  </div>
                </div>
                <Button variant="outline" className="gap-2">
                  <MessageCircle className="w-4 h-4" />
                  Contact
                </Button>
              </div>
            </div>
          </div>

          {/* Sidebar - Bid Panel */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 space-y-6">
              {/* Desktop Title */}
              <div className="hidden lg:block">
                <div className="flex items-start justify-between gap-4 mb-4">
                  <span className="badge-live">● Live Auction</span>
                  <div className="flex gap-2">
                    <Button variant="outline" size="icon" onClick={handleWatch}>
                      <Heart className={`w-4 h-4 ${isWatching ? 'fill-destructive text-destructive' : ''}`} />
                    </Button>
                    <Button variant="outline" size="icon" onClick={handleShare}>
                      <Share2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
                <h1 className="text-2xl font-display font-bold mb-2">
                  {car.year} {car.make} {car.model}
                </h1>
                <p className="text-muted-foreground text-sm flex items-center gap-2">
                  <MapPin className="w-4 h-4" />
                  {car.location.city}, {car.location.country}
                </p>
              </div>

              {/* Bid Card */}
              <div className="card-premium p-6 space-y-6">
                {/* Countdown */}
                <div>
                  <p className="text-sm text-muted-foreground mb-3 text-center">Auction Ends In</p>
                  <CountdownTimer targetDate={auction.endTime} size="sm" />
                </div>

                {/* Current Bid */}
                <div className="text-center py-4 border-y border-border/30">
                  <p className="text-sm text-muted-foreground mb-1">Current Bid</p>
                  <p className="text-4xl font-display font-bold text-gold-gradient">
                    {formatPrice(auction.currentBid || auction.startingPrice)}
                  </p>
                  <p className="text-sm text-muted-foreground mt-1">
                    {auction.bidsCount} bids · {auction.watchersCount} watching
                  </p>
                </div>

                {/* Reserve Status */}
                {auction.reservePrice && (
                  <div className={`flex items-center justify-center gap-2 text-sm ${
                    (auction.currentBid || 0) >= auction.reservePrice 
                      ? 'text-success' 
                      : 'text-warning'
                  }`}>
                    {(auction.currentBid || 0) >= auction.reservePrice ? (
                      <>
                        <CheckCircle2 className="w-4 h-4" />
                        Reserve Met
                      </>
                    ) : (
                      <>
                        <AlertTriangle className="w-4 h-4" />
                        Reserve Not Met
                      </>
                    )}
                  </div>
                )}

                {/* Bid Form */}
                <BidForm
                  currentBid={auction.currentBid || auction.startingPrice}
                  onPlaceBid={handlePlaceBid}
                  isAuthenticated={isAuthenticated}
                  onAuthRequired={handleAuthRequired}
                />

                {/* Buy Now */}
                {auction.buyNowPrice && (
                  <div className="pt-4 border-t border-border/30">
                    <Button variant="outline" className="w-full gap-2">
                      Buy Now for {formatPrice(auction.buyNowPrice)}
                    </Button>
                  </div>
                )}
              </div>

              {/* Trust Badges */}
              <div className="card-premium p-4">
                <div className="flex items-center gap-3 text-sm">
                  <Shield className="w-5 h-5 text-primary" />
                  <div>
                    <p className="font-medium">Buyer Protection</p>
                    <p className="text-xs text-muted-foreground">Secure payments & verified sellers</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default AuctionDetail;
