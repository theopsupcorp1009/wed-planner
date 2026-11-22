import Banner from "@/components/homepage/Banner";
import BrowseByCategories from "@/components/homepage/BrowseByCategories";
import FeaturedServices from "@/components/homepage/FeaturedServices";
import WhyChooseWedPlan from "@/components/homepage/WhyChoose";
import HowItWorks from "@/components/homepage/HowItWorks";
import Reveal from "@/components/homepage/Reveal";

export default function Home() {
  return (
    <div>
      <Banner/>
      <Reveal><BrowseByCategories/></Reveal>
      <Reveal><FeaturedServices/></Reveal>
      <Reveal><WhyChooseWedPlan/></Reveal>
      <Reveal><HowItWorks/></Reveal>
    </div>
  );
}
