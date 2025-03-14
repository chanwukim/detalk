"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

import paths from "@/config/paths";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import {
  Overlay,
  OverlayContent,
  OverlayDescription,
  OverlayTitle,
} from "@/components/ui/overlay";

import { useProductPostFeed } from "./product-post-feed";

export default function ProductPostPreviewImages() {
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

  const { productPost, isNavigable } = useProductPostFeed();

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

      productPost.media.forEach(({ url }) => {
        const image: HTMLImageElement = new Image();
        image.src = url;

        image.onload = () => {
          const aspectRatio = image.width / image.height;
          const renderWidth = Math.min(MAX_HEIGHT * aspectRatio, MAX_WIDTH);
          const renderHeight = renderWidth / aspectRatio;

          loadedImages.push({
            url,
            width: image.width,
            height: image.height,
            aspectRatio,
            renderWidth,
            renderHeight,
          });

          loadedCount++;
          if (loadedCount === productPost.media.length) {
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
  }, [productPost.media]);

  if (productPost.media.length < 1) {
    return null;
  }

  if (isLoading) {
    return (
      <Carousel className="z-10 mt-2">
        <CarouselContent className="-ml-4">
          <div aria-busy className="h-76 w-full"></div>
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
          className="data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 fixed top-[45%] left-[50%] -translate-x-1/2 -translate-y-1/2 shadow-lg duration-200 outline-none"
          onClick={handleCloseImage}
        >
          <OverlayTitle className="sr-only">
            {productPost.title} Image
          </OverlayTitle>
          <OverlayDescription className="sr-only">
            This is a image of {productPost.title}
          </OverlayDescription>
          <img
            alt={`Image of ${productPost.title}`}
            src={images[currentImageIndex].url}
            className="max-h-[80vh] max-w-[90vw] object-contain"
          />
        </OverlayContent>
      </Overlay>

      <Carousel className="z-10 mt-2">
        <CarouselContent className="-ml-4">
          {images.map((image, index) => (
            <CarouselItem
              key={`${image.url}-${index}`}
              className="z-10 pl-4"
              style={{ flex: `0 0 ${image.renderWidth + 16}px` }}
            >
              <img
                alt={`Image of ${productPost.title}`}
                src={image.url}
                className="h-76 cursor-pointer rounded-xl border object-cover"
                style={{ width: `${image.renderWidth}px` }}
                onClick={() => handleClickImage(index)}
              />
            </CarouselItem>
          ))}
          {isNavigable && (
            <Link
              href={paths.product.post.detail.getHref(
                productPost.id.toString(),
              )}
              className="absolute inset-0 z-0"
            >
              <span className="sr-only">View Post</span>
            </Link>
          )}
        </CarouselContent>
        {images.length > 1 && (
          <>
            <CarouselNext className="-right-0" />
            <CarouselPrevious className="-left-0" />
          </>
        )}
      </Carousel>
    </>
  );
}
