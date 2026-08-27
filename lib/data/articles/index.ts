import type { Article } from "@/lib/types";

import { confirmationBias } from "./posts/confirmation-bias";
import { jakobsLaw } from "./posts/jakobs-law";
import { anchoringEffect } from "./posts/anchoring-effect";
import { fittssLaw } from "./posts/fittss-law";
import { ikeaEffect } from "./posts/ikea-effect";
import { vonRestorffEffect } from "./posts/von-restorff-effect";
import { cashlessEffect } from "./posts/cashless-effect";
import { provideExitPoints } from "./posts/provide-exit-points";
import { progressiveDisclosure } from "./posts/progressive-disclosure";
import { framingEffect } from "./posts/framing-effect";
import { filterBubble } from "./posts/filter-bubble";
import { empathyGap } from "./posts/empathy-gap";
import { normansSevenStagesOfAction } from "./posts/normans-seven-stages-of-action";
import { hicksLaw } from "./posts/hicks-law";
import { principleOfPragnanz } from "./posts/principle-of-pragnanz";
import { zeigarnikEffect } from "./posts/zeigarnik-effect";
import { gestaltPrinciples } from "./posts/gestalt-principles";
import { millersLaw } from "./posts/millers-law";
import { chunking } from "./posts/chunking";
import { shaping } from "./posts/shaping";
import { socialProof } from "./posts/social-proof";
import { weberFechnerLaw } from "./posts/weber-fechner-law";
import { pokaYoke } from "./posts/poka-yoke";
import { temptationBundling } from "./posts/temptation-bundling";
import { fundamentalAttributionError } from "./posts/fundamental-attribution-error";
import { streisandEffect } from "./posts/streisand-effect";
import { userScanning } from "./posts/user-scanning";
import { bounceRateVsExitRate } from "./posts/bounce-rate-vs-exit-rate";
import { userResearch } from "./posts/user-research";
import { prototyping } from "./posts/prototyping";
import { xrUxAndAiGlass } from "./posts/xr-ux-and-ai-glass";
import { holisticVsAnalyticCognition } from "./posts/holistic-vs-analytic-cognition";

/** Every article in the archive, imported from the study's original posts
 *  on Tistory and Notion. Newest first. */
export const sampleArticles: Article[] = [
  confirmationBias,
  jakobsLaw,
  anchoringEffect,
  fittssLaw,
  ikeaEffect,
  vonRestorffEffect,
  cashlessEffect,
  provideExitPoints,
  progressiveDisclosure,
  framingEffect,
  filterBubble,
  empathyGap,
  normansSevenStagesOfAction,
  hicksLaw,
  principleOfPragnanz,
  zeigarnikEffect,
  gestaltPrinciples,
  millersLaw,
  chunking,
  shaping,
  socialProof,
  weberFechnerLaw,
  pokaYoke,
  temptationBundling,
  fundamentalAttributionError,
  streisandEffect,
  userScanning,
  bounceRateVsExitRate,
  userResearch,
  prototyping,
  xrUxAndAiGlass,
  holisticVsAnalyticCognition,
].sort((a, b) => (a.publishedAt < b.publishedAt ? 1 : -1));
