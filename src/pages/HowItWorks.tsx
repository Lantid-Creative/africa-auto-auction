import Layout from '@/components/layout/Layout';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { 
  UserPlus, 
  Search, 
  Gavel, 
  Trophy, 
  CreditCard, 
  Truck,
  Shield,
  CheckCircle2,
  ArrowRight,
  Car
} from 'lucide-react';

const HowItWorks = () => {
  const buyerSteps = [
    {
      icon: UserPlus,
      title: 'Create Your Account',
      description: 'Sign up in seconds using your Google or Apple account. Complete identity verification to start bidding.',
    },
    {
      icon: Search,
      title: 'Browse & Discover',
      description: 'Explore our curated selection of premium vehicles. Use filters to find exactly what you\'re looking for.',
    },
    {
      icon: Gavel,
      title: 'Place Your Bids',
      description: 'Set your maximum bid and let our system bid for you, or manually place bids in real-time.',
    },
    {
      icon: Trophy,
      title: 'Win the Auction',
      description: 'If you\'re the highest bidder when the auction ends, congratulations! The vehicle is yours.',
    },
    {
      icon: CreditCard,
      title: 'Secure Payment',
      description: 'Complete payment through our secure platform. We support multiple payment methods.',
    },
    {
      icon: Truck,
      title: 'Collect or Ship',
      description: 'Arrange pickup from the seller\'s location or use our shipping partners for delivery.',
    },
  ];

  const sellerSteps = [
    {
      icon: UserPlus,
      title: 'Register as a Seller',
      description: 'Create your account and complete the seller verification process.',
    },
    {
      icon: Car,
      title: 'Submit Your Vehicle',
      description: 'Provide detailed information, high-quality photos, and documentation for your vehicle.',
    },
    {
      icon: Shield,
      title: 'Admin Review',
      description: 'Our team reviews your submission to ensure quality and accuracy.',
    },
    {
      icon: Gavel,
      title: 'Go Live',
      description: 'Once approved, your vehicle goes live and buyers start bidding.',
    },
    {
      icon: Trophy,
      title: 'Auction Ends',
      description: 'When the auction ends, the highest bidder wins and you\'re notified.',
    },
    {
      icon: CreditCard,
      title: 'Get Paid',
      description: 'Receive payment securely through our platform once the buyer completes payment.',
    },
  ];

  const faqs = [
    {
      question: 'How do I know the vehicles are genuine?',
      answer: 'All vehicles undergo a thorough verification process. Sellers must provide documentation, and our team reviews each listing before it goes live.',
    },
    {
      question: 'What fees does AfriAuto charge?',
      answer: 'Buyers pay a 5% buyer\'s premium on the final sale price. Sellers pay a listing fee and a success fee upon sale. Contact us for detailed pricing.',
    },
    {
      question: 'Can I inspect a vehicle before bidding?',
      answer: 'Yes! You can arrange vehicle inspections with the seller. We recommend inspecting high-value vehicles before placing significant bids.',
    },
    {
      question: 'What payment methods are accepted?',
      answer: 'We accept bank transfers, credit/debit cards, and mobile money payments. All transactions are processed securely.',
    },
    {
      question: 'How does shipping work?',
      answer: 'We partner with reputable shipping companies across Africa. You can choose local pickup or arrange shipping through our platform.',
    },
  ];

  return (
    <Layout>
      {/* Hero Section */}
      <section className="py-20 bg-gradient-hero">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-display font-bold mb-6">
              How <span className="text-gold-gradient">AfriAuto</span> Works
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed">
              Whether you're buying or selling, our platform makes the process 
              simple, secure, and transparent.
            </p>
          </div>
        </div>
      </section>

      {/* For Buyers */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-display font-bold mb-4">
              For <span className="text-gold-gradient">Buyers</span>
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Find your dream car in six simple steps
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {buyerSteps.map((step, index) => (
              <div key={index} className="card-premium p-6 relative">
                <div className="absolute -top-3 -left-3 w-8 h-8 rounded-full bg-gradient-gold flex items-center justify-center text-sm font-bold text-primary-foreground">
                  {index + 1}
                </div>
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                  <step.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-display font-semibold text-lg mb-2">{step.title}</h3>
                <p className="text-muted-foreground text-sm">{step.description}</p>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link to="/auctions">
              <Button className="btn-premium gap-2">
                Start Browsing
                <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* For Sellers */}
      <section className="py-20 bg-card/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-display font-bold mb-4">
              For <span className="text-gold-gradient">Sellers</span>
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              List your vehicle and reach thousands of potential buyers
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {sellerSteps.map((step, index) => (
              <div key={index} className="card-premium p-6 relative">
                <div className="absolute -top-3 -left-3 w-8 h-8 rounded-full bg-gradient-gold flex items-center justify-center text-sm font-bold text-primary-foreground">
                  {index + 1}
                </div>
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                  <step.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-display font-semibold text-lg mb-2">{step.title}</h3>
                <p className="text-muted-foreground text-sm">{step.description}</p>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link to="/sell">
              <Button className="btn-premium gap-2">
                Sell Your Car
                <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-display font-bold mb-4">
              Frequently Asked <span className="text-gold-gradient">Questions</span>
            </h2>
          </div>

          <div className="max-w-3xl mx-auto space-y-4">
            {faqs.map((faq, index) => (
              <div key={index} className="card-premium p-6">
                <div className="flex items-start gap-4">
                  <CheckCircle2 className="w-5 h-5 text-primary mt-1 shrink-0" />
                  <div>
                    <h3 className="font-semibold mb-2">{faq.question}</h3>
                    <p className="text-muted-foreground text-sm">{faq.answer}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default HowItWorks;
