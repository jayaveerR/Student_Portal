import { BookOpen, Calendar, Code2, FileText, Map, Trophy, ArrowUpRight } from "lucide-react";
import ScrollAnimationWrapper from "@/components/ScrollAnimationWrapper";
import hackathon from "../assets/hackathon.jpg";
import internships from "../assets/intern ships.jpg";
import noticeBoard from "../assets/Notice Board.jpg";
import achievements from "../assets/archivements.jpg";
import attendance from "../assets/attendance.jpg";

const placeholders = [
  { height: "h-64", icon: BookOpen, title: "Internships", span: "", image: internships, description: "Access course notes & guides" },
  { height: "h-64", icon: Calendar, title: "Notice Board", span: "", image: noticeBoard, description: "Upcoming campus activities" },
  { height: "h-64", icon: Trophy, title: "Achievements", span: "", image: achievements, description: "Student hall of fame" },
  {
    height: "h-64",
    icon: Code2,
    title: "Hackathons",
    span: "md:col-span-2", // Spans 2 columns
    image: hackathon,
    description: "Join the next coding challenge"
  },
  { height: "h-64", icon: FileText, title: "Attendance", span: "", image: attendance, description: "Previous year questions" },
];

const MasonrySection = () => {
  return (
    <ScrollAnimationWrapper animation="fade-up">
      <section className="py-24 bg-background relative overflow-hidden">
        {/* Decorative background elements */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
          <div className="absolute top-[10%] left-[5%] w-64 h-64 bg-purple-500/5 rounded-full blur-3xl"></div>
          <div className="absolute bottom-[10%] right-[5%] w-96 h-96 bg-[#4a1942]/5 rounded-full blur-3xl"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16 opacity-0 animate-fade-up">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4 font-roboto-condensed">
              Featured Content
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto text-lg">
              Explore our curated collection of resources and tools designed for your success.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 auto-rows-auto">
            {placeholders.map((item, index) => (
              <div
                key={index}
                className={`${item.span} ${item.height} relative rounded-[24px] sm:rounded-[32px] overflow-hidden group cursor-pointer transition-all duration-500 hover:shadow-2xl hover:-translate-y-2 border border-border/50`}
                style={{ animationDelay: `${index * 100}ms` }}
              >
                {item.image ? (
                  // Image Background Card (Hackathons, etc)
                  <>
                    <div className="absolute inset-0">
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent transition-opacity duration-300"></div>
                    </div>

                    <div className="absolute inset-0 p-6 sm:p-8 flex flex-col justify-end">
                      <div className="flex items-center justify-between mb-2">
                        <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-white/20 backdrop-blur-md flex items-center justify-center text-white border border-white/30">
                          <item.icon className="w-5 h-5 sm:w-6 sm:h-6" />
                        </div>
                        <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transform translate-x-4 group-hover:translate-x-0 transition-all duration-300">
                          <ArrowUpRight className="w-4 h-4 sm:w-5 sm:h-5" />
                        </div>
                      </div>

                      <h3 className="text-xl sm:text-2xl font-bold text-white mb-1 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                        {item.title}
                      </h3>
                      <p className="text-gray-200 text-xs sm:text-sm opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300 delay-75">
                        {item.description}
                      </p>
                    </div>
                  </>
                ) : (
                  // Standard Card
                  <div className="h-full w-full bg-card hover:bg-gradient-to-br hover:from-card hover:to-muted transition-colors duration-500 p-6 sm:p-8 flex flex-col items-center justify-center text-center">
                    <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-[#4a1942]/5 group-hover:bg-[#4a1942] flex items-center justify-center mb-4 sm:mb-6 transition-all duration-300 shadow-sm group-hover:shadow-lg group-hover:scale-110">
                      <item.icon className="w-6 h-6 sm:w-8 sm:h-8 text-[#4a1942] group-hover:text-white transition-colors duration-300" />
                    </div>

                    <h3 className="text-lg sm:text-xl font-bold text-foreground mb-2 group-hover:text-[#4a1942] transition-colors duration-300">
                      {item.title}
                    </h3>

                    <p className="text-muted-foreground text-xs sm:text-sm max-w-[90%] sm:max-w-[80%] group-hover:text-foreground/80 transition-colors duration-300">
                      {item.description}
                    </p>

                    <div className="mt-4 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
                      <span className="text-xs font-medium text-[#4a1942] flex items-center gap-1">
                        View details <ArrowUpRight className="w-3 h-3" />
                      </span>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>
    </ScrollAnimationWrapper>
  );
};

export default MasonrySection;
