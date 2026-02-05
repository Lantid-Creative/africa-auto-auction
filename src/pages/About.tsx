import Layout from '@/components/layout/Layout';
import { Gavel, Users, Globe, Shield, Target, Heart } from 'lucide-react';

const About = () => {
  const values = [
    {
      icon: Shield,
      title: 'Trust & Transparency',
      description: 'Every vehicle is thoroughly inspected and verified. We ensure complete transparency in all transactions.',
    },
    {
      icon: Globe,
      title: 'Pan-African Reach',
      description: 'Connecting buyers and sellers across 20+ African countries, making the continental car market accessible.',
    },
    {
      icon: Users,
      title: 'Community First',
      description: 'Building a community of car enthusiasts, collectors, and everyday buyers who share a passion for automobiles.',
    },
    {
      icon: Target,
      title: 'Innovation',
      description: 'Leveraging cutting-edge technology to provide the best online auction experience in Africa.',
    },
  ];

  const team = [
    {
      name: 'Damilola Yinusa',
      role: 'Founder & CEO',
      bio: 'Visionary entrepreneur passionate about transforming the African automotive market through technology.',
    },
  ];

  return (
    <Layout>
      {/* Hero Section */}
      <section className="py-20 bg-gradient-hero">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <div className="w-16 h-16 rounded-2xl bg-gradient-gold flex items-center justify-center mx-auto mb-6">
              <Gavel className="w-8 h-8 text-primary-foreground" />
            </div>
            <h1 className="text-4xl md:text-5xl font-display font-bold mb-6">
              About <span className="text-gold-gradient">AfriAuto</span>
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed">
              Africa's premier online car auction platform, connecting buyers and sellers 
              across the continent with trust, transparency, and technology.
            </p>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-3xl font-display font-bold mb-6">
                Our <span className="text-gold-gradient">Mission</span>
              </h2>
              <p className="text-muted-foreground text-lg leading-relaxed mb-6">
                AfriAuto was founded with a singular vision: to revolutionize how Africans 
                buy and sell vehicles. We believe everyone deserves access to a fair, 
                transparent, and exciting car buying experience.
              </p>
              <p className="text-muted-foreground text-lg leading-relaxed mb-6">
                Our platform bridges the gap between premium vehicle sellers and discerning 
                buyers across Africa, creating a marketplace where quality meets opportunity.
              </p>
              <p className="text-muted-foreground text-lg leading-relaxed">
                Whether you're looking for a luxury SUV, a classic collector's car, or a 
                reliable daily driver, AfriAuto provides the tools and trust you need to 
                make informed decisions.
              </p>
            </div>
            <div className="card-premium p-8">
              <div className="space-y-8">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                    <span className="text-3xl font-display font-bold text-gold-gradient">50K+</span>
                  </div>
                  <div>
                    <p className="font-semibold">Active Members</p>
                    <p className="text-sm text-muted-foreground">Buyers and sellers across Africa</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                    <span className="text-3xl font-display font-bold text-gold-gradient">2.5K+</span>
                  </div>
                  <div>
                    <p className="font-semibold">Vehicles Sold</p>
                    <p className="text-sm text-muted-foreground">Successfully auctioned and delivered</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                    <span className="text-3xl font-display font-bold text-gold-gradient">20+</span>
                  </div>
                  <div>
                    <p className="font-semibold">African Countries</p>
                    <p className="text-sm text-muted-foreground">Pan-continental coverage</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-card/30">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl font-display font-bold mb-4">
              Our <span className="text-gold-gradient">Values</span>
            </h2>
            <p className="text-muted-foreground text-lg">
              The principles that guide everything we do
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => (
              <div key={index} className="card-premium p-6 text-center group hover:border-primary/30 transition-all">
                <div className="w-14 h-14 rounded-xl bg-gradient-gold flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                  <value.icon className="w-7 h-7 text-primary-foreground" />
                </div>
                <h3 className="font-display font-semibold text-lg mb-2">{value.title}</h3>
                <p className="text-sm text-muted-foreground">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl font-display font-bold mb-4">
              Meet Our <span className="text-gold-gradient">Founder</span>
            </h2>
            <p className="text-muted-foreground text-lg">
              The visionary behind AfriAuto
            </p>
          </div>

          <div className="max-w-md mx-auto">
            {team.map((member, index) => (
              <div key={index} className="card-premium p-8 text-center">
                <div className="w-24 h-24 rounded-full bg-gradient-gold flex items-center justify-center mx-auto mb-6">
                  <span className="text-4xl font-display font-bold text-primary-foreground">
                    {member.name.split(' ').map(n => n[0]).join('')}
                  </span>
                </div>
                <h3 className="font-display font-semibold text-xl mb-1">{member.name}</h3>
                <p className="text-primary text-sm mb-4">{member.role}</p>
                <p className="text-muted-foreground">{member.bio}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-card/30">
        <div className="container mx-auto px-4">
          <div className="card-premium p-12 text-center relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-accent/5" />
            <div className="relative z-10">
              <Heart className="w-12 h-12 text-primary mx-auto mb-6" />
              <h2 className="text-3xl font-display font-bold mb-4">
                Join the AfriAuto Community
              </h2>
              <p className="text-muted-foreground text-lg mb-8 max-w-xl mx-auto">
                Be part of Africa's automotive revolution. Whether you're buying or selling, 
                we're here to make your journey exceptional.
              </p>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default About;
