import { Link } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';

const Terms = () => {
  return (
    <Layout>
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-3xl mx-auto">
          <Link to="/" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-8">
            <ArrowLeft className="w-4 h-4" />
            Back to home
          </Link>

          <h1 className="text-4xl font-display font-bold mb-4">Terms of Service</h1>
          <p className="text-muted-foreground mb-8">Last updated: 2024</p>

          <div className="prose prose-invert max-w-none space-y-8 text-muted-foreground">
            <section>
              <h2 className="text-xl font-display font-semibold text-foreground mb-3">1. Acceptance of Terms</h2>
              <p>
                By accessing or using AfriAuto ("the Platform"), you agree to be bound by these Terms of Service. 
                If you do not agree, do not use the Platform. We may update these terms from time to time; 
                continued use after changes constitutes acceptance.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-display font-semibold text-foreground mb-3">2. Description of Service</h2>
              <p>
                AfriAuto provides an online marketplace for buying and selling vehicles through auctions. 
                We facilitate listings, bidding, payments, and related services. We are not a dealer, 
                owner, or guarantor of any vehicle; we connect buyers and sellers. All transactions 
                are between users, subject to these terms and our policies.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-display font-semibold text-foreground mb-3">3. Accounts and Eligibility</h2>
              <p>
                You must be at least 18 years old and able to form a binding contract to use the Platform. 
                You are responsible for keeping your account credentials secure and for all activity under 
                your account. You must provide accurate information and update it as needed. We may suspend 
                or terminate accounts that violate these terms or for other reasons we deem appropriate.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-display font-semibold text-foreground mb-3">4. Bidding and Buying</h2>
              <p>
                When you place a bid, you are making a legally binding offer to buy the vehicle at that price 
                if you are the winning bidder when the auction ends. You must have the intent and ability 
                to complete the purchase. Winning bidders must pay within the stated timeframe and comply 
                with our payment and delivery procedures. Failure to pay may result in cancellation, 
                fees, and restriction of your account.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-display font-semibold text-foreground mb-3">5. Listing and Selling</h2>
              <p>
                Sellers must provide accurate descriptions and images of vehicles. Listings are subject 
                to our review and approval. You may not list vehicles you do not have the right to sell. 
                When your vehicle sells, you must complete the transaction as described and cooperate 
                with delivery or pickup. Our seller fees apply as set out in our Pricing page and in 
                your seller dashboard.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-display font-semibold text-foreground mb-3">6. Payments and Fees</h2>
              <p>
                Payments are processed through our designated payment providers. Buyer payments may be 
                held in escrow until delivery is confirmed or the delivery window has passed. Fees (membership, 
                listing, success, delivery, etc.) are as displayed at the time of the relevant action. 
                You are responsible for any taxes that apply to your transactions.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-display font-semibold text-foreground mb-3">7. Disclaimers</h2>
              <p>
                The Platform is provided "as is." We do not guarantee the quality, condition, or legality 
                of any vehicle, or the accuracy of listings. We are not liable for user conduct, 
                delivery delays, or losses arising from your use of the Platform beyond what is 
                required by applicable law. Our liability is limited as set out in these terms.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-display font-semibold text-foreground mb-3">8. Disputes</h2>
              <p>
                Disputes between users should be resolved between the parties. We may assist in 
                mediation and may withhold or release funds in accordance with our policies. 
                Disputes with AfriAuto are subject to the laws and courts of the jurisdiction 
                specified in our policies (e.g. Nigeria), to the extent permitted by law.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-display font-semibold text-foreground mb-3">9. Contact</h2>
              <p>
                For questions about these terms, contact us at{' '}
                <a href="mailto:legal@afriauto.com" className="text-primary hover:underline">legal@afriauto.com</a> or 
                through our <Link to="/contact" className="text-primary hover:underline">Contact</Link> page.
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

export default Terms;
