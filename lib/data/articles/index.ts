import type { Article } from "@/lib/types";

import { anchoringEffect } from "./posts/anchoring-effect";
import { baeminAddressSetting } from "./posts/baemin-address-setting";
import { bounceRateVsExitRate } from "./posts/bounce-rate-vs-exit-rate";
import { cashlessEffect } from "./posts/cashless-effect";
import { chunking } from "./posts/chunking";
import { cocktailPartyEffect } from "./posts/cocktail-party-effect";
import { confirmationBias } from "./posts/confirmation-bias";
import { coupangInterfaceIntent } from "./posts/coupang-interface-intent";
import { decisionFatigue } from "./posts/decision-fatigue";
import { emotionalDesignToLifestyleUx } from "./posts/emotional-design-to-lifestyle-ux";
import { empathyGap } from "./posts/empathy-gap";
import { faceIsmEffect } from "./posts/face-ism-effect";
import { filterBubble } from "./posts/filter-bubble";
import { fittssLaw } from "./posts/fittss-law";
import { framingEffect } from "./posts/framing-effect";
import { freshStartEffect } from "./posts/fresh-start-effect";
import { fundamentalAttributionError } from "./posts/fundamental-attribution-error";
import { gestaltPrinciples } from "./posts/gestalt-principles";
import { hicksLaw } from "./posts/hicks-law";
import { holisticVsAnalyticCognition } from "./posts/holistic-vs-analytic-cognition";
import { ifDesignTrend2026 } from "./posts/if-design-trend-2026";
import { ikeaEffect } from "./posts/ikea-effect";
import { isPersonalizationGoodUx } from "./posts/is-personalization-good-ux";
import { jakobsLaw } from "./posts/jakobs-law";
import { memoryAndUx } from "./posts/memory-and-ux";
import { methodOfLoci } from "./posts/method-of-loci";
import { millersLaw } from "./posts/millers-law";
import { naverBookingAccess } from "./posts/naver-booking-access";
import { normansSevenStagesOfAction } from "./posts/normans-seven-stages-of-action";
import { noveltyEffect } from "./posts/novelty-effect";
import { peakEndRule } from "./posts/peak-end-rule";
import { pokaYoke } from "./posts/poka-yoke";
import { postelsLaw } from "./posts/postels-law";
import { primacyEffect } from "./posts/primacy-effect";
import { principleOfPragnanz } from "./posts/principle-of-pragnanz";
import { progressiveDisclosure } from "./posts/progressive-disclosure";
import { prototyping } from "./posts/prototyping";
import { provideExitPoints } from "./posts/provide-exit-points";
import { reactanceEffect } from "./posts/reactance-effect";
import { recognitionOverRecall } from "./posts/recognition-over-recall";
import { shaping } from "./posts/shaping";
import { socialProof } from "./posts/social-proof";
import { streisandEffect } from "./posts/streisand-effect";
import { temptationBundling } from "./posts/temptation-bundling";
import { userResearch } from "./posts/user-research";
import { userScanning } from "./posts/user-scanning";
import { vonRestorffEffect } from "./posts/von-restorff-effect";
import { weberFechnerLaw } from "./posts/weber-fechner-law";
import { xrUxAndAiGlass } from "./posts/xr-ux-and-ai-glass";
import { zeigarnikEffect } from "./posts/zeigarnik-effect";

/** Every imported article, newest first. Generated from posts/. */
export const sampleArticles: Article[] = [
  anchoringEffect,
  baeminAddressSetting,
  bounceRateVsExitRate,
  cashlessEffect,
  chunking,
  cocktailPartyEffect,
  confirmationBias,
  coupangInterfaceIntent,
  decisionFatigue,
  emotionalDesignToLifestyleUx,
  empathyGap,
  faceIsmEffect,
  filterBubble,
  fittssLaw,
  framingEffect,
  freshStartEffect,
  fundamentalAttributionError,
  gestaltPrinciples,
  hicksLaw,
  holisticVsAnalyticCognition,
  ifDesignTrend2026,
  ikeaEffect,
  isPersonalizationGoodUx,
  jakobsLaw,
  memoryAndUx,
  methodOfLoci,
  millersLaw,
  naverBookingAccess,
  normansSevenStagesOfAction,
  noveltyEffect,
  peakEndRule,
  pokaYoke,
  postelsLaw,
  primacyEffect,
  principleOfPragnanz,
  progressiveDisclosure,
  prototyping,
  provideExitPoints,
  reactanceEffect,
  recognitionOverRecall,
  shaping,
  socialProof,
  streisandEffect,
  temptationBundling,
  userResearch,
  userScanning,
  vonRestorffEffect,
  weberFechnerLaw,
  xrUxAndAiGlass,
  zeigarnikEffect,
].sort((a, b) => (a.publishedAt < b.publishedAt ? 1 : -1));
