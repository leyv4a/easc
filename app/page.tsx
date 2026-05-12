import Hero from "@/components/home/Hero";
import Categories from "@/components/home/Categories";
import FeaturedActivities from "@/components/home/FeaturedActivities";
import DiscoverSanCarlos from "@/components/home/DiscoverSanCarlos";
import MapSection from "@/components/home/MapSection";
import TopPlaces from "@/components/home/TopPlaces";
import ContactFooter from "@/components/home/ContactFooter";

export default function Home() {
  return (
    <main>
      <Hero />
      <Categories />
      <FeaturedActivities />
      <DiscoverSanCarlos />
      <MapSection />
      <TopPlaces />
      <ContactFooter />
    </main>
  );
}
