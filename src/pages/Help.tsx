import Layout from '@/components/layout/Layout';
import { useLanguage } from '@/hooks/useLanguage';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { HelpCircle, ArrowRight } from 'lucide-react';

const Help = () => {
  const { t } = useLanguage();

  return (
    <Layout>
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-2xl mx-auto text-center">
          <HelpCircle className="w-16 h-16 text-primary mx-auto mb-6" />
          <h1 className="text-3xl font-display font-bold mb-4">{t('nav.helpCenter')}</h1>
          <p className="text-muted-foreground mb-8">
            Find answers, how-to guides, and contact support. Our Help Center is here for you.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/buyer-guide">
              <Button variant="outline" className="gap-2">
                {t('footer.buyerGuide')}
                <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
            <Link to="/how-it-works">
              <Button variant="outline" className="gap-2">
                {t('footer.howItWorks')}
                <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
            <Link to="/contact">
              <Button className="btn-premium gap-2">
                {t('footer.contactUs')}
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Help;
