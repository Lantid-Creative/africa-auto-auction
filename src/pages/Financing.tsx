import { Link } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { CreditCard, Shield, Wallet, CheckCircle2, ArrowRight } from 'lucide-react';

const Financing = () => {
  const methods = [
    { icon: CreditCard, title: 'Credit & Debit Cards', desc: 'Pay with Visa, Mastercard, or local cards. Instant confirmation.' },
    { icon: Wallet, title: 'ePay & Wallets', desc: 'Use mobile money and digital wallets where available in your country.' },
    { icon: Shield, title: 'Secure Escrow', desc: 'Funds are held securely until the vehicle is delivered as described.' },
  ];

  const faqs = [
    {
      q: 'When do I pay for a vehicle I won?',
      a: 'After the auction ends, you’ll see the vehicle in your "Payments Due" section. Complete payment within the stated timeframe (typically 2–5 business days) to secure the vehicle and avoid cancellation.',
    },
    {
      q: 'Are there financing or payment plans?',
      a: 'We accept full payment at checkout. For larger amounts, consider using a credit card or speaking to your bank about a personal loan. We’re exploring partner financing options for the future.',
    },
    {
      q: 'What fees will I pay?',
      a: 'Fees depend on your membership level, whether you bought in or outside an auction, and the vehicle’s title type. All fees are shown clearly before you confirm payment. No hidden charges.',
    },
    {
      q: 'Is my payment secure?',
      a: 'Yes. We use industry-standard encryption and secure payment processors. Your card details are never stored on our servers. Escrow protects both buyer and seller until delivery is complete.',
    },
  ];

  return (
    <Layout>
      <section className="py-20 bg-gradient-hero">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <div className="w-16 h-16 rounded-2xl bg-gradient-gold flex items-center justify-center mx-auto mb-6">
              <CreditCard className="w-8 h-8 text-primary-foreground" />
            </div>
            <h1 className="text-4xl md:text-5xl font-display font-bold mb-6">
              Payment & <span className="text-gold-gradient">Financing</span>
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed mb-8">
              Pay for your winning bids with confidence. We support multiple payment methods 
              and hold funds securely until your vehicle is delivered. No surprises—all fees 
              are shown upfront.
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
          <h2 className="text-3xl font-display font-bold text-center mb-4">How Payment Works</h2>
          <p className="text-muted-foreground text-center max-w-2xl mx-auto mb-12">
            After you win an auction, you pay through your AfriAuto account. We keep your money 
            safe until the vehicle is delivered and you’re satisfied.
          </p>
          <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto mb-16">
            {methods.map((m, i) => (
              <div key={i} className="card-premium p-6 text-center">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <m.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-display font-semibold mb-2">{m.title}</h3>
                <p className="text-sm text-muted-foreground">{m.desc}</p>
              </div>
            ))}
          </div>

          <div className="max-w-2xl mx-auto">
            <h2 className="text-2xl font-display font-bold mb-6 flex items-center gap-2">
              <CheckCircle2 className="w-6 h-6 text-primary" />
              Why Buyers Trust Our Payments
            </h2>
            <ul className="space-y-4 text-muted-foreground">
              <li className="flex gap-3">
                <CheckCircle2 className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                <span><strong className="text-foreground">Escrow protection:</strong> Your payment is released to the seller only after you confirm delivery or the delivery window has passed as agreed.</span>
              </li>
              <li className="flex gap-3">
                <CheckCircle2 className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                <span><strong className="text-foreground">Clear fees:</strong> You see the total amount—vehicle price plus any fees—before you confirm. No hidden charges.</span>
              </li>
              <li className="flex gap-3">
                <CheckCircle2 className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                <span><strong className="text-foreground">Dispute support:</strong> If something isn’t as described, our team can help mediate before funds are released.</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      <section className="py-20 bg-card/30">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-display font-bold text-center mb-12">Frequently Asked Questions</h2>
          <div className="space-y-6 max-w-3xl mx-auto">
            {faqs.map((faq, i) => (
              <div key={i} className="card-premium p-6">
                <h3 className="font-display font-semibold text-lg mb-2">{faq.q}</h3>
                <p className="text-muted-foreground">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl font-display font-bold mb-4">Ready to Bid?</h2>
          <p className="text-muted-foreground mb-6 max-w-lg mx-auto">
            Create a free account, browse live auctions, and when you win—pay securely in one place.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/auctions">
              <Button className="btn-premium gap-2">Browse Auctions</Button>
            </Link>
            <Link to="/membership">
              <Button variant="outline" className="gap-2">View Membership Options</Button>
            </Link>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Financing;
