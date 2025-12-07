import { Link } from "react-router-dom";
import {
  GraduationCap, Instagram, Twitter, Youtube, Linkedin, Github,
  Clock, BookOpen, Calendar, Link2, Megaphone, BarChart3,
  Code2, FileText, Map, FileEdit, Pencil, Phone, Info, Mail, MapPin
} from "lucide-react";
import ScrollAnimationWrapper from "@/components/ScrollAnimationWrapper";

const Footer = () => {
  const academicLinks = [
    { name: "Timetable", href: "/timetable", icon: Clock },
    { name: "Materials", href: "/materials", icon: BookOpen },
    { name: "Question Papers", href: "/papers", icon: FileText },
    { name: "Marks", href: "/marks", icon: BarChart3 },
    { name: "Notice Board", href: "/notices", icon: Megaphone },
  ];

  const resourceLinks = [
    { name: "Career Roadmap", href: "/career", icon: Map },
    { name: "Resume Builder", href: "/resume", icon: FileEdit },
    { name: "Hackathons", href: "/hackathons", icon: Code2 },
    { name: "Important Links", href: "/links", icon: Link2 },
    { name: "Events", href: "/events", icon: Calendar },
  ];

  const companyLinks = [
    { name: "About Us", href: "/about", icon: Info },
    { name: "Blog", href: "/blog", icon: Pencil },
    { name: "Contact", href: "/contact", icon: Phone },
  ];

  const socials = [
    { icon: Instagram, label: "Instagram", href: "#" },
    { icon: Twitter, label: "Twitter", href: "#" },
    { icon: Youtube, label: "YouTube", href: "#" },
    { icon: Linkedin, label: "LinkedIn", href: "#" },
    { icon: Github, label: "GitHub", href: "#" },
  ];

  return (
    <ScrollAnimationWrapper animation="fade-in">
      <footer className="py-20 bg-foreground text-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Top Section - Asymmetrical Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 mb-16">
            {/* Brand Section - 4 cols */}
            <div className="lg:col-span-4 space-y-6">
              <Link to="/" className="flex items-center gap-3 group">
                <div className="w-12 h-12 rounded-xl bg-background flex items-center justify-center transition-all duration-300 group-hover:scale-105">
                  <GraduationCap className="w-7 h-7 text-foreground" />
                </div>
                <span className="text-2xl font-bold text-background">StudentPortal</span>
              </Link>
              <p className="text-background/70 max-w-xs">
                Your complete academic companion. Access resources, track progress, and connect with your community.
              </p>
              <div className="flex items-center gap-3 text-background/70">
                <Mail className="w-4 h-4" />
                <span>hello@studentportal.com</span>
              </div>
              <div className="flex items-center gap-3 text-background/70">
                <MapPin className="w-4 h-4" />
                <span>Mumbai, India</span>
              </div>
            </div>

            {/* Academic Links - 2 cols */}
            <div className="lg:col-span-2">
              <h3 className="text-lg font-semibold text-background mb-6">Academic</h3>
              <ul className="space-y-4">
                {academicLinks.map((link) => (
                  <li key={link.name}>
                    <Link
                      to={link.href}
                      className="flex items-center gap-2 text-background/70 hover:text-background transition-colors duration-200"
                    >
                      <link.icon className="w-4 h-4" />
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Resources Links - 2 cols */}
            <div className="lg:col-span-2">
              <h3 className="text-lg font-semibold text-background mb-6">Resources</h3>
              <ul className="space-y-4">
                {resourceLinks.map((link) => (
                  <li key={link.name}>
                    <Link
                      to={link.href}
                      className="flex items-center gap-2 text-background/70 hover:text-background transition-colors duration-200"
                    >
                      <link.icon className="w-4 h-4" />
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Company Links - 2 cols */}
            <div className="lg:col-span-2">
              <h3 className="text-lg font-semibold text-background mb-6">Company</h3>
              <ul className="space-y-4">
                {companyLinks.map((link) => (
                  <li key={link.name}>
                    <Link
                      to={link.href}
                      className="flex items-center gap-2 text-background/70 hover:text-background transition-colors duration-200"
                    >
                      <link.icon className="w-4 h-4" />
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Social Links - 2 cols */}
            <div className="lg:col-span-2">
              <h3 className="text-lg font-semibold text-background mb-6">Connect</h3>
              <div className="flex flex-wrap gap-3">
                {socials.map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    aria-label={social.label}
                    className="w-10 h-10 rounded-xl bg-background/10 flex items-center justify-center text-background hover:bg-background hover:text-foreground transition-all duration-300 hover:scale-110"
                  >
                    <social.icon className="w-5 h-5" />
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Bottom Section */}
          <div className="pt-8 border-t border-background/10 flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-sm text-background/60">
              © {new Date().getFullYear()} StudentPortal. All rights reserved.
            </p>
            <div className="flex items-center gap-6 text-sm text-background/60">
              <Link to="/privacy" className="hover:text-background transition-colors">Privacy Policy</Link>
              <Link to="/terms" className="hover:text-background transition-colors">Terms of Service</Link>
              <Link to="/cookies" className="hover:text-background transition-colors">Cookies</Link>
            </div>
          </div>
        </div>
      </footer>
    </ScrollAnimationWrapper>
  );
};

export default Footer;
