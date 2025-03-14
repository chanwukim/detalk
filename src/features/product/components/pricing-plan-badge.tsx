import { Badge, type BadgeProps } from "@/components/ui/badge";

import { PricingPlan } from "../product.constants";
import { type PricingPlanType } from "../product.types";

const pricingPlanBadgeColor: Record<PricingPlanType, BadgeProps["color"]> = {
  [PricingPlan.FREE]: "green",
  [PricingPlan.PAID]: "violet",
  [PricingPlan.PAID_WITH_FREE_TRIAL_OR_PLAN]: "blue",
};

export default function PricingPlanBadge({ plan }: { plan: PricingPlanType }) {
  return <Badge color={pricingPlanBadgeColor[plan]}>{plan}</Badge>;
}
