import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/button';
import { Gavel, Chrome, Smartphone, Shield, Zap, Globe } from 'lucide-react';

const Auth = () => {
  const { login, isLoading } = useAuth();
  const navigate = useNavigate();
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
                    AfriAuto
                  </h1>
                  <p className="text-sm text-muted-foreground">Premium Auctions</p>
                </div>
              </div>

              <h2 className="text-4xl font-display font-bold leading-tight">
                Join Africa's Most
                <span className="text-gold-gradient"> Trusted </span>
                Car Auction Platform
              </h2>

              <p className="text-muted-foreground text-lg">
                Buy and sell premium vehicles with confidence. Access exclusive auctions, 
                verified sellers, and secure transactions across the continent.
              </p>

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
                    AfriAuto
                  </h1>
                </div>
              </div>

              <div className="text-center mb-8">
                <h3 className="text-2xl font-display font-bold mb-2">
                  Welcome Back
                </h3>
                <p className="text-muted-foreground">
                  Sign in to access your account
                </p>
              </div>

              <div className="space-y-4">
                {/* Google Sign In */}
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
                  Continue with Google
                </Button>

                {/* Apple Sign In */}
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
                  Continue with Apple
                </Button>
              </div>

              <div className="relative my-8">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-border/50" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-card px-4 text-muted-foreground">
                    Secure Authentication
                  </span>
                </div>
              </div>

              <p className="text-xs text-center text-muted-foreground">
                By signing in, you agree to our{' '}
                <a href="/terms" className="text-primary hover:underline">
                  Terms of Service
                </a>{' '}
                and{' '}
                <a href="/privacy" className="text-primary hover:underline">
                  Privacy Policy
                </a>
              </p>

              {/* Demo Admin Login Hint */}
              <div className="mt-6 p-4 rounded-lg bg-muted/30 border border-border/50">
                <p className="text-xs text-muted-foreground text-center">
                  <strong className="text-foreground">Demo:</strong> Add{' '}
                  <code className="px-1 py-0.5 rounded bg-muted text-primary">?admin=true</code>{' '}
                  to URL for admin access
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Auth;
