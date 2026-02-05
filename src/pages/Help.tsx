import Layout from '@/components/layout/Layout';
import { useLanguage } from '@/hooks/useLanguage';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import {
  HelpCircle,
  ArrowRight,
  BookOpen,
  CreditCard,
  Truck,
  Car,
  Gavel,
  FileQuestion,
  MessageCircle,
} from 'lucide-react';

const Help = () => {
  const { t } = useLanguage();

  const categories = [
    {
      icon: BookOpen,
      title: 'Getting Started',
      desc: 'Create an account, choose your membership, and understand how auctions work.',
      links: [
        { label: 'How It Works', href: '/how-it-works' },
        { label: 'Membership Options', href: '/membership' },
        { label: 'Buyer Guide', href: '/buyer-guide' },
      ],
    },
    {
      icon: Gavel,
      title: 'Bidding & Buying',
      desc: 'Find vehicles, place bids, and win auctions. Understand max bids and buy-it-now.',
      links: [
        { label: 'Browse Auctions', href: '/auctions' },
        { label: 'Buyer Guide', href: '/buyer-guide' },
        { label: 'Payment & Financing', href: '/financing' },
      ],
    },
    {
      icon: Car,
      title: 'Selling',
      desc: 'List your vehicle, set a reserve, and get paid. Tips for a fast, successful sale.',
      links: [
        { label: 'Seller Guide', href: '/seller-guide' },
        { label: 'Sell Your Car', href: '/sell' },
        { label: 'Pricing & Fees', href: '/pricing' },
      ],
    },
    {
      icon: CreditCard,
      title: 'Payments & Fees',
      desc: 'How to pay for a winning bid, what fees apply, and escrow protection.',
      links: [
        { label: 'Financing & Payment', href: '/financing' },
        { label: 'Pricing', href: '/pricing' },
      ],
    },
    {
      icon: Truck,
      title: 'Delivery & Shipping',
      desc: 'Get your vehicle from the seller. Domestic and international options.',
      links: [
        { label: 'Shipping & Delivery', href: '/shipping' },
      ],
    },
  ];

  const faqs = [
    {
      q: 'How do I place a bid?',
      a: 'Create an account (or sign in), go to the vehicle’s auction page, and enter your bid or set a max bid. Make sure your membership allows bidding and that you have sufficient buying power. Bids are binding.',
    },
    {
      q: 'When do I pay after winning?',
      a: 'After the auction ends, the winning bidder sees the vehicle in "Payments Due." Complete payment within the stated period (usually 2–5 business days) using your preferred payment method.',
    },
    {
      q: 'How do I sell my car?',
      a: 'Sign in, go to Sell Your Car, and submit your vehicle with photos and details. Our team reviews listings; once approved, your auction goes live. When it sells, the buyer pays through the platform and you arrange handover or delivery.',
    },
    {
      q: 'Is my payment secure?',
      a: 'Yes. We use secure payment processors and hold buyer funds in escrow until the vehicle is delivered or the delivery window has passed. Sellers are paid after the buyer confirms receipt.',
    },
    {
      q: 'Can I get a refund on my membership?',
      a: 'New memberships are fully refundable if you have not used them (no open bids or invoices) within the first 7 days. Contact support to request a refund.',
    },
  ];

  return (
    <Layout>
      <section className="py-20 bg-gradient-hero">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <HelpCircle className="w-16 h-16 text-primary mx-auto mb-6" />
            <h1 className="text-4xl md:text-5xl font-display font-bold mb-6">
              {t('nav.helpCenter')}
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed mb-8">
              Find answers, step-by-step guides, and tips to buy and sell with confidence. 
              Can't find what you need? Our team is here to help.
            </p>
            <Link to="/contact">
              <Button className="btn-premium text-lg px-8 py-6 gap-2">
                <MessageCircle className="w-5 h-5" />
                Contact Support
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-display font-bold text-center mb-4">Browse by Topic</h2>
          <p className="text-muted-foreground text-center max-w-2xl mx-auto mb-12">
            Jump to the guides and pages that match your question.
          </p>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto mb-16">
            {categories.map((cat, i) => (
              <div key={i} className="card-premium p-6">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                  <cat.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-display font-semibold text-lg mb-2">{cat.title}</h3>
                <p className="text-sm text-muted-foreground mb-4">{cat.desc}</p>
                <ul className="space-y-2">
                  {cat.links.map((link) => (
                    <li key={link.href}>
                      <Link
                        to={link.href}
                        className="text-sm text-primary hover:underline flex items-center gap-1"
                      >
                        {link.label}
                        <ArrowRight className="w-3 h-3" />
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <h2 className="text-2xl font-display font-bold text-center mb-8 flex items-center gap-2 justify-center">
            <FileQuestion className="w-6 h-6 text-primary" />
            Frequently Asked Questions
          </h2>
          <div className="space-y-4 max-w-3xl mx-auto mb-16">
            {faqs.map((faq, i) => (
              <div key={i} className="card-premium p-6">
                <h3 className="font-display font-semibold mb-2">{faq.q}</h3>
                <p className="text-muted-foreground text-sm">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-card/30">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl font-display font-bold mb-4">Still Have Questions?</h2>
          <p className="text-muted-foreground mb-6 max-w-lg mx-auto">
            Our support team typically responds within 24 hours. Include your account email and 
            a clear description of your issue or question.
          </p>
          <Link to="/contact">
            <Button className="btn-premium gap-2">Contact Us</Button>
          </Link>
        </div>
      </section>
    </Layout>
  );
};

export default Help;
