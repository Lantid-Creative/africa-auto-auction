import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Gavel, Plus, Minus } from 'lucide-react';
import { toast } from 'sonner';

interface BidFormProps {
  currentBid: number;
  minBidIncrement?: number;
  onPlaceBid: (amount: number) => Promise<void>;
  isAuthenticated: boolean;
  onAuthRequired: () => void;
}

const BidForm = ({ 
  currentBid, 
  minBidIncrement = 500, 
  onPlaceBid,
  isAuthenticated,
  onAuthRequired
}: BidFormProps) => {
  const [bidAmount, setBidAmount] = useState(currentBid + minBidIncrement);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0,
    }).format(price);
  };

  const incrementBid = () => {
    setBidAmount(prev => prev + minBidIncrement);
  };

  const decrementBid = () => {
    const minBid = currentBid + minBidIncrement;
    if (bidAmount > minBid) {
      setBidAmount(prev => prev - minBidIncrement);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!isAuthenticated) {
      onAuthRequired();
      return;
    }

    const minBid = currentBid + minBidIncrement;
    if (bidAmount < minBid) {
      toast.error(`Minimum bid is ${formatPrice(minBid)}`);
      return;
    }

    setIsSubmitting(true);
    try {
      await onPlaceBid(bidAmount);
      toast.success('Bid placed successfully!');
    } catch (error) {
      toast.error('Failed to place bid. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const minBid = currentBid + minBidIncrement;

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="text-sm text-muted-foreground mb-2 block">
          Your Bid (min {formatPrice(minBid)})
        </label>
        <div className="flex items-center gap-2">
          <Button
            type="button"
            variant="outline"
            size="icon"
            onClick={decrementBid}
            disabled={bidAmount <= minBid}
            className="shrink-0"
          >
            <Minus className="w-4 h-4" />
          </Button>
          <div className="relative flex-1">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">$</span>
            <Input
              type="number"
              value={bidAmount}
              onChange={(e) => setBidAmount(Number(e.target.value))}
              className="input-premium pl-8 text-center text-lg font-semibold"
              min={minBid}
              step={minBidIncrement}
            />
          </div>
          <Button
            type="button"
            variant="outline"
            size="icon"
            onClick={incrementBid}
            className="shrink-0"
          >
            <Plus className="w-4 h-4" />
          </Button>
        </div>
      </div>

      <Button 
        type="submit" 
        className="w-full btn-premium gap-2"
        disabled={isSubmitting || bidAmount < minBid}
      >
        <Gavel className="w-4 h-4" />
        {isSubmitting ? 'Placing Bid...' : `Place Bid ${formatPrice(bidAmount)}`}
      </Button>

      <p className="text-xs text-center text-muted-foreground">
        By placing a bid, you agree to our{' '}
        <a href="/terms" className="text-primary hover:underline">Terms of Service</a>
      </p>
    </form>
  );
};

export default BidForm;
