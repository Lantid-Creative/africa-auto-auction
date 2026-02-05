import { Link } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Quote, Star, ArrowRight, Car, TrendingUp } from 'lucide-react';

const SuccessStories = () => {
  const stories = [
    {
      quote: 'I needed a reliable SUV for my family in Accra. I won a 2022 Toyota Land Cruiser at a fair price—below what dealers were asking—and had it delivered within two weeks. The whole process was transparent and stress-free.',
      name: 'Kwame A.',
      location: 'Accra, Ghana',
      role: 'Buyer',
    },
    {
      quote: 'We had three cars to offload from our fleet in Lagos. Listed them on AfriAuto and got more than we expected on every one. The buyers were serious, payment was secure, and we didn’t have to deal with tyre-kickers.',
      name: 'Chioma N.',
      location: 'Lagos, Nigeria',
      role: 'Seller',
    },
    {
      quote: 'I was looking for a specific BMW model. Set up an alert, got notified when one came up, placed a max bid, and won. No haggling, no hidden fees. Exactly what I wanted.',
      name: 'David M.',
      location: 'Nairobi, Kenya',
      role: 'Buyer',
    },
    {
      quote: 'Selling my Mercedes was easy. Good photos and an honest description led to 20+ bids. The winning bidder paid through the platform, and I had the money in my account within days. Will use AfriAuto again.',
      name: 'Amara O.',
      location: 'Abuja, Nigeria',
      role: 'Seller',
    },
  ];

  const stats = [
    { value: '50,000+', label: 'Active members' },
    { value: '2,500+', label: 'Vehicles sold' },
    { value: '4.8/5', label: 'Member rating' },
  ];

  return (
    <Layout>
      <section className="py-20 bg-gradient-hero">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-display font-bold mb-6">
              Success <span className="text-gold-gradient">Stories</span>
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed mb-8">
              Real buyers and sellers across Africa are getting better deals and a smoother 
              experience. Here’s what they’re saying about AfriAuto.
            </p>
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto mb-16">
            {stats.map((s, i) => (
              <div key={i} className="card-premium p-6 text-center">
                <p className="text-3xl font-display font-bold text-gold-gradient mb-2">{s.value}</p>
                <p className="text-muted-foreground">{s.label}</p>
              </div>
            ))}
          </div>

          <div className="space-y-8 max-w-3xl mx-auto">
            {stories.map((story, i) => (
              <div key={i} className="card-premium p-8">
                <Quote className="w-10 h-10 text-primary/30 mb-4" />
                <p className="text-muted-foreground leading-relaxed mb-6">"{story.quote}"</p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                    <span className="text-sm font-semibold text-primary">
                      {story.name.split(' ').map(n => n[0]).join('')}
                    </span>
                  </div>
                  <div>
                    <p className="font-semibold">{story.name}</p>
                    <p className="text-sm text-muted-foreground">
                      {story.role} · {story.location}
                    </p>
                  </div>
                  <div className="ml-auto flex gap-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star key={star} className="w-4 h-4 fill-primary text-primary" />
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-card/30">
        <div className="container mx-auto px-4">
          <div className="card-premium p-12 md:p-16 max-w-3xl mx-auto text-center">
            <TrendingUp className="w-12 h-12 text-primary mx-auto mb-6" />
            <h2 className="text-2xl font-display font-bold mb-4">Join Thousands of Satisfied Members</h2>
            <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
              Whether you’re buying your next car or selling one you no longer need, AfriAuto 
              gives you a fair, transparent, and secure way to get it done.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link to="/auctions">
                <Button className="btn-premium gap-2">
                  <Car className="w-4 h-4" />
                  Browse Auctions
                </Button>
              </Link>
              <Link to="/sell">
                <Button variant="outline" className="gap-2">
                  Sell Your Car
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default SuccessStories;
