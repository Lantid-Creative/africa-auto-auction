import Layout from '@/components/layout/Layout';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';

interface PlaceholderPageProps {
  title: string;
  description?: string;
}

const PlaceholderPage = ({ title, description }: PlaceholderPageProps) => (
  <Layout>
    <div className="container mx-auto px-4 py-16">
      <div className="max-w-2xl mx-auto text-center">
        <h1 className="text-3xl font-display font-bold mb-4">{title}</h1>
        {description && (
          <p className="text-muted-foreground mb-8">{description}</p>
        )}
        <Link to="/">
          <Button variant="outline" className="gap-2">
            <ArrowLeft className="w-4 h-4" />
            Back to home
          </Button>
        </Link>
      </div>
    </div>
  </Layout>
);

export default PlaceholderPage;
