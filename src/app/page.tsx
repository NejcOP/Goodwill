import { Hero } from "@/components/home/hero";
import { FeaturedCategories } from "@/components/home/featured-categories";
import { FeaturedCollection } from "@/components/home/featured-collection";
import { StorySection } from "@/components/home/story-section";
import { EditorialCampaign } from "@/components/home/editorial-campaign";
import { NewArrivalsCarousel } from "@/components/home/new-arrivals-carousel";
import { InstagramSection } from "@/components/home/instagram-section";
import { Newsletter } from "@/components/home/newsletter";

export default function Home() {
  return (
    <>
      <Hero />
      <FeaturedCategories />
      <FeaturedCollection />
      <StorySection />
      <EditorialCampaign />
      <NewArrivalsCarousel />
      <InstagramSection />
      <Newsletter />
    </>
  );
}

