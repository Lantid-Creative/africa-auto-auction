import { Link } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import {
  Car,
  Camera,
  FileCheck,
  Gavel,
  CreditCard,
  CheckCircle2,
  ArrowRight,
  Shield,
} from 'lucide-react';

const SellerGuide = () => {
  const steps = [
    { icon: Car, title: 'List your vehicle', desc: 'Add make, model, year, mileage, condition, location, and at least 5 clear photos. The more detail, the more bids.' },
    { icon: FileCheck, title: 'Submit for review', desc: 'Our team checks listings for accuracy and quality. Most are approved within 1–2 business days.' },
    { icon: Gavel, title: 'Your auction goes live', desc: 'Buyers browse, ask questions, and place bids. You can set a reserve price so the car only sells if the bid meets your minimum.' },
    { icon: CreditCard, title: 'Auction ends — you get paid', desc: 'When the highest bidder pays, we release the funds to you (minus our seller fee). You arrange handover or delivery with the buyer.' },
  ];

  const tips = [
    'Use high-resolution photos from multiple angles, including interior and any damage.',
    'Set a realistic reserve if you have a minimum price; it encourages serious bidders.',
    'Respond quickly to buyer questions—it builds trust and can push bids higher.',
    'Be honest about condition and history. Disputes delay payment and hurt your reputation.',
  ];

  return (
    <Layout>
      <section className="py-20 bg-gradient-hero">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <div className="w-16 h-16 rounded-2xl bg-gradient-gold flex items-center justify-center mx-auto mb-6">
              <Car className="w-8 h-8 text-primary-foreground" />
            </div>
            <h1 className="text-4xl md:text-5xl font-display font-bold mb-6">
              Seller <span className="text-gold-gradient">Guide</span>
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed mb-8">
              Sell your car to thousands of ready buyers across Africa. List once, get multiple 
              bids, and close the deal securely. Here’s how it works from listing to payment.
            </p>
            <Link to="/sell">
              <Button className="btn-premium text-lg px-8 py-6 gap-2">
                List Your Vehicle
                <ArrowRight className="w-5 h-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-display font-bold text-center mb-4">How Selling Works</h2>
          <p className="text-muted-foreground text-center max-w-2xl mx-auto mb-12">
            Four simple steps from listing to payment. We handle the platform, verification, 
            and secure payments—you focus on presenting your vehicle well.
          </p>
          <div className="space-y-8 max-w-3xl mx-auto mb-16">
            {steps.map((s, i) => (
              <div key={i} className="card-premium p-6 flex gap-6">
                <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                  <s.icon className="w-7 h-7 text-primary" />
                </div>
                <div>
                  <h3 className="font-display font-semibold text-lg mb-2">{s.title}</h3>
                  <p className="text-muted-foreground">{s.desc}</p>
                </div>
              </div>
            ))}
          </div>

          <h2 className="text-2xl font-display font-bold text-center mb-6">Tips to Sell Faster & for More</h2>
          <ul className="space-y-4 max-w-2xl mx-auto mb-16">
            {tips.map((tip, i) => (
              <li key={i} className="flex gap-3">
                <CheckCircle2 className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                <span className="text-muted-foreground">{tip}</span>
              </li>
            ))}
          </ul>

          <div className="card-premium p-8 max-w-2xl mx-auto flex gap-6">
            <Shield className="w-12 h-12 text-primary shrink-0" />
            <div>
              <h3 className="font-display font-semibold text-lg mb-2">You’re Protected</h3>
              <p className="text-muted-foreground">
                Buyers pay into escrow before they take the vehicle. You don’t release the car 
                until payment is confirmed. If there’s a dispute, our team can help mediate. 
                See our <Link to="/terms" className="text-primary hover:underline">Terms</Link> and{' '}
                <Link to="/pricing" className="text-primary hover:underline">Pricing</Link> for full details.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-card/30">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl font-display font-bold mb-4">Ready to Sell?</h2>
          <p className="text-muted-foreground mb-6 max-w-lg mx-auto">
            Create your free account, add your vehicle with photos and details, and go live. 
            Thousands of buyers are browsing every day.
          </p>
          <Link to="/sell">
            <Button className="btn-premium gap-2">
              <Camera className="w-4 h-4" />
              List Your Vehicle
            </Button>
          </Link>
        </div>
      </section>
    </Layout>
  );
};

export default SellerGuide;
