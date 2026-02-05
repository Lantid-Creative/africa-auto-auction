import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import { useAuth } from '@/hooks/useAuth';
import { useLanguage } from '@/hooks/useLanguage';
import { Button } from '@/components/ui/button';
import { Gavel, Chrome, Smartphone, Shield, Zap, Globe, User, Building2, ArrowLeft } from 'lucide-react';

type AccountType = 'individual' | 'business';

const Auth = () => {
  const { login, isLoading } = useAuth();
  const { t } = useLanguage();
  const navigate = useNavigate();
  const [step, setStep] = useState<'choose' | 'signin'>('choose');
  const [accountType, setAccountType] = useState<AccountType | null>(null);
  const [loadingProvider, setLoadingProvider] = useState<'google' | 'apple' | null>(null);

  const handleLogin = async (provider: 'google' | 'apple') => {
    setLoadingProvider(provider);
    try {
      await login(provider);
      navigate('/dashboard');
    } catch (error) {
      console.error('Login failed:', error);
    } finally {
      setLoadingProvider(null);
    }
  };

  const handleContinue = () => {
    if (accountType) setStep('signin');
  };

  const features = [
    { icon: Shield, text: 'Secure & verified transactions' },
    { icon: Zap, text: 'Real-time bidding updates' },
    { icon: Globe, text: 'Access to pan-African market' },
  ];

  return (
    <Layout hideFooter>
      <div className="min-h-[calc(100vh-80px)] flex items-center justify-center py-12 px-4">
        <div className="w-full max-w-5xl grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Side - Branding */}
          <div className="hidden lg:block">
            <div className="space-y-6">
              <div className="flex items-center gap-3">
                <div className="w-14 h-14 rounded-xl bg-gradient-gold flex items-center justify-center">
                  <Gavel className="w-7 h-7 text-primary-foreground" />
                </div>
                <div>
                  <h1 className="text-2xl font-display font-bold text-gold-gradient">
                    {t('common.appName')}
                  </h1>
                  <p className="text-sm text-muted-foreground">{t('common.tagline')}</p>
                </div>
              </div>

              <h2 className="text-4xl font-display font-bold leading-tight">
                {t('auth.joinTitle')}{' '}
                <span className="text-gold-gradient">{t('auth.joinTitleHighlight')}</span>{' '}
                {t('auth.joinTitleSuffix')}
              </h2>

              <p className="text-muted-foreground text-lg">{t('auth.joinSubtitle')}</p>

              <div className="space-y-4 pt-4">
                {features.map((feature, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                      <feature.icon className="w-5 h-5 text-primary" />
                    </div>
                    <span className="text-foreground/80">{feature.text}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Side - Auth Card */}
          <div className="w-full max-w-md mx-auto lg:mx-0">
            <div className="card-premium p-8">
              {/* Mobile Logo */}
              <div className="lg:hidden flex items-center justify-center gap-2 mb-8">
                <div className="w-12 h-12 rounded-xl bg-gradient-gold flex items-center justify-center">
                  <Gavel className="w-6 h-6 text-primary-foreground" />
                </div>
                <div>
                  <h1 className="text-xl font-display font-bold text-gold-gradient">
                    {t('common.appName')}
                  </h1>
                </div>
              </div>

              {step === 'choose' ? (
                <>
                  <div className="text-center mb-6">
                    <h3 className="text-2xl font-display font-bold mb-2">
                      {t('auth.registerAs')}
                    </h3>
                    <p className="text-muted-foreground text-sm">
                      {t('auth.accountType')} — we use different verification for each.
                    </p>
                  </div>

                  <div className="space-y-4 mb-6">
                    <button
                      type="button"
                      onClick={() => setAccountType('individual')}
                      className={`w-full p-4 rounded-xl border-2 text-left transition-all ${
                        accountType === 'individual'
                          ? 'border-primary bg-primary/10'
                          : 'border-border/50 hover:border-primary/30 bg-card'
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                          <User className="w-5 h-5 text-primary" />
                        </div>
                        <div>
                          <p className="font-semibold">{t('auth.individual')}</p>
                          <p className="text-sm text-muted-foreground mt-1">
                            {t('auth.individualDesc')}
                          </p>
                        </div>
                      </div>
                    </button>

                    <button
                      type="button"
                      onClick={() => setAccountType('business')}
                      className={`w-full p-4 rounded-xl border-2 text-left transition-all ${
                        accountType === 'business'
                          ? 'border-primary bg-primary/10'
                          : 'border-border/50 hover:border-primary/30 bg-card'
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                          <Building2 className="w-5 h-5 text-primary" />
                        </div>
                        <div>
                          <p className="font-semibold">{t('auth.business')}</p>
                          <p className="text-sm text-muted-foreground mt-1">
                            {t('auth.businessDesc')}
                          </p>
                        </div>
                      </div>
                    </button>
                  </div>

                  <Button
                    className="w-full btn-premium"
                    disabled={!accountType}
                    onClick={handleContinue}
                  >
                    {t('common.getStarted')}
                  </Button>
                </>
              ) : (
                <>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="mb-4 -ml-2 gap-1"
                    onClick={() => setStep('choose')}
                  >
                    <ArrowLeft className="w-4 h-4" />
                    Change account type
                  </Button>

                  <div className="text-center mb-6">
                    <h3 className="text-2xl font-display font-bold mb-2">
                      {t('auth.welcomeBack')}
                    </h3>
                    <p className="text-muted-foreground">{t('auth.signInToAccount')}</p>
                  </div>

                  {accountType === 'business' && (
                    <div className="mb-6 p-4 rounded-lg bg-muted/30 border border-border/50 text-sm text-muted-foreground">
                      <strong className="text-foreground">Business verification:</strong> After
                      sign-in you will need to upload your dealer or exporter license (and any
                      state-specific documents). We will review and activate your account.
                    </div>
                  )}
                  {accountType === 'individual' && (
                    <div className="mb-6 p-4 rounded-lg bg-muted/30 border border-border/50 text-sm text-muted-foreground">
                      <strong className="text-foreground">Individual:</strong> You can only
                      purchase vehicles in the &quot;No License Required&quot; category unless you
                      use a Broker. We may ask for a government-issued ID to verify your account.
                    </div>
                  )}

                  <div className="space-y-4">
                    <Button
                      variant="outline"
                      className="w-full h-14 text-base gap-3 border-border/50 hover:bg-muted/50 hover:border-primary/30 transition-all"
                      onClick={() => handleLogin('google')}
                      disabled={isLoading || loadingProvider !== null}
                    >
                      {loadingProvider === 'google' ? (
                        <div className="w-5 h-5 border-2 border-primary border-t-transparent rounded-full animate-spin" />
                      ) : (
                        <Chrome className="w-5 h-5" />
                      )}
                      {t('auth.continueWithGoogle')}
                    </Button>

                    <Button
                      variant="outline"
                      className="w-full h-14 text-base gap-3 border-border/50 hover:bg-muted/50 hover:border-primary/30 transition-all"
                      onClick={() => handleLogin('apple')}
                      disabled={isLoading || loadingProvider !== null}
                    >
                      {loadingProvider === 'apple' ? (
                        <div className="w-5 h-5 border-2 border-primary border-t-transparent rounded-full animate-spin" />
                      ) : (
                        <Smartphone className="w-5 h-5" />
                      )}
                      {t('auth.continueWithApple')}
                    </Button>
                  </div>

                  <div className="relative my-8">
                    <div className="absolute inset-0 flex items-center">
                      <div className="w-full border-t border-border/50" />
                    </div>
                    <div className="relative flex justify-center text-xs uppercase">
                      <span className="bg-card px-4 text-muted-foreground">
                        {t('auth.secureAuth')}
                      </span>
                    </div>
                  </div>

                  <p className="text-xs text-center text-muted-foreground">
                    {t('auth.agreeTerms')}{' '}
                    <Link to="/terms" className="text-primary hover:underline">
                      Terms of Service
                    </Link>{' '}
                    &{' '}
                    <Link to="/privacy" className="text-primary hover:underline">
                      Privacy Policy
                    </Link>
                  </p>

                  <div className="mt-6 p-4 rounded-lg bg-muted/30 border border-border/50">
                    <p className="text-xs text-muted-foreground text-center">
                      <strong className="text-foreground">Demo:</strong> Add{' '}
                      <code className="px-1 py-0.5 rounded bg-muted text-primary">
                        ?admin=true
                      </code>{' '}
                      to URL for admin access
                    </p>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Auth;
