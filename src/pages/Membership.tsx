import { Link } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/hooks/useLanguage';
import { Check, FileCheck, User, Building2 } from 'lucide-react';

const Membership = () => {
  const { t } = useLanguage();

  const tiers = [
    {
      key: 'guest',
      icon: User,
      priceKey: 'membership.guestPrice',
      descKey: 'membership.guestDesc',
      cta: t('common.getStarted'),
      href: '/auth',
      featured: false,
    },
    {
      key: 'basic',
      icon: FileCheck,
      priceKey: 'membership.basicPrice',
      priceYearKey: 'membership.basicPriceYear',
      descKey: 'membership.basicDesc',
      cta: t('common.getStarted'),
      href: '/auth',
      featured: true,
    },
    {
      key: 'premier',
      icon: Building2,
      priceKey: 'membership.premierPrice',
      priceYearKey: 'membership.premierPriceYear',
      descKey: 'membership.premierDesc',
      cta: t('common.getStarted'),
      href: '/auth',
      featured: false,
    },
  ];

  return (
    <Layout>
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-3xl mx-auto text-center mb-14">
          <h1 className="text-3xl md:text-4xl font-display font-bold mb-4">
            {t('membership.title')}
          </h1>
          <p className="text-muted-foreground text-lg">
            {t('membership.subtitle')}
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto mb-16">
          {tiers.map((tier) => (
            <div
              key={tier.key}
              className={`card-premium p-6 flex flex-col ${
                tier.featured ? 'ring-2 ring-primary/50' : ''
              }`}
            >
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                <tier.icon className="w-6 h-6 text-primary" />
              </div>
              <h2 className="text-xl font-display font-bold mb-1">
                {t(`membership.${tier.key}`)}
              </h2>
              <p className="text-2xl font-display font-bold text-gold-gradient mb-2">
                {t(tier.priceKey)}
              </p>
              {'priceYearKey' in tier && (
                <p className="text-sm text-muted-foreground mb-4">
                  {t(tier.priceYearKey as string)}
                </p>
              )}
              <p className="text-sm text-muted-foreground flex-1 mb-6">
                {t(tier.descKey)}
              </p>
              <Link to={tier.href}>
                <Button
                  className={tier.featured ? 'btn-premium w-full' : 'w-full'}
                  variant={tier.featured ? 'default' : 'outline'}
                >
                  {tier.cta}
                </Button>
              </Link>
            </div>
          ))}
        </div>

        <div className="card-premium p-8 max-w-3xl mx-auto space-y-6">
          <h2 className="text-xl font-display font-bold">
            {t('membership.noLicenseRequired')}
          </h2>
          <p className="text-muted-foreground">
            {t('membership.noLicenseDesc')}
          </p>
          <h2 className="text-xl font-display font-bold pt-4">
            {t('membership.uploadDocuments')}
          </h2>
          <p className="text-muted-foreground">
            {t('membership.uploadDesc')}
          </p>
          <ul className="list-disc list-inside text-muted-foreground space-y-2">
            <li>Government-issued ID</li>
            <li>Business: dealer or exporter license (if applicable)</li>
            <li>State/country-specific documents may apply</li>
          </ul>
          <p className="text-sm text-muted-foreground italic">
            {t('disclaimer.documentsRequired')}
          </p>
        </div>
      </div>
    </Layout>
  );
};

export default Membership;
