import { useState } from "react";

interface ImageGalleryProps {
  images: string[];
}

export default function ImageGallery({ images }: ImageGalleryProps) {
  const [activeImage, setActiveImage] = useState(0);

  return (
    <div className="space-y-4">
      {/* Main Image */}
      <div className="relative rounded-2xl overflow-hidden aspect-[4/3] bg-muted">
        <img 
          src={images[activeImage]} 
          alt={`Professional massage therapist workspace - main image ${activeImage + 1}`}
          className="w-full h-full object-cover gallery-image"
          width="800"
          height="600"
          loading="eager"
          data-testid="img-main-gallery"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
      </div>
      
      {/* Thumbnail Gallery */}
      <div className="grid grid-cols-4 gap-3">
        {images.map((image, index) => (
          <div 
            key={index}
            className={`relative rounded-lg overflow-hidden aspect-square bg-muted cursor-pointer transition-all ${
              activeImage === index ? 'ring-2 ring-primary' : ''
            }`}
            onClick={() => setActiveImage(index)}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                setActiveImage(index);
              }
            }}
            aria-label={`View image ${index + 1}`}
            data-testid={`img-thumbnail-${index}`}
          >
            <img 
              src={image} 
              alt={`Professional massage therapist workspace - thumbnail ${index + 1}`}
              className="w-full h-full object-cover gallery-image"
              width="200"
              height="200"
              loading="lazy"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
