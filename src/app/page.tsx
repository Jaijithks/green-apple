import HeroSection from "@/components/home/HeroSection";
import WelcomeSection from "@/components/home/WelcomeSection";
import ServicesSection from "@/components/home/ServicesSection";
import MenuSection from "@/components/home/MenuSection";
import ValuePropsSection from "@/components/home/ValuePropsSection";
import ProcessSection from "@/components/home/ProcessSection";
import GalleryPreviewSection from "@/components/home/GalleryPreviewSection";

export default function Home() {
  return (
    <>
      <HeroSection />
      <WelcomeSection />
      <ServicesSection />
      <MenuSection />
      <ValuePropsSection />
      <ProcessSection />
      <GalleryPreviewSection />
    </>
  );
}
