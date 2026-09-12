import { Hero } from "@/components/home/hero";
import { FeaturedCategories } from "@/components/home/featured-categories";
import { NewArrivalsCarousel } from "@/components/home/new-arrivals-carousel";
import { Newsletter } from "@/components/home/newsletter";

export default function Home() {
  return (
    <>
      <Hero />
      <FeaturedCategories />
      <NewArrivalsCarousel />
      <Newsletter />
    </>
  );
}

