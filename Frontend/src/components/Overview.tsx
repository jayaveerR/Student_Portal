import ScrollAnimationWrapper from "@/components/ScrollAnimationWrapper";
import studentImg from "../assets/student.jpg";
import { Clock, FileEdit, BookOpen, Calendar, FileText } from "lucide-react";

const features = [
  {
    title: "Time Table Making",
    icon: Clock,
    description: "Effortlessly create, view, and manage your class schedules and academic calendar."
  },
  {
    title: "AI Resume Builder",
    icon: FileEdit,
    description: "Build professional, ATS-friendly resumes instantly with AI-powered suggestions tailored for students."
  },
  {
    title: "Materials for Student",
    icon: BookOpen,
    description: "Access a vast library of study materials, lecture notes, and educational resources organized by course."
  },
  {
    title: "Event Payments",
    icon: Calendar,
    description: "Seamlessly register for college events and make secure payments directly through the portal."
  },
  {
    title: "Question Papers",
    icon: FileText,
    description: "Prepare better with easy access to previous year question papers and mock test series."
  },
];

const Overview = () => {
  return (
    <ScrollAnimationWrapper animation="fade-up">
      <section className="py-12 md:py-24 bg-background overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">

            {/* Left Side - Image with Curve */}
            <div className="relative order-2 lg:order-1 mt-8 lg:mt-0">
              {/* Main Image Container */}
              <div className="relative rounded-tl-[30px] rounded-br-[30px] rounded-tr-[80px] sm:rounded-tr-[120px] rounded-bl-[80px] sm:rounded-bl-[120px] overflow-hidden shadow-2xl border-4 border-white/20 group h-[350px] sm:h-[450px] lg:h-[500px] w-full">
                <img
                  src={studentImg}
                  alt="Student Portal Overview"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                {/* Overlay Gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>

                {/* Bottom Text on Image */}
                <div className="absolute bottom-6 left-6 sm:bottom-8 sm:left-8 text-white z-10">
                  <p className="font-bold text-xl sm:text-2xl tracking-wide">Future Ready</p>
                  <p className="text-sm text-gray-200 mt-1">Empowering students with technology</p>
                </div>
              </div>

              {/* Decorative Background Blob */}
              <div className="absolute -z-10 top-8 sm:top-12 -left-8 sm:-left-12 w-full h-full bg-[#4a1942]/10 rounded-tr-[100px] sm:rounded-tr-[150px] rounded-bl-[100px] sm:rounded-bl-[150px] blur-sm transform rotate-3"></div>
            </div>

            {/* Right Side - Vertical Timeline Info */}
            <div className="order-1 lg:order-2">
              <div className="mb-10 lg:mb-12 text-center lg:text-left">
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold font-roboto-condensed text-foreground mb-4 sm:mb-6 leading-tight">
                  Explore the <br className="hidden sm:block" />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#4a1942] to-purple-600">Portal Ecosystem</span>
                </h2>
                <p className="text-base sm:text-lg text-muted-foreground mx-auto lg:mx-0 max-w-2xl">
                  A centralized hub designed to simplify every aspect of your student journey, from academics to extracurriculars.
                </p>
              </div>

              <div className="relative border-l-2 border-dashed border-[#4a1942]/30 ml-4 lg:ml-6 space-y-8 sm:space-y-10">
                {features.map((feature, index) => (
                  <div key={index} className="relative pl-8 sm:pl-10 group">
                    {/* Timeline Dot */}
                    <div className="absolute -left-[11px] top-1 w-6 h-6 rounded-full border-4 border-background bg-[#4a1942] shadow-md group-hover:scale-125 group-hover:ring-4 ring-[#4a1942]/20 transition-all duration-300 z-10"></div>

                    <div className="flex flex-col sm:flex-row gap-4 sm:gap-5 items-start">
                      {/* Icon Box */}
                      <div className="flex-shrink-0 w-12 h-12 rounded-xl sm:rounded-2xl bg-gradient-to-br from-[#4a1942]/10 to-purple-50 flex items-center justify-center group-hover:bg-[#4a1942] group-hover:text-white transition-all duration-300 shadow-sm">
                        <feature.icon className="w-5 h-5 sm:w-6 sm:h-6 transition-colors duration-300" />
                      </div>

                      {/* Content */}
                      <div className="transform transition-transform duration-300 group-hover:translate-x-2">
                        <h3 className="text-lg sm:text-xl font-bold text-foreground mb-1.5 sm:mb-2 group-hover:text-[#4a1942] transition-colors">{feature.title}</h3>
                        <p className="text-muted-foreground text-sm leading-relaxed">{feature.description}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </ScrollAnimationWrapper>
  );
};

export default Overview;
