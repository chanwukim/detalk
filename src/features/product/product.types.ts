import { type PricingPlan } from "./product.constants";

export type PricingPlanType = (typeof PricingPlan)[keyof typeof PricingPlan];
