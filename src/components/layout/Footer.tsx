import { Link } from 'react-router-dom';
import {
  Gavel,
  Mail,
  Phone,
  MapPin,
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  Smartphone,
} from 'lucide-react';
import { useLanguage } from '@/hooks/useLanguage';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const { t } = useLanguage();

  const footerSections = [
    {
      titleKey: 'footer.company',
      links: [
        { nameKey: 'footer.aboutUs', href: '/about' },
        { nameKey: 'footer.howItWorks', href: '/how-it-works' },
        { nameKey: 'footer.careers', href: '/careers' },
        { nameKey: 'footer.press', href: '/press' },
      ],
    },
    {
      titleKey: 'footer.forBuyers',
      links: [
        { nameKey: 'footer.browseAuctions', href: '/auctions' },
        { nameKey: 'footer.buyerGuide', href: '/buyer-guide' },
        { nameKey: 'footer.financing', href: '/financing' },
        { nameKey: 'footer.shipping', href: '/shipping' },
      ],
    },
    {
      titleKey: 'footer.forSellers',
      links: [
        { nameKey: 'footer.sellYourCar', href: '/sell' },
        { nameKey: 'footer.sellerGuide', href: '/seller-guide' },
        { nameKey: 'footer.pricing', href: '/pricing' },
        { nameKey: 'footer.successStories', href: '/success-stories' },
      ],
    },
    {
      titleKey: 'footer.support',
      links: [
        { nameKey: 'footer.helpCenter', href: '/help' },
        { nameKey: 'footer.contactUs', href: '/contact' },
        { nameKey: 'footer.termsOfService', href: '/terms' },
        { nameKey: 'footer.privacyPolicy', href: '/privacy' },
      ],
    },
  ];

  const usefulLinks = [
    { nameKey: 'footer.vehicleFinder', href: '/auctions' },
    { nameKey: 'footer.auctionCalendar', href: '/auctions' },
    { nameKey: 'footer.paymentPickup', href: '/how-it-works' },
    { nameKey: 'footer.domesticDelivery', href: '/shipping' },
    { nameKey: 'footer.internationalDelivery', href: '/shipping' },
  ];

  const socialLinks = [
    { icon: Facebook, href: '#', label: 'Facebook' },
    { icon: Twitter, href: '#', label: 'Twitter' },
    { icon: Instagram, href: '#', label: 'Instagram' },
    { icon: Linkedin, href: '#', label: 'LinkedIn' },
  ];

  return (
    <footer className="bg-card border-t border-border/50" id="footer-container">
      {/* Main Footer */}
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-12">
          {/* Brand Column */}
          <div className="lg:col-span-2">
            <Link to="/" className="flex items-center gap-2 mb-6">
              <div className="w-10 h-10 rounded-lg bg-gradient-gold flex items-center justify-center">
                <Gavel className="w-5 h-5 text-primary-foreground" />
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-display font-bold text-gold-gradient">
                  {t('common.appName')}
                </span>
                <span className="text-[10px] uppercase tracking-wider text-muted-foreground -mt-1">
                  {t('common.tagline')}
                </span>
              </div>
            </Link>
            <p className="text-muted-foreground text-sm mb-6 max-w-xs">
              Africa's premier car auction platform. Buy and sell premium
              vehicles with confidence through our transparent, secure auction
              process.
            </p>
            <div className="space-y-3 text-sm text-muted-foreground">
              <div className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-primary" />
                <span>contact@afriauto.com</span>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-primary" />
                <span>+234 800 AFRIAUTO</span>
              </div>
              <div className="flex items-center gap-3">
                <MapPin className="w-4 h-4 text-primary" />
                <span>Lagos, Nigeria</span>
              </div>
            </div>

            {/* Download the App */}
            <div className="mt-8 p-4 rounded-xl bg-muted/30 border border-border/50">
              <div className="flex items-center gap-2 mb-2">
                <Smartphone className="w-5 h-5 text-primary" />
                <span className="font-display font-semibold">
                  {t('footer.downloadApp')}
                </span>
              </div>
              <p className="text-xs text-muted-foreground mb-3">
                {t('footer.downloadAppDesc')}
              </p>
              <div className="flex gap-2">
                <a
                  href="#"
                  className="text-xs px-3 py-2 rounded-lg bg-foreground text-background hover:opacity-90"
                >
                  App Store
                </a>
                <a
                  href="#"
                  className="text-xs px-3 py-2 rounded-lg bg-foreground text-background hover:opacity-90"
                >
                  Google Play
                </a>
              </div>
            </div>
          </div>

          {/* Link Columns */}
          {footerSections.map((section) => (
            <div key={section.titleKey}>
              <h4 className="font-display font-semibold text-foreground mb-4">
                {t(section.titleKey)}
              </h4>
              <ul className="space-y-3">
                {section.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      to={link.href}
                      className="text-sm text-muted-foreground hover:text-primary transition-colors"
                    >
                      {t(link.nameKey)}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Useful Links - Copart style */}
        <div className="mt-12 pt-8 border-t border-border/50">
          <h4 className="font-display font-semibold text-foreground mb-4">
            {t('footer.usefulLinks')}
          </h4>
          <div className="flex flex-wrap gap-x-6 gap-y-2">
            {usefulLinks.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                className="text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                {t(link.nameKey)}
              </Link>
            ))}
          </div>
        </div>

        {/* Disclaimers */}
        <div className="mt-8 p-4 rounded-lg bg-muted/20 border border-border/50">
          <p className="text-xs text-muted-foreground">
            <strong className="text-foreground/80">Disclaimer:</strong>{' '}
            {t('disclaimer.bidBinding')} {t('disclaimer.noDriveOff')}{' '}
            {t('disclaimer.feesVary')}
          </p>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-border/50">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="text-sm text-muted-foreground">
              © {currentYear} {t('common.appName')}. {t('footer.copyright')}
            </div>
            <div className="flex items-center gap-4">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  aria-label={social.label}
                  className="w-9 h-9 rounded-full bg-muted flex items-center justify-center text-muted-foreground hover:bg-primary hover:text-primary-foreground transition-all duration-200"
                >
                  <social.icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
