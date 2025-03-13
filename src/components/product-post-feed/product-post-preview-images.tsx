"use client";

import { useEffect, useState } from "react";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../ui/carousel";
import {
  Overlay,
  OverlayContent,
  OverlayDescription,
  OverlayTitle,
} from "../ui/overlay";

type PreviewImagesProps = {
  postTitle: string;
  imageUrls: string[];
};

export default function ProductPostPreviewImages({
  postTitle,
  imageUrls: initialImageUrls = [],
}: PreviewImagesProps) {
  // images
  type PreviewImage = {
    url: string;
    width: number;
    height: number;
    aspectRatio: number;
    renderWidth: number;
    renderHeight: number;
  };

  const [images, setImages] = useState<PreviewImage[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // modal
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isImageModalOpen, setIsImageModalOpen] = useState(false);

  function handleClickImage(index: number) {
    setCurrentImageIndex(index);
    setIsImageModalOpen(true);
  }

  function handleCloseImage() {
    setIsImageModalOpen(false);
    setCurrentImageIndex(0);
  }

  useEffect(() => {
    function calculateDimensions() {
      const loadedImages: PreviewImage[] = [];
      let loadedCount = 0;

      const MAX_HEIGHT = 300;
      const MAX_WIDTH = 400;

      initialImageUrls.forEach((imageUrl) => {
        const image: HTMLImageElement = new Image();
        image.src = imageUrl;

        image.onload = () => {
          const aspectRatio = image.width / image.height;
          const renderWidth = Math.min(MAX_HEIGHT * aspectRatio, MAX_WIDTH);
          const renderHeight = renderWidth / aspectRatio;

          loadedImages.push({
            url: imageUrl,
            width: image.width,
            height: image.height,
            aspectRatio,
            renderWidth,
            renderHeight,
          });

          loadedCount++;
          if (loadedCount === initialImageUrls.length) {
            setImages(loadedImages);
            setIsLoading(false);
          }
        };
      });
    }

    calculateDimensions();

    // clean up
    return () => {
      setImages([]);
      setIsLoading(true);
    };
  }, [initialImageUrls]);

  if (initialImageUrls.length < 1) {
    return null;
  }

  if (isLoading) {
    return (
      <Carousel className="bg-muted z-10 mt-2">
        <CarouselContent className="-ml-4">
          <div aria-busy className="bg-muted h-76 w-full"></div>
        </CarouselContent>
        <CarouselNext className="-right-0" />
        <CarouselPrevious className="-left-0" />
      </Carousel>
    );
  }

  return (
    <>
      {/* Image Detail Modal */}
      <Overlay
        open={isImageModalOpen}
        onOpenChange={(isOpen) => {
          if (!isOpen) {
            setCurrentImageIndex(0);
          }
          setIsImageModalOpen(isOpen);
        }}
      >
        <OverlayContent
          className="data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 fixed top-[45%] left-[50%] w-full max-w-[90vw] -translate-x-1/2 -translate-y-1/2 shadow-lg duration-200 outline-none"
          onClick={handleCloseImage}
        >
          <OverlayTitle className="sr-only">{postTitle} Image</OverlayTitle>
          <OverlayDescription className="sr-only">
            This is a image of {postTitle}
          </OverlayDescription>
          <img
            alt={`Image of ${postTitle}`}
            src={images[currentImageIndex].url}
          />
        </OverlayContent>
      </Overlay>

      <Carousel className="z-10 mt-2">
        <CarouselContent className="-ml-4">
          {images.map((image, index) => (
            <CarouselItem
              key={`${image.url}-${index}`}
              className="pl-4"
              style={{ flex: `0 0 ${image.renderWidth + 16}px` }}
            >
              <img
                alt={`Image of ${postTitle}`}
                src={image.url}
                className="h-76 rounded-2xl border object-cover"
                style={{ width: `${image.renderWidth}px` }}
                onClick={() => handleClickImage(index)}
              />
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselNext className="-right-0" />
        <CarouselPrevious className="-left-0" />
      </Carousel>
    </>
  );
}
