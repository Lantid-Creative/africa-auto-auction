import Layout from '@/components/layout/Layout';
import { useLanguage } from '@/hooks/useLanguage';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Gavel, FileText, Truck, CreditCard, ArrowRight } from 'lucide-react';

const BuyerGuide = () => {
  const { t } = useLanguage();

  return (
    <Layout>
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-display font-bold mb-4">
            {t('buyerGuide.title')}
          </h1>
          <p className="text-muted-foreground text-lg mb-12">
            {t('buyerGuide.intro')}
          </p>

          <div className="space-y-10">
            <section className="card-premium p-6">
              <div className="flex items-center gap-3 mb-4">
                <FileText className="w-6 h-6 text-primary" />
                <h2 className="text-xl font-display font-bold">{t('buyerGuide.vehicleDetails')}</h2>
              </div>
              <p className="text-muted-foreground">{t('buyerGuide.vehicleDetailsDesc')}</p>
            </section>

            <section className="card-premium p-6">
              <div className="flex items-center gap-3 mb-4">
                <Gavel className="w-6 h-6 text-primary" />
                <h2 className="text-xl font-display font-bold">{t('buyerGuide.closerLook')}</h2>
              </div>
              <p className="text-muted-foreground">{t('buyerGuide.closerLookDesc')}</p>
            </section>

            <section className="card-premium p-6">
              <h2 className="text-xl font-display font-bold mb-4">{t('buyerGuide.waysToBid')}</h2>
              <ul className="space-y-2 text-muted-foreground">
                <li>• {t('buyerGuide.liveAuction')}</li>
                <li>• {t('buyerGuide.maxBid')}</li>
                <li>• {t('buyerGuide.buyItNow')}</li>
                <li>• {t('buyerGuide.makeOffer')}</li>
              </ul>
            </section>

            <section className="card-premium p-6">
              <div className="flex items-center gap-3 mb-4">
                <CreditCard className="w-6 h-6 text-primary" />
                <h2 className="text-xl font-display font-bold">{t('buyerGuide.payForVehicles')}</h2>
              </div>
              <p className="text-muted-foreground">{t('buyerGuide.payDesc')}</p>
            </section>

            <section className="card-premium p-6">
              <div className="flex items-center gap-3 mb-4">
                <Truck className="w-6 h-6 text-primary" />
                <h2 className="text-xl font-display font-bold">{t('buyerGuide.getVehicles')}</h2>
              </div>
              <p className="text-muted-foreground">{t('buyerGuide.getDesc')}</p>
            </section>
          </div>

          <div className="mt-12 flex flex-wrap gap-4">
            <Link to="/auctions">
              <Button className="btn-premium gap-2">
                Browse Auctions
                <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
            <Link to="/membership">
              <Button variant="outline" className="gap-2">
                {t('nav.membership')}
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default BuyerGuide;
