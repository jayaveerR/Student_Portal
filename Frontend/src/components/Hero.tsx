import { Button } from "@/components/ui/button";
import { ArrowRight, ArrowDown } from "lucide-react";
import ScrollAnimationWrapper from "@/components/ScrollAnimationWrapper";
import college from "../assets/herologo.jpg";
import lead from "../assets/lead.jpg";
import teamwork from "../assets/teamwork.jpg";
import education from "../assets/education.jpg";
const Hero = () => {
  return (
    <ScrollAnimationWrapper animation="fade-up">
      <section className="min-h-[100dvh] flex items-center bg-background pt-20 pb-12 overflow-hidden relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10">
          {/* Asymmetrical Grid Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Content - Takes 7 columns */}
            <div className="lg:col-span-7 space-y-6 md:space-y-8 text-center lg:text-left">
              <div className="opacity-0 animate-slide-in flex justify-center lg:justify-start">
                <span className="inline-block px-4 py-2 rounded-full bg-foreground text-background text-xs sm:text-sm font-medium">
                  ● Welcome to the Future
                </span>
              </div>

              <h1 className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-bold text-foreground leading-[1.1] sm:leading-[0.9] opacity-0 animate-slide-in animation-delay-100 font-roboto-condensed tracking-tight">
                Your
                <br className="hidden sm:block" />
                <span className="sm:hidden"> </span>
                Complete
                <br className="hidden sm:block" />
                <span className="sm:hidden"> </span>
                <span className="text-muted-foreground block sm:inline">Student Portal</span>
              </h1>

              <p className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-lg mx-auto lg:mx-0 opacity-0 animate-slide-in animation-delay-200">
                Access all your academic resources, tools, and community in one unified platform.
                Built for students, by students.
              </p>

              <div className="flex flex-col sm:flex-row items-center lg:items-start justify-center lg:justify-start gap-4 opacity-0 animate-slide-in animation-delay-300 w-full sm:w-auto">
                <Button size="lg" className="w-full sm:w-auto bg-foreground text-background hover:bg-foreground/90 px-8 py-6 text-lg rounded-full group">
                  Get Started
                  <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                </Button>
                <Button variant="outline" size="lg" className="w-full sm:w-auto px-8 py-6 text-lg rounded-full border-foreground text-foreground hover:bg-foreground hover:text-background transition-all duration-300">
                  Learn More
                </Button>
              </div>
            </div>

            {/* Right Content - Asymmetrical Cards */}
            <div className="lg:col-span-5 relative w-full h-auto lg:h-[600px] mt-12 lg:mt-0 px-4 sm:px-0">
              {/* Mobile/Tablet: 2x2 Grid View */}
              <div className="lg:hidden w-full aspect-square sm:aspect-[4/3] grid grid-cols-2 gap-3 sm:gap-4">
                <div className="rounded-2xl sm:rounded-3xl overflow-hidden bg-muted border border-border h-full relative group shadow-sm">
                  <img src={college} alt="College" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                </div>
                <div className="rounded-2xl sm:rounded-3xl overflow-hidden bg-muted border border-border h-full relative group shadow-sm">
                  <img src={lead} alt="Lead" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                </div>
                <div className="rounded-2xl sm:rounded-3xl overflow-hidden bg-muted border border-border h-full relative group shadow-sm">
                  <img src={teamwork} alt="Teamwork" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                </div>
                <div className="rounded-2xl sm:rounded-3xl overflow-hidden bg-muted border border-border h-full relative group shadow-sm">
                  <img src={education} alt="Education" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                </div>
              </div>

              {/* Desktop: Percentage-based Floating Cards */}
              <div className="hidden lg:block w-full h-full relative">
                <div className="absolute top-[5%] right-[2%] w-[45%] aspect-square bg-card border border-border rounded-[2rem] animate-fade-up animation-delay-200 hover-lift flex items-center justify-center overflow-hidden shadow-xl z-20 hover:z-30 transition-all duration-500">
                  <img src={college} alt="College" className="w-full h-full object-cover" />
                </div>
                <div className="absolute top-[15%] left-[2%] w-[40%] aspect-[3/4] bg-card border border-border rounded-[2rem] animate-fade-up animation-delay-300 hover-lift flex items-center justify-center overflow-hidden shadow-xl z-10 hover:z-30 transition-all duration-500">
                  <img src={lead} alt="Lead" className="w-full h-full object-cover" />
                </div>
                <div className="absolute bottom-[8%] right-[8%] w-[42%] aspect-[4/3] bg-card border border-border rounded-[2rem] animate-fade-up animation-delay-400 hover-lift flex items-center justify-center overflow-hidden shadow-xl z-20 hover:z-30 transition-all duration-500">
                  <img src={teamwork} alt="Teamwork" className="w-full h-full object-cover" />
                </div>
                <div className="absolute bottom-[2%] left-[8%] w-[35%] aspect-square bg-muted rounded-[2rem] animate-fade-up animation-delay-500 hover-lift flex items-center justify-center overflow-hidden shadow-lg border border-border z-10 hover:z-30 transition-all duration-500">
                  <img src={education} alt="Education" className="w-full h-full object-cover" />
                </div>
              </div>
            </div>
          </div>

          {/* Scroll Indicator */}
          <div className="hidden sm:flex justify-center mt-8 lg:mt-16 opacity-0 animate-fade-up animation-delay-500">
            <div className="flex flex-col items-center gap-2 text-muted-foreground">
              <span className="text-sm">Scroll to explore</span>
              <ArrowDown className="w-5 h-5 animate-bounce" />
            </div>
          </div>
        </div>
      </section>
    </ScrollAnimationWrapper>
  );
};

export default Hero;
