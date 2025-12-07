import { Button } from "@/components/ui/button";
import { FileText, BookOpen } from "lucide-react";
import Navbar from "@/components/Navbar";
import { useNavigate } from "react-router-dom";
import authService from "@/services/authService";
import { toast } from "sonner";

const QuestionPapers = () => {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-background">
            <Navbar />

            {/* Hero Section */}
            <section className="relative min-h-screen flex items-center pt-16 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-[#40916c]/5 via-background to-background opacity-60"></div>
                <div className="absolute inset-0 bg-gradient-to-tr from-[#40916c]/10 via-transparent to-transparent"></div>

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10">
                    <div className="max-w-4xl mx-auto text-center space-y-8"><br />
                        {/* Badge */}
                        <div className="opacity-0 animate-slide-in inline-block">
                            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#40916c]/10 border border-[#40916c]/20 text-[#40916c] text-sm font-medium">
                                <FileText className="w-4 h-4" />
                                Question Paper Generator
                            </span>
                        </div>

                        {/* Main Heading */}
                        <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-bold font-roboto-condensed text-black leading-tight opacity-0 animate-slide-in animation-delay-100">
                            Create Professional <br />
                            <span className="bg-gradient-to-r from-[#40916c] to-[#2d6a4f] bg-clip-text text-transparent">
                                Question Papers.
                            </span>
                        </h1>

                        {/* Subheading */}
                        <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto opacity-0 animate-slide-in animation-delay-200">
                            Design and generate examination question papers with ease.
                            Customize every detail and print professional-quality papers.
                        </p>

                        {/* CTA Button */}
                        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 opacity-0 animate-slide-in animation-delay-300">
                            <Button
                                size="lg"
                                onClick={() => {
                                    const user = authService.getCurrentUser();
                                    if (user && user.role === 'faculty') {
                                        navigate("/question-paper/generate");
                                    } else {
                                        toast.error("Access Denied: Only faculty members can create question papers.");
                                    }
                                }}
                                className="bg-[#40916c] text-white hover:bg-[#2d6a4f] px-8 py-6 text-lg rounded-full group shadow-lg hover:shadow-xl transition-all duration-300"
                            >
                                Create Question Paper
                                <FileText className="ml-2 h-5 w-5 transition-transform group-hover:-translate-y-1" />
                            </Button>
                        </div>

                        {/* Features Section */}
                        <div className="pt-16 opacity-0 animate-fade-up animation-delay-400">
                            <p className="text-sm text-muted-foreground mb-6 uppercase tracking-wider">
                                Key Features
                            </p>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                                <div className="p-6 rounded-2xl bg-[#40916c]/5 border border-[#40916c]/10 hover:border-[#40916c]/30 transition-all duration-300">
                                    <div className="w-12 h-12 rounded-full bg-[#40916c]/10 flex items-center justify-center mb-4 mx-auto">
                                        <FileText className="w-6 h-6 text-[#40916c]" />
                                    </div>
                                    <h3 className="text-lg font-semibold text-black mb-2">Customizable Layout</h3>
                                    <p className="text-sm text-muted-foreground">
                                        Edit all fields including department, semester, subject, and exam details
                                    </p>
                                </div>

                                <div className="p-6 rounded-2xl bg-[#40916c]/5 border border-[#40916c]/10 hover:border-[#40916c]/30 transition-all duration-300">
                                    <div className="w-12 h-12 rounded-full bg-[#40916c]/10 flex items-center justify-center mb-4 mx-auto">
                                        <BookOpen className="w-6 h-6 text-[#40916c]" />
                                    </div>
                                    <h3 className="text-lg font-semibold text-black mb-2">Dynamic Questions</h3>
                                    <p className="text-sm text-muted-foreground">
                                        Add, edit, or remove questions with CO, BTL, and marks allocation
                                    </p>
                                </div>

                                <div className="p-6 rounded-2xl bg-[#40916c]/5 border border-[#40916c]/10 hover:border-[#40916c]/30 transition-all duration-300">
                                    <div className="w-12 h-12 rounded-full bg-[#40916c]/10 flex items-center justify-center mb-4 mx-auto">
                                        <FileText className="w-6 h-6 text-[#40916c]" />
                                    </div>
                                    <h3 className="text-lg font-semibold text-black mb-2">Print Ready</h3>
                                    <p className="text-sm text-muted-foreground">
                                        Professional formatting with one-click print functionality
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Decorative Elements */}
                <div className="absolute top-20 left-10 w-20 h-20 bg-[#40916c]/20 rounded-full blur-3xl"></div>
                <div className="absolute bottom-20 right-10 w-32 h-32 bg-[#40916c]/20 rounded-full blur-3xl"></div>
            </section>

            {/* Information Section */}
            <section className="py-24 bg-background">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-bold text-black mb-4">
                            How It Works
                        </h2>
                        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                            Create professional question papers in three simple steps
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="text-center">
                            <div className="w-16 h-16 rounded-full bg-[#40916c] text-white flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                                1
                            </div>
                            <h3 className="text-xl font-semibold text-black mb-2">Fill Details</h3>
                            <p className="text-muted-foreground">
                                Enter college information, department, semester, and exam details
                            </p>
                        </div>

                        <div className="text-center">
                            <div className="w-16 h-16 rounded-full bg-[#40916c] text-white flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                                2
                            </div>
                            <h3 className="text-xl font-semibold text-black mb-2">Add Questions</h3>
                            <p className="text-muted-foreground">
                                Create questions with units, CO, BTL levels, and marks distribution
                            </p>
                        </div>

                        <div className="text-center">
                            <div className="w-16 h-16 rounded-full bg-[#40916c] text-white flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                                3
                            </div>
                            <h3 className="text-xl font-semibold text-black mb-2">Print & Use</h3>
                            <p className="text-muted-foreground">
                                Review your paper and print it with a single click
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="border-t border-border py-12 bg-background">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center text-sm text-muted-foreground">
                        © 2024 Question Paper Generator. All rights reserved.
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default QuestionPapers;
