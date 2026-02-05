import { Link } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';

const Privacy = () => {
  return (
    <Layout>
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-3xl mx-auto">
          <Link to="/" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-8">
            <ArrowLeft className="w-4 h-4" />
            Back to home
          </Link>

          <h1 className="text-4xl font-display font-bold mb-4">Privacy Policy</h1>
          <p className="text-muted-foreground mb-8">Last updated: 2024</p>

          <div className="prose prose-invert max-w-none space-y-8 text-muted-foreground">
            <section>
              <h2 className="text-xl font-display font-semibold text-foreground mb-3">1. Introduction</h2>
              <p>
                AfriAuto ("we," "our," or "us") respects your privacy. This policy describes what data we 
                collect, how we use it, and your rights. By using our platform, you consent to the 
                practices described here. We may update this policy; we will notify you of material 
                changes via email or a notice on the platform.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-display font-semibold text-foreground mb-3">2. Information We Collect</h2>
              <p className="mb-3">We collect:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li><strong className="text-foreground">Account data:</strong> name, email, profile photo (if you use Google/Apple sign-in), and any details you add (e.g. phone, address for delivery).</li>
                <li><strong className="text-foreground">Transaction data:</strong> bids, listings, payments, and communications related to auctions.</li>
                <li><strong className="text-foreground">Usage data:</strong> how you use the platform (e.g. pages visited, searches) and device information (e.g. browser, IP address) for security and improving the service.</li>
                <li><strong className="text-foreground">Documents:</strong> ID or business documents you upload for verification, as required by our policies or law.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-display font-semibold text-foreground mb-3">3. How We Use Your Information</h2>
              <p>
                We use your information to: provide and improve the platform; process transactions and 
                hold funds in escrow; verify identity and prevent fraud; communicate with you (e.g. 
                auction updates, support, marketing where you have opted in); enforce our terms and 
                policies; and comply with law. We may use aggregated or anonymized data for analytics 
                and product development.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-display font-semibold text-foreground mb-3">4. Sharing of Information</h2>
              <p>
                We may share your information with: payment and identity verification partners; 
                logistics partners (e.g. for delivery); other users as needed to complete a 
                transaction (e.g. buyer and seller see relevant contact/delivery details); and 
                authorities when required by law or to protect rights and safety. We do not 
                sell your personal data to third parties for their marketing.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-display font-semibold text-foreground mb-3">5. Data Retention and Security</h2>
              <p>
                We retain your data for as long as your account is active and as needed for legal, 
                tax, or dispute purposes. We use reasonable technical and organisational measures 
                to protect your data; no system is completely secure, and you use the platform at 
                your own risk.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-display font-semibold text-foreground mb-3">6. Your Rights</h2>
              <p>
                Depending on your location, you may have the right to: access, correct, or delete 
                your personal data; object to or restrict certain processing; data portability; and 
                withdraw consent. To exercise these rights, contact us at{' '}
                <a href="mailto:privacy@afriauto.com" className="text-primary hover:underline">privacy@afriauto.com</a>. 
                You may also have the right to complain to a data protection authority.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-display font-semibold text-foreground mb-3">7. Cookies and Similar Technologies</h2>
              <p>
                We use cookies and similar technologies for authentication, preferences, analytics, 
                and security. You can control cookies through your browser settings; some features 
                may not work if you disable them.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-display font-semibold text-foreground mb-3">8. Contact</h2>
              <p>
                For privacy questions or requests, contact us at{' '}
                <a href="mailto:privacy@afriauto.com" className="text-primary hover:underline">privacy@afriauto.com</a> or 
                via our <Link to="/contact" className="text-primary hover:underline">Contact</Link> page.
              </p>
            </section>
          </div>

          <div className="mt-12 pt-8 border-t border-border/50">
            <Link to="/">
              <Button variant="outline" className="gap-2">
                <ArrowLeft className="w-4 h-4" />
                Back to home
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Privacy;
