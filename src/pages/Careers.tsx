import { Link } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import {
  Rocket,
  Globe,
  Heart,
  Zap,
  ArrowRight,
  CheckCircle2,
  Briefcase,
} from 'lucide-react';

const Careers = () => {
  const benefits = [
    'Competitive salary and performance bonuses',
    'Remote-first with hubs in Lagos, Nairobi, and Johannesburg',
    'Health insurance and wellness allowance',
    'Learning budget for courses and conferences',
    'Equity options for full-time team members',
    'Flexible hours and generous leave',
  ];

  const values = [
    { icon: Rocket, title: 'Move fast', desc: 'We ship quickly and iterate. Your ideas can go live in weeks.' },
    { icon: Globe, title: 'Africa-first', desc: 'We build for the continent. Local context and languages matter.' },
    { icon: Heart, title: 'Customer obsessed', desc: 'Every feature and decision starts with our buyers and sellers.' },
    { icon: Zap, title: 'Own it', desc: 'Take ownership. We trust you to drive outcomes, not just tasks.' },
  ];

  const openRoles = [
    { title: 'Senior Frontend Engineer', team: 'Engineering', location: 'Remote (Africa)' },
    { title: 'Product Designer', team: 'Design', location: 'Lagos or Remote' },
    { title: 'Customer Success Lead', team: 'Operations', location: 'Lagos' },
    { title: 'Marketing Manager', team: 'Growth', location: 'Remote (Africa)' },
  ];

  return (
    <Layout>
      <section className="py-20 bg-gradient-hero">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-display font-bold mb-6">
              Build the Future of <span className="text-gold-gradient">Car Auctions</span> in Africa
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed mb-8">
              We're on a mission to make buying and selling cars across Africa transparent, 
              secure, and rewarding. Join a team that's redefining an industry.
            </p>
            <Link to="/contact">
              <Button className="btn-premium text-lg px-8 py-6 gap-2">
                Get in Touch
                <ArrowRight className="w-5 h-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-display font-bold text-center mb-4">Why Join AfriAuto?</h2>
          <p className="text-muted-foreground text-center max-w-2xl mx-auto mb-12">
            We're a small, high-impact team. Your work directly shapes how thousands of people 
            buy and sell vehicles across the continent.
          </p>
          <ul className="grid md:grid-cols-2 gap-4 max-w-3xl mx-auto mb-16">
            {benefits.map((item, i) => (
              <li key={i} className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                <span className="text-muted-foreground">{item}</span>
              </li>
            ))}
          </ul>

          <h2 className="text-3xl font-display font-bold text-center mb-12">How We Work</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((v, i) => (
              <div key={i} className="card-premium p-6 text-center">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <v.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-display font-semibold mb-2">{v.title}</h3>
                <p className="text-sm text-muted-foreground">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-card/30">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-3 justify-center mb-8">
            <Briefcase className="w-8 h-8 text-primary" />
            <h2 className="text-3xl font-display font-bold">Open Roles</h2>
          </div>
          <p className="text-muted-foreground text-center max-w-xl mx-auto mb-12">
            We're always looking for talented people. Don't see a fit? Send us your CV and tell us 
            how you'd contribute—we love hearing from driven candidates.
          </p>
          <div className="space-y-4 max-w-2xl mx-auto">
            {openRoles.map((role, i) => (
              <div key={i} className="card-premium p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h3 className="font-display font-semibold text-lg">{role.title}</h3>
                  <p className="text-sm text-muted-foreground">
                    {role.team} · {role.location}
                  </p>
                </div>
                <Link to="/contact">
                  <Button variant="outline" className="gap-2">
                    Apply
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                </Link>
              </div>
            ))}
          </div>
          <p className="text-center text-muted-foreground mt-8">
            Email <a href="mailto:careers@afriauto.com" className="text-primary hover:underline">careers@afriauto.com</a> with the role title in the subject line.
          </p>
        </div>
      </section>

      <section className="py-20">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl font-display font-bold mb-4">Ready to Apply?</h2>
          <p className="text-muted-foreground mb-6 max-w-lg mx-auto">
            Tell us about yourself and why you want to join AfriAuto. We respond to every application.
          </p>
          <Link to="/contact">
            <Button className="btn-premium gap-2">Contact Us</Button>
          </Link>
        </div>
      </section>
    </Layout>
  );
};

export default Careers;
