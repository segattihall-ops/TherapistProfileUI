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
          alt="Main gallery image" 
          className="w-full h-full object-cover gallery-image"
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
            data-testid={`img-thumbnail-${index}`}
          >
            <img 
              src={image} 
              alt={`Gallery thumbnail ${index + 1}`}
              className="w-full h-full object-cover gallery-image"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
