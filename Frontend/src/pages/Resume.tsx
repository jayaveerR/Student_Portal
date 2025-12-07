import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles, Download, Edit, FileText, Check } from "lucide-react";
import Navbar from "@/components/Navbar";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import resume from "../assets/resume.jpg";

const brands = [
    "Google", "Microsoft", "Amazon", "Apple", "Meta", "Netflix"
];

const features = [
    {
        icon: FileText,
        title: "Professional Templates",
        description: "Choose from a variety of ATS-friendly resume templates"
    },
    {
        icon: Edit,
        title: "Easy Editing",
        description: "Intuitive editor with real-time preview"
    },
    {
        icon: Download,
        title: "Export Options",
        description: "Download in PDF, DOCX, or share online"
    }
];

const Resume = () => {
    const navigate = useNavigate();
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [resumeTitle, setResumeTitle] = useState("");

    const handleStartBuilder = () => {
        if (resumeTitle.trim()) {
            navigate("/resume/builder", { state: { title: resumeTitle } });
        }
    };

    return (
        <div className="min-h-screen bg-background">
            <Navbar />

            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle>Create New Resume</DialogTitle>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                        <div className="grid gap-2">
                            <Label htmlFor="title">Resume Title</Label>
                            <Input
                                id="title"
                                value={resumeTitle}
                                onChange={(e) => setResumeTitle(e.target.value)}
                                placeholder="e.g. Software Engineer Resume"
                                onKeyDown={(e) => e.key === "Enter" && handleStartBuilder()}
                            />
                        </div>
                    </div>
                    <DialogFooter>
                        <Button onClick={handleStartBuilder} className="bg-green-600 hover:bg-green-700">
                            Create Resume
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            {/* Hero Section with Green Gradient Background */}
            <section className="relative min-h-screen flex items-center pt-16 overflow-hidden">
                {/* Green Gradient Background */}
                <div className="absolute inset-0 bg-gradient-to-br from-green-50/50 via-background to-background opacity-60"></div>
                <div className="absolute inset-0 bg-gradient-to-tr from-green-100/30 via-transparent to-transparent"></div>

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10">
                    <div className="max-w-4xl mx-auto text-center space-y-8"> <br />
                        {/* Badge */}
                        <div className="opacity-0 animate-slide-in inline-block">
                            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-500/10 border border-green-500/20 text-green-700 text-sm font-medium">
                                <Sparkles className="w-4 h-4" />
                                AI-Powered Resume Builder
                            </span>
                        </div>

                        {/* Main Heading */}
                        <h1 className="text-4xl md:text-7xl lg:text-8xl font-bold font-roboto-condensed text-foreground leading-tight opacity-0 animate-slide-in animation-delay-100">
                            Land your dream job <br />
                            With{" "}
                            <span className="bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                                powerful resumes.
                            </span>
                        </h1>

                        {/* Subheading */}
                        <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto opacity-0 animate-slide-in animation-delay-200">
                            Create, edit and download professional resumes with the{" "}
                            <span className="font-semibold text-green-600 font-roboto-condensed">AI-powered</span>{" "}
                            assistant
                        </p>

                        {/* CTA Buttons */}
                        <div className="flex flex-row items-center justify-between gap-3 sm:gap-4 opacity-0 animate-slide-in animation-delay-300 w-full max-w-4xl mx-auto px-0 sm:px-0">
                            <Button
                                size="lg"
                                onClick={() => setIsDialogOpen(true)}
                                className="bg-green-600 text-white hover:bg-green-700 px-4 sm:px-8 py-6 text-base sm:text-lg rounded-full group shadow-lg hover:shadow-xl transition-all duration-300 flex-1"
                            >
                                Get Started
                                <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                            </Button>
                            <Button
                                variant="outline"
                                size="lg"
                                className="px-4 sm:px-8 py-6 text-base sm:text-lg rounded-full border-2 border-green-600 text-green-700 hover:bg-green-50 transition-all duration-300 flex-1"
                            >
                                Try Demo
                            </Button>
                        </div>

                        {/* Trusted By Section */}
                        <div className="pt-16 opacity-0 animate-fade-up animation-delay-400">
                            <p className="text-sm text-muted-foreground mb-6 uppercase tracking-wider">
                                Trusted by leading brands
                            </p>
                            <div className="flex flex-wrap items-center justify-center gap-8 md:gap-12">
                                {brands.map((brand) => (
                                    <div
                                        key={brand}
                                        className="text-2xl font-bold text-muted-foreground/40 hover:text-foreground/60 transition-colors duration-300 cursor-pointer opacity-0 animate-fade-up animation-delay-400"
                                    >
                                        {brand}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Decorative Elements */}
                <div className="absolute top-20 left-10 w-20 h-20 bg-green-400/20 rounded-full blur-3xl"></div>
                <div className="absolute bottom-20 right-10 w-32 h-32 bg-emerald-400/20 rounded-full blur-3xl"></div>
            </section>

            {/* Features Section */}
            <section className="py-24 bg-background relative">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                            Everything You Need to Succeed
                        </h2>
                        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                            Our AI-powered tools help you create the perfect resume in minutes
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {features.map((feature, index) => (
                            <div
                                key={feature.title}
                                className={`bg-card border border-border rounded-2xl p-8 hover:shadow-lg transition-all duration-300 hover:-translate-y-1 opacity-0 animate-fade-up animation-delay-${index === 0 ? '0' : index === 1 ? '100' : '200'}`}
                            >
                                <div className="w-14 h-14 rounded-xl bg-green-500/10 flex items-center justify-center mb-6">
                                    <feature.icon className="w-7 h-7 text-green-600" />
                                </div>
                                <h3 className="text-xl font-semibold text-foreground mb-3">
                                    {feature.title}
                                </h3>
                                <p className="text-muted-foreground">
                                    {feature.description}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Why Choose Us Section */}
            <section className="py-24 bg-gradient-to-b from-background to-green-50/30">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                        <div className="space-y-6">
                            <h2 className="text-3xl md:text-4xl font-bold text-foreground">
                                Why Choose Our Resume Builder?
                            </h2>
                            <div className="space-y-4">
                                {[
                                    "AI-powered suggestions for better content",
                                    "ATS-friendly templates that get noticed",
                                    "Real-time collaboration and sharing",
                                    "Professional formatting in seconds",
                                    "Export to multiple formats"
                                ].map((item, index) => (
                                    <div key={index} className="flex items-start gap-3">
                                        <div className="w-6 h-6 rounded-full bg-green-500 flex items-center justify-center flex-shrink-0 mt-0.5">
                                            <Check className="w-4 h-4 text-white" />
                                        </div>
                                        <p className="text-muted-foreground text-lg">{item}</p>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="relative">
                            <div className="aspect-square bg-gradient-to-br from-green-100 to-emerald-100 rounded-3xl flex items-center justify-center">
                                <img src={resume} alt="Resume" className="w-full h-90 object-cover" />
                            </div>
                            <div className="absolute -bottom-6 -right-6 w-48 h-48 bg-green-400/20 rounded-full blur-3xl"></div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Footer CTA */}
            <section className="py-24 bg-background">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
                        Ready to Build Your Perfect Resume?
                    </h2>
                    <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
                        Join thousands of successful job seekers who landed their dream jobs with our AI-powered resume builder
                    </p>
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                        <Button
                            size="lg"
                            className="bg-green-600 text-white hover:bg-green-700 px-8 py-6 text-lg rounded-full group shadow-lg"
                        >
                            Get Started for Free
                            <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                        </Button>
                    </div>
                </div>
            </section>

            {/* Simple Footer */}
            <footer className="border-t border-border py-12 bg-background">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                        <div className="col-span-1 md:col-span-2">
                            <h3 className="text-lg font-semibold text-foreground mb-4">Resume Builder</h3>
                            <p className="text-muted-foreground text-sm">
                                Create professional resumes with AI-powered assistance. Land your dream job faster.
                            </p>
                        </div>
                        <div>
                            <h4 className="text-sm font-semibold text-foreground mb-4">Product</h4>
                            <ul className="space-y-2 text-sm text-muted-foreground">
                                <li className="hover:text-foreground cursor-pointer transition-colors">Features</li>
                                <li className="hover:text-foreground cursor-pointer transition-colors">Templates</li>
                                <li className="hover:text-foreground cursor-pointer transition-colors">Pricing</li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="text-sm font-semibold text-foreground mb-4">Support</h4>
                            <ul className="space-y-2 text-sm text-muted-foreground">
                                <li className="hover:text-foreground cursor-pointer transition-colors">Help Center</li>
                                <li className="hover:text-foreground cursor-pointer transition-colors">Contact Us</li>
                                <li className="hover:text-foreground cursor-pointer transition-colors">Privacy Policy</li>
                            </ul>
                        </div>
                    </div>
                    <div className="mt-12 pt-8 border-t border-border text-center text-sm text-muted-foreground">
                        © 2024 Resume Builder. All rights reserved.
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default Resume;
