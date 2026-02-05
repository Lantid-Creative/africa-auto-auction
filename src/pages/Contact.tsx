import Layout from '@/components/layout/Layout';
import { useLanguage } from '@/hooks/useLanguage';
import { Mail, Phone, MapPin } from 'lucide-react';

const Contact = () => {
  const { t } = useLanguage();

  return (
    <Layout>
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-2xl mx-auto">
          <h1 className="text-3xl font-display font-bold mb-4">{t('footer.contactUs')}</h1>
          <p className="text-muted-foreground mb-8">
            Get in touch with our team. We typically respond within 24 hours.
          </p>
          <div className="card-premium p-6 space-y-6">
            <div className="flex items-center gap-4">
              <Mail className="w-6 h-6 text-primary" />
              <div>
                <p className="font-medium">Email</p>
                <a href="mailto:contact@afriauto.com" className="text-primary hover:underline">
                  contact@afriauto.com
                </a>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <Phone className="w-6 h-6 text-primary" />
              <div>
                <p className="font-medium">Phone</p>
                <a href="tel:+234800273428868" className="text-primary hover:underline">
                  +234 800 AFRIAUTO
                </a>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <MapPin className="w-6 h-6 text-primary" />
              <div>
                <p className="font-medium">Office</p>
                <p className="text-muted-foreground">Lagos, Nigeria</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Contact;
