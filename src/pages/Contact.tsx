import { useState } from 'react';
import { Link } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import { useLanguage } from '@/hooks/useLanguage';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Mail, Phone, MapPin, Clock, MessageCircle, ArrowRight, CheckCircle2 } from 'lucide-react';
import { toast } from 'sonner';

const Contact = () => {
  const { t } = useLanguage();
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    toast.success('Message received. We\'ll get back to you within 24 hours.');
  };

  const reasons = [
    { title: 'General enquiry', desc: 'Questions about how AfriAuto works, membership, or the platform.' },
    { title: 'Support with a transaction', desc: 'Help with a bid, payment, delivery, or a dispute.' },
    { title: 'Press & media', desc: 'Interview requests, press kit, or quotes. Use press@afriauto.com for faster response.' },
    { title: 'Careers', desc: 'Job applications or questions about working at AfriAuto. Use careers@afriauto.com.' },
  ];

  return (
    <Layout>
      <section className="py-20 bg-gradient-hero">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <MessageCircle className="w-16 h-16 text-primary mx-auto mb-6" />
            <h1 className="text-4xl md:text-5xl font-display font-bold mb-6">
              {t('footer.contactUs')}
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed">
              Have a question, need help with a transaction, or want to work with us? 
              Reach out and we'll get back to you as soon as we can—usually within 24 hours.
            </p>
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 max-w-5xl mx-auto">
            <div>
              <h2 className="text-2xl font-display font-bold mb-6">Get in Touch</h2>
              <div className="space-y-6 mb-10">
                <div className="flex items-start gap-4">
                  <Mail className="w-6 h-6 text-primary shrink-0 mt-1" />
                  <div>
                    <p className="font-semibold mb-1">Email</p>
                    <a href="mailto:contact@afriauto.com" className="text-primary hover:underline">
                      contact@afriauto.com
                    </a>
                    <p className="text-sm text-muted-foreground mt-1">For general enquiries and support</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <Phone className="w-6 h-6 text-primary shrink-0 mt-1" />
                  <div>
                    <p className="font-semibold mb-1">Phone</p>
                    <a href="tel:+234800273428868" className="text-primary hover:underline">
                      +234 800 AFRIAUTO
                    </a>
                    <p className="text-sm text-muted-foreground mt-1">Mon–Fri, 9am–6pm WAT</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <MapPin className="w-6 h-6 text-primary shrink-0 mt-1" />
                  <div>
                    <p className="font-semibold mb-1">Office</p>
                    <p className="text-muted-foreground">Lagos, Nigeria</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <Clock className="w-6 h-6 text-primary shrink-0 mt-1" />
                  <div>
                    <p className="font-semibold mb-1">Response time</p>
                    <p className="text-muted-foreground">We aim to reply within 24 hours on business days.</p>
                  </div>
                </div>
              </div>

              <div className="card-premium p-6">
                <h3 className="font-display font-semibold mb-4">What to include</h3>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex gap-2">
                    <CheckCircle2 className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                    Your registered email address
                  </li>
                  <li className="flex gap-2">
                    <CheckCircle2 className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                    A clear subject or topic (e.g. "Payment issue – auction #12345")
                  </li>
                  <li className="flex gap-2">
                    <CheckCircle2 className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                    As much detail as possible so we can help quickly
                  </li>
                </ul>
              </div>
            </div>

            <div className="card-premium p-8">
              <h2 className="text-2xl font-display font-bold mb-2">Send a message</h2>
              <p className="text-muted-foreground mb-6">
                Fill out the form and we'll get back to you. For urgent transaction issues, 
                email us directly with your auction or order reference.
              </p>
              {submitted ? (
                <div className="py-8 text-center">
                  <CheckCircle2 className="w-12 h-12 text-primary mx-auto mb-4" />
                  <p className="font-semibold mb-2">Message sent</p>
                  <p className="text-sm text-muted-foreground mb-6">
                    We've received your message and will respond within 24 hours.
                  </p>
                  <Button variant="outline" onClick={() => setSubmitted(false)}>
                    Send another message
                  </Button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <Label htmlFor="contact-name">Name</Label>
                    <Input id="contact-name" placeholder="Your name" className="mt-1" required />
                  </div>
                  <div>
                    <Label htmlFor="contact-email">Email</Label>
                    <Input id="contact-email" type="email" placeholder="you@example.com" className="mt-1" required />
                  </div>
                  <div>
                    <Label htmlFor="contact-subject">Subject</Label>
                    <Input id="contact-subject" placeholder="e.g. Payment question" className="mt-1" required />
                  </div>
                  <div>
                    <Label htmlFor="contact-message">Message</Label>
                    <Textarea
                      id="contact-message"
                      placeholder="How can we help?"
                      className="mt-1 min-h-[120px]"
                      required
                    />
                  </div>
                  <Button type="submit" className="btn-premium w-full gap-2">
                    Send message
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-card/30">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-display font-bold text-center mb-8">What do you need help with?</h2>
          <div className="grid md:grid-cols-2 gap-6 max-w-3xl mx-auto">
            {reasons.map((r, i) => (
              <div key={i} className="card-premium p-6">
                <h3 className="font-display font-semibold mb-2">{r.title}</h3>
                <p className="text-sm text-muted-foreground mb-4">{r.desc}</p>
                <Link to="/contact">
                  <Button variant="outline" size="sm" className="gap-1">
                    Contact us
                    <ArrowRight className="w-3 h-3" />
                  </Button>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-4 text-center">
          <p className="text-muted-foreground mb-6">
            Prefer to find the answer yourself? Check our{' '}
            <Link to="/help" className="text-primary hover:underline">Help Center</Link> and{' '}
            <Link to="/buyer-guide" className="text-primary hover:underline">Buyer</Link> or{' '}
            <Link to="/seller-guide" className="text-primary hover:underline">Seller</Link> guides.
          </p>
          <Link to="/auctions">
            <Button className="btn-premium gap-2">Browse Auctions</Button>
          </Link>
        </div>
      </section>
    </Layout>
  );
};

export default Contact;
