import { ReactNode } from 'react';
import Header from './Header';
import Footer from './Footer';
import BackToTop from './BackToTop';

interface LayoutProps {
  children: ReactNode;
  hideFooter?: boolean;
}

const Layout = ({ children, hideFooter = false }: LayoutProps) => {
  return (
    <div className="min-h-screen flex flex-col bg-background pattern-african">
      <Header />
      <main className="flex-1 pt-20">
        {children}
      </main>
      {!hideFooter && <Footer />}
      <BackToTop />
    </div>
  );
};

export default Layout;
