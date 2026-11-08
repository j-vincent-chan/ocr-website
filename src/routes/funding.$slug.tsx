import { createFileRoute, notFound } from "@tanstack/react-router";
import { CtaBand } from "@/components/funding/cta-band";
import { DetailHero } from "@/components/funding/detail-hero";
import { Eligibility } from "@/components/funding/eligibility";
import { Faq } from "@/components/funding/faq";
import { HowToApply } from "@/components/funding/how-to-apply";
import { getAward } from "@/components/funding/lib";
import { OtherOpportunities } from "@/components/funding/other-opportunities";
import { Provides } from "@/components/funding/provides";
import { ReviewSection } from "@/components/funding/review-section";
import { Spotlight } from "@/components/funding/spotlight";

export const Route = createFileRoute("/funding/$slug")({
  beforeLoad: ({ params }) => {
    if (!getAward(params.slug)) throw notFound();
  },
  head: ({ params }) => {
    const award = getAward(params.slug);
    const title = award
      ? `${award.short} — Funding & Support — UCSF OCR`
      : "Funding & Support — UCSF OCR";
    const description = award?.oneLiner ?? "";
    return {
      meta: [
        { title },
        { name: "description", content: description },
        { property: "og:title", content: title },
        { property: "og:description", content: description },
      ],
    };
  },
  component: FundingDetailPage,
});

function FundingDetailPage() {
  const { slug } = Route.useParams();
  const award = getAward(slug);
  if (!award) return null;

  return (
    <div key={slug}>
      <DetailHero award={award} />
      {award.provides ? <Provides award={award} /> : null}
      {award.spot ? <Spotlight award={award} /> : null}
      <Eligibility award={award} />
      <HowToApply award={award} />
      <ReviewSection award={award} />
      {award.faq ? <Faq award={award} /> : null}
      <OtherOpportunities currentId={award.id} />
      <CtaBand award={award} />
    </div>
  );
}
