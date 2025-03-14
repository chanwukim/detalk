import { type PricingPlanType } from "./product.types";

export type ProductPost = {
  id: number;
  nickname: string;
  userHandle: string;
  avatarUrl: string;
  title: string;
  description: string;
  pricingPlan: PricingPlanType;
  recommendCount: number;
  tags: string[];
  media: Array<{
    id: string;
    url: string;
  }>;
  urls: string[];
  createdAt: string;
};
