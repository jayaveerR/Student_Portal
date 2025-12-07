import ScrollAnimationWrapper from "@/components/ScrollAnimationWrapper";

const InfiniteScroll = () => {
  const items = [
    "Student Portal",
    "DVR & Dr.HS MIC COLLEGE OF TECHNOLOGY",
    "Time table",
    "AI Resume Builder",
    "Resources",
    "DVR & Dr.HS MIC COLLEGE OF TECHNOLOGY",
    "Materials",
    "Kanchikacherla",
    "MIC COLLEGE",
    "Quation Papers",
    "Event Payments",
  ];

  return (
    <ScrollAnimationWrapper animation="fade-in">
      <section className="py-8 bg-background overflow-hidden border-y border-border">
        <div className="relative">
          {/* First Row - Normal Direction */}
          <div className="animate-scroll flex whitespace-nowrap mb-4">
            {[...items, ...items, ...items, ...items].map((item, index) => (
              <span
                key={`row1-${index}`}
                className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-black mx-4 sm:mx-6 select-none font-roboto-condensed"
              >
                {item}
                <span className="mx-4 sm:mx-6 text-black">●</span>
              </span>
            ))}
          </div>

          {/* Second Row - Reverse Direction */}
          <div className="animate-scroll-slow flex whitespace-nowrap" style={{ animationDirection: 'reverse' }}>
            {[...items.reverse(), ...items, ...items, ...items].map((item, index) => (
              <span
                key={`row2-${index}`}
                className="text-3xl sm:text-4xl md:text-5xl font-bold text-black/80 mx-4 sm:mx-6 select-none font-roboto-condensed"
              >
                {item}
                <span className="mx-4 sm:mx-6 text-black/80">●</span>
              </span>
            ))}
          </div>
        </div>
      </section>
    </ScrollAnimationWrapper>
  );
};

export default InfiniteScroll;
