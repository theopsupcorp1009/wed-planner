import Banner from "@/components/homepage/Banner";
import BrowseByCategories from "@/components/homepage/BrowseByCategories";
import FeaturedServices from "@/components/homepage/FeaturedServices";
import WhyChooseWedPlan from "@/components/homepage/WhyChoose";
import Image from "next/image";

export default function Home() {
  return (
    <div>
      <Banner/>
      <BrowseByCategories/>
      <FeaturedServices/>
      <WhyChooseWedPlan/>
    </div>
  );
}
