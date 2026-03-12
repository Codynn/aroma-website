
import CustomerReviewsSection from "@/components/home/CustomerReviewSection";
import HeroSection from "@/components/home/HeroSection";
import MostValuedTeas from "@/components/home/MostValuedTeasSection";
import ServingMarketsSection from "@/components/home/ServingMarketSection";
import TeaStoriesSection from "@/components/home/TeaStoriesSection";

export default function HomePage() {
  return (
    <main className="relative w-full font-outfit">
      <HeroSection />
      <MostValuedTeas/>
      <ServingMarketsSection/>
      <CustomerReviewsSection/>
      <TeaStoriesSection/>
    </main>
  );
}