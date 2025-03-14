"use client";

import cn from "@/libs/cn";
import createSafeContext from "@/libs/create-safe-context";

import { type ProductPost } from "../../product.dto";

type ProductPostFeedContextValue = {
  productPost: ProductPost;
  isNavigable: boolean;
};

const [ProductPostFeedProvider, useProductPostFeed] =
  createSafeContext<ProductPostFeedContextValue>(
    "use ProductPostFeedContext must be used within a ProductPostFeedProvider",
  );

export { useProductPostFeed };

export function ProductPostFeed({
  productPost,
  isNavigable,
  children,
  className,
  ...rest
}: React.ComponentProps<"article"> & {
  productPost: ProductPost;
  isNavigable: boolean;
}) {
  return (
    <ProductPostFeedProvider value={{ productPost, isNavigable }}>
      <article className={cn("relative border-b", className)} {...rest}>
        {children}
      </article>
    </ProductPostFeedProvider>
  );
}

export function ProductPostFeedHeader({
  children,
  className,
  ...rest
}: React.ComponentProps<"div">) {
  return (
    <div className={cn("flex items-center px-4 pt-6", className)} {...rest}>
      {children}
    </div>
  );
}

export function ProductPostFeedBody({
  children,
  className,
  ...rest
}: React.ComponentProps<"div">) {
  return (
    <div className={cn("px-4", className)} {...rest}>
      {children}
    </div>
  );
}

export function ProductPostFeedFooter({
  children,
  className,
  ...rest
}: React.ComponentProps<"div">) {
  return (
    <div className={cn("mt-4 px-4 pb-6", className)} {...rest}>
      {children}
    </div>
  );
}
