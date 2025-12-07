import { ArrowUpRight, Clock, ChevronRight, ChevronLeft } from "lucide-react";
import ScrollAnimationWrapper from "@/components/ScrollAnimationWrapper";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Card, CardContent } from "@/components/ui/card";
import leadImg from "../assets/mic college 2.webp";
import teamworkImg from "../assets/MIC_College_of_Technologygy_Cover.avif";
import resumeImg from "../assets/mic college.jpg";

const blogs = [
  {
    id: 1,
    title: "Mastering Student Leadership",
    category: "Leadership",
    image: leadImg,
    readTime: "5 min read",
    description: "Tips and strategies for becoming an effective student leader on campus."
  },
  {
    id: 2,
    title: "The Power of Collaboration",
    category: "Teamwork",
    image: teamworkImg,
    readTime: "4 min read",
    description: "How working together in study groups can boost your academic performance."
  },
  {
    id: 3,
    title: "MIC College of Technology",
    category: "Career",
    image: resumeImg,
    readTime: "6 min read",
    description: "Essential advice for building a resume that stands out to future employers."
  },
];

const BlogSection = () => {
  return (
    <ScrollAnimationWrapper animation="fade-up">
      <section className="py-24 bg-card overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12">
            <div>
              <span className="inline-block px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
                ● Our Blog
              </span>
              <h2 className="text-4xl md:text-5xl font-bold text-foreground font-roboto-condensed">
                Latest Insights
              </h2>
            </div>
            <div>
              <a href="/blog" className="inline-flex items-center gap-2 text-foreground font-medium hover:text-primary transition-all duration-300 group">
                View All Articles
                <ArrowUpRight className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              </a>
            </div>
          </div>

          {/* Carousel */}
          <Carousel
            opts={{
              align: "start",
              loop: true,
            }}
            className="w-full"
          >
            <CarouselContent className="-ml-2 md:-ml-4">
              {blogs.map((blog) => (
                <CarouselItem key={blog.id} className="pl-2 md:pl-4 md:basis-1/2 lg:basis-1/3">
                  <div className="p-1">
                    <Card className="overflow-hidden border-0 shadow-none bg-transparent hover:shadow-xl transition-all duration-300 group">
                      <CardContent className="p-0">
                        {/* Image Container */}
                        <div className="relative aspect-[4/3] rounded-2xl overflow-hidden mb-4">
                          <img
                            src={blog.image}
                            alt={blog.title}
                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                          />
                          <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors duration-300"></div>

                          {/* Category Badge overlay */}
                          <div className="absolute top-4 left-4">
                            <span className="px-3 py-1 rounded-full bg-white/90 backdrop-blur-sm text-xs font-bold text-black shadow-sm">
                              {blog.category}
                            </span>
                          </div>
                        </div>

                        {/* Content */}
                        <div className="space-y-3 px-2">
                          <div className="flex items-center gap-2 text-muted-foreground text-xs">
                            <Clock className="w-3 h-3" />
                            <span>{blog.readTime}</span>
                          </div>

                          <h3 className="text-xl font-bold text-foreground leading-tight group-hover:text-primary transition-colors duration-300">
                            {blog.title}
                          </h3>

                          <p className="text-muted-foreground text-sm line-clamp-2">
                            {blog.description}
                          </p>

                          <div className="pt-2">
                            <span className="inline-flex items-center text-sm font-medium text-primary hover:underline underline-offset-4 cursor-pointer">
                              Read More <ChevronRight className="w-4 h-4 ml-1" />
                            </span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <div className="flex justify-end gap-2 mt-8 mr-4">
              <CarouselPrevious className="static translate-y-0" />
              <CarouselNext className="static translate-y-0" />
            </div>
          </Carousel>
        </div>
      </section>
    </ScrollAnimationWrapper>
  );
};

export default BlogSection;
