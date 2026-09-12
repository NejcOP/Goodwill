import { Hero } from "@/components/home/hero";
import { FeaturedCategories } from "@/components/home/featured-categories";
import { InstagramSection } from "@/components/home/instagram-section";
import { NewArrivalsCarousel } from "@/components/home/new-arrivals-carousel";

export default function Home() {
  return (
    <>
      <Hero />
      <FeaturedCategories />
      <InstagramSection />
      <NewArrivalsCarousel />
    </>
  );
}

