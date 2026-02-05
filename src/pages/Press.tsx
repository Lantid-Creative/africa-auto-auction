import { Link } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Newspaper, Download, Mail, Quote, FileText, ArrowRight } from 'lucide-react';

const Press = () => {
  const stats = [
    { value: '50,000+', label: 'Active members' },
    { value: '20+', label: 'African countries' },
    { value: '$150M+', label: 'Total sales volume' },
  ];

  const pressReleases = [
    { date: '2024', title: 'AfriAuto Launches Pan-African Car Auction Platform', excerpt: 'First dedicated online auction platform for premium vehicles across the continent.' },
    { date: '2024', title: 'Partnership with Leading Logistics Providers', excerpt: 'Expanding domestic and international delivery options for buyers.' },
  ];

  return (
    <Layout>
      <section className="py-20 bg-gradient-hero">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <div className="w-16 h-16 rounded-2xl bg-gradient-gold flex items-center justify-center mx-auto mb-6">
              <Newspaper className="w-8 h-8 text-primary-foreground" />
            </div>
            <h1 className="text-4xl md:text-5xl font-display font-bold mb-6">
              Press & <span className="text-gold-gradient">Media</span>
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed">
              AfriAuto is Africa's premier online car auction platform. We connect buyers and sellers 
              across the continent with transparent, secure auctions. For media enquiries, press kit, 
              or interviews, get in touch below.
            </p>
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-display font-bold text-center mb-4">At a Glance</h2>
          <p className="text-muted-foreground text-center max-w-2xl mx-auto mb-12">
            Key numbers and facts about AfriAuto for your stories and reports.
          </p>
          <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto mb-16">
            {stats.map((s, i) => (
              <div key={i} className="card-premium p-8 text-center">
                <p className="text-3xl md:text-4xl font-display font-bold text-gold-gradient mb-2">{s.value}</p>
                <p className="text-muted-foreground">{s.label}</p>
              </div>
            ))}
          </div>

          <div className="max-w-2xl mx-auto mb-16">
            <h2 className="text-2xl font-display font-bold mb-6 flex items-center gap-2">
              <Quote className="w-6 h-6 text-primary" />
              Boilerplate
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              AfriAuto is Africa's leading online car auction platform, enabling buyers and sellers 
              across the continent to trade premium vehicles through transparent, real-time auctions. 
              With verified listings, secure payments, and domestic and international delivery options, 
              AfriAuto is building the trusted marketplace for Africa's automotive market. Learn more 
              at <a href="https://afriauto.com" className="text-primary hover:underline">afriauto.com</a>.
            </p>
          </div>

          <div className="max-w-2xl mx-auto">
            <h2 className="text-2xl font-display font-bold mb-6 flex items-center gap-2">
              <FileText className="w-6 h-6 text-primary" />
              Press Releases
            </h2>
            <div className="space-y-6">
              {pressReleases.map((pr, i) => (
                <div key={i} className="card-premium p-6">
                  <p className="text-sm text-muted-foreground mb-2">{pr.date}</p>
                  <h3 className="font-display font-semibold text-lg mb-2">{pr.title}</h3>
                  <p className="text-muted-foreground">{pr.excerpt}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-card/30">
        <div className="container mx-auto px-4">
          <div className="card-premium p-10 md:p-14 max-w-3xl mx-auto text-center">
            <Download className="w-12 h-12 text-primary mx-auto mb-6" />
            <h2 className="text-2xl font-display font-bold mb-4">Press Kit & Media Contact</h2>
            <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
              Download our logo, brand guidelines, and key assets. For interview requests, 
              quotes, or custom assets, contact our press team directly.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button className="btn-premium gap-2" asChild>
                <a href="mailto:press@afriauto.com">
                  <Mail className="w-4 h-4" />
                  press@afriauto.com
                </a>
              </Button>
              <Link to="/contact">
                <Button variant="outline" className="gap-2">
                  Contact Us
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
