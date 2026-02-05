import { useState } from 'react';
import { ChevronLeft, ChevronRight, Expand } from 'lucide-react';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';

interface ImageGalleryProps {
  images: string[];
  title: string;
}

const ImageGallery = ({ images, title }: ImageGalleryProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  if (images.length === 0) {
    return (
      <div className="aspect-[16/9] bg-muted rounded-xl flex items-center justify-center">
        <p className="text-muted-foreground">No images available</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Main Image */}
      <div className="relative aspect-[16/9] rounded-xl overflow-hidden group">
        <img
          src={images[currentIndex]}
          alt={`${title} - Image ${currentIndex + 1}`}
          className="w-full h-full object-cover"
        />
        
        {/* Navigation Arrows */}
        {images.length > 1 && (
          <>
            <button
              onClick={goToPrevious}
              className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-background/80 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-background"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <button
              onClick={goToNext}
              className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-background/80 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-background"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </>
        )}

        {/* Image Counter */}
        <div className="absolute bottom-4 left-4 px-3 py-1.5 rounded-full bg-background/80 backdrop-blur-sm text-sm">
          {currentIndex + 1} / {images.length}
        </div>

        {/* Fullscreen Button */}
        <Dialog>
          <DialogTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="absolute bottom-4 right-4 w-10 h-10 rounded-full bg-background/80 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <Expand className="w-5 h-5" />
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-5xl w-full p-0 bg-background/95 backdrop-blur-md">
            <div className="relative aspect-video">
              <img
                src={images[currentIndex]}
                alt={`${title} - Image ${currentIndex + 1}`}
                className="w-full h-full object-contain"
              />
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Thumbnails */}
      {images.length > 1 && (
        <div className="flex gap-2 overflow-x-auto pb-2">
          {images.map((image, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`shrink-0 w-20 h-14 rounded-lg overflow-hidden border-2 transition-all ${
                index === currentIndex
                  ? 'border-primary ring-2 ring-primary/20'
                  : 'border-transparent opacity-60 hover:opacity-100'
              }`}
            >
              <img
                src={image}
                alt={`Thumbnail ${index + 1}`}
                className="w-full h-full object-cover"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default ImageGallery;
