import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import MasonrySection from "@/components/MasonrySection";
import SocialMedia from "@/components/SocialMedia";
import InfiniteScroll from "@/components/InfiniteScroll";
import Overview from "@/components/Overview";
import BlogSection from "@/components/Collegeinformation";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <Hero />
      <InfiniteScroll />
      <Overview />
      <MasonrySection />
      <SocialMedia />
      <BlogSection />
      <Footer />
    </div>
  );
};

export default Index;
