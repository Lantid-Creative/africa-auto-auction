import { Link } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Truck, MapPin, Globe, CheckCircle2, ArrowRight } from 'lucide-react';

const Shipping = () => {
  const options = [
    {
      icon: Truck,
      title: 'AfriAuto Delivery',
      desc: 'Select "Order Delivery" on your Payments Due page. We coordinate with vetted logistics partners to get your vehicle from the seller to your location. You get a quote and tracking before payment is released.',
    },
    {
      icon: MapPin,
      title: 'Pick Up Yourself',
      desc: 'If the vehicle is nearby, choose "Schedule Pickup" on the Payments Due page. You’ll receive instructions for the pickup location and time. Bring proper transport (trailer or drive if the vehicle is road-legal in your case).',
    },
    {
      icon: Globe,
      title: 'Your Own Transporter',
      desc: 'Have a preferred shipping company? Add their email on the Payments Due page and select "Send to Transporter." They’ll receive pickup instructions and can schedule directly with the seller or facility.',
    },
  ];

  const steps = [
    'Win the auction and complete payment (including any delivery fee).',
    'Choose delivery method: AfriAuto Delivery, self-pickup, or your transporter.',
    'Receive confirmation and tracking (for delivery) or pickup instructions.',
    'Vehicle is delivered or picked up. Confirm receipt in your account so the seller can be paid.',
  ];

  return (
    <Layout>
      <section className="py-20 bg-gradient-hero">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <div className="w-16 h-16 rounded-2xl bg-gradient-gold flex items-center justify-center mx-auto mb-6">
              <Truck className="w-8 h-8 text-primary-foreground" />
            </div>
            <h1 className="text-4xl md:text-5xl font-display font-bold mb-6">
              Shipping & <span className="text-gold-gradient">Delivery</span>
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed mb-8">
              Get your vehicle from the seller to your door—or pick it up yourself. We support 
              domestic delivery across Africa and international shipping to major hubs. Choose 
              the option that fits you.
            </p>
            <Link to="/auctions">
              <Button className="btn-premium text-lg px-8 py-6 gap-2">
                Browse Auctions
                <ArrowRight className="w-5 h-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-display font-bold text-center mb-4">Ways to Get Your Vehicle</h2>
          <p className="text-muted-foreground text-center max-w-2xl mx-auto mb-12">
            After you pay, you choose how to take possession. All options are available from your 
            Payments Due page.
          </p>
          <div className="space-y-8 max-w-3xl mx-auto mb-16">
            {options.map((o, i) => (
              <div key={i} className="card-premium p-6 flex gap-6">
                <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                  <o.icon className="w-7 h-7 text-primary" />
                </div>
                <div>
                  <h3 className="font-display font-semibold text-lg mb-2">{o.title}</h3>
                  <p className="text-muted-foreground">{o.desc}</p>
                </div>
              </div>
            ))}
          </div>

          <h2 className="text-2xl font-display font-bold text-center mb-6">How It Works</h2>
          <div className="max-w-2xl mx-auto mb-16">
            <ol className="space-y-4">
              {steps.map((step, i) => (
                <li key={i} className="flex gap-4">
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary font-semibold">
                    {i + 1}
                  </span>
                  <span className="text-muted-foreground pt-1">{step}</span>
                </li>
              ))}
            </ol>
          </div>

          <div className="card-premium p-8 max-w-2xl mx-auto">
            <h3 className="font-display font-semibold text-lg mb-4 flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-primary" />
              Domestic & International
            </h3>
            <p className="text-muted-foreground mb-4">
              We support delivery within African countries and to key international ports. 
              Quotes are based on distance, vehicle size, and destination. You’ll see estimated 
              delivery cost before you confirm payment so there are no surprises.
            </p>
            <p className="text-muted-foreground">
              For international buyers, we work with export-ready logistics partners. Titles 
              and documentation can be arranged according to your country’s requirements—ask 
              our support team for details.
            </p>
          </div>
        </div>
      </section>

      <section className="py-20 bg-card/30">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl font-display font-bold mb-4">Win a Vehicle, We’ll Help You Get It</h2>
          <p className="text-muted-foreground mb-6 max-w-lg mx-auto">
            Browse auctions, place your bid, and when you win—we’ll guide you through payment 
            and delivery step by step.
          </p>
          <Link to="/auctions">
            <Button className="btn-premium gap-2">Browse Auctions</Button>
          </Link>
        </div>
      </section>
    </Layout>
  );
};

export default Shipping;
