import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowUp } from 'lucide-react';
import { useLanguage } from '@/hooks/useLanguage';

const SHOW_AFTER_PX = 400;

const BackToTop = () => {
  const [visible, setVisible] = useState(false);
  const { t } = useLanguage();

  useEffect(() => {
    const handleScroll = () => setVisible(window.scrollY > SHOW_AFTER_PX);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (!visible) return null;

  return (
    <Button
      variant="outline"
      size="icon"
      className="fixed bottom-6 right-6 z-40 rounded-full h-12 w-12 shadow-lg border-border/50 bg-card/95 backdrop-blur hover:bg-primary hover:text-primary-foreground hover:border-primary"
      onClick={scrollToTop}
      aria-label={t('common.backToTop')}
    >
      <ArrowUp className="w-5 h-5" />
    </Button>
  );
};

export default BackToTop;
