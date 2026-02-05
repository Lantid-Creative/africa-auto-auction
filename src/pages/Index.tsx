import { Link } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import AuctionCard from '@/components/auction/AuctionCard';
import CountdownTimer from '@/components/auction/CountdownTimer';
import { Button } from '@/components/ui/button';
import { Auction, CarListing } from '@/types';
import heroImage from '@/assets/hero-bg.jpg';
import { 
  ArrowRight, 
  Shield, 
  Globe, 
  Gavel, 
  Car, 
  CheckCircle2,
  Users,
  Trophy,
  TrendingUp
} from 'lucide-react';

// Mock data for featured auctions
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
  color: 'Black',
  description: 'Pristine condition, fully loaded',
  images: ['https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=800'],
  location: { country: 'Nigeria', city: 'Lagos' },
  condition: 'excellent',
  features: ['Leather Seats', 'Navigation System', 'Sunroof'],
  status: 'approved',
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
};

const mockAuctions: Auction[] = [
  {
    id: '1',
    carListingId: '1',
    carListing: { ...mockCarListing },
    sellerId: 'seller1',
    startingPrice: 185000,
    currentBid: 215000,
    startTime: new Date().toISOString(),
    endTime: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString(),
    status: 'live',
    bidsCount: 24,
    watchersCount: 156,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: '2',
    carListingId: '2',
    carListing: {
      ...mockCarListing,
      id: '2',
      title: '2022 Range Rover Sport',
      make: 'Range Rover',
      model: 'Sport',
      year: 2022,
      mileage: 12000,
      images: ['https://images.unsplash.com/photo-1606664666892-95c3e7ad0a3c?w=800'],
      location: { country: 'South Africa', city: 'Johannesburg' },
    },
    sellerId: 'seller2',
    startingPrice: 125000,
    currentBid: 142000,
    startTime: new Date().toISOString(),
    endTime: new Date(Date.now() + 5 * 60 * 60 * 1000).toISOString(),
    status: 'live',
    bidsCount: 18,
    watchersCount: 89,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: '3',
    carListingId: '3',
    carListing: {
      ...mockCarListing,
      id: '3',
      title: '2021 Porsche Cayenne Turbo',
      make: 'Porsche',
      model: 'Cayenne Turbo',
      year: 2021,
      mileage: 22000,
      images: ['https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=800'],
      location: { country: 'Kenya', city: 'Nairobi' },
    },
    sellerId: 'seller3',
    startingPrice: 98000,
    currentBid: 112000,
    startTime: new Date().toISOString(),
    endTime: new Date(Date.now() + 4 * 24 * 60 * 60 * 1000).toISOString(),
    status: 'live',
    bidsCount: 12,
    watchersCount: 67,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: '4',
    carListingId: '4',
    carListing: {
      ...mockCarListing,
      id: '4',
      title: '2023 BMW X7 M50i',
      make: 'BMW',
      model: 'X7 M50i',
      year: 2023,
      mileage: 8500,
      images: ['https://images.unsplash.com/photo-1555215695-3004980ad54e?w=800'],
      location: { country: 'Ghana', city: 'Accra' },
    },
    sellerId: 'seller4',
    startingPrice: 135000,
    currentBid: 148000,
    startTime: new Date().toISOString(),
    endTime: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000).toISOString(),
    status: 'live',
    bidsCount: 31,
    watchersCount: 203,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];

const featuredAuction = mockAuctions[0];

const stats = [
  { icon: Car, value: '2,500+', label: 'Cars Sold' },
  { icon: Users, value: '50,000+', label: 'Active Members' },
  { icon: Globe, value: '20+', label: 'African Countries' },
  { icon: Trophy, value: '$150M+', label: 'Total Sales' },
];

const howItWorks = [
  {
    step: '01',
    title: 'Create Account',
    description: 'Sign up with Google or Apple in seconds. Verify your identity to start bidding.',
    icon: Users,
  },
  {
    step: '02',
    title: 'Browse & Bid',
    description: 'Explore our curated selection of premium vehicles. Place bids on your favorites.',
    icon: Gavel,
  },
  {
    step: '03',
    title: 'Win & Collect',
    description: 'Win the auction and arrange secure payment. We handle shipping across Africa.',
    icon: Trophy,
  },
];

const Index = () => {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center">
        {/* Background */}
        <div className="absolute inset-0 z-0">
          <img 
            src={heroImage} 
            alt="Premium car auction" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-background via-background/95 to-background/70" />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-2xl">
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium mb-6">
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
              Africa's Premier Car Auction Platform
            </span>
            
            <h1 className="text-5xl md:text-7xl font-display font-bold mb-6 leading-tight">
              Buy & Sell
              <span className="text-gold-gradient"> Premium </span>
              Vehicles
            </h1>
            
            <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
              Discover exceptional automobiles from across Africa. Our transparent auction 
              process ensures you get the best deals on luxury, classic, and everyday vehicles.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/auctions">
                <Button className="btn-premium text-lg px-8 py-6 gap-2">
                  Browse Auctions
                  <ArrowRight className="w-5 h-5" />
                </Button>
              </Link>
              <Link to="/sell">
                <Button variant="outline" className="text-lg px-8 py-6 border-primary/30 hover:bg-primary/10">
                  Sell Your Car
                </Button>
              </Link>
            </div>

            {/* Trust Badges */}
            <div className="flex items-center gap-6 mt-12 pt-8 border-t border-border/30">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Shield className="w-5 h-5 text-primary" />
                <span>Secure Payments</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <CheckCircle2 className="w-5 h-5 text-primary" />
                <span>Verified Sellers</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Globe className="w-5 h-5 text-primary" />
                <span>Pan-African</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 border-y border-border/30 bg-card/50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <stat.icon className="w-6 h-6 text-primary" />
                </div>
                <p className="text-3xl md:text-4xl font-display font-bold text-gold-gradient mb-1">
                  {stat.value}
                </p>
                <p className="text-sm text-muted-foreground">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Auction */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-12">
            <div>
              <h2 className="text-3xl md:text-4xl font-display font-bold mb-2">
                Featured <span className="text-gold-gradient">Auction</span>
              </h2>
              <p className="text-muted-foreground">Don't miss this exceptional vehicle</p>
            </div>
          </div>

          <div className="grid lg:grid-cols-2 gap-8 items-center">
            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden">
              <img 
                src={featuredAuction.carListing?.images[0]} 
                alt={featuredAuction.carListing?.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute top-4 left-4">
                <span className="badge-live">● Live Auction</span>
              </div>
            </div>

            <div className="space-y-6">
              <div>
                <p className="text-sm text-primary mb-2">Ending Soon</p>
                <h3 className="text-3xl font-display font-bold mb-2">
                  {featuredAuction.carListing?.year} {featuredAuction.carListing?.make} {featuredAuction.carListing?.model}
                </h3>
                <p className="text-muted-foreground">
                  {featuredAuction.carListing?.mileage.toLocaleString()} km • {featuredAuction.carListing?.transmission} • {featuredAuction.carListing?.location.city}, {featuredAuction.carListing?.location.country}
                </p>
              </div>

              <CountdownTimer targetDate={featuredAuction.endTime} size="lg" />

              <div className="flex items-center gap-8 pt-4">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Current Bid</p>
                  <p className="text-4xl font-display font-bold text-gold-gradient">
                    ${(featuredAuction.currentBid || 0).toLocaleString()}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Total Bids</p>
                  <p className="text-2xl font-semibold">{featuredAuction.bidsCount}</p>
                </div>
              </div>

              <Link to={`/auction/${featuredAuction.id}`}>
                <Button className="btn-premium text-lg px-8 py-6 gap-2 w-full sm:w-auto">
                  Place Your Bid
                  <Gavel className="w-5 h-5" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Live Auctions */}
      <section className="py-20 bg-card/30">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-12">
            <div>
              <h2 className="text-3xl md:text-4xl font-display font-bold mb-2">
                Live <span className="text-gold-gradient">Auctions</span>
              </h2>
              <p className="text-muted-foreground">Premium vehicles currently up for bidding</p>
            </div>
            <Link to="/auctions">
              <Button variant="outline" className="gap-2">
                View All
                <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {mockAuctions.map((auction) => (
              <AuctionCard key={auction.id} auction={auction} />
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">
              How It <span className="text-gold-gradient">Works</span>
            </h2>
            <p className="text-muted-foreground text-lg">
              Join thousands of satisfied buyers and sellers across Africa
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {howItWorks.map((item, index) => (
              <div key={index} className="card-premium p-8 text-center group hover:border-primary/30 transition-all">
                <div className="w-16 h-16 rounded-2xl bg-gradient-gold flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                  <item.icon className="w-8 h-8 text-primary-foreground" />
                </div>
                <span className="text-4xl font-display font-bold text-gold-gradient opacity-30">
                  {item.step}
                </span>
                <h3 className="text-xl font-display font-semibold mt-2 mb-3">
                  {item.title}
                </h3>
                <p className="text-muted-foreground">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="card-premium p-12 md:p-16 text-center relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-accent/5" />
            <div className="relative z-10">
              <TrendingUp className="w-12 h-12 text-primary mx-auto mb-6" />
              <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">
                Ready to Sell Your Car?
              </h2>
              <p className="text-muted-foreground text-lg mb-8 max-w-xl mx-auto">
                List your vehicle on Africa's most trusted auction platform. 
                Our expert team will guide you through the process.
              </p>
              <Link to="/sell">
                <Button className="btn-premium text-lg px-8 py-6 gap-2">
                  Start Selling
                  <ArrowRight className="w-5 h-5" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Index;
