import Container from "@/components/ui/Container";
import SectionTitle from "@/components/ui/SectionTitle";
import FeaturedSlider from "@/components/home/FeaturedSlider";
import { fetchAllFeatured, type FeaturedItem } from "@/lib/api";
import { YATE_CATEGORY_ID } from "@/types/yate";
import { TOUR_CATEGORY_ID } from "@/types/tour";
import { HOSPEDAJE_CATEGORY_ID } from "@/types/hospedaje";

const CATEGORY_ROUTES: Record<string, string> = {
  [YATE_CATEGORY_ID]:      "/yates",
  [TOUR_CATEGORY_ID]:      "/tours",
  [HOSPEDAJE_CATEGORY_ID]: "/hospedaje",
};

function getHref(item: Omit<FeaturedItem, "href">): string {
  const base = CATEGORY_ROUTES[item.category] ?? "/";
  return `${base}/${item.slug}`;
}

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export default async function FeaturedActivities() {
  const all = await fetchAllFeatured();
  const items = shuffle(all).slice(0, 8).map((item) => ({
    ...item,
    href: getHref(item),
  }));

  if (!items.length) return null;

  return (
    <section className="py-24 bg-[#0B1E2D] overflow-hidden">
      <Container>
        <div className="flex items-end justify-between mb-0">
          <SectionTitle
            eyebrow="Imperdibles"
            title="Descubre Estos Imperdibles"
            subtitle="Las experiencias más extraordinarias del Mar de Cortés"
            light
          />
        </div>
      </Container>

      {/* El slider maneja sus propios arrows internamente */}
      <FeaturedSlider items={items} />
    </section>
  );
}
