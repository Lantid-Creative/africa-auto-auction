import { Link } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Check, HelpCircle, ArrowRight } from 'lucide-react';

const Pricing = () => {
  const tiers = [
    {
      name: 'Guest',
      price: 'Free',
      period: '',
      desc: 'Browse and explore. Perfect for window-shopping.',
      features: ['Browse 350,000+ vehicles', 'View one auction at a time', 'Watchlist & alerts', 'Support via email'],
      cta: 'Get Started',
      href: '/auth',
      featured: false,
    },
    {
      name: 'Basic',
      price: '$49',
      period: '/year',
      desc: 'For occasional buyers. One bid at a time, up to $5,000.',
      features: ['Up to $5,000 buying power', '10% deposit for more bids', 'Join multiple auctions', 'Full watchlist & saved searches'],
      cta: 'Choose Basic',
      href: '/auth',
      featured: true,
    },
    {
      name: 'Premier',
      price: '$149',
      period: '/year',
      desc: 'For serious buyers. Higher limits and priority support.',
      features: ['Up to $50,000/day', '10 bids per day', 'Priority support', 'Refundable if unused in 7 days'],
      cta: 'Choose Premier',
      href: '/auth',
      featured: false,
    },
  ];

  const sellerFees = [
    'Listing fee: a small fee per listing (see your dashboard when you list).',
    'Success fee: a percentage of the final sale price when your vehicle sells.',
    'No sale, no success fee: if the auction ends without a winning bid, you don’t pay the success fee.',
  ];

  return (
    <Layout>
      <section className="py-20 bg-gradient-hero">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-display font-bold mb-6">
              Transparent <span className="text-gold-gradient">Pricing</span>
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed mb-8">
              No hidden fees. We show you exactly what you pay—whether you’re buying or selling. 
              Choose a membership that fits how you use AfriAuto.
            </p>
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-display font-bold text-center mb-4">Buyer Membership</h2>
          <p className="text-muted-foreground text-center max-w-2xl mx-auto mb-12">
            Free to browse. Upgrade when you’re ready to bid. New memberships are fully refundable 
            if unused within the first 7 days (no open bids or invoices).
          </p>
          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto mb-16">
            {tiers.map((tier, i) => (
              <div
                key={i}
                className={`card-premium p-6 flex flex-col ${tier.featured ? 'ring-2 ring-primary/50' : ''}`}
              >
                <h3 className="font-display font-bold text-xl mb-1">{tier.name}</h3>
                <p className="text-3xl font-display font-bold text-gold-gradient mb-1">
                  {tier.price}
                  <span className="text-lg font-normal text-muted-foreground">{tier.period}</span>
                </p>
                <p className="text-sm text-muted-foreground mb-6">{tier.desc}</p>
                <ul className="space-y-3 mb-6 flex-1">
                  {tier.features.map((f, j) => (
                    <li key={j} className="flex gap-2 text-sm">
                      <Check className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                      {f}
                    </li>
                  ))}
                </ul>
                <Link to={tier.href}>
                  <Button
                    className={`w-full ${tier.featured ? 'btn-premium' : ''}`}
                    variant={tier.featured ? 'default' : 'outline'}
                  >
                    {tier.cta}
                  </Button>
                </Link>
              </div>
            ))}
          </div>

          <div className="max-w-2xl mx-auto mb-16">
            <h2 className="text-2xl font-display font-bold mb-6 flex items-center gap-2">
              <HelpCircle className="w-6 h-6 text-primary" />
              Seller Fees
            </h2>
            <p className="text-muted-foreground mb-4">
              Selling on AfriAuto is straightforward. You pay a listing fee when you submit a 
              vehicle, and a success fee only when it sells.
            </p>
            <ul className="space-y-2 text-muted-foreground">
              {sellerFees.map((fee, i) => (
                <li key={i} className="flex gap-2">
                  <Check className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                  {fee}
                </li>
              ))}
            </ul>
            <p className="text-sm text-muted-foreground mt-4">
              Exact amounts are shown in your seller dashboard when you list. No surprises.
            </p>
          </div>
        </div>
      </section>

      <section className="py-20 bg-card/30">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl font-display font-bold mb-4">See It Yourself</h2>
          <p className="text-muted-foreground mb-6 max-w-lg mx-auto">
            Create a free account to browse auctions and see fees before you commit. Upgrade 
            to Basic or Premier only when you’re ready to bid.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/auth">
              <Button className="btn-premium gap-2">Create Free Account</Button>
            </Link>
            <Link to="/membership">
              <Button variant="outline" className="gap-2">Membership Details</Button>
            </Link>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Pricing;
