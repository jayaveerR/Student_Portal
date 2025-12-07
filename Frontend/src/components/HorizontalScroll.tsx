import { useRef, useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ScrollItem {
    id: number;
    title: string;
    description: string;
    color: string;
}

const items: ScrollItem[] = [
    { id: 1, title: "Innovation", description: "Cutting-edge solutions", color: "bg-gradient-to-br from-blue-500 to-blue-700" },
    { id: 2, title: "Design", description: "Beautiful interfaces", color: "bg-gradient-to-br from-purple-500 to-purple-700" },
    { id: 3, title: "Performance", description: "Lightning fast", color: "bg-gradient-to-br from-green-500 to-green-700" },
    { id: 4, title: "Security", description: "Enterprise grade", color: "bg-gradient-to-br from-red-500 to-red-700" },
    { id: 5, title: "Scalability", description: "Grow with ease", color: "bg-gradient-to-br from-yellow-500 to-yellow-700" },
    { id: 6, title: "Analytics", description: "Data-driven insights", color: "bg-gradient-to-br from-pink-500 to-pink-700" },
    { id: 7, title: "Collaboration", description: "Work together", color: "bg-gradient-to-br from-indigo-500 to-indigo-700" },
    { id: 8, title: "Integration", description: "Connect everything", color: "bg-gradient-to-br from-teal-500 to-teal-700" },
];

const HorizontalScroll = () => {
    const scrollContainerRef = useRef<HTMLDivElement>(null);
    const [canScrollLeft, setCanScrollLeft] = useState(false);
    const [canScrollRight, setCanScrollRight] = useState(true);

    const checkScrollPosition = () => {
        if (scrollContainerRef.current) {
            const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
            setCanScrollLeft(scrollLeft > 0);
            setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
        }
    };

    useEffect(() => {
        checkScrollPosition();
        const container = scrollContainerRef.current;
        if (container) {
            container.addEventListener("scroll", checkScrollPosition);
            return () => container.removeEventListener("scroll", checkScrollPosition);
        }
    }, []);

    const scroll = (direction: "left" | "right") => {
        if (scrollContainerRef.current) {
            const scrollAmount = 400;
            const targetScroll =
                direction === "left"
                    ? scrollContainerRef.current.scrollLeft - scrollAmount
                    : scrollContainerRef.current.scrollLeft + scrollAmount;

            scrollContainerRef.current.scrollTo({
                left: targetScroll,
                behavior: "smooth",
            });
        }
    };

    return (
        <section className="py-20 bg-background relative">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Section Header */}
                <div className="mb-12 text-center">
                    <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
                        Explore Our Features
                    </h2>
                    <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                        Scroll through our amazing features with smooth animations
                    </p>
                </div>

                {/* Scroll Container */}
                <div className="relative group">
                    {/* Left Scroll Button */}
                    <Button
                        variant="outline"
                        size="icon"
                        onClick={() => scroll("left")}
                        disabled={!canScrollLeft}
                        className={`absolute left-0 top-1/2 -translate-y-1/2 z-10 h-12 w-12 rounded-full bg-background/95 backdrop-blur-sm border-2 shadow-lg transition-all duration-300 ${canScrollLeft
                                ? "opacity-0 group-hover:opacity-100 hover:scale-110"
                                : "opacity-0 cursor-not-allowed"
                            }`}
                    >
                        <ChevronLeft className="h-6 w-6" />
                    </Button>

                    {/* Scrollable Content */}
                    <div
                        ref={scrollContainerRef}
                        className="flex gap-6 overflow-x-auto scrollbar-hide scroll-smooth pb-4"
                        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
                    >
                        {items.map((item, index) => (
                            <div
                                key={item.id}
                                className="flex-shrink-0 w-80 opacity-0 animate-fade-up"
                                style={{ animationDelay: `${index * 100}ms` }}
                            >
                                <div className={`${item.color} rounded-3xl p-8 h-64 flex flex-col justify-between text-white shadow-lg hover-lift hover-scale cursor-pointer transition-all duration-300`}>
                                    <div>
                                        <div className="text-6xl font-bold opacity-20 mb-4">
                                            {String(item.id).padStart(2, "0")}
                                        </div>
                                        <h3 className="text-2xl font-bold mb-2">{item.title}</h3>
                                        <p className="text-white/90">{item.description}</p>
                                    </div>
                                    <div className="flex items-center gap-2 text-sm font-medium">
                                        Learn more
                                        <ChevronRight className="h-4 w-4" />
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Right Scroll Button */}
                    <Button
                        variant="outline"
                        size="icon"
                        onClick={() => scroll("right")}
                        disabled={!canScrollRight}
                        className={`absolute right-0 top-1/2 -translate-y-1/2 z-10 h-12 w-12 rounded-full bg-background/95 backdrop-blur-sm border-2 shadow-lg transition-all duration-300 ${canScrollRight
                                ? "opacity-0 group-hover:opacity-100 hover:scale-110"
                                : "opacity-0 cursor-not-allowed"
                            }`}
                    >
                        <ChevronRight className="h-6 w-6" />
                    </Button>
                </div>

                {/* Scroll Indicator */}
                <div className="flex justify-center mt-8 gap-2">
                    {items.map((_, index) => (
                        <div
                            key={index}
                            className="h-1.5 w-8 rounded-full bg-muted transition-all duration-300"
                        />
                    ))}
                </div>
            </div>

            {/* Custom CSS to hide scrollbar */}
            <style>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
        </section>
    );
};

export default HorizontalScroll;
