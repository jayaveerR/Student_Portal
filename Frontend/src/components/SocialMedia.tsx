import { Instagram, Twitter, Youtube, Linkedin, Github, ArrowUpRight } from "lucide-react";
import ScrollAnimationWrapper from "@/components/ScrollAnimationWrapper";

const socials = [
  { icon: Instagram, label: "Instagram", href: "#", followers: "12.5K" },
  { icon: Twitter, label: "Twitter", href: "#", followers: "8.2K" },
  { icon: Youtube, label: "YouTube", href: "#", followers: "25K" },
  { icon: Linkedin, label: "LinkedIn", href: "#", followers: "15K" },
  { icon: Github, label: "GitHub", href: "#", followers: "5.8K" },
];

const SocialMedia = () => {
  return (
    <ScrollAnimationWrapper animation="slide-in-right">
      <section className="py-24 bg-foreground">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Asymmetrical Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Content */}
            <div className="lg:col-span-5 text-background">
              <div className="opacity-0 animate-slide-in">
                <span className="inline-block px-4 py-2 rounded-full bg-background/10 text-background text-sm font-medium mb-6">
                  ● Stay Connected
                </span>
                <h2 className="text-4xl md:text-5xl font-bold mb-6 font-roboto-condensed">
                  Join Our
                  <br />
                  Community
                </h2>
                <p className="text-background/70 text-lg mb-8">
                  Follow us on social media for the latest updates, tips, and community highlights.
                </p>
              </div>
            </div>

            {/* Right Content - Social Cards */}
            <div className="lg:col-span-7">
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 opacity-0 animate-fade-up animation-delay-200">
                {socials.map((social, index) => (
                  <a
                    key={social.label}
                    href={social.href}
                    aria-label={social.label}
                    className={`${index === 0 ? 'md:col-span-2' : ''} bg-background/10 backdrop-blur-sm border border-background/10 rounded-2xl p-6 flex flex-col items-start text-background hover:bg-background hover:text-foreground transition-all duration-300 group`}
                  >
                    <social.icon className="w-8 h-8 mb-4" />
                    <div className="flex items-center justify-between w-full">
                      <div>
                        <div className="font-semibold text-lg">{social.label}</div>
                        <div className="text-sm opacity-70">{social.followers} followers</div>
                      </div>
                      <ArrowUpRight className="w-5 h-5 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 group-hover:-translate-y-1 transition-all duration-300" />
                    </div>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </ScrollAnimationWrapper>
  );
};

export default SocialMedia;
